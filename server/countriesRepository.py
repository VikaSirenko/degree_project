from country import *
#from bdConnection import *
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
        query = {'_id': ObjectId(countryId)}
        country = self.coll.find_one(query)
        return country
    

    # check whether the country with the ID exists
    def countryExistsById(self, countryId):          
        query = {'_id': ObjectId(countryId)}
        country=self.coll.find_one(query)
        if(country!=None):
            return True
        else:
            return False
        
    def getListOfCountries(self):
        all_countries = self.coll.find()
        list_countries = [country["countryName"] for country in all_countries]
        return list_countries

    