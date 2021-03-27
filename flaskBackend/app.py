from bson import ObjectId
from flask import Flask, redirect, url_for, request
from flask_pymongo import PyMongo
from flask_cors import CORS
from json import dumps
from bson.objectid import ObjectId
from collections import defaultdict

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

@app.route('/subscribe',methods=['POST'])
def subscribe():
    req_data = request.get_json(force=True)
    print("Subscription req",req_data)
    # idToBeDeleted = request.form['id']

    # print("delete id",idToBeDeleted)
    exersizeCursor = mongo.db.Exersize
    exersizeCursor.update({"_id": ObjectId(req_data['id'])},{
                            '$push': {
                                'userIdsToExersizesSubscribed': req_data['email']
                            }
    }
    );

    return "Added"


@app.route('/getSubscribeByEmail',methods=['GET'])
def getSubscribeByEmail():

    userEmail = request.args.get('email')
    print("User",userEmail)
    exersizeCursor = mongo.db.Exersize

    response = list()

    for docs in exersizeCursor.find():
        print(docs['userIdsToExersizesSubscribed'])
        if userEmail in docs['userIdsToExersizesSubscribed']:
            docs['_id'] = str(docs['_id'])
            response.append(docs)

    return dumps(response)


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

@app.route('/getStatsByEmail',methods=['GET'])
def getStatsByEmail():

    creatorEmail = request.args.get('email')
    exersizeCursor = mongo.db.Exersize.find({"email": creatorEmail})
    response=defaultdict(int)

    total = 0

    for elements in exersizeCursor:
        elements['_id'] = str(elements['_id'])
        response['countWorkouts']+=1
        for users in elements['userIdsToExersizesSubscribed']:
            total+=1

    response['totalUsers'] = total
    response['averageUsers'] = response['totalUsers']/response['countWorkouts']

    return dumps(response)

if __name__ == '__main__':
    app.run(debug=True)
