from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, TextAreaField, SelectField, PasswordField, BooleanField, HiddenField, IntegerField
from wtforms.validators import DataRequired, Length, ValidationError, EqualTo, Email
# from wtforms_validators import AlphaNumeric, ActiveUrl, AlphaSpace
from application.models import Users



class login_form(FlaskForm):
    email = StringField(label="Email address", validators=[DataRequired("Your username is required for login.")])
    password = PasswordField(label="Password", validators=[DataRequired("Your password is required for login.")])
    submit = SubmitField("Log In")




class registration_form(FlaskForm):
    email = StringField(label="Email address", validators=[DataRequired("Your username is required for login."), Email("Please provide a valid email address")])
    password = PasswordField('Password', validators = [DataRequired("You can't leave your password blank, how will you log in?"), Length(min = 8, max = 50, message="Your password must be between 8-50 characters."), EqualTo('cfm_password', message = "The passwords entered below must match. Let's not get you locked out of your account for a typo!")])
    cfm_password = PasswordField('Confirm Password', validators = [DataRequired('You must confirm your password below. Sometimes people make a typo and get locked out of their account.')])
    name = StringField(label="Display name", validators=[DataRequired("Please let us know how to address you by entering your name.")])
    bio = TextAreaField("A little about yourself")
    tos = BooleanField("I have read and agree to the terms of service and privacy policy.", validators=[DataRequired("Sorry, you cannot use BugDiary if you disagree with the terms of use.")])
    submit = SubmitField("Sign Up")

    def validate_email(self, field):
        if Users.query.filter_by(email=field.data).first() is not None:
            raise ValidationError("Oops, this email address is already in use. Perhaps you already have an account.")





class change_password_form(FlaskForm):
    current_password = PasswordField("Current Password", validators=[DataRequired("Please enter your current password")])
    new_password = PasswordField('New Password', validators = [DataRequired("You can't leave your password blank, how will you log in?"), Length(min = 8, max = 50, message="Your password must be between 8-50 characters"), EqualTo('cfm_password', message = "The passwords entered below must match. Let's not get you locked out of your account for a typo!")])
    cfm_password = PasswordField('Confirm New Password', validators = [DataRequired('You must confirm your password below. Sometimes people make a typo and get locked out of their account.')])
    change = SubmitField("Change Password")





class change_preferences_form(FlaskForm):
    display_name = StringField("Display name", validators=[DataRequired("Your display name cannot be blank. (You don't have to use your real name!)")])
    email = StringField("Email address", validators=[DataRequired("Your email address cannot be blank. Your email will be used for logging in, and for resetting your password if you ever forget it."), Email("Please enter a valid email address.")])
    bio = TextAreaField("About yourself")
    change = SubmitField("Update preferences")