from flask import render_template, Blueprint, redirect, url_for, flash, request
from application.projects.forms import project_form, location_and_type_form, blog_post_form, settings_form
from application.models import Users, Projects, Project_settings, Project_bug_locations, Project_bug_types, Blog_posts
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
        form_type = "select"
    else:
        form_type = "suggest"
    
    if 'new_location' in request.form:
        new_location = Project_bug_locations(target_project.id, request.form['new_location'])
        db.session.add(new_location)
        db.session.commit()
        flash(f"Location ({request.form['new_location']}) has been added.")
        return redirect(url_for('projects.location_and_type', project_url = target_project.url))
    if 'new_type' in request.form:
        new_type = Project_bug_types(target_project.id, request.form['new_type'])
        db.session.add(new_type)
        db.session.commit()
        flash(f"Type ({request.form['new_type']}) has been added")
        return redirect(url_for('projects.location_and_type', project_url = target_project.url))
    return render_template('location_and_type.html', form_type = form_type, bug_locations = location_list, bug_types = type_list, url = project_url, title = target_project.name)





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
    target_project = Projects.query.filter_by(url = project_url).first()
    blog_posts = Blog_posts.query.filter_by(project = target_project.id)
    return render_template('blog.html', blog_posts = blog_posts, project = target_project)





@projects.route('/blog/new_post/<string:project_url>', methods=['post', 'get'])
@login_required
def new_post(project_url):
    target_project = Projects.query.filter_by(url = project_url).first()
    form = blog_post_form()
    if form.validate_on_submit():
        new_post = Blog_posts(form.title.data, form.content.data, form.visibility.data, target_project.id, current_user.id)
        db.session.add(new_post)
        db.session.commit()
        flash('Your new blog post has been added')
        return redirect(url_for('projects.blog', project_url = project_url))
    return render_template('blog_new.html', form = form, project = target_project)






@projects.route('/blog/edit_post/<string:post_url>', methods=['post', 'get'])
@login_required
def edit_post(post_url):
    target_post = Blog_posts.query.filter_by(permalink = post_url).first()
    target_project = Projects.query.get(int(target_post.project))
    form = blog_post_form(obj=target_post)
    if form.validate_on_submit():
        target_post.title = form.title.data
        target_post.content = form.content.data
        target_post.visibility = form.visibility.data
        db.session.commit()
        flash('Your blog post has been editted.')
        return redirect(url_for('projects.blog', project_url = target_project.url))
    return render_template('blog_edit.html', form = form, project = target_project)






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





@projects.route('/settings/<string:project_url>', methods = ['post', 'get'])
@login_required
def settings(project_url):
    target_project = Projects.query.filter_by(url = project_url).first()
    form = settings_form(obj = target_project.settings)
    if form.validate_on_submit():
        target_project.settings.current_version = form.current_version.data
        target_project.settings.per_page = form.per_page.data
        target_project.settings.visibility = form.visibility.data
        target_project.settings.allow_suggestions = form.allow_suggestions.data
        db.session.commit()
        flash('Your settings have been updated!')
        return redirect(url_for('projects.settings', project_url = project_url))
    return render_template('settings.html', form = form, project = target_project)
