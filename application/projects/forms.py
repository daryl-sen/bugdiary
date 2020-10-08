from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, TextAreaField, SelectField, PasswordField, BooleanField, HiddenField, IntegerField, FieldList
from wtforms.validators import DataRequired, Length, ValidationError, EqualTo, Email
# from wtforms_validators import AlphaNumeric, ActiveUrl, AlphaSpace
from application.models import Users


class project_form(FlaskForm):
    #project info
    name = StringField("Project name", validators=[DataRequired("Please enter a name for your project. It doesn't have to be a unique name, and you could always change it later!")])
    description = TextAreaField("Project description")
    ext_url = StringField(label="External URL", description="An external link to your project.")
    current_version = StringField("Current version name (something like 'v1')", default="v1")

    #preferences
    access_code = StringField()
    per_page = SelectField(
        label="How many bugs per page",
        choices=[
            ('10', '10'),
            ('20', '20'),
            ('30', '30'),
            ('50', '50'),
        ]
    )
    visibility = BooleanField("Other users can find this BugDiary in search")
    allow_suggestions = BooleanField("Allow testers/users to suggest additional types and locations")

    # ADMIN USE ONLY
    url = StringField("Manually set project URL.")

    create = SubmitField('Create BugDiary')
    edit = SubmitField('Edit BugDiary')





class location_and_type_form(FlaskForm):
    bug_locations = FieldList(StringField('Location'), min_entries=1)
    bug_types = FieldList(StringField('Type'), min_entries=1)





class report_form(FlaskForm):
    details = TextAreaField(label="Details about the issue", validators=[DataRequired('Please enter some details about the issue.')])
    author = StringField(label="Your name or alias (optional)")
    author_email = StringField(label="Your email address (optional)")
    submit = SubmitField('Report')






class blog_post_form(FlaskForm):
    title = StringField()
    content = HiddenField()
    visibility = BooleanField('Visible to Public?')
    pinned = BooleanField('Pin to the top')
    submit = SubmitField('Post')
    edit = SubmitField('Edit')





class settings_form(FlaskForm):
    current_version = StringField(label="Current version", validators=[DataRequired("The version number must not be blank.")])
    per_page = per_page = SelectField(
        label="How many bugs per page",
        choices=[
            ('10', '10'),
            ('20', '20'),
            ('30', '30'),
            ('50', '50'),
        ]
    )
    visibility = BooleanField(label="Make this project searchable to other users.")
    allow_suggestions = BooleanField(label="Allow users to freely enter Location and Type data.")
    ext_url = StringField(label="External link to your project.")

    header_color = StringField("Header bar color")
    header_text_color = StringField("Color of text in the header")
    background_color = StringField("Background color")
    card_color = StringField("Card color")
    aside_color = StringField("Sidebar cards color")
    text_color = StringField("Text color")
    link_color = StringField("Link color")
    menu_color = StringField("Mobile menu color")

    submit = SubmitField('Change Settings')





class collaborate_form(FlaskForm):
    email = StringField("Collaborator email address", validators=[DataRequired('Please enter an email address.'), Email("Please enter a valid email address.")])
    submit = SubmitField("Invite")





class manage_card_form(FlaskForm):
    target_card = HiddenField()
    target_action = HiddenField()
    submit = SubmitField()






# class filter_card_form(FlaskForm):
#     show_resolved = BooleanField()
#     show_deleted = BooleanField()
#     search_field = StringField()
#     search_type = SelectField()
#     submit = SubmitField()
