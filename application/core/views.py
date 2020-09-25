from flask import render_template, Blueprint, redirect, url_for, flash, request
from application.models import Projects

core = Blueprint('core', __name__, template_folder = 'templates/core')

@core.route('/')
def index():
    return render_template('index.html')





@core.route('/r/<string:project_url>')
def redirect_to(project_url):
    target_project = Projects.query.filter_by(url = project_url).first()
    print(target_project)
    if target_project == None:
        flash("Sorry, a project with that ID does not exist. There might have been a typo, or the project has expired.")
        return redirect(url_for('core.index'))
    return redirect(url_for("projects.report", project_url = project_url))



@core.route('/rid/<int:project_id>')
def redirect_id(project_id):
    target_project = Projects.query.get(project_id)
    if target_project == None:
        flash("Sorry, a project with that ID does not exist. There might have been a typo, or the project has expired.")
        return redirect(url_for('core.index'))
    return redirect(url_for('projects.report', project_url = target_project.url))