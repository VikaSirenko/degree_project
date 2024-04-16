from datetime import datetime, timedelta

class TimeSlot:
    def __init__(self, _id, serviceId, start_time, end_time):
        self.__id = _id
        self.__serviceId = serviceId
        self.start_time = start_time
        self.end_time = end_time
        
    @property
    def slotId(self):
        return self.__id

    @property
    def serviceId(self):
        return self.__serviceId

    
