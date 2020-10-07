from flask import render_template, Blueprint, redirect, url_for, flash, request, jsonify, make_response, get_template_attribute
from application.projects.forms import project_form, location_and_type_form, blog_post_form, settings_form, report_form, collaborate_form, manage_card_form
from application.models import Users, Projects, Project_settings, Project_bug_locations, Project_bug_types, Blog_posts, Bugs
from flask_login import login_required, current_user
from application import db

projects = Blueprint('projects', __name__, template_folder = 'templates/projects')

@projects.route('/view/<string:project_url>')
@login_required
def dashboard(project_url):
    target_project = Projects.query.filter_by(url = project_url).first()

    # STATS
    since_last_login = Bugs.query.filter_by(project = target_project.id).filter(Bugs.report_date > current_user.last_login).filter_by(status = "PENDING").count()
    resolved = Bugs.query.filter_by(project = target_project.id).filter_by(status = "RESOLVED").count()
    unresolved = Bugs.query.filter_by(project = target_project.id).filter_by(status = "PENDING").count()

    new_reports = Bugs.query.filter_by(project = target_project.id).filter(Bugs.report_date > current_user.last_login).filter_by(status = "PENDING")

    if target_project == None:
        flash("Sorry, the Bug Diary you were trying to access could not be found. It might have expired or you might have entered a typo.")
        return redirect(url_for('users.dashboard'))
    return render_template('dashboard.html', project = target_project, since_last_login = since_last_login, resolved = resolved, unresolved = unresolved, new_reports = new_reports if since_last_login != 0 else None)






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
    return render_template('location_and_type.html', form_type = form_type, bug_locations = location_list, bug_types = type_list, url = project_url, title = target_project.name, project = target_project)





@projects.route('/edit/<string:project_url>', methods=['post', 'get'])
@login_required
def edit(project_url):
    return render_template('dashboard.html')





@projects.route('/report/<string:project_url>', methods=['get', 'post'])
def report(project_url):
    target_project = Projects.query.filter_by(url = project_url).first()

    location_list = []
    for location in target_project.locations:
        location_list.append((location.location, location.location))
    if len(location_list) == 0:
        location_list.append(("none", "None"))

    type_list = []
    for bug_type in target_project.types:
        type_list.append((bug_type.bug_type, bug_type.bug_type))
    if len(type_list) == 0:
        type_list.append(("none", "None"))
    
    if target_project.settings.allow_suggestions == 0:
        form_type = "select"
        from wtforms import SelectField
        report_form.bug_type = SelectField("Bug Type", choices = type_list)
        report_form.bug_location = SelectField("Bug Location", choices = location_list)
        form = report_form()
    else:
        form_type = "suggest"
        from wtforms import StringField
        report_form.bug_type = StringField('Bug Type')
        report_form.bug_location = StringField('Bug Location')
        form = report_form()
    
    if form.validate_on_submit():
        new_bug = Bugs(form.details.data, form.author.data, form.author_email.data, "PENDING", target_project.settings.current_version, target_project.id, form.bug_location.data, form.bug_type.data, Bugs.generate_id(target_project.id))
        db.session.add(new_bug)
        target_project.refresh_last_activity()
        db.session.commit()
        flash('Thank you for reporting this bug, your report has been submitted!')
        # if target_project.settings.ext_url != "":
        #     return redirect('http://' + target_project.settings.ext_url)
        # else:
        #     return redirect(url_for('projects.report', project_url = project_url))
        return redirect(url_for('projects.report', project_url = project_url))
    else:
        for field, error in form.errors.items():
            flash('{} ({} error)'.format(error[0], field))

    return render_template('report.html', form = form, form_type = form_type, project = target_project, bug_locations = location_list, bug_types = type_list)






@projects.route('/blog/<string:project_url>')
def blog(project_url):
    target_project = Projects.query.filter_by(url = project_url).first()

    if current_user.is_authenticated and (current_user in target_project.collaborators):
        blog_posts = Blog_posts.query.filter_by(project = target_project.id).order_by(Blog_posts.id.desc())
    else:
        blog_posts = Blog_posts.query.filter_by(project = target_project.id).filter_by(visibility = 1).order_by(Blog_posts.id.desc())
    
    
    return render_template('blog.html', blog_posts = blog_posts if blog_posts.count() != 0 else None, project = target_project)





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
        new_project.collaborators.append(current_user)
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
        target_project.settings.ext_url = form.ext_url.data
        target_project.settings.allow_suggestions = form.allow_suggestions.data
        target_project.settings.header_color = form.header_color.data
        target_project.settings.background_color = form.background_color.data
        target_project.settings.header_text_color = form.header_text_color.data
        target_project.settings.card_color = form.card_color.data
        target_project.settings.aside_color = form.aside_color.data
        target_project.settings.text_color = form.text_color.data
        target_project.settings.link_color = form.link_color.data
        target_project.settings.menu_color = form.menu_color.data
        db.session.commit()
        flash('Your settings have been updated!')
        return redirect(url_for('projects.settings', project_url = project_url))
    return render_template('settings.html', form = form, project = target_project)





@projects.route('/collaborators/<string:project_url>', methods = ['post', 'get'])
@login_required
def collaborators(project_url):
    target_project = Projects.query.filter_by(url = project_url).first()
    if target_project is None:
        return redirect(url_for('users.dashboard'))
    form = collaborate_form()
    if form.validate_on_submit():
        target_user = Users.query.filter_by(email = form.email.data).first()
        if target_user is None:
            flash('No user with this email address exists.')
            return redirect(url_for('projects.collaborators', project_url = target_project.url))
        elif target_user in target_project.collaborators:
            flash("That user is already registered as a collaborator on this project.")
            return redirect(url_for('projects.collaborators', project_url = target_project.url))
        else: 
            target_project.collaborators.append(target_user)
            db.session.commit()
            flash(f'The target user ({target_user.display_name}) has been added')
            return redirect(url_for('projects.collaborators', project_url = target_project.url))
    return render_template('collaborate.html', form = form, project = target_project)






@projects.route('/delete/<string:project_url>', methods = ['get','post'])
@login_required
def delete(project_url):
    target_project = Projects.query.filter_by(url = project_url).first()
    if current_user.id == target_project.owner:
        db.session.delete(target_project)
        db.session.commit()
        flash(f'Your Bug Diary for "{target_project.name}" has been deleted.')
        return redirect(url_for('users.dashboard'))
    else:
        flash('Only the owner of this Bug Diary can delete it.')
        return redirect(url_for('users.dashboard'))






@projects.route('/view_<string:view_type>/<string:project_url>', methods = ['get', 'post'])
@login_required
def view_bugs(view_type, project_url):
    target_project = Projects.query.filter_by(url = project_url).first()

    form = manage_card_form()

    all_bugs = Bugs.query.filter_by(project = target_project.id)

    if request.args.get('searchtype') and request.args.get('searchterm'):
        if request.args.get('searchtype') == "version":
            all_bugs = all_bugs.filter(Bugs.version.like(request.args.get('searchterm')))
        elif request.args.get('searchtype') == "location":
            all_bugs = all_bugs.filter(Bugs.bug_location.like(request.args.get('searchterm')))
        elif request.args.get('searchtype') == "type": 
            all_bugs = all_bugs.filter(Bugs.bug_type.like(request.args.get('searchterm')))
    
    if not request.args.get('showResolved') and not request.args.get('showDeleted'):
        all_bugs = all_bugs.filter(Bugs.status == "PENDING")
    elif request.args.get('showResolved') and not request.args.get('showDeleted'):
        all_bugs = all_bugs.filter((Bugs.status == "PENDING") | (Bugs.status == "RESOLVED"))
    elif not request.args.get('showResolved') and request.args.get('showDeleted'):
        all_bugs = all_bugs.filter((Bugs.status == "PENDING") | (Bugs.status == "DELETED"))


    if view_type == "tables":
        return render_template('view_tables.html', project = target_project, bug_list = all_bugs if all_bugs.count() != 0 else None, form = form)
    elif view_type == "cards":
        return render_template('view_cards.html', project = target_project, bug_list = all_bugs if all_bugs.count() != 0 else None, form = form)





@projects.route('/manage_card', methods = ['post'])
@login_required
def manage_card():
    received = request.get_json()
    target_bug = Bugs.query.get(received['card'])

    if target_bug.containing_project not in current_user.collab_projects:
        flash("Sorry, the bug you were trying to edit does not belong to a project managed by you.")
        return redirect(url_for('core.index'))

    if received['action'] == "delete":
        if target_bug.status != "DELETED":
            target_bug.status = "DELETED"
        else:
            target_bug.status = "PENDING"
        db.session.commit()
    elif received['action'] == "pin":
        if target_bug.status != "PINNED":
            target_bug.status = "PINNED"
        else:
            target_bug.status = "PENDING"
        db.session.commit()
    elif received['action'] == "resolve":
        if target_bug.status != "RESOLVED":
            target_bug.status = "RESOLVED"
        else: 
            target_bug.status = "PENDING"
        db.session.commit()
    

    if received['format'] == "card":
        bugcard = get_template_attribute('macros.html', 'bugcard')
        resp = make_response(jsonify({'result': bugcard(target_bug, True)}),200)
        return resp
    elif received['format'] == "table":
        bugrow = get_template_attribute('macros.html', 'bug_row')
        resp = make_response(jsonify({'result': bugrow(target_bug, True)}), 200)
        return resp


@projects.route('/memo', methods = ['post'])
@login_required
def memo():
    received = request.get_json()
    print(received)
    target_project = Projects.query.get(received['project'])

    target_project.memo = received['content']
    db.session.commit()
    
    resp = make_response(jsonify({'result': target_project.memo}), 200)
    return resp




