from datetime import datetime, timedelta

class TimeSlot:
    def __init__(self, slot_id, service_id, start_time, end_time, is_available=True):
        self.__slot_id = slot_id
        self.__service_id = service_id
        self.start_time = start_time
        self.end_time = end_time
        self.is_available = is_available

    @property
    def slot_id(self):
        return self.__slot_id

    @property
    def service_id(self):
        return self.__service_id

    
