class Service:
    def __init__(self, _id, title, description,location,categoryId, countryId, userId):
        self.__id = _id
        self.title = title
        self.description = description
        self.location=location
        self.__categoryId = categoryId
        self.__countryId = countryId
        self.__userId= userId

    @property
    def service_id(self):
        return self.__id

    @property
    def category_id(self):
        return self.__categoryId

    @property
    def country_id(self):
        return self.__countryId

    @property
    def user_id(self):
        return self.__userId


    
    