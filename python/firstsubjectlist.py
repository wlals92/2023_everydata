import pymysql


conn = pymysql.connect(host='localhost',
                       port=3307,
                       user='root',
                       password='1014',
                       db='everydata',
                       charset='utf8mb4')

