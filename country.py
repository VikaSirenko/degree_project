class Country:
    def __init__(self, _id, countryName):
        self.__id = _id
        self.countryName = countryName

    @property
    def id(self):
        return self.__id
