from datetime import datetime

class Review:
    def __init__(self, _id, userId, serviceId, rating, comment, review_date):
        self.__id = _id
        self.__userId = userId
        self.__serviceId = serviceId
        self.rating = rating
        self.comment = comment
        self.review_date = review_date if review_date else datetime.now()

    @property
    def reviewId(self):
        return self.__id

    @property
    def userId(self):
        return self.__userId

    @property
    def serviceId(self):
        return self.__serviceId


