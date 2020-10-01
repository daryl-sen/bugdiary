import os
import time
from application import app
from flask import request

os.environ["TZ"] = "America/New_York"
time.tzset()

if __name__ == "__main__":
    app.run(debug = True, host='0.0.0.0')