from application import db#, login_manager
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
import datetime as dt

# @login_manager.user_loader
# def load_user(user_id):
#     return Users.query.get(user_id)





class Users(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key = True)
    display_name = db.Column(db.String(200), index = True)
    email = db.Column(db.String(200), index = True, unique = True)
    password = db.Column(db.String(200))
    bio = db.Column(db.Text)

    # AS PARENT
    owned_projects = db.relationship('Projects', backref="owner")
    comments = db.relationship('Bug_comments', backref="comment_author")
    blog_posts = db.relationship('Blog_posts', backref="post_author")
    # collab_projects = db.relationship()

    def __init__(self, username, email, password):
        self.username = username
        self.email = email
        self.password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)




class Projects(db.Model):
    id  = db.Column(db.Integer, primary_key = True)
    url = db.Column(db.String(100), index = True)
    name = db.Column(db.String(100))
    description = db.Column(db.Text)
    creation_date = db.Column(db.DateTime, index = True)
    expiry_date = db.Column(db.DateTime, index = True)
    status = db.Column(db.String(10))
    access_code = db.Column(db.String(50))
    # AS CHILD
    owner = db.Column(db.Integer, db.ForeignKey('users.id')) #linked
    # AS PARENT
    bugs = db.relationship('Bugs', backref = 'containing_project')
    settings = db.relationship('Project_settings', backref = 'settings_for', uselist = False)
    blog_posts = db.relationship('Blog_posts', backref= 'post_target')






class Project_settings(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    index = db.Column(db.String(20))
    value = db.Column(db.String(20))
    # AS CHILD
    project = db.Column(db.Integer, db.ForeignKey('projects.id')) #linked

class Project_bug_locations(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    project = db.Column(db.Integer, db.ForeignKey('projects.id')) # no link required, never need to backref
    location = db.Column(db.String(100))
    # AS PARENT
    associated_bugs = db.relationship('Bugs', backref = "interpreted_bug_location")

class Project_bug_types(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    project = db.Column(db.Integer, db.ForeignKey('projects.id')) # no link required, never need to backref
    bug_type = db.Column(db.String(50))
    # AS PARENT
    associated_bugs = db.relationship('Bugs', backref = "interpreted_bug_type")





class Bugs(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    ref_id = db.Column(db.String(100), index = True)
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