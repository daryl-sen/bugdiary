from flask import render_template, Blueprint, redirect, url_for, flash, request
from application.users.forms import login_form, registration_form

users = Blueprint('users', __name__, template_folder = 'templates/users')

@users.route('/dashboard')
def dashboard():
    return render_template('user_dash.html')






@users.route('/login')
def login():
    form = login_form()
    return render_template('login.html', form = form)






@users.route('/register')
def register():
    form = registration_form()
    return render_template('register.html', form = form)
