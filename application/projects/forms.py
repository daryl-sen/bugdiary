from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, TextAreaField, SelectField, PasswordField, BooleanField, HiddenField, IntegerField, FieldList
from wtforms.validators import DataRequired, Length, ValidationError, EqualTo
from wtforms_validators import AlphaNumeric, ActiveUrl, AlphaSpace
from application.models import Users


class project_form(FlaskForm):
    #project info
    name = StringField()
    description = TextAreaField()
    ext_url = StringField()
    current_version = StringField()

    #preferences
    access_code = StringField()
    per_page = IntegerField()
    visibility = BooleanField("Other users can find this BugDiary in search")
    allow_suggestions = BooleanField("Allow testers/users to suggest additional types and locations")

    create = SubmitField('Create BugDiary')
    edit = SubmitField('Edit BugDiary')





class location_and_type_form(FlaskForm):
    bug_locations = FieldList(StringField('Location'), min_entries=1)
    bug_types = FieldList(StringField('Type'), min_entries=1)





class report_form(FlaskForm):
    bug_type = StringField('Bug Type')
    bug_location = StringField('Bug Location')
    submit = SubmitField('Report')






class blog_post_form(FlaskForm):
    title = StringField()
    content = HiddenField()
    visibility = BooleanField('Available to Public?')
    submit = SubmitField('Post')





class settings_form(FlaskForm):
    current_version = StringField()
    per_page = StringField()
    visibility = BooleanField()
    allow_suggestions = BooleanField()
    ext_url = StringField()
    submit = SubmitField('Change Settings')