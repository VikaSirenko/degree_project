from user import *
#from bdConnection import db
from bson.objectid import ObjectId
import hashlib



class UsersRepository:
    def __init__(self, db):
        self.coll = db.users
        

    # get list of all users from database 
    def getListOfUsers(self):               
        all_users = self.coll.find()
        list_users = []
        for user in all_users:               
            _id = user["_id"]
            firstName = user["firstName"]
            lastName = user["lastName"]
            email = user["email"]
            password = user["password"]
            web_user = User(_id, firstName, lastName, email, password)    
            list_users.append(web_user)
        return list_users


    # check whether a user with such an e-mail exists
    def userExist(self,userEmail):          
        query = {"email": userEmail}
        user=self.coll.find_one(query)
        if(user!=None):
            return True
        else:
            return False


    # find user data by e-mail
    def getUserByEmail(self, email):        
        query = {"email": email}
        user = self.coll.find_one(query)
        _id = user["_id"]
        firstName = user["firstName"]
        lastName = user["lastName"]
        email = user["email"]
        password = user["password"]
        web_user = User(_id, firstName, lastName, email, password)  
        return web_user
        

    # check whether the user with the ID exists
    def userExistsById(self, user_id):          
        query = {'_id': ObjectId(user_id)}
        user=self.coll.find_one(query)
        if(user!=None):
            return True
        else:
            return False


    # find user data by ID
    def getUserById(self, user_id):              
        query = {'_id': ObjectId(user_id)}
        user = self.coll.find_one(query)
        _id = user["_id"]
        firstName = user["firstName"]
        lastName = user["lastName"]
        email = user["email"]
        password = user["password"]
        web_user = User(_id, firstName, lastName, email, password)  
        return web_user


    # check whether the user has entered the correct e-mail and password and can be admitted to the system
    def userExistForSignIn(self,userEmail, password):                       
        hashed_password = hashlib.sha256(password.encode()).hexdigest()
        query = {"email": userEmail, "password": hashed_password}
        user=self.coll.find_one(query)
        if(user!=None):
            return True
        else:
            return False


    # create user  and add to database 
    def createUser(self, user):                             
        if(self.userExist(user.email)==False):
            new_user={ "firstName":user.firstName, "lastName":user.lastName, "email":user.email, "password": user.password}
            result=self.coll.insert_one(new_user)
            return result.inserted_id
        else: 
            return None 


    # delete user by ID
    def deleteUserByID(self, user_id):                       
        result = self.coll.delete_one({'_id': ObjectId(user_id)})
        if result.deleted_count > 0:
            return True
        else:
            return False


    # update user`s data using ID
    def updateUser(self , user , user_id):          
        result = self.coll.update_one(
        {'_id': ObjectId(user_id)},
        {'$set': {
            'firstName': user.firstName,
            'lastName': user.lastName,
            'email': user.email,
            'password': user.password
        }}
        )

        if result.modified_count > 0:
            return True
        else:
            return False
