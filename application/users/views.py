from flask import render_template, Blueprint, redirect, url_for, flash, request

users = Blueprint('users', __name__, template_folder = 'templates/users')

@users.route('/dashboard')
def dashboard():
    return render_template('user_dash.html')






@users.route('/login')
def login():
    return render_template('login.html')






@users.route('/register')
def register():
    return render_template('register.html')
