from flask import render_template, Blueprint, redirect, url_for, flash, request
from application.users.forms import login_form, registration_form, change_password_form, change_preferences_form
from application import db
from application.models import Users, Bugs, Projects
from flask_login import login_user, login_required, logout_user, current_user
import datetime as dt
from werkzeug.security import generate_password_hash

users = Blueprint('users', __name__, template_folder = 'templates/users')

@users.route('/dashboard')
@login_required
def dashboard():
    # STATS
    # since_last_login = Bugs.query.filter(Bugs.containing_project in current_user.collab_projects).filter_by(status = "PENDING").filter(Bugs.report_date > current_user.last_login).count()
    # since_last_login = Bugs.query.filter(Bugs.containing_project.has(Projects.id.in_([ proj.id for proj in current_user.owned_projects]))).filter_by(status = "PENDING").filter(Bugs.report_date > current_user.last_login).count()
    since_last_login = Bugs.query.filter(Bugs.containing_project.has(Projects.id.in_([ proj.id for proj in current_user.owned_projects]))).filter_by(status = "PENDING").filter(Bugs.report_date > current_user.last_login).count()
    resolved = Bugs.query.filter(Bugs.containing_project.has(Projects.id.in_([ proj.id for proj in current_user.owned_projects]))).filter_by(status = "RESOLVED").count()
    unresolved = Bugs.query.filter(Bugs.containing_project.has(Projects.id.in_([ proj.id for proj in current_user.owned_projects]))).filter_by(status = "PENDING").count()

    project_list = current_user.collab_projects
    project_summaries = []
    for project in project_list:
        project_summaries.append({'name': project.name, 'description': project.description, 'url': project.url, 'last_activity': project.last_activity,
        'since_last_login': Bugs.query.filter_by(project = project.id).filter_by(status = "PENDING").filter(Bugs.report_date > current_user.last_login).count(), 
        'resolved': Bugs.query.filter_by(project = project.id).filter_by(status = "RESOLVED").count(), 
        'unresolved': Bugs.query.filter_by(project = project.id).filter_by(status = "PENDING").count()})
    
    def get_dates(p):
        return p['last_activity']

    project_summaries.sort(key=get_dates, reverse=True)
    return render_template('user_dash.html', user = current_user, since_last_login = since_last_login, resolved = resolved, unresolved = unresolved, project_summaries = project_summaries[:5])





@users.route('/all_projects')
@login_required
def all_projects():

    page = request.args.get('page', default = 1, type = int)
    order = request.args.get('order', default = "recency")
    per_page = request.args.get('per_page', default = 5, type = int)
    
    if request.args.get('order'):
        if request.args.get('order') == "alphabetical":
            all_projects = current_user.collab_projects.order_by(Projects.name.asc()).paginate(page, per_page, False)
        elif request.args.get('order') == "recency":
            all_projects = current_user.collab_projects.order_by(Projects.last_activity.asc()).paginate(page, per_page, False)
        elif request.args.get('order') == "creation":
            all_projects = current_user.collab_projects.order_by(Projects.id.asc()).paginate(page, per_page, False)
    else:
        all_projects = current_user.collab_projects.order_by(Projects.id.desc()).paginate(page, per_page, False)
    
    result_count = current_user.collab_projects.order_by(Projects.id.desc()).count()

    next_url = url_for('users.all_projects', page = all_projects.next_num) if all_projects.has_next else None
    prev_url = url_for('users.all_projects', page = all_projects.prev_num) if all_projects.has_prev else None



    return render_template('all_projects.html', user = current_user, projects = all_projects, prev_url = prev_url, next_url = next_url)






@users.route('/login', methods=['post', 'get'])
def login():
    form = login_form()
    if form.validate_on_submit():
        this_user = Users.query.filter_by(email = form.email.data.lower()).first()
        if this_user is not None and this_user.check_password(form.password.data):
            login_user(this_user)
            this_user.last_login = dt.datetime.now()
            db.session.commit()
            flash(f'Welcome back, {this_user.display_name}')
            next = request.args.get('next')
            if next == None or not next[0]=='/':
                next = url_for('users.dashboard')
            return redirect(next)
        else:
            flash('You have provided a wrong email or password.')
            return redirect(url_for('users.login'))
    return render_template('login.html', form = form)






@users.route('/logout')
@login_required
def logout():
    logout_user()
    flash('Logged out.')
    return redirect(url_for('core.index'))





@users.route('/register', methods=['post', 'get'])
def register():
    if current_user.is_authenticated:
        return redirect(url_for('users.dashboard'))
    form = registration_form()
    if form.validate_on_submit():
        new_user = Users(form.email.data, form.password.data, form.name.data, form.bio.data)
        db.session.add(new_user)
        db.session.commit()
        login_user(new_user)
        flash(f"Welcome, {new_user.display_name}!")
        return redirect(url_for('projects.create'))
    else:
        for field, error in form.errors.items():
            flash('{} ({} error)'.format(error[0], field))
    return render_template('register.html', form = form)






@users.route('/search', methods=['get'])
@login_required
def search():
    if request.args.get('search_term'):
        results = Projects.query.filter(Projects.name.like(f"%{request.args.get('search_term')}%"))
    else:
        results = None
    
    return render_template('search.html', results = results)






@users.route('/preferences', methods=['get', 'post'])
@login_required
def preferences():
    form = change_preferences_form(obj = current_user)
    if form.validate_on_submit():
        current_user.display_name = form.display_name.data
        current_user.bio = form.bio.data
        if current_user.email != form.email.data:
            check_email = Users.query.filter_by(email = form.email.data).first()
            if check_email is not None:
                flash("Oops, this email address is already taken.")
                return redirect(url_for('users.preferences'))
            else:
                current_user.email = form.email.data
        db.session.commit()
        flash('Your account information has been changed!')
        return redirect(url_for('users.preferences'))
    else:
        for field, error in form.errors.items():
            flash(f'{error[0]}')
    return render_template('preferences.html', form = form)





@users.route('/settings', methods=['get', 'post'])
@login_required
def settings():
    form = change_password_form()
    if form.validate_on_submit():
        if current_user.check_password(form.current_password.data):
            current_user.password = generate_password_hash(form.new_password.data)
            db.session.commit()
            flash('Your password has been changed!')
            return redirect(url_for('users.settings'))
        else:
            flash('Your current password is incorrect.')
            return redirect(url_for('users.settings'))
    return render_template('user_settings.html', form = form)