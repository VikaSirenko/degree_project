class Category:
    def __init__(self, _id, categoryName):
        self.__categoryId = _id
        self.categoryName = categoryName

    @property
    def id(self):
        return self.__categoryId

    