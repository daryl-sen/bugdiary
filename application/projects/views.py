from flask import render_template, Blueprint, redirect, url_for, flash, request
from application.projects.forms import project_form, location_and_type_form
from application.models import Users, Projects, Project_settings
from flask_login import login_required, current_user
from application import db

projects = Blueprint('projects', __name__, template_folder = 'templates/projects')

@projects.route('/view/<string:project_url>')
@login_required
def dashboard(project_url):
    return render_template('dashboard.html')






@projects.route('/location_and_type/<string:project_url>', methods=['post', 'get'])
@login_required
def location_and_type(project_url):
    form = location_and_type_form()
    return render_template('location_and_type.html', form = form)





@projects.route('/edit/<string:project_url>', methods=['post', 'get'])
@login_required
def edit(project_url):
    return render_template('dashboard.html')






@projects.route('/delete/<string:project_url>')
@login_required
def delete(project_url):
    return render_template('dashboard.html')






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

