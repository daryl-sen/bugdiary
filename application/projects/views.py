from flask import render_template, Blueprint, redirect, url_for, flash, request
from application.projects.forms import project_form

projects = Blueprint('projects', __name__, template_folder = 'templates/projects')

@projects.route('/<string:project_name>')
def dashboard(project_name):
    return render_template('dashboard.html')






@projects.route('/<string:project_name>/edit')
def edit(project_name):
    return render_template('dashboard.html')






@projects.route('/<string:project_name>/delete')
def delete(project_name):
    return render_template('dashboard.html')






@projects.route('/create')
def create():
    form = project_form()
    return render_template('create.html', form = form)

