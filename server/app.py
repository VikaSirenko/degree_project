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
from datetime import datetime
from functools import wraps
from bdConnection import *
from flask_cors import CORS


app = Flask(__name__)
app.config['SECRET_KEY']="thisisthesecretkey"
CORS(app)

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
        content = request.json
        user = User(0, content['firstName'], content['lastName'], content['email'], content['password'])
        newId = usersConnection.createUser(user)
        if(newId==None):
            return  jsonify({'message':"User with that email exists"}), 404
        else:
            return jsonify({'message':"User created"}), 200
    except:
        return jsonify({'message':"It is not possible to create a new user"}), 404

# server function for user sign in
@app.route('/signIn', methods=['POST'])
def signIn():
    try:
        content = request.json
        email = content['email']
        password=content['password']
        exist=usersConnection.userExistForSignIn(email, password)
        if(exist):
            token=jwt.encode({'email':email, 'password':password, 'exp': datetime.utcnow()+ timedelta(hours=24)}, app.config["SECRET_KEY"])
            return jsonify({'token': token}), 200
        else:
            return jsonify({'message': "No such user exists"}), 404
    except: 
        return jsonify({'message': "Unable to get token"}), 400


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
        if(result== True):
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
        content = request.json
        country=countriesConnection.getCountryByName(content['countryName'])
        category=categoriesConnection.getCategoryByName(content['categoryName'])
        service = Service(0, content['title'], content['description'], content['location'],category['_id'], country['_id'], user['_id'])
        newId = servicesConnection.createService(service, categoriesConnection, countriesConnection, usersConnection)
        if(newId==None):
            return  "Service already exists ", 404
        else:
            return "Service created", 200
    except:
        return "It is not possible to create a new service", 404

# server function for deleting service  
@app.route('/deleteService', methods=['DELETE'])
@token_required
def deleteService():
    try:
        user_data=request.headers.get('authorization')
        data=jwt.decode(user_data, app.config['SECRET_KEY'], algorithms=['HS256'])
        user=usersConnection.getUserByEmail(data['email'])
        content = request.form
        service= servicesConnection.getServiceById(content['_id'])
        if(user["_id"]==service["userId"]):
            result=servicesConnection.deleteServiceByID(content['_id'])
            if (result==True):
                reviewsConnection.deleteAllServiceReviews(content['_id'])
                bookingsConnection.deleteAllBookingsByServiceId(content['_id'])
                timeSlotsConnection.deleteAllTimeSlotsByServiceId(content['_id'])
                return "Deleted", 200
            else:
                return ("Cannot find service to delete"), 404
        else:
            return("You do not have rights to perform this action"), 403

    except:
        return "Can not delete", 400
    

# server function for updating service data
@app.route('/updateService', methods=['PUT'])
@token_required
def updateService():
    try:
        user_data=request.headers.get('authorization')
        data=jwt.decode(user_data, app.config['SECRET_KEY'], algorithms=['HS256'])
        user=usersConnection.getUserByEmail(data['email'])
        content = request.form
        service= servicesConnection.getServiceById(content['_id'])
        if(user["_id"]==service["userId"]):
            new_service= Service(0, content['title'], content['description'], content['location'],ObjectId(content['categoryId']), ObjectId(content['countryId']), service["userId"])
            result= servicesConnection.updateService(new_service, service['_id'])
            if(result== True):
                return  "Service data has been updated", 200
            else:
                return "Service data has not been updated", 404
        else:
            return("You do not have rights to perform this action"), 403
    except:
        return "Unable to update service data", 404
    

# server function for time slot creation 
@app.route('/createTimeSlot', methods=['POST'])
@token_required
def createTimeSlot():
    try:
        user_data=request.headers.get('authorization')
        data=jwt.decode(user_data, app.config['SECRET_KEY'], algorithms=['HS256'])
        user=usersConnection.getUserByEmail(data['email'])
        content = request.form
        service= servicesConnection.getServiceById(content['serviceId'])
        if(user["_id"]==service["userId"]):
            timeSlot = TimeSlot(0, ObjectId(content['serviceId']), content['start_time'], content['end_time'], True)
            newId = timeSlotsConnection.createTimeSlot(timeSlot, servicesConnection)
            if(newId==None):
                return  "Time slot already exists ", 404
            else:
                return "Time slot created", 200
        else:
            return("You do not have rights to perform this action"), 403
    except:
        return "It is not possible to create a new time slot", 404


# server function for deleting time slot 
@app.route('/deleteTimeSlot', methods=['DELETE'])
@token_required
def deleteTimeSlot():
    try:
        user_data=request.headers.get('authorization')
        data=jwt.decode(user_data, app.config['SECRET_KEY'], algorithms=['HS256'])
        user=usersConnection.getUserByEmail(data['email'])
        content = request.form
        service= servicesConnection.getServiceById(content['serviceId'])
        if(user["_id"]==service["userId"]):
            result=timeSlotsConnection.deleteTimeSlotByID(content['_id'])
            if (result==True):
                return "Deleted", 200
            else:
                return ("Cannot find time slot to delete"), 404
        else:
            return("You do not have rights to perform this action"), 403

    except:
        return "Can not delete", 400
    

# server function for updating time slot a data
@app.route('/updateTimeSlotAvailability', methods=['PUT'])
@token_required
def updateTimeSlotAvailability():
    try:
        user_data=request.headers.get('authorization')
        data=jwt.decode(user_data, app.config['SECRET_KEY'], algorithms=['HS256'])
        user=usersConnection.getUserByEmail(data['email'])
        content = request.form
        service= servicesConnection.getServiceById(content['serviceId'])
        if(user["_id"]==service["userId"]):
            result= timeSlotsConnection.updateTimeSlotAvailability(content['is_available'], content['_id'])
            if(result==True):
                return  "Time slot availability data has been updated", 200
            else:
                return "Time slot availability data has not been updated", 404
        else:
            return("You do not have rights to perform this action"), 403
    except:
        return "Unable to update time slot availability data", 404
    

# server function for booking creation 
@app.route('/createBooking', methods=['POST'])
@token_required
def createBooking():
    try:
        user_data=request.headers.get('authorization')
        data=jwt.decode(user_data, app.config['SECRET_KEY'], algorithms=['HS256'])
        user=usersConnection.getUserByEmail(data['email'])
        content = request.form
        service= servicesConnection.getServiceById(content['serviceId'])
        timeSlot = timeSlotsConnection.getTimeSlotById(content['slotId'])
        if(user["_id"]==service["userId"] and service["_id"]==timeSlot["serviceId"] ):
            if(bool(timeSlot['is_available'])==True):
                booking = Booking(0, user["_id"], ObjectId(content["serviceId"]), ObjectId(content['slotId']), content['booking_date'])
                newId = bookingsConnection.createBooking(booking, usersConnection, servicesConnection, timeSlotsConnection)
                if(newId==None):
                    return  "Booking already exists ", 404
                else:
                    timeSlotsConnection.updateTimeSlotAvailability(False, content['slotId'])
                    return "Booking created", 200
            else:
                return "This service is already booked for this date and time", 404
        else:
            return("You do not have rights to perform this action"), 403
    except:
        return "It is not possible to create a new booking", 404
    

# server function for deleting booking 
@app.route('/deleteBooking', methods=['DELETE'])
@token_required
def deleteBooking():
    try:
        user_data=request.headers.get('authorization')
        data=jwt.decode(user_data, app.config['SECRET_KEY'], algorithms=['HS256'])
        user=usersConnection.getUserByEmail(data['email'])
        content = request.form
        booking= bookingsConnection.getBookingById(content['_id'])
        if(user["_id"]==booking["userId"]):
            result=bookingsConnection.deleteBookingByID(content['_id'])
            if (result==True):
                timeSlotsConnection.updateTimeSlotAvailability(True, booking['slotId'])
                return "Deleted", 200
            else:
                return ("Cannot find time slot to delete"), 404
        else:
            return("You do not have rights to perform this action"), 403

    except:
        return "Can not delete", 400


# server function for review creation 
@app.route('/createReview', methods=['POST'])
@token_required
def createReview():
    try:
        user_data=request.headers.get('authorization')
        data=jwt.decode(user_data, app.config['SECRET_KEY'], algorithms=['HS256'])
        user=usersConnection.getUserByEmail(data['email'])
        content = request.form
        review= Review(0, ObjectId(user['_id']), ObjectId(content['serviceId']), content["rating"], content['comment'], None)
        newId = reviewsConnection.createReview(review, usersConnection, servicesConnection)
        if(newId==None):
            return  "Review already exists ", 404
        else:
            return "Review created", 200
    except:
        return "It is not possible to create a new review", 404
    

# server function for updating review data
@app.route('/updateReview', methods=['PUT'])
@token_required
def updateReview():
    try:
        user_data=request.headers.get('authorization')
        data=jwt.decode(user_data, app.config['SECRET_KEY'], algorithms=['HS256'])
        user=usersConnection.getUserByEmail(data['email'])
        content = request.form
        review = reviewsConnection.getReviewById(content['_id'])
        if(user["_id"]==review["userId"]):
            new_review= Review(0, ObjectId(user['_id']), review['serviceId'], content['rating'], content['comment'], review['review_date'])
            result= reviewsConnection.updateReview(new_review, review['_id'])
            if(result== True):
                return  "Review data has been updated", 200
            else:
                return "Review data has not been updated", 404
        else:
            return("You do not have rights to perform this action"), 403
    except:
        return "Unable to update review data", 404


# server function for deleting review 
@app.route('/deleteReview', methods=['DELETE'])
@token_required
def deleteReview():
    try:
        user_data=request.headers.get('authorization')
        data=jwt.decode(user_data, app.config['SECRET_KEY'], algorithms=['HS256'])
        user=usersConnection.getUserByEmail(data['email'])
        content = request.form
        review= reviewsConnection.getReviewById(content['_id'])
        if(user["_id"]==review["userId"] or user["_id"]== servicesConnection.getServiceById(review['serviceId'])['userId'] ):
            result=reviewsConnection.deleteReviewById(content['_id'])
            if (result==True):
                return "Deleted", 200
            else:
                return ("Cannot find review to delete"), 404
        else:
            return("You do not have rights to perform this action"), 403

    except:
        return "Can not delete", 400
    
@app.route('/getCountries', methods=['GET'])
def getCountries():
    try:
        countryNames = countriesConnection.getListOfCountries()
        return jsonify({'countries': countryNames}), 200
    except Exception as e:
        print(e)
        return jsonify({'message': 'Error fetching countries'}), 500

@app.route('/getCategories', methods=['GET'])
def getCategories():
    try:
        categoriesNames = categoriesConnection.getListOfCategories()
        return jsonify({'categories': categoriesNames}), 200
    except Exception as e:
        print(e)
        return jsonify({'message': 'Error fetching categories'}), 500


@app.route('/getServices', methods=['GET'])
def getServices():
    try:
        services = servicesConnection.getListOfServices()
        return jsonify({'services': services}), 200
    except Exception as e:
        print(e)
        return jsonify({'message': 'Error fetching services'}), 500


if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=8080)