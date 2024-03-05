class Category:
    def __init__(self, category_id, category_name):
        self.__category_id = category_id
        self.category_name = category_name

    @property
    def category_id(self):
        return self.__category_id

    