from datetime import datetime, timedelta

class TimeSlot:
    def __init__(self, _id, service_id, start_time, end_time, is_available=True):
        self.__id = _id
        self.__service_id = service_id
        self.start_time = start_time
        self.end_time = end_time
        self.is_available = is_available

    @property
    def sloId(self):
        return self.__id

    @property
    def service_id(self):
        return self.__service_id

    
