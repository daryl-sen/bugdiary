from application import *
from application.models import *

cu = Users.query.get(1)

projects = cu.collab_projects.all()


print(projects)