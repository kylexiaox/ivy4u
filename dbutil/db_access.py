__author__ = 'kyle_xiao'

#from __future__ import print_function
from tornado import ioloop, gen
from tornado_mysql import pools
import random

pools.DEBUG = True


class DBpool(object):
    _pool = None
    def __init__(self):
        self._pool = pools.Pool(
            dict(host='127.0.0.1', port=3306, user='root', passwd='123321', db='ivy'),
            max_idle_connections=1,
            max_recycle_sec=3)

    @gen.coroutine
    def worker(self,n):
        t = 1
        print(n, "sleeping", t, "seconds")
        cur = yield self._pool.execute("SELECT SLEEP(%s)", (t,))
        print(n, cur.fetchall())
        yield gen.sleep(t)

    ioloop.IOLoop.current().run_sync(worker)
    print(_pool._opened_conns)


# if __name__ == "__main__":
#     db = DBpool()
#     db.worker(10)
