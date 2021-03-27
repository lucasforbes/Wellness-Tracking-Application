from bson import ObjectId
from flask import Flask, redirect, url_for, request
from flask_pymongo import PyMongo
from flask_cors import CORS
from json import dumps
from bson.objectid import ObjectId

app = Flask(__name__)
CORS(app)
app.config["MONGO_URI"] = "mongodb+srv://admin:admin@bloom.wpazh.mongodb.net/bloom?authSource=admin&replicaSet=atlas-2zk8xh-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true"
mongo = PyMongo(app)

@app.route('/')
def home():
    return "Flask App running !"

@app.route('/addExersize',methods=['POST'])
def addExersize():
    req_data = request.get_json(force=True)

    req_data['userIdsToExersizesSubscribed']=list()

    exersizeCursor = mongo.db.Exersize
    exersizeCursor.insert(req_data)

    return "Yes"

@app.route('/deleteExercise',methods=['POST'])
def deleteExercise():
    req_data = request.get_json(force=True)
    print("req",req_data)
    # idToBeDeleted = request.form['id']

    # print("delete id",idToBeDeleted)
    exersizeCursor = mongo.db.Exersize
    exersizeCursor.remove({"_id": ObjectId(req_data['id'])});

    return "Deleted"

@app.route('/getAllExersize',methods=['GET'])
def getAllExersize():

    exersizeCursor = mongo.db.Exersize.find()

    response=list()
    for elements in exersizeCursor:
        elements['_id'] = str(elements['_id'])
        response.append(elements)

    return dumps(response)

@app.route('/getExersizeByEmail',methods=['GET'])
def getExersizeByEmail():

    creatorEmail = request.args.get('email')
    exersizeCursor = mongo.db.Exersize.find({"email": creatorEmail})
    response=list()
    for elements in exersizeCursor:
        elements['_id'] = str(elements['_id'])
        response.append(elements)

    return dumps(response)



if __name__ == '__main__':
    app.run(debug=True)
