class Country:
    def __init__(self, country_id, country_name):
        self.__country_id = country_id
        self.__country_name = country_name

    @property
    def country_id(self):
        return self.__country_id
