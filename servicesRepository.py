from category import *
from bdConnection import *
from bson.objectid import ObjectId

coll = db.categories

class UsersRepository:


    def getListOfServices(self):
        all_services = self.coll.find()
        list_services = []
        for service in all_services:
            service_obj = Service(service["_id"], service["title"], service["description"],
                                  service["location"], service["categoryId"], service["countryId"],
                                  service["userId"])
            list_services.append(service_obj)
        return list_services

    