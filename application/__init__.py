from flask import Flask
import application.secrets as secrets
import os
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_login import LoginManager

app = Flask(__name__)

basedir = os.path.abspath(os.path.dirname(__file__))

app.config['SECRET_KEY'] = secrets.secret_key
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'data.sqlite')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
Migrate(app,db)

# login_manager = LoginManager()
# login_manager.init_app(app)
# login_manager.login_view = 'users.login'

from application.core.views import core
app.register_blueprint(core, url_prefix="/")

from application.projects.views import projects
app.register_blueprint(projects, url_prefix="/projects")

from application.users.views import users
app.register_blueprint(users, url_prefix="/users")
