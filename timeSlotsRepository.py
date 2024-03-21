from timeSlot import *
#from bdConnection import *
from bson.objectid import ObjectId
from datetime import datetime, timedelta


class TimeSlotsRepository:
     
    def __init__(self, db):
        self.coll = db.timeSlots

    # create time slot and add to database 
    def createTimeSlot(self, timeSlot, serviceConnection):  
        if(serviceConnection.serviceExistsById(timeSlot.serviceId)==True):                                                    
            new_timeSlot={ "serviceId": timeSlot.serviceId, "start_time": timeSlot.start_time, "end_time": timeSlot.end_time, "is_available": timeSlot.is_available}
            result=self.coll.insert_one(new_timeSlot)
            return result.inserted_id
        else:
            return None
    
    #get list of all time slots that service has
    def getListOfServicesTimeslots(self, serviceId):
        service_timeSlots = self.coll.find({'serviceId': serviceId})
        
        list_TimeSlots=[]
        for timeSlot in service_timeSlots:
            _id=timeSlot["_id"]
            serviceId= timeSlot["serviceId"]
            start_time=timeSlot["start_time"]
            end_time = timeSlot["end_time"]
            is_available= timeSlot["is_available"]
            
            serviceTimeSlot= TimeSlot(_id,serviceId, start_time, end_time, is_available)
            list_TimeSlots.append(serviceTimeSlot)
        
        return list_TimeSlots


    # update time slot's data using ID
    def updateTimeSlot(self , timeSlot , timeSlotId):          
        result = self.coll.update_one(
        {'_id': ObjectId(timeSlotId)},
        {'$set': {
            'serviceId': timeSlot.serviceId,
            'start_time': timeSlot.start_time,
            'end_time': timeSlot.end_time,
            'is_available': timeSlot.is_available
        }}
        )

        if result.modified_count > 0:
            return True
        else:
            return False
        
        
    # update time slot's  availability data using ID
    def updateTimeSlotAvailability(self , is_available , timeSlotId):          
        result = self.coll.update_one(
        {'_id': ObjectId(timeSlotId)},
        {'$set': {
            'is_available': is_available
        }}
        )
        if result.modified_count > 0:
            return True
        else:
            return False


    # delete time slot by ID
    def deleteTimeSlotByID(self, timeSlotId):                       
        result = self.coll.delete_one({'_id':ObjectId(timeSlotId)})
        if result.deleted_count > 0:
            return True
        else:
            return False
    

    # delete all time slots that connect to service using serviceId
    def deleteAllTimeSlotsByServiceId(self, serviceId):
        result = self.coll.delete_many({"serviceId": ObjectId(serviceId)})
        return result.deleted_count
    

    # find time slot data by ID
    def getTimeSlotById(self, timeSlotId):              
        query = {'_id': ObjectId(timeSlotId)}
        timeSlot = self.coll.find_one(query)
        return timeSlot
    
    # check whether the time slot with the ID exists
    def timeSlotExistsById(self, timeSlotId):          
        query = {'_id': ObjectId(timeSlotId)}
        timeSlot=self.coll.find_one(query)
        if(timeSlot!=None):
            return True
        else:
            return False


    