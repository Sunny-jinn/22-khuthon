from config import *


@app.route("/",methods=['GET'])
def hello():
    return "hello"

if __name__=='__main__':
    app.run(host = '0.0.0.0',port = 8000)


   