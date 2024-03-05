from datetime import datetime

class Review:
    def __init__(self, review_id, user_id, service_id, rating, comment, review_date=None):
        self.__review_id = review_id
        self.__user_id = user_id
        self.__service_id = service_id
        self.rating = rating
        self.comment = comment
        self.review_date = review_date if review_date else datetime.now()

    @property
    def review_id(self):
        return self.__review_id

    @property
    def user_id(self):
        return self.__user_id

    @property
    def service_id(self):
        return self.__service_id

    @rating.setter
    def rating(self, value):
        if 1 <= value <= 5:
            self.__rating = value
        else:
            raise ValueError("Rating must be between 1 and 5")
