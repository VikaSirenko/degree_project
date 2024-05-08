from service import *
from bson.objectid import ObjectId
from bson.regex import Regex


class ServicesRepository:

    def __init__(self, db):
        self.coll = db.services 

    # get list of all services from database 
    def getListOfServices(self):                   
        all_services = self.coll.find()
        list_services = []
        for service in all_services:
            service_dict = {
                "id": str(service["_id"]),  
                "title": service["title"],
                "description": service["description"],
                "location": service["location"],
                "categoryId": str(service["categoryId"]),  
                "countryId": str(service["countryId"]),  
                "userId": str(service["userId"])  
            }
            list_services.append(service_dict)
        return list_services
    

    #get user's services list by userID
    def getServicesByUserId(self, userId):
        user_services = list(self.coll.find({'userId': ObjectId(userId)}))
        return user_services
    
    # check whether the service with the ID exists
    def serviceExistsById(self, service_id):          
        query = {'_id': ObjectId(service_id)}
        service=self.coll.find_one(query)
        if(service!=None):
            return True
        else:
            return False


    # create service  and add to database 
    def createService(self, service, categoryConnection, countryConnection, userConnection):    
        if(userConnection.userExistsById(service.userId)==True and  categoryConnection.categoryExistsById(service.categoryId)==True and  countryConnection.countryExistsById(service.countryId)==True):                         
            new_service={ "title": service.title, "description": service.description, "location": service.location , "categoryId": service.categoryId, "countryId": service.countryId, "userId": service.userId}
            result=self.coll.insert_one(new_service)
            return result.inserted_id
        else: 
            return None
    
    
    # find service data by ID
    def getServiceById(self, serviceId):              
        query = {'_id': ObjectId(serviceId)}
        service = self.coll.find_one(query)
        service_dict = {
                "id": str(service["_id"]),  
                "title": service["title"],
                "description": service["description"],
                "location": service["location"],
                "categoryId": str(service["categoryId"]),  
                "countryId": str(service["countryId"]),  
                "userId": str(service["userId"])  
            }
        return service_dict

    # delete service by ID
    def deleteServiceByID(self, serviceId):                       
        result = self.coll.delete_one({'_id': ObjectId(serviceId)})
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
    def deleteAllServicesByUserId(self, userId):
        result = self.coll.delete_many({"userId": ObjectId(userId)})
        return result.deleted_count
    

    #filtering services by country   #change , make a list
    def getServicesByCountryName(self, countryName):
        country = self.countriesRepo.getCountryByName(countryName)
       
        if not country:
            return "Country not found"              # change ???
        
        countryId = country['_id']
        services = self.coll.find({"countryId": ObjectId(countryId)})
        return list(services)
    
    
    #filtering services by category              #change , make a list
    def getServicesByCategory(self, categoryName):
        category = self.categoryRepo.getCategoryByName(categoryName)
       
        if not category:
            return "Category not found"              # change ???
        
        categoryId = category['_id']
        services = self.coll.find({"categoryId": ObjectId(categoryId)})
        return list(services)
    
    #search for services by title 
    def getSearchedServicesByTitle(self, title):
        regex_query = Regex(f".*{title}.*", "i")
        services = list(self.coll.find({"title": regex_query}))
        return services



    
    

    