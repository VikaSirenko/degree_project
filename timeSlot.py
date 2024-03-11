from datetime import datetime, timedelta

class TimeSlot:
    def __init__(self, _id, serviceId, start_time, end_time, is_available):
        self.__id = _id
        self.__serviceId = serviceId
        self.start_time = start_time
        self.end_time = end_time
        self.is_available = is_available

    @property
    def sloId(self):
        return self.__id

    @property
    def serviceId(self):
        return self.__serviceId

    
