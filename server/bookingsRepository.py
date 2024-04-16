from booking import *
#from bdConnection import *
from bson.objectid import ObjectId

class BookingsRepository:
    def __init__(self, db):
        self.coll = db.bookings

    
    #get user's bookings list by userID
    def getBookingsByUserId(self, userId):
        user_bookings = self.coll.find({'userId': userId})
        
        list_bookings=[]
        for booking in user_bookings:
            _id=booking["_id"]
            userId = booking["userId"]
            serviceId= booking["serviceId"]
            slotId=booking["slotId"]
            booking_date = booking["booking_date"]
            
            userBooking= Booking(_id,userId, serviceId, slotId, booking_date)
            list_bookings.append(userBooking)
        
        return list_bookings
    

    #get service's bookings list by serviceId
    def getBookingsByServiceId(self, serviceId):
        service_bookings = self.coll.find({'serviceId': serviceId})
        
        list_bookings=[]
        for booking in service_bookings:
            _id=booking["_id"]
            userId = booking["userId"]
            serviceId= booking["serviceId"]
            slotId=booking["slotId"]
            booking_date = booking["booking_date"]
            
            serviceBooking= Booking(_id,userId, serviceId, slotId, booking_date)
            list_bookings.append(serviceBooking)
        
        return list_bookings
    
     # find booking data by ID
    def getBookingById(self, bookingId):              
        query = {'_id': ObjectId(bookingId)}
        booking = self.coll.find_one(query)
        return booking

    #create new booking 
    def createBooking(self, booking, userConnection, serviceConnection, timeSlotConnection):   
        if(userConnection.userExistsById(booking.userId)==True and  serviceConnection.serviceExistsById(booking.serviceId)==True and  timeSlotConnection.timeSlotExistsById(booking.slotId)==True):                          
            new_booking={ "userId": booking.userId, "serviceId": booking.serviceId, "slotId": booking.slotId , "booking_date": str(booking.booking_date)}
            result=self.coll.insert_one(new_booking)
            return result.inserted_id
        else:
            return None
    
    
    # delete booking by ID
    def deleteBookingByID(self, bookingId):                       
        result = self.coll.delete_one({'_id': ObjectId(bookingId)})
        if result.deleted_count > 0:
            return True
        else:
            return False
        
    # delete all bookings that user created by user's ID
    def deleteAllBookingsByUserId(self, userId):
        result = self.coll.delete_many({"userId": ObjectId(userId)})
        return result.deleted_count
    

    # delete all bookings that service has using serviceId
    def deleteAllBookingsByServiceId(self, serviceId):
        result = self.coll.delete_many({"serviceId": ObjectId(serviceId)})
        return result.deleted_count
    

    # find bookings time slots for special date 
    def findBookingTimeSlotsByDate(self, booking_date):
        date_bookings = self.coll.find({'booking_date': str(booking_date)}) 
        list_timeSlotsId=[]
        for booking in date_bookings:
            slotId=str(booking["slotId"])
            list_timeSlotsId.append(slotId)
        return list_timeSlotsId
