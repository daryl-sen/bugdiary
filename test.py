from application import *
from application.models import *

import datetime as dt

# cu = Users.query.get(1)

# projects = cu.collab_projects.filter_by(id=2).all()


# tp = Projects.query.get(2)
# tp.bugs


# print(tp.bugs.filter_by(id=3).all())


p = Projects.query.get(1)

p.get_counters(dt.datetime.now())