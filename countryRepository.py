from country import *
from bdConnection import *
from bson.objectid import ObjectId


class CountriesRepository:

    def __init__(self, db):
        self.coll = db.countries

    # find country data by name
    def getCountryByName(self, countryName):              
        query = {'countryName': countryName}
        country = self.coll.find_one(query)
        return country
    
    # find country data by ID
    def getCountryById(self, countryId):              
        query = {'_id': countryId}
        country = self.coll.find_one(query)
        return country