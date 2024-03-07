from flask import Flask, request, jsonify, make_response
from bookingsRepository import *
from categoriesRepository import *
from countriesRepository import *
from reviewsRepository import *
from servicesRepository import *
from timeSlotsRepository import *
from usersRepository import *
from booking import *
from category import *
from country import *
from review import *
from service import *
from timeSlot import *
from user import *
from flask import copy_current_request_context
import jwt
import datetime
from functools import wraps
from bdConnection import *


app = Flask(__name__)
app.config['SECRET_KEY']="thisisthesecretkey"

bookingsConnection= BookingsRepository(db)
categoriesConnection = CategoriesRepository (db)
countriesConnection = CountriesRepository (db)
reviewsConnection = ReviewsRepository(db)
servicesConnection = ServicesRepository (db)
timeSlotsConnection = TimeSlotsRepository(db)
usersConnection = UsersRepository (db)

# server function for user registration
@app.route('/userRegistration', methods=['POST'])
def userRegistration():
    try:
        content = request.form
        user = User(0, content['firstName'], content['lastName'], content['email'], content['password'])
        newId = usersConnection.createUser(user)
        if(newId==None):
            return  "User with that email exists ", 404
        else:
            return "User created", 200
    except:
        return "It is not possible to create a new user", 404

# server function for user sign in
@app.route('/signIn', methods=['GET'])
def signIn():
    try:
        content = request.form
        email = content['email']
        password=content['password']
        exist=usersConnection.userExistForSignIn(email, password)
        if(exist):
            token=jwt.encode({'email':email, 'password':password, 'exp': datetime.datetime.utcnow()+ datetime.timedelta(hours=24)}, app.config["SECRET_KEY"])
            return token, 200
        else:
            return ("No such user exists"), 404
    except: 
        return "Unable to get token", 400


def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token =request.headers.get('authorization')

        if not token:
            return "Token is missing", 403
        try:
            data=jwt.decode(token, app.config['SECRET_KEY'], algorithms=['HS256'])
            result = f(*args, **kwargs)
            return result[0], 200
        except:
            return "Token is invalid", 403
        
    return decorated


def admin_token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token =request.headers.get('authorization')

        if not token:
            return "Token is missing", 403
        try:
            data=jwt.decode(token, app.config['SECRET_KEY'], algorithms=['HS256'])
            if (data['email']=='vika_sirenko@gmail.com' and hashlib.sha256(data['password'].encode()).hexdigest()=='03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4'):
                result = f(*args, **kwargs)
                return result[0], 200
            else:
                return "You do not have administrator rights to perform this action", 403
        except:
            return "Token is invalid", 403
        
    return decorated


# server function for deleting user   
@app.route('/deleteUser', methods=['DELETE'])
@admin_token_required
def deleteUser():
    try:
        content = request.form 
        result=usersConnection.deleteUserByID(content['_id'])
        if (result):
                servicesConnection.deleteAllServicesByUserId(content["_id"])
                reviewsConnection. deleteAllUserReviews(content["_id"])    # add delete all services reviews , firstly get list users services and using loop delete all reviews 
                return "Deleted", 200
        else:
                return ("Cannot find user to delete"), 404
    except:
        return "Can not delete", 400
    

# server function for updating user  data
@app.route('/updateUser', methods=['PUT'])
@token_required
def updateUser():
    try:
        user_data=request.headers.get('authorization')
        data=jwt.decode(user_data, app.config['SECRET_KEY'], algorithms=['HS256'])
        old_user=usersConnection.getUserByEmail(data['email'])
        content = request.form  
        new_user= User(0, content['firstName'], content['lastName'], content['email'], content['password'])
        result= usersConnection.updateUser(new_user, old_user['_id'])
        if(result=='updated'):
            return  "User data has been updated", 200
        else:
            return "User data has not been updated", 404
    except:
        return "Unable to update user data", 404


# server function for service creation 
@app.route('/createService', methods=['POST'])
@token_required
def createService():
    try:
        user_data=request.headers.get('authorization')
        data=jwt.decode(user_data, app.config['SECRET_KEY'], algorithms=['HS256'])
        user=usersConnection.getUserByEmail(data['email'])
        content = request.form
        service = Service(0, content['title'], content['description'], content['location'],ObjectId(content['categoryId']), ObjectId(content['countryId']), user['_id'])
        newId = servicesConnection.createService(service, categoriesConnection, countriesConnection, usersConnection)
        if(newId==None):
            return  "Service already exists ", 404
        else:
            return "Service created", 200
    except:
        return "It is not possible to create a new service", 404


if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=8080)