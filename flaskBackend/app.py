from flask import Flask, redirect, url_for, request
from flask_pymongo import PyMongo
from flask_cors import CORS


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


if __name__ == '__main__':
    app.run(debug=True)
