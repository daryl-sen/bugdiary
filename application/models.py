from application import db, login_manager
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
import datetime as dt
import shortuuid

@login_manager.user_loader
def load_user(user_id):
    return Users.query.get(user_id)





class Users(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key = True, nullable = False)
    display_name = db.Column(db.String(200), nullable = False)
    email = db.Column(db.String(200), index = True, unique = True, nullable = False)
    password = db.Column(db.String(200), nullable = False)
    bio = db.Column(db.Text, nullable = False)
    last_login = db.Column(db.DateTime, nullable = False)

    # AS PARENT
    owned_projects = db.relationship('Projects', backref="project_owner")
    comments = db.relationship('Bug_comments', backref="comment_author")
    blog_posts = db.relationship('Blog_posts', backref="post_author")
    # collab_projects = db.relationship()

    def __init__(self, email, password, display_name, bio):
        self.email = email
        self.password = generate_password_hash(password)
        self.display_name = display_name
        self.bio = bio
        self.last_login = dt.datetime.now()

    def check_password(self, password):
        return check_password_hash(self.password, password)




class Projects(db.Model):
    id  = db.Column(db.Integer, primary_key = True, nullable = False)
    url = db.Column(db.String(22), index = True, unique = True, nullable = False)
    name = db.Column(db.String(100), nullable = False)
    description = db.Column(db.Text, nullable = False)
    creation_date = db.Column(db.DateTime, index = True, nullable = False)
    expiry_date = db.Column(db.DateTime, index = True, nullable = False)
    status = db.Column(db.String(10), nullable = False)
    access_code = db.Column(db.String(50), nullable = True)
    # AS CHILD
    owner = db.Column(db.Integer, db.ForeignKey('users.id')) #linked
    # AS PARENT
    bugs = db.relationship('Bugs', backref = 'containing_project')
    locations = db.relationship('Project_bug_locations', backref = 'locations_in')
    types = db.relationship('Project_bug_types', backref = 'types_in')
    settings = db.relationship('Project_settings', backref = 'settings_for', uselist = False)
    blog_posts = db.relationship('Blog_posts', backref= 'post_target')

    def __init__(self, name, description, access_code, owner):
        self.url = shortuuid.uuid()
        self.name = name
        self.description = description
        self.access_code = access_code
        self.owner = owner
        self.creation_date = dt.datetime.now()
        self.expiry_date = dt.datetime.now() + dt.timedelta(days=90)
        self.status = "ACTIVE"
        self.access_code = access_code
        self.owner = owner






class Project_settings(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    ext_url = db.Column(db.String(100), default="")
    current_version = db.Column(db.String(20), index = True, default="V 1.0")
    
    # CUSTOMIZATION
    header_color = db.Column(db.String(7), default="#ffffff")
    background_color = db.Column(db.String(7), default="#ffffff")
    link_color = db.Column(db.String(7), default="#ff3939")

    # PREFERENCES
    per_page = db.Column(db.Integer, default=10)
    visibility = db.Column(db.Integer, default=1)
    allow_suggestions = db.Column(db.Integer, default=0)
    
    # AS CHILD
    project = db.Column(db.Integer, db.ForeignKey('projects.id')) #linked

    def __init__(self, ext_url, current_version, per_page, visibility, allow_suggestions, project_id):
        self.ext_url = ext_url
        self.current_version = current_version
        self.per_page = per_page
        self.visibility = visibility
        self.allow_suggestions = allow_suggestions
        self.project = project_id



class Project_bug_locations(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    project = db.Column(db.Integer, db.ForeignKey('projects.id')) # no link required, never need to backref
    location = db.Column(db.String(100))
    # AS PARENT
    associated_bugs = db.relationship('Bugs', backref = "interpreted_bug_location")

    def __init__(self, project, location):
        self.project = project
        self.location = location

class Project_bug_types(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    project = db.Column(db.Integer, db.ForeignKey('projects.id')) # no link required, never need to backref
    bug_type = db.Column(db.String(50))
    # AS PARENT
    associated_bugs = db.relationship('Bugs', backref = "interpreted_bug_type")

    def __init__(self, project, bug_type):
        self.bug_type = bug_type
        self.project = project





class Bugs(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    ref_id = db.Column(db.String(100), index = True, unique = True)
    details = db.Column(db.Text)
    author = db.Column(db.String(100))
    author_email = db.Column(db.String(100))
    status = db.Column(db.String(20))
    version = db.Column(db.String(20), index = True)
    # AS CHILD
    project = db.Column(db.Integer, db.ForeignKey('projects.id')) #linked
    bug_location = db.Column(db.Integer, db.ForeignKey('project_bug_locations.id')) #linked
    bug_type = db.Column(db.Integer, db.ForeignKey('project_bug_types.id')) #linked
    # AS PARENT
    comments = db.relationship('Bug_comments', backref = "comment_target")





class Bug_comments(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    content = db.Column(db.Text)
    date = db.Column(db.DateTime)
    # AS CHILD
    bug = db.Column(db.Integer, db.ForeignKey('bugs.id')) #linked
    author = db.Column(db.Integer, db.ForeignKey('users.id')) #linked





class Blog_posts(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    date = db.Column(db.DateTime)
    title = db.Column(db.String(100))
    content = db.Column(db.Text)
    visibility = db.Column(db.Integer)
    # AS CHILD
    project = db.Column(db.Integer, db.ForeignKey('projects.id')) #linked
    author = db.Column(db.Integer, db.ForeignKey('users.id')) #linked