from flask import render_template, Blueprint, redirect, url_for, flash, request
from application.projects.forms import project_form, location_and_type_form

projects = Blueprint('projects', __name__, template_folder = 'templates/projects')

@projects.route('/<string:project_name>')
def dashboard(project_name):
    return render_template('dashboard.html')






@projects.route('/<string:project_name>/location_and_type')
def location_and_type(project_name):
    form = location_and_type_form()
    return render_template('location_and_type.html', form = form)





@projects.route('/<string:project_name>/edit')
def edit(project_name):
    return render_template('dashboard.html')






@projects.route('/<string:project_name>/delete')
def delete(project_name):
    return render_template('dashboard.html')






@projects.route('/<string:project_name>/blog')
def blog(project_name):
    return render_template('dashboard.html')





@projects.route('/<string:project_name>/blog/new_post')
def new_post(project_name):
    return render_template('dashboard.html')






@projects.route('/<string:project_name>/blog/edit_post')
def edit_post(project_name):
    return render_template('dashboard.html')






@projects.route('/create')
def create():
    form = project_form()
    return render_template('create.html', form = form)

