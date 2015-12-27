import MySQLdb
import shutil
import sys
# this script is about to build up a package of entity classes for MVC modular
# first, you should build up a database schema.
# and this script may build a set of entities class to map the database tables
# run the main function and input the database info


__path = "Entity\\"


def __entity_main_file():
    """
    copy the entity files to the work directory
    :return:
    """
    shutil.copy("entity.py", __path+"entity.py")


def __entity_generator(name, properties):
    """
    generate entity files
    :param name:
    :param properties:
    :return:
    """
    f = open(__path+name + ".py", 'w')
    f.write("#this file is auto generated\n")
    f.write("from Entity.entity import Entity\n")
    f.write("class " + name.capitalize() + "(Entity):\n")
    f.write("    def __init__")
    property_string = "(self,"
    for p in properties:
        property_string = property_string + str(p) + "=None,"
    f.write(property_string + "):\n")
    for p in properties:
        f.write("        self." + str(p) + "=" + str(p) + "\n")
    f.close()


def __get_database_schema(host,user,passwd,database_schema):
    """
    get database schema and generate the entity files
    :param host: database hostname or ip
    :param user: database user name
    :param passwd: database password
    :param database_schema: database schema name
    :return: None
    """
    conn = MySQLdb.connect(host,user,passwd)
    conn.select_db(database_schema)
    cur = conn.cursor()
    cur.execute("select table_name from information_schema.tables where "
                "='{database_schema}'' and table_type='base "
                "table'".format(database_schema=database_schema))
    re = cur.fetchall()
    for r in re:
        cur.execute("DESC "+r[0])
        result = cur.fetchall()
        properties =[]
        for r1 in result:
            properties.append(r1[0])
        __entity_generator(r[0],properties)


def main(argv):
    """
    main script
    :param argv: database_host,database_user,database_password,database_schema
    :return:
    """
    __entity_main_file()
    __get_database_schema(argv[0],argv[1],argv[2],argv[3])
if __name__ == '__main__':
    main(sys.argv)