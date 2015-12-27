__author__ = 'kyle_xiao'
# coding=utf-8

class Entity(object):
    """
    this class is about to build up the entity class for Model modular in MVC structure
    the entity class and its subclass can only contains the 'list','tuple','dict','set' and
    the object inherited by this class. this class use the dict as the default mapping structure

    this class provide two primary methods.
    _set_attr_ is convert the class elements to the python default data structure object.
    _get_attr_ is convert the python default data structure to the entity object.

    Notice: must keep the variable name identity in all layer(database or json)
    """
    def _set_attr_(self, obj):
        """
        :param obj:structured data
        :return: None
        :raise StandardError: which contain message"invalid property name“
        """
        for property in obj:
            if not hasattr(self, '_' + property):
                raise StandardError("invalid property name")
                self.__setattr__(property, dict[property])


    def _get_attr_(self):
        """
        :return: structured data using default python structure
        """
        dic = {}
        for k in self.__dict__:
            try:
                temp = self.__getattribute__(k)
                dic[k]=temp._get_attr_to_dict()
            except AttributeError,e:
                    dic[k]=self.__data_handler(temp)
        return dic

    def __data_handler(self,obj):
        """
        private methods for handle the unstructured data
        :param obj: object except the entity class
        :return: structured data
        """
        if type(obj)==dict:
            dic = {}
            for d in obj:
                try:
                    dic[d] = obj[d]._get_attr_to_dict()
                except AttributeError,e:
                    dic[d] = obj[d]
            return dic
        elif type(obj)==list:
            l = []
            for d in obj:
                try:
                    l.append(d._get_attr_to_dict())
                except AttributeError,e:
                    l.append(d)
            return l
        elif type(obj)==tuple:
            t = []
            for d in obj:
                try:
                    t.append(d._get_attr_to_dict())
                except AttributeError,e:
                    t.append(d)
            return tuple(t)
        elif type(obj)==tuple:
            s = ([])
            for d in obj:
                try:
                    s.add(d._get_attr_to_dict())
                except AttributeError,e:
                    s.add(d)
            return s
        else:
            return obj

