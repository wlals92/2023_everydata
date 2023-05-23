import pymysql

conn = pymysql.connect(
    host='localhost',
    port=3307,
    user='root',
    password='1014',
    db='everydata',
    charset='utf8mb4'
)

def search_subject(keyword):
    cursor = conn.cursor()
    query = "SELECT * FROM first_subjects WHERE subject_name LIKE %s"
    cursor.execute(query, ('%' + keyword + '%',))
    results = cursor.fetchall()
    cursor.close()
    return results

def main():
    while True:
        keyword = input("강의명을 입력하세요: ")
        if keyword == "q":
            break
        results = search_subject(keyword)
        print("검색 결과:")
        if results:
            for result in results:
                print("강의명: {}, 교수: {}, 구분: {}, 학수번호: {}, 시간: {}, 강의실: {}"
                      .format(result[5], result[8], result[1], result[4], result[9], result[10]))
        else:
            print("일치하는 항목이 없습니다.")

    conn.close()


if __name__ == "__main__":
    main()
