# from pymongo import MongoClient
# from flask_mongoengine import MongoEngine
# from mongoengine import StringField,ListField,IntField
# from ..app import app
# database_name = "sugang"
# uri = "mongodb+srv://Eeap:kdg97811!!@cluster0.7wqntxo.mongodb.net/?retryWrites=true&w=majority".format(database_name) # 몽고db커넥트url 넣으면 되요
# app.config["MONGODB_HOST"] = uri
# client = MongoClient(uri)
# db = MongoEngine()
# db.init_app(app)
# class User(db.Document):
#   # objectid(고유번호) = auto_create or insert
#   name = StringField()
#   user_id = StringField()
#   password = StringField()
#   sugang_list = ListField()
#   def to_json(self):
#     return {"name": self.name,
#     "password": self.password,
#     "user_id": self.user_id,
#     "sugang_list":self.sugang_list
#     }
# class Sugang(db.Document):
#   sugang_id = StringField()
#   title = StringField()
#   prof = StringField()
#   cnt = IntField()
#   def to_json(self):
#     return {
#       "sugang_id":self.sugang_id,
#       "title": self.title,
#       "prof": self.prof,
#       "cnt":self.cnt
#     }