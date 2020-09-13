from application import db#, login_manager
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
import datetime as dt

# @login_manager.user_loader
# def load_user(user_id):
#     return Users.query.get(user_id)





class Users(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key = True)
    username = db.Column(db.String(200), index = True, unique = True)
    email = db.Column(db.String(200), index = True)
    password = db.Column(db.String(200))

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
    owner = db.Column(db.Integer)
    creation_date = db.Column(db.DateTime, index = True)
    expiry_date = db.Column(db.DateTime, index = True)
    status = db.Column(db.String(10))
    access_code = db.Column(db.String(50))

class Project_collaborators(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    project = db.Column(db.Integer, db.ForeignKey('projects.id'))
    user = db.Column(db.Integer, db.ForeignKey('users.id'))
    role = db.Column(db.String(10))

class Project_settings(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    project = db.Column(db.Integer, db.ForeignKey('projects.id'))
    index = db.Column(db.String(20))
    value = db.Column(db.String(20))

class Project_bug_locations(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    project = db.Column(db.Integer, db.ForeignKey('projects.id'))
    location = db.Column(db.String(100))

class Project_bug_types(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    project = db.Column(db.Integer, db.ForeignKey('projects.id'))
    bug_type = db.Column(db.String(50))





class Bugs(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    ref_id = db.Column(db.String(100), index = True)
    project = db.Column(db.String(100), index = True)
    location = db.Column(db.Integer, db.ForeignKey('project_bug_locations.id'))
    bug_type = db.Column(db.Integer, db.ForeignKey('project_bug_types.id'))
    details = db.Column(db.Text)
    author = db.Column(db.String(100))
    author_email = db.Column(db.String(100))
    status = db.Column(db.String(20))
    version = db.Column(db.String(20))






class Bug_comments(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    bug = db.Column(db.Integer, db.ForeignKey('bugs.id'))
    content = db.Column(db.Text)
    author = db.Column(db.Integer, db.ForeignKey('users.id')) # Registered users only, preferrably collaborators
    date = db.Column(db.DateTime)





class Blog_posts(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    project = db.Column(db.Integer, db.ForeignKey('projects.id'))
    author = db.Column(db.Integer, db.ForeignKey('users.id'))
    date = db.Column(db.DateTime)
    title = db.Column(db.String(100))
    content = db.Column(db.Text)
    visibility = db.Column(db.Integer)