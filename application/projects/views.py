from flask import render_template, Blueprint, redirect, url_for, flash, request
from application.projects.forms import project_form, location_and_type_form
from application.models import Users, Projects, Project_settings, Project_bug_locations, Project_bug_types
from flask_login import login_required, current_user
from application import db

projects = Blueprint('projects', __name__, template_folder = 'templates/projects')

@projects.route('/view/<string:project_url>')
@login_required
def dashboard(project_url):
    target_project = Projects.query.filter_by(url = project_url).first()
    if target_project == None:
        flash("Sorry, the Bug Diary you were trying to access could not be found. It might have expired or you might have entered a typo.")
        return redirect(url_for('users.dashboard'))
    return render_template('dashboard.html', project = target_project)






@projects.route('/location_and_type/<string:project_url>', methods=['post', 'get'])
@login_required
def location_and_type(project_url):
    target_project = Projects.query.filter_by(url = project_url).first()

    location_list = []
    for location in target_project.locations:
        location_list.append(location.location)

    type_list = []
    for bug_type in target_project.types:
        type_list.append(bug_type.bug_type)

    if target_project.settings.allow_suggestions == 0:
        form_type = "suggest"
    else:
        form_type = "select"
    
    form = location_and_type_form()

    if form.validate_on_submit:
        if 'new_location' in request.form:
            new_location = Project_bug_locations(target_project.id, request.form['new_location'])
            db.session.add(new_location)
            db.session.commit()
            flash(f"Location ({request.form['new_location']}) has been added.")
        if 'new_type' in request.form:
            new_type = Project_bug_types(target_project.id, request.form['new_type'])
            db.session.add(new_type)
            db.session.commit()
            flash(f"Type ({request.form['new_type']}) has been added")
    return render_template('location_and_type.html', form = form, form_type = form_type, bug_locations = location_list, bug_types = type_list, url = project_url, title = target_project.name)





@projects.route('/edit/<string:project_url>', methods=['post', 'get'])
@login_required
def edit(project_url):
    return render_template('dashboard.html')






@projects.route('/delete/<string:project_url>')
@login_required
def delete(project_url):
    return render_template('dashboard.html')





@projects.route('/report/<string:project_url>')
def report(project_url):
    target_project = Projects.query.filter_by(url = project_url).first()

    location_list = []
    for location in target_project.locations:
        location_list.append(location.location)

    type_list = []
    for bug_type in target_project.types:
        type_list.append(bug_type.bug_type)
    
    if target_project.settings.allow_suggestions == 0:
        form_type = "suggest"
    else:
        form_type = "select"

    return render_template('report.html', form_type = form_type, project = target_project, bug_locations = location_list, bug_types = type_list)






@projects.route('/blog/<string:project_url>')
@login_required
def blog(project_url):
    return render_template('dashboard.html')





@projects.route('/blog/new_post/<string:project_url>', methods=['post'])
@login_required
def new_post(project_url):
    return render_template('dashboard.html')






@projects.route('/blog/edit_post/<string:project_url>', methods=['post'])
@login_required
def edit_post(project_url):
    return render_template('dashboard.html')






@projects.route('/create', methods=['post', 'get'])
@login_required
def create():
    form = project_form()
    if form.validate_on_submit():
        new_project = Projects(name=form.name.data, description=form.description.data, access_code=form.access_code.data, owner=current_user.id)
        db.session.add(new_project)
        db.session.commit()
        project_settings = Project_settings(ext_url = form.ext_url.data, current_version = form.current_version.data, per_page = form.per_page.data, visibility = form.visibility.data, allow_suggestions = form.allow_suggestions.data, project_id = new_project.id)
        db.session.add(project_settings)
        db.session.commit()
        flash(f"Your new project ({new_project.name}) has been created.")
        return redirect(url_for('projects.location_and_type', project_url = new_project.url))
    return render_template('create.html', form = form)

