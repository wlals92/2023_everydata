import pymysql

conn = pymysql.connect(host='localhost',
                       port=3307,
                       user='root',
                       password='1014',
                       db='everydata',
                       charset='utf8mb4')

day = "월"
time = "9"
curs = conn.cursor()
sql = (
    f"SELECT * FROM 2nd_subejcts WHERE lecture_time LIKE '%{day}%' AND lecture_time LIKE '%{time}%'")
curs.execute(sql,)
rows = curs.fetchall()
print(rows)

for row in rows:
    print(row)
    print(row[0], row[1], row[2])


conn.close()
conn = pymysql.connect(host='localhost',
                       port=3307,
                       user='root',
                       password='1014',
                       db='everydata',
                       charset='utf8mb4')
curs = conn.cursor()
sql = "select * from 2nd_subejcts where category=%s"
curs.execute(sql, '핵심교양')
rows = curs.fetchall()
print(rows)

for row in rows:
    print(row)
    print(row[0], row[1], row[2])

conn.close()

conn = pymysql.connect(host='localhost',
                       port=3307,
                       user='root',
                       password='1014',
                       db='everydata',
                       charset='utf8mb4')
curs = conn.cursor()
sql = "select * from 2nd_subjects where category=%s"
curs.execute(sql, '기초교양')
rows = curs.fetchall()
print(rows)

for row in rows:
    print(row)
    print(row[0], row[1], row[2])


conn.close()

conn = pymysql.connect(host='localhost',
                       port=3307,
                       user='root',
                       password='1014',
                       db='everydata',
                       charset='utf8mb4')
curs = conn.cursor()
sql = "select * from 2nd_subjects where category=%s"
curs.execute(sql, '균형교양')
rows = curs.fetchall()
print(rows)

for row in rows:
    print(row)
    print(row[0], row[1], row[2])


conn.close()

conn = pymysql.connect(host='localhost',
                       port=3307,
                       user='root',
                       password='1014',
                       db='everydata',
                       charset='utf8mb4')
curs = conn.cursor()
sql = "select * from 2nd_subjects where category=%s"
curs.execute(sql, '교직')
rows = curs.fetchall()
print(rows)

for row in rows:
    print(row)
    print(row[0], row[1], row[2])


conn.close()

conn = pymysql.connect(host='localhost',
                       port=3307,
                       user='root',
                       password='1014',
                       db='everydata',
                       charset='utf8mb4')
curs = conn.cursor()
sql = "select * from 2nd_subjects where category=%s"
curs.execute(sql, '일반선택')
rows = curs.fetchall()
print(rows)

for row in rows:
    print(row)
    print(row[0], row[1], row[2])


conn.close()

conn = pymysql.connect(host='localhost',
                       port=3307,
                       user='root',
                       password='1014',
                       db='everydata',
                       charset='utf8mb4')
curs = conn.cursor()
sql = "select * from 2nd_subjects where category=%s"
curs.execute(sql, '전공선택')
rows = curs.fetchall()
print(rows)

for row in rows:
    print(row)
    print(row[0], row[1], row[2])


conn.close()

conn = pymysql.connect(host='localhost',
                       port=3307,
                       user='root',
                       password='1014',
                       db='everydata',
                       charset='utf8mb4')
curs = conn.cursor()
sql = "select * from 2nd_subjects where category=%s"
curs.execute(sql, '전공필수')
rows = curs.fetchall()
print(rows)

for row in rows:
    print(row)
    print(row[0], row[1], row[2])


conn.close()
