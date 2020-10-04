from application import *
from application.models import *

cu = Users.query.get(1)

projects = cu.collab_projects.filter_by(id=2).all()


tp = Projects.query.get(2)
tp.bugs


print(tp.bugs.filter_by(id=3).all())