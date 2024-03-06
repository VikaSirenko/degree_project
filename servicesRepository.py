from service import *
from bdConnection import *
from bson.objectid import ObjectId


class UsersRepository:

    def __init__(self, db):
        self.coll = db.services 

    # get list of all services from database 
    def getListOfServices(self):                   
        all_services = self.coll.find()
        list_services = []
        for service in all_services:
            service_obj = Service(service["_id"], service["title"], service["description"],
                                  service["location"], service["categoryId"], service["countryId"],
                                  service["userId"])
            list_services.append(service_obj)
        return list_services
    

    #get user's services list by userID
    def getServicesByUserId(self, userId):
        user_services = self.coll.find({'userId': userId})
        
        list_services=[]
        for service in user_services:
            _id=service["_id"]
            title =service["title"]
            description= service["description"]
            location=service["location"]
            categoryId = service["categoryId"]
            countryId = service["countryId"]
            userId = service["userId"]
            
            userService= Service(_id,title, description, location, categoryId, countryId, userId)
            list_services.append(userService)
        
        return list_services
    
    # check whether the service with the ID exists
    def serviceExistsById(self, service_id):          
        query = {'_id': ObjectId(service_id)}
        service=self.coll.find_one(query)
        if(service!=None):
            return True
        else:
            return False


    # create service  and add to database 
    def createService(self, service):                             
        new_service={ "title": service.title, "description": service.description, "location": service.location , "categoryId": service.categoryId, "countryId": service.countryId, "userId": service.userId}
        result=self.coll.insert_one(new_service)
        return result.inserted_id
    
    
    # find service data by ID
    def getServiceById(self, serviceId):              
        query = {'_id': ObjectId(serviceId)}
        service = self.coll.find_one(query)
        return service

    # delete service by ID
    def deleteServiceByID(self, serviceId):                       
        result = self.coll.delete_one({'_id': serviceId})
        if result.deleted_count > 0:
            return True
        else:
            return False
        
    # update service's data using ID
    def updateService(self , service , serviceId):          
        result = self.coll.update_one(
        {'_id': ObjectId(serviceId)},
        {'$set': {
            'title': service.title,
            'description': service.description,
            'location': service.location,
            'categoryId': service.categoryId,
            'countryId' : service.countryId,
            'userId' : service.userId
        }}
        )

        if result.modified_count > 0:
            return True
        else:
            return False
    

    # delete all services that user created by user's ID
    def deleteAllservicesByUserId(self, userId):
        result = self.coll.delete_many({"userId": userId})
        return result.deleted_count
    

    #filtering services by country 
    def getServicesByCountryName(self, countryName):
        country = self.countriesRepo.getCountryByName(countryName)
       
        if not country:
            return "Country not found"              # change ???
        
        countryId = country['_id']
        services = self.coll.find({"countryId": countryId})
        return list(services)
    
    
    #filtering services by category
    def getServicesByCategory(self, categoryName):
        category = self.categoryRepo.getCategoryByName(categoryName)
       
        if not category:
            return "Category not found"              # change ???
        
        categoryId = category['_id']
        services = self.coll.find({"categoryId": categoryId})
        return list(services)
    
    

    