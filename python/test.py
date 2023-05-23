import pymysql

conn = pymysql.connect(
    host="localhost",
    port=3307,
    user="root",
    password="1014",
    db="everydata",
    charset="utf8mb4",
)
try:
    with conn.cursor() as cursor:
        # 첫번째 쿼리 실행
        day = "월"
        time = "9"
        sql1 = f"SELECT * FROM first_subjects WHERE lecture_time LIKE '%{day}%' AND lecture_time LIKE '%{time}%'"
        cursor.execute(
            sql1,
        )
        result1 = cursor.fetchall()
        # 두번째 쿼리 실행
        day = "월"
        time = "9"
        sql2 = f"SELECT * FROM second_subjects WHERE lecture_time LIKE '%{day}%' AND lecture_time LIKE '%{time}%'"
        cursor.execute(
            sql2,
        )
        result2 = cursor.fetchall()

        # 결과 출력
        print("Result 1:")
        for row in result1:
            print(row)

        print("Result 2:")
        for row in result2:
            print(row)

finally:
    # MySQL 연결 종료
    conn.close()
