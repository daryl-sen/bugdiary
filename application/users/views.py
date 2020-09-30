from flask import render_template, Blueprint, redirect, url_for, flash, request
from application.users.forms import login_form, registration_form
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
    # since_last_login = Bugs.query.filter(Bugs.containing_project.has(Projects.id.in_([ proj.id for proj in current_user.owned_projects]))).filter_by(status = "PENDING").filter(Bugs.report_date > current_user.last_login).count()
    since_last_login = Bugs.query.filter(Bugs.containing_project in current_user.collab_projects).filter_by(status = "PENDING").filter(Bugs.report_date > current_user.last_login).count()
    resolved = Bugs.query.filter(Bugs.containing_project.has(Projects.id.in_([ proj.id for proj in current_user.owned_projects]))).filter_by(status = "RESOLVED").count()
    unresolved = Bugs.query.filter(Bugs.containing_project.has(Projects.id.in_([ proj.id for proj in current_user.owned_projects]))).filter_by(status = "PENDING").count()

    # project_summaries = Projects.query.filter_by()
    print(since_last_login)
    return render_template('user_dash.html', user = current_user, since_last_login = since_last_login, resolved = resolved, unresolved = unresolved)






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
