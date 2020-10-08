from application import db, login_manager
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
import datetime as dt
import shortuuid

@login_manager.user_loader
def load_user(user_id):
    return Users.query.get(user_id)



users_to_projects = db.Table(
    'users_to_projects',
    db.Column('user_id', db.Integer, db.ForeignKey('users.id')),
    db.Column('proj_id', db.Integer, db.ForeignKey('projects.id')),
)


class Users(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key = True, nullable = False)
    display_name = db.Column(db.String(200), nullable = False)
    email = db.Column(db.String(200), index = True, unique = True, nullable = False)
    password = db.Column(db.String(200), nullable = False)
    bio = db.Column(db.Text, nullable = False)
    last_login = db.Column(db.DateTime, nullable = False)
    account_type = db.Column(db.Integer, db.ForeignKey('account_types.id'), default = 1)

    # AS PARENT
    owned_projects = db.relationship('Projects', backref="project_owner")
    bug_comments = db.relationship('Bug_comments', backref="comment_author")
    blog_posts = db.relationship('Blog_posts', backref="post_author")
    collab_projects = db.relationship('Projects', secondary = users_to_projects, backref = db.backref("collaborators", lazy = 'dynamic'), lazy='dynamic')
    blog_comments = db.relationship('Blog_comments', backref="blog_comment_author")

    def __init__(self, email, password, display_name, bio):
        self.email = email
        self.password = generate_password_hash(password)
        self.display_name = display_name
        self.bio = bio
        self.last_login = dt.datetime.now()

    def check_password(self, password):
        return check_password_hash(self.password, password)


class Account_types(db.Model):
    id = db.Column(db.Integer, primary_key = True, nullable = False)
    name = db.Column(db.String(30), nullable = False)
    description = db.Column(db.Text, nullable = False)

    def __init__(self, name, description):
        self.name = name
        self.description = description



class Projects(db.Model):
    id  = db.Column(db.Integer, primary_key = True, nullable = False)
    url = db.Column(db.String(22), index = True, unique = True, nullable = False)
    name = db.Column(db.String(100), nullable = False)
    description = db.Column(db.Text, nullable = False)
    creation_date = db.Column(db.DateTime, index = True, nullable = False)
    expiry_date = db.Column(db.DateTime, index = True, nullable = False)
    status = db.Column(db.String(10), nullable = False)
    access_code = db.Column(db.String(50), nullable = True)
    last_activity = db.Column(db.DateTime(), default = dt.datetime.now())
    memo = db.Column(db.String(500), default = "Post a memo here!")
    # AS CHILD
    owner = db.Column(db.Integer, db.ForeignKey('users.id')) #linked
    # AS PARENT
    bugs = db.relationship('Bugs', backref = 'containing_project', cascade = "all,delete")
    locations = db.relationship('Project_bug_locations', backref = 'locations_in', cascade = "all,delete")
    types = db.relationship('Project_bug_types', backref = 'types_in', cascade = "all,delete")
    settings = db.relationship('Project_settings', backref = 'settings_for', cascade = "all,delete", uselist = False)
    blog_posts = db.relationship('Blog_posts', backref= 'post_target', cascade = "all,delete")

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
    
    def refresh_last_activity(self):
        self.last_activity = dt.datetime.now()






class Project_settings(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    ext_url = db.Column(db.String(100), default="")
    current_version = db.Column(db.String(20), index = True, default="v1")
    
    # CUSTOMIZATION
    header_color = db.Column(db.String(7), default="#cf6b6e")
    header_text_color = db.Column(db.String(7), default="#ffffff")
    background_color = db.Column(db.String(7), default="#f0f0f0")
    card_color = db.Column(db.String(7), default="#ffffff")
    aside_color = db.Column(db.String(7), default="#cacaca")
    text_color = db.Column(db.String(7), default="#000000")
    link_color = db.Column(db.String(7), default="#ff3939")
    menu_color = db.Column(db.String(7), default="#a72c30")

    # PREFERENCES
    per_page = db.Column(db.Integer, default=10)
    visibility = db.Column(db.Integer, default=1)
    allow_suggestions = db.Column(db.Integer, default=0)
    guest_view = db.Column(db.Integer, default=0)
    
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

    def __init__(self, project, location):
        self.project = project
        self.location = location

class Project_bug_types(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    project = db.Column(db.Integer, db.ForeignKey('projects.id')) # no link required, never need to backref
    bug_type = db.Column(db.String(50))

    def __init__(self, project, bug_type):
        self.bug_type = bug_type
        self.project = project





class Bugs(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    ref_id = db.Column(db.Integer)
    details = db.Column(db.Text)
    author = db.Column(db.String(100))
    author_email = db.Column(db.String(100))
    status = db.Column(db.String(20))
    version = db.Column(db.String(20), index = True)
    report_date = db.Column(db.DateTime, index = True, default = dt.datetime.now())
    resolve_date = db.Column(db.DateTime, default = None)
    bug_location = db.Column(db.String(100), index = True)
    bug_type = db.Column(db.String(100), index = True)
    
    # AS CHILD
    project = db.Column(db.Integer, db.ForeignKey('projects.id')) #linked
    # AS PARENT
    comments = db.relationship('Bug_comments', backref = "comment_target")

    def __init__(self, details, author, author_email, status, version, project, bug_location, bug_type, ref_id):
        self.ref_id = ref_id
        self.details = details
        self.author = author
        self.author_email = author_email
        self.status = status
        self.version = version
        self.project = project
        self.bug_location = bug_location
        self.bug_type = bug_type
    
    def generate_id(project_id):
        target = db.session.query(Bugs.ref_id).filter_by(project = project_id).order_by(Bugs.ref_id.desc()).first()
        if target == None:
            return 1
        else:
            return target[0] + 1





class Bug_comments(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    content = db.Column(db.Text)
    date = db.Column(db.DateTime)
    # AS CHILD
    bug = db.Column(db.Integer, db.ForeignKey('bugs.id')) #linked
    author = db.Column(db.Integer, db.ForeignKey('users.id')) #linked





class Blog_posts(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    permalink = db.Column(db.String(22), index = True, unique = True, nullable = False)
    date = db.Column(db.DateTime, default = dt.datetime.now())
    title = db.Column(db.String(100), nullable = False)
    content = db.Column(db.Text, nullable = False)
    visibility = db.Column(db.Integer, nullable = False, default = 0)
    pinned = db.Column(db.Integer, nullable = False, default = 0)
    # tags = db.relationship('Blog_tags', backref = "tagged_posts")
    # AS CHILD
    project = db.Column(db.Integer, db.ForeignKey('projects.id'), index = True, nullable = False) #linked
    author = db.Column(db.Integer, db.ForeignKey('users.id'), index = True, nullable = False) #linked

    # AS PARENT
    comments = db.relationship('Blog_comments', backref = "attached_post") 

    def __init__(self, title, content, visibility, project, author, pinned):
        self.permalink = shortuuid.uuid()
        self.title = title
        self.content = content
        self.visibility = visibility
        self.project = project
        self.author = author
        self.pinned = pinned





class Blog_comments(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    date = db.Column(db.DateTime, default = dt.datetime.now())
    content = db.Column(db.Text)
    # AS CHILD
    author = db.Column(db.Integer, db.ForeignKey('users.id'), index = True, nullable = False) #linked
    post_id = db.Column(db.Integer, db.ForeignKey('blog_posts.id'), index = True, nullable = False) #linked

    def __init__(self, content, author, post_id):
        self.content = content
        self.author = author
        self.post_id = post_id
