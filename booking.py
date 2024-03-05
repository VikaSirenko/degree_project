class Booking:
    def __init__(self, booking_id, user_id, service_id, slot_id, booking_date_date, status):
        self.__booking_id = booking_id
        self.__user_id = user_id
        self.__service_id = service_id
        self.__slot_id = slot_id
        self.booking_date = booking_date
        self.status = status

    @property
    def booking_id(self):
        return self.__booking_id

    @property
    def user_id(self):
        return self.__user_id
    
    @property
    def service_id(self):
        return self.__service_id

    @property
    def slot_id(self):
        return self.__slot_id

    