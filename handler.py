__author__ = 'kyle_xiao'
#coding=utf-8
import os.path
import json
from dbutil.db_torndb import Db
import tornado.httpserver
import tornado.ioloop
import tornado.options
import tornado.gen
import tornado.web
import asynctorndb
import sys
import datetime
from tornado.options import define, options
number =0
if sys.getdefaultencoding() != 'gbk':
 reload(sys)
 sys.setdefaultencoding('gbk')
define("port", default=8888, help="run on the given port", type=int)
settings = {
            "static_path": os.path.join(os.path.dirname(__file__), "static"),
            "template_path":os.path.join(os.path.dirname(__file__), "templates")
             }

class Application(tornado.web.Application):
    def __init__(self):
        handlers=[(r'/', IndexHandler),
                  (r'/login', LoginHandler),
                 (r'/signuporg', SignUpOrgHandler),
                  (r"/static", tornado.web.StaticFileHandler, dict(path=settings['static_path'])),]
        self.db = Db()
        tornado.web.Application.__init__(self, handlers, debug=True,**settings)

class IndexHandler(tornado.web.RequestHandler):

    @tornado.web.asynchronous
    @tornado.gen.coroutine
    def get(self):
        global number
        number = number+1
        db = self.application.db
        result = yield db.getLog(463)
        print repr(result)
        result = json.dumps(result,cls=DateEncoder)
        self.write(result)
        self.finish()
        #self.write(str(time1)+"\n")
        #self.write(str(time.time())+"\n")

class LoginHandler(tornado.web.RequestHandler):
    def post(self):
        self.redirect("/static/index.html")

class SignUpOrgHandler(tornado.web.RequestHandler):
    def post(self):
        self.redirect("/static/index.html")

class DateEncoder(json.JSONEncoder ):
  def default(self, obj):
    if isinstance(obj, datetime.datetime):
      return obj.__str__()
    return json.JSONEncoder.default(self, obj)

if __name__ == '__main__':
    tornado.options.parse_command_line()
    http_server = tornado.httpserver.HTTPServer(Application())
    http_server.listen(options.port)
    tornado.ioloop.IOLoop.instance().start()