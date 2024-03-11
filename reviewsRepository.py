from review import *
#from bdConnection import db
from bson.objectid import ObjectId


class ReviewsRepository:

    def __init__(self, db):
        self.coll = db.reviews

    # get all reviews about service 
    def getListOfServiceReviews(self, serviceId):
        service_reviews = self.coll.find({'serviceId': serviceId})
        
        list_reviews=[]
        for review in service_reviews:
            _id=review["_id"]
            userId=review["userId"]
            serviceId= review["serviceId"]
            rating=review["rating"]
            comment = review["comment"]
            review_date= review["review_date"]
            
            serviceReview= Review(_id,userId, serviceId, rating, comment, review_date)
            list_reviews.append(serviceReview)
        
        return list_reviews

    #create new comment and add to database
    def createReview(self,review, userConnection, serviceConnection):
        if(userConnection.userExistsById(review.userId)==True and  serviceConnection.serviceExistsById(review.serviceId)==True):
            new_review={ "userId": review.userId, "serviceId":review.serviceId, "rating": review.rating, "comment": review.comment, "review_date": review.review_date}
            result=self.coll.insert_one(new_review)
            return result.inserted_id
        else: 
            return None 

    # delete review by ID
    def deleteReview(self, reviewId):
        result = self.coll.delete_one({'_id': ObjectId(reviewId)})
        if(result.deleted_count==1):
            return True
        else:
            return False
    

    #delete all service's reviews 
    def deleteAllServiceReviews(self, serviceId):
        result = self.coll.delete_many({'serviceId': ObjectId(serviceId)})
        return result.deleted_count
    

    #delete all user's reviews 
    def deleteAllUserReviews(self, userId):
        result = self.coll.delete_many({'userId': ObjectId(userId)})
        return result.deleted_count


    # update review's data using ID
    def updateReview(self , review, reviewId):          
        result = self.coll.update_one(
        {'_id': ObjectId(reviewId)},
        {'$set': {
            'userId': review.userId,
            'serviceId': review.serviceId,
            'rating': review.rating,
            'comment': review.comment,
            'review_date': review.review_date
        }}
        )

        if result.modified_count > 0:
            return True
        else:
            return False