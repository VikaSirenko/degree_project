class Booking:
    def __init__(self, _id, userId, serviceId, slotId, booking_date, status):
        self.__id = _id
        self.__userId = userId
        self.__serviceId = serviceId
        self.__slotId = slotId
        self.booking_date = booking_date
        self.status = status

    @property
    def bookingId(self):
        return self.__id

    @property
    def userId(self):
        return self.__userId
    
    @property
    def serviceId(self):
        return self.__serviceId

    @property
    def slotId(self):
        return self.__slotId

    