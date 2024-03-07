from booking import *
from bdConnection import *
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

    #create new booking 
    def createBooking(self, booking, userConnection, serviceConnection, timeSlotConnection):   
        if(userConnection.userExistsById(booking.userId)==True and  serviceConnection.serviceExistsById(booking.serviceId)==True and  timeSlotConnection.timeSlotExistsById(booking.timeSlotId)==True):                          
            new_booking={ "userId": booking.userId, "serviceId": booking.serviceId, "slotId": booking.slotId , "booking_date": booking.booking_date}
            result=self.coll.insert_one(new_booking)
            return result.inserted_id
        else:
            return None
    
    
    # delete booking by ID
    def deleteBookingByID(self, bookingId):                       
        result = self.coll.delete_one({'_id': bookingId})
        if result.deleted_count > 0:
            return True
        else:
            return False
        
    # delete all bookings that user created by user's ID
    def deleteAllBookingsByUserId(self, userId):
        result = self.coll.delete_many({"userId": userId})
        return result.deleted_count
    

    # delete all bookings that service has using serviceId
    def deleteAllBookingsByServiceId(self, serviceId):
        result = self.coll.delete_many({"serviceId": serviceId})
        return result.deleted_count