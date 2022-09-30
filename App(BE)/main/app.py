# blueprint 관리
from flask import Flask
from main.api import sugang
app = Flask(__name__)

app.register_blueprint(sugang.sugang_page, url_prefix='/sugang')

app.debug = False
