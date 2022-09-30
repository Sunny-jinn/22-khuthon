from flask import Blueprint, request, Response, json
from pymongo import MongoClient
sugang_page=Blueprint('sugang',__name__)
uri = "mongodb+srv://Eeap:kdg97811!!@cluster0.7wqntxo.mongodb.net/?retryWrites=true&w=majority"
client = MongoClient(uri)
db = client.sugang
from bson.json_util import dumps

@sugang_page.route('/<prof>',methods=['GET'])
def sugang_data(prof):
    sugang_list = db.Sugang.find({"prof":prof})
    if sugang_list:
        resultJson=dumps(sugang_list,ensure_ascii=False)
        return Response(resultJson,mimetype="application/json",status=200)
    resultJson = dumps({"message": "not data"})
    return Response(resultJson,mimetype="application/json",status=401)


@sugang_page.route('/sub/<user_id>/<sugang_id>',methods=['POST'])
def sub_sugang(sugang_id,user_id):
    user = db.User.find({"user_id":user_id})
    sugang = db.Sugang.find({"sugang_id": sugang_id})
    user_json = dumps(user,ensure_ascii=False)
    sugang_json = dumps(sugang, ensure_ascii=False)
    sugang_data=json.loads(sugang_json)
    user_data=json.loads(user_json)
    cnt=sugang_data[0]['cnt']
    if cnt > 0:
        lists = user_data[0]['sugang_list']
        lists.append(sugang_data[0])
        db.User.update_one({"user_id":user_id},{"$set":{"sugang_list":lists}})
        db.Sugang.update_one({"sugang_id":sugang_id},{"$set":{'cnt':cnt-1}})
        resultJson = dumps({"message": "수강신청 완료"})
        return Response(resultJson,mimetype="application/json",status=200)
    else:
        resultJson = dumps({"message": "수강신청 실패"})
        return Response(resultJson, mimetype="application/json", status=200)

