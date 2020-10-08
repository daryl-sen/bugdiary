from application import *
from application.models import *

import datetime as dt

cu = Users.query.get(1)

print(cu.collab_projects.order_by(Projects.last_activity).all())
