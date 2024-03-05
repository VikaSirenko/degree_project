from category import *
from bdConnection import *
from bson.objectid import ObjectId


class CategoriesRepository:
    def __init__(self, db):
        self.coll = db.categories

    # find category data by name
    def getCategoryByName(self, categoryName):              
        query = {'categoryName': categoryName}
        category = self.coll.find_one(query)
        return category
    
    # find category data by ID
    def getCategoryById(self, categoryId):              
        query = {'_id': categoryId}
        category = self.coll.find_one(query)
        return category