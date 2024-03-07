import hashlib

class User(object):
    def __init__(self, _id, firstName, lastName, email, password):
        self.__id = _id  
        self.firstName = firstName
        self.lastName = lastName
        self.email = email
        self.__password = self._passwordHashing(password)  

    def _passwordHashing(self, password):
        hashed_password = hashlib.sha256(password.encode()).hexdigest()
        return hashed_password

    @property
    def id(self):
        return self.__id

    @property
    def password(self):
        return self.__password

    @password.setter
    def password(self, password):
        self.__password=password

    def change_password(self, new_password):
        self.__password = self._passwordHashing(new_password)