from flask import Blueprint, request, Response, json
from pymongo import MongoClient
user_page=Blueprint('user',__name__)
uri = "mongodb+srv://Eeap:kdg97811!!@cluster0.7wqntxo.mongodb.net/?retryWrites=true&w=majority"
client = MongoClient(uri)
db = client.sugang
from bson.json_util import dumps

@user_page.route('/<user_id>',methods=['GET'])
def user_get(user_id):
    user0 = db.User.find({'user_id':user_id})
    user_json = dumps(user0,ensure_ascii=False)
    user_data=json.loads(user_json)
    if user_data:
        resultJson=json.dumps(user_data[0]['sugang_list'],ensure_ascii=False)
        return Response(resultJson,mimetype="application/json",status=200)
    return Response({"message":"not user"},mimetype="application/json",status=401)
