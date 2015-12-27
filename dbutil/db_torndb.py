__author__ = 'kyle_xiao'
#from __future__ import print_function
import asynctorndb
import tornado.gen
import time
from Entity.entity import Mentor

class Db(object):

    def __init__(self):
        self.db = asynctorndb.Connect(user='root', passwd='123321', database='gk')
        self.db.connect()
## mentor
    def getMentorList(self,number=5):
        result = self.db.query("select * from MENTOR limit {number}".format(number=number))
        mentor = Mentor()
        resultSet = mentor.setAttrByDict(result)
        return resultSet

    def addMentor(self):
        return None
## mentor
    def getLog(self,id):
        print "before:  "+str(time.time())
        result = self.db.query("select * from log where id ={id}".format(id = id))
        print "after:  "+str(time.time())
        return result

## test
    def sleep(self,t):
        self.db.execute("SELECT SLEEP({t})".format(t = t) )
        print "ok"
        return "ok"

## gk
    def insertUser(self):
        sql_string = "insert into "
        self.db.execute
