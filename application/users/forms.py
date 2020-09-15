from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, TextAreaField, SelectField, PasswordField, BooleanField, HiddenField, IntegerField
from wtforms.validators import DataRequired, Length, ValidationError, EqualTo
from wtforms_validators import AlphaNumeric, ActiveUrl, AlphaSpace
from application.models import Users




class login_form(FlaskForm):
    email = StringField(validators=[DataRequired("Your username is required for login.")])
    password = PasswordField(validators=[DataRequired("Your password is required for login")])
    submit = SubmitField("Log In")




class registration_form(FlaskForm):
    email = StringField(validators=[DataRequired("Your username is required for login.")])
    password = PasswordField('Password', validators = [DataRequired("You can't leave your password blank, how will you log in?"), Length(min = 8, max = 50, message="Your password must be between 8-50 characters"), EqualTo('cfm_password', message = "The passwords entered below must match. Let's not get you locked out of your account for a typo!")])
    cfm_password = PasswordField('Confirm Password', validators = [DataRequired('You must confirm your password below. Sometimes people make a typo and get locked out of their account.')])
    name = StringField(validators=[DataRequired("Please let us know how to address you")])
    bio = TextAreaField()
    tos = BooleanField("I have read and agree to the terms of service and privacy policy.")
    submit = SubmitField("Sign Up")





class change_password_form(FlaskForm):
    current_password = PasswordField("Current Password")
    new_password = PasswordField('New Password', validators = [DataRequired("You can't leave your password blank, how will you log in?"), Length(min = 8, max = 50, message="Your password must be between 8-50 characters"), EqualTo('cfm_password', message = "The passwords entered below must match. Let's not get you locked out of your account for a typo!")])
    cfm_password = PasswordField('Confirm New Password', validators = [DataRequired('You must confirm your password below. Sometimes people make a typo and get locked out of their account.')])
    change = SubmitField("Change Password")