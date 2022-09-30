from flask import Blueprint, request, Response, json
from pymongo import MongoClient
sugang_page=Blueprint('sugang',__name__)
uri = "mongodb+srv://Eeap:kdg97811!!@cluster0.7wqntxo.mongodb.net/?retryWrites=true&w=majority"
client = MongoClient(uri)
db = client.sugang
from bson.json_util import dumps

@sugang_page.route('/',methods=['GET'])
def sugang_data():
    sugang_list = db.Sugang.find()
    if sugang_list:
        resultJson=dumps(sugang_list,ensure_ascii=False)
        return Response(resultJson,mimetype="application/json",status=200)
    resultJson = dumps({"message": "not data"})
    return Response(resultJson,mimetype="application/json",status=401)

@sugang_page.route()

@sugang_page.route('/sub/sugang_id=<sugang_id>',methods=['POST'])
def sub_sugang(sugang_id):
    sugang = db.Sugang.find({"sugang_id": sugang_id})
    sugang_json = dumps(sugang, ensure_ascii=False)
    cnt = sugang_json['cnt']
    if cnt > 0:
        db.Sugang.update_one({"sugang_id":sugang_id},{"$set":{'cnt':sugang_json['cnt']-1}})
        resultJson = dumps({"message": "수강신청 완료"})
        return Response(resultJson,mimetype="application/json",status=200)
    else:
        resultJson = dumps({"message": "수강신청 실패"})
        return Response(resultJson, mimetype="application/json", status=200)

    # sugang = database.Sugang.objects(sugang_id=sugang_id).first()
    # print(sugang,sugang_id)
    # sugang.to_json()
    # resultJson = json.dumps(sugang,ensure_ascii=False)
    # return Response(resultJson,mimetype="application/json",status=200)

    # user_id=request.values.get('user_id')
    # if user_id:
    #     user=database.User.objects(user_id=user_id).first()
    #     if user:
    #         user.to_json()
    #         resultJson=json.dumps(user, ensure_ascii=False)
    #         return Response(resultJson,mimetype="application/json",status=200)
    # resultJson=json.dumps({"message": "not login"})
    # return Response(resultJson,mimetype="application/json",status=401)

# @info_page.route('/edit',methods=['PUT'])
# def info_edit():
#     params=request.get_json()
#     user_id=request.values.get('user_id')
#     if user_id:
#         user = database.User.objects(user_id=user_id).first()
#         if user:
#             email = params['email']
#             name = params['name']
#             unit = params['unit']
#             rank = params['rank']
#             password=params['password']
#             user.update(email=email, name= name, unit=unit, rank=rank,password=password)
#             resultJson=json.dumps({"message": "edit success"})
#             return Response(resultJson,mimetype="application/json",status=200)
#     resultJson=json.dumps({"message": "not login"})
#     return Response(resultJson,mimetype="application/json",status=401)
