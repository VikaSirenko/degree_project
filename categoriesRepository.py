from category import *
#from bdConnection import *
from bson.objectid import ObjectId


class CategoriesRepository:
    def __init__(self, db):
        self.coll = db.categories

    # find category data by name
    def getCategoryByName(self, categoryName):              
        query = {'categoryName': categoryName}
        category = self.coll.find_one(query)
        _id = category["id"]
        categoryName= category["categoryName"]
        get_category=Category(_id, categoryName)
        return get_category
    
    # find category data by ID
    def getCategoryById(self, categoryId):              
        query = {'_id': categoryId}
        category = self.coll.find_one(query)
        _id = category["id"]
        categoryName= category["categoryName"]
        get_category=Category(_id, categoryName)
        return get_category
    
     # check whether the category with the ID exists
    def categoryExistsById(self, categoryId):          
        query = {'_id': ObjectId(categoryId)}
        category=self.coll.find_one(query)
        if(category!=None):
            return True
        else:
            return False