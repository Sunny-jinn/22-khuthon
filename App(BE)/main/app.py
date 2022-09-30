# blueprint 관리
from flask import Flask
from main.api import sugang,user
app = Flask(__name__)

app.register_blueprint(sugang.sugang_page, url_prefix='/sugang')
app.register_blueprint(user.user_page,url_prefix='/user')
app.debug = False
