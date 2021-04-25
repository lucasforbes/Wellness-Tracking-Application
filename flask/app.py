from flask import Flask, redirect, url_for, request
from flask_pymongo import PyMongo
from flask_cors import CORS
from json import dumps
from bson.objectid import ObjectId
from collections import defaultdict
import os
from flask_mail import Mail, Message
import random
import json
# from waitress import serve
# from flask import send_from_directory

import shortuuid

from werkzeug.utils import secure_filename


ALLOWED_EXTENSIONS = {'txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'}


app = Flask(__name__)

# app.config["UPLOAD_FOLDER"]= './static/images'

CORS(app)
app.config["MONGO_URI"] = #mongodb data

app.config.update(
    MAIL_SERVER='smtp.gmail.com',
    MAIL_PORT=465,
    MAIL_USE_SSL=True,
    MAIL_USERNAME = 'hunterxhunter2512@gmail.com',
    MAIL_PASSWORD = #password
    )
mail = Mail(app)

mongo = PyMongo(app)

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


@app.route('/')
def home():
    return "Flask App running !"


def checkIfEmailAlreadyExists(userEmail):
    # req_data = request.get_json(force=True)
    # msg = Message('Hello', sender='hunterxhunter2512@gmail.com', recipients=[req_data['email']])
    # userEmail = request.args.get('email')

    userDbCursor = mongo.db.User

    emailAlreadyExists = False

    for docs in userDbCursor.find():

        if docs['email'].lower() == userEmail.lower():

            emailAlreadyExists = True
            break

    creatorEmail = mongo.db.Creator

    if not emailAlreadyExists:
        for docs in creatorEmail.find():

            if docs['email'].lower() == userEmail.lower():

                emailAlreadyExists = True
                break

    adminEmail = mongo.db.Admin


    if not emailAlreadyExists:
        for docs in adminEmail.find():

            if docs['email'].lower() == userEmail.lower():
                emailAlreadyExists = True
                break

    return emailAlreadyExists

@app.route('/sendEmail',methods=['GET'])
def hello_world():
    # req_data = request.get_json(force=True)
    # msg = Message('Hello', sender='hunterxhunter2512@gmail.com', recipients=[req_data['email']])
    userEmail = request.args.get('email')


    result = checkIfEmailAlreadyExists(userEmail)

    if result:

        return dumps({'status':False,'Message':'Email already in Use.'})


    otp = random.randint(1111, 9999)
    msg = Message('BloomWellness Welcomes You', sender='hunterxhunter2512@gmail.com', recipients=[userEmail])
    msg.body = "Just one more step towards Fitness. Enter the following code to verify your email address "+ str(otp)
    # print(app.config)

    try:
        mail.send(msg)
    except:
        return dumps({'status': False, 'Message': 'Error while sending Email.Try another email.'})

    return dumps({'status':True,'otp':otp})

@app.route('/addExersize',methods=['POST'])
def addExersize():
    req_data = request.form['exercise']

    req_data = json.loads(req_data)

    req_data['userIdsToExersizesSubscribed']=list()
    req_data['approved']= False
    req_data['notes'] = ""
    req_data['file'] = None

    try:
        file = request.files['file']

        if file.filename != '' and allowed_file(file.filename):
            filename = shortuuid.uuid() + '.jpeg'
            mongo.save_file(filename, file)
            req_data['file'] = filename
    except:
        pass

    exersizeCursor = mongo.db.Exersize
    exersizeCursor.insert(req_data)

    return "Yes"

@app.route('/addDiet',methods=['POST'])
def addDiet():
    req_data = request.form['diet']

    req_data = json.loads(req_data)

    req_data['userIdsToExersizesSubscribed']=list()
    req_data['approved'] = False
    req_data['notes'] = ""

    req_data['file'] = None

    try:

        file = request.files['file']

        if file.filename != '' and allowed_file(file.filename):
            filename = shortuuid.uuid() + '.jpeg'
            mongo.save_file(filename, file)
            req_data['file'] = filename
    except:
        pass

    dietCursor = mongo.db.Diet
    dietCursor.insert(req_data)

    return "Yes"


@app.route('/file/<filename>')
def file(filename):
    return mongo.send_file(filename)

@app.route('/deleteExercise',methods=['POST'])
def deleteExercise():
    req_data = request.get_json(force=True)
    print("req",req_data)
    # idToBeDeleted = request.form['id']

    # print("delete id",idToBeDeleted)
    exersizeCursor = mongo.db.Exersize
    exersizeCursor.remove({"_id": ObjectId(req_data['id'])});

    return "Deleted"

@app.route('/deleteDiet',methods=['POST'])
def deleteDiet():
    req_data = request.get_json(force=True)
    print("req data to delete diet",req_data)
    # idToBeDeleted = request.form['id']

    # print("delete id",idToBeDeleted)
    dietCursor = mongo.db.Diet
    dietCursor.remove({"_id": ObjectId(req_data['id'])});

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

@app.route('/removeSubscribe',methods=['POST'])
def removesubscribe():
    req_data = request.get_json(force=True)
    print("Unsubscribe request",req_data)

    exersizeCursor = mongo.db.Exersize
    # exersizeCursor.update({"_id": ObjectId(req_data['id'])},{
    #                         '$push': {
    #                             'userIdsToExersizesSubscribed': req_data['email']
    #                         }
    # }
    # );

    exersizeCursor.update(
        {"_id": ObjectId(req_data['id'])},
        { '$pull':
              {'userIdsToExersizesSubscribed':  req_data['email']
               }
          }
    );

    return "Removed"


@app.route('/subscribeDiet',methods=['POST'])
def subscribeDiet():
    req_data = request.get_json(force=True)
    print("Subscription req for diet",req_data)
    # idToBeDeleted = request.form['id']

    # print("delete id",idToBeDeleted)
    dietCursor = mongo.db.Diet
    dietCursor.update({"_id": ObjectId(req_data['id'])},{
                            '$push': {
                                'userIdsToExersizesSubscribed': req_data['email']
                            }
    }
    );

    return "Added"

@app.route('/removeDietSubscribe',methods=['POST'])
def removeDietsubscribe():
    req_data = request.get_json(force=True)
    print("Unsubscribe request for diet",req_data)

    dietCursor = mongo.db.Diet

    dietCursor.update(
        {"_id": ObjectId(req_data['id'])},
        { '$pull':
              {'userIdsToExersizesSubscribed':  req_data['email']
               }
          }
    );

    return "Removed"


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

@app.route('/getSubscribeByEmailDiet',methods=['GET'])
def getSubscribeByEmailDiet():

    userEmail = request.args.get('email')
    print("User",userEmail)
    dietCursor = mongo.db.Diet

    response = list()

    for docs in dietCursor.find():
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
        if elements['approved']:
            response.append(elements)

    return dumps(response)

@app.route('/getAllDiet',methods=['GET'])
def getAllDiet():

    dietCursor = mongo.db.Diet.find()

    response=list()
    for elements in dietCursor:
        elements['_id'] = str(elements['_id'])
        if elements['approved']:
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

@app.route('/getDietByEmail',methods=['GET'])
def getDietByEmail():

    creatorEmail = request.args.get('email')
    dietCursor = mongo.db.Diet.find({"email": creatorEmail})
    response=list()
    for elements in dietCursor:
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

@app.route('/getStatsByEmailDiet',methods=['GET'])
def getStatsByEmailDiet():

    creatorEmail = request.args.get('email')
    dietCursor = mongo.db.Diet.find({"email": creatorEmail})
    response=defaultdict(int)

    total = 0

    for elements in dietCursor:
        elements['_id'] = str(elements['_id'])
        response['countDiet']+=1
        for users in elements['userIdsToExersizesSubscribed']:
            total+=1

    response['totalUsers'] = total
    response['averageUsers'] = response['totalUsers']/response['countDiet']

    return dumps(response)


@app.route('/getCreatorSpecificExercises',methods=['GET'])
def getCreatorSpecificExercises():

    # adding diets also

    creatorCursor = mongo.db.Creator

    creatorsNames = dict()

    for docs in creatorCursor.find():
        creatorsNames[docs['email']] = list()

    exersizeCursor = mongo.db.Exersize.find()


    for elements in exersizeCursor:
        elements['_id'] = str(elements['_id'])

        if elements['email'] in creatorsNames:
            creatorsNames[elements['email']].append(elements)

    dietCursor = mongo.db.Diet.find()

    for elements in dietCursor:
        elements['_id'] = str(elements['_id'])

        if elements['email'] in creatorsNames:
            creatorsNames[elements['email']].append(elements)

    return dumps(creatorsNames)

@app.route('/updateApprovalExercise',methods=['POST'])
def updateApprovalExercise():

    req_data = request.get_json(force=True)

    exersizeCursor = mongo.db.Exersize

    exersizeCursor.update(  {"_id": ObjectId(req_data['id'])},
        {"$set": {"approved": req_data['status']}});

    return "Updated"

@app.route('/updateApprovalExerciseNote',methods=['POST'])
def updateApprovalExerciseNote():

    req_data = request.get_json(force=True)

    exersizeCursor = mongo.db.Exersize

    exersizeCursor.update(  {"_id": ObjectId(req_data['id'])},
        {"$set": {"notes": req_data['notes']}});

    return "Updated"

@app.route('/updateApprovalDiet',methods=['POST'])
def updateApprovalDiet():

    req_data = request.get_json(force=True)

    dietCursor = mongo.db.Diet

    dietCursor.update(  {"_id": ObjectId(req_data['id'])},
        {"$set": {"approved": req_data['status']}});

    return "Updated"

@app.route('/updateApprovalDietNote',methods=['POST'])
def updateApprovalDietNote():

    req_data = request.get_json(force=True)

    dietCursor = mongo.db.Diet

    dietCursor.update(  {"_id": ObjectId(req_data['id'])},
        {"$set": {"notes": req_data['notes']}});

    return "Updated"


@app.route('/passwdReset',methods=['POST'])
def passwdReset():

    req_data = request.get_json(force=True)

    verifyCursor = mongo.db.verifycode

    for elements in verifyCursor.find():

        if elements['email'] == req_data['email'] and elements['verifyCode'] == req_data['code']:

            emailAlreadyExists = False

            userCursor = mongo.db.User

            for docs in userCursor.find():

                if docs['email'].lower() == req_data['email'].lower():

                    userCursor.update({"email": req_data['email']},
                                      {"$set": {"password": req_data['pwd']}});

                    return "Updated"

            creatorEmail = mongo.db.Creator

            if not emailAlreadyExists:
                for docs in creatorEmail.find():

                    if docs['email'].lower() == req_data['email'].lower():
                        creatorEmail.update({"email": req_data['email']},
                                          {"$set": {"password": req_data['pwd']}});
                        return "Updated"

            adminEmail = mongo.db.Admin

            if not emailAlreadyExists:
                for docs in adminEmail.find():

                    if docs['email'].lower() == req_data['email'].lower():
                        adminEmail.update({"email": req_data['email']},
                                          {"$set": {"password": req_data['pwd']}});
                        return "Updated"


    return "Error"

@app.route('/recommendations',methods=['GET'])
def recommendations():

    userEmail = request.args.get('email')

    mostSubscribed = []

    exersizeCursor = mongo.db.Exersize.find()

    for elements in exersizeCursor:

        if elements['approved']:
            elements['_id'] = str(elements['_id'])
            if userEmail not in elements['userIdsToExersizesSubscribed']:

                mostSubscribed.append(elements)


    mostSubscribed.sort(key= lambda x: len(x['userIdsToExersizesSubscribed']),reverse=True)

    first = request.args.get('first')

    second = request.args.get('second')

    if first == "bodyBuilding":

        first = "body"

    if second == "bodyBuilding":

        second = "body"


    videosCursor = mongo.db.ExersizeVideoLinks.find()

    videosList = []

    for elements in videosCursor:
        elements['_id'] = str(elements['_id'])
        if 'type' in elements and (elements['type'] == first or elements['type'] == second):
            videosList.append(elements)

    random.shuffle(videosList)

    recommendationsDict = dict()

    recommendationsDict['mostSubscribed'] = mostSubscribed[:3]
    recommendationsDict['videoList'] = videosList[:5]

    return dumps(recommendationsDict)




if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))
    # serve(app, host='0.0.0.0', port=port)
    app.run(debug=True, host='0.0.0.0', port=port)
