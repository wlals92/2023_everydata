import pymysql

conn = pymysql.connect(
    host='localhost',
    port=3307,
    user='root',
    password='1014',
    db='everydata',
    charset='utf8mb4'
)

def get_first_subjects():
    cursor = conn.cursor()
    query = "SELECT * FROM first_subjects"
    cursor.execute(query)
    results = cursor.fetchall()
    cursor.close()
    return results

def get_second_subjects():
    cursor = conn.cursor()
    query = "SELECT * FROM second_subjects"
    cursor.execute(query)
    results = cursor.fetchall()
    cursor.close()
    return results

def main():
    semester = "1" 

    if semester == "1":
        results = get_first_subjects()
        table_name = "first_subjects"
    elif semester == "2":
        results = get_second_subjects()
        table_name = "second_subjects"
    else:
        print("Invalid semester selection.")
        return 


    if results:
        print("{:<15s} {:<15s} {:<15s} {:<15s} {:<15s} {:<15s}".format(
            "강의명", "교수", "구분", "학수번호", "시간", "강의실"))
        for result in results:
            subject_name = str(result[5])  # 강의명을 문자열로 변환
            professor = str(result[8])  # 교수를 문자열로 변환
            category = str(result[1])  # 구분을 문자열로 변환
            subject_number = str(result[4])  # 학수번호를 문자열로 변환
            lecture_time = str(result[9])  # 시간을 문자열로 변환
            lecture_room = str(result[10])  # 강의실을 문자열로 변환

            print("{:<15s} {:<15s} {:<15s} {:<15s} {:<15s} {:<15s}"
                  .format(subject_name, professor, category, subject_number, lecture_time, lecture_room))
    else:
        print("No subjects found in the {} table.".format(table_name))

    conn.close()

if __name__ == "__main__":
    main()
