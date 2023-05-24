#khulan
#mysql연동
import pymysql

conn = pymysql.connect(
    host='localhost',
    port=3307,
    user='root',
    password='1014',
    db='everydata',
    charset='utf8mb4'
)

#강의명으로 검색할 검색창 1학기
def search_subject(keyword):
    cursor = conn.cursor()
    query = "SELECT * FROM first_subjects WHERE subject_name LIKE %s"
    cursor.execute(query, ('%' + keyword + '%',))
    results = cursor.fetchall()
    cursor.close()
    return results

#데 아니면 데이터 적성하면 검색어와 포함된건 다 출력
def main():
    
    '''subject_list = []
    if "월" == True:
        day = "월"
    elif "화" == True:
        day = "화" 
    elif "수" == True:
        day = "수"
    elif "목" == True:
        day = "목"
    elif "금" == True:
        day = "금"
    elif "토" == True:
        day = "토"
        
    if "1" == True:
        time = "1"
    elif "2" == True:
        time = "2" 
    elif "3" == True:
        time = "3"
    elif "4" == True:
        time = "4"
    elif "5" == True:
        time = "5"
    elif "6" == True:
        time = "6"
    elif "7" == True:
        time = "7"
    elif "8" == True:
        time = "8"
    elif "9" == True:
        time = "9"
    
    day = ""
    time =""
    cursor = conn.cursor()
    cursor.execute(f"SELECT * FROM first_subjects WHERE lecture_time LIKE '%{day}%' AND lecture_time LIKE '%{time}%'")
    if cursor.fetchall():
            print("{:<15s} {:<15s} {:<15s} {:<15s} {:<15s} {:<15s}".format(
                "강의명", "교수", "구분", "학수번호", "시간", "강의실"))
            for subject_row in cursor.fetchall():
                subject_list.append(subject_row)
                subject_name = str(subject_row[5])
                professor = str(subject_row[8])
                category = str(subject_row[1])
                subject_number = str(subject_row[4])
                lecture_time = str(subject_row[9])
                lecture_room = str(subject_row[10])
                print("{:<15s} {:<15s} {:<15s} {:<15s} {:<15s} {:<15s}".format(
                    subject_name, professor, category, subject_number, lecture_time, lecture_room))

    cursor.close()'''
    

    while True:
        keyword = input("강의명을 입력하세요: ")
        if keyword == "q":
            break
        results = search_subject(keyword)
        if results:
            print("{:<15s} {:<15s} {:<15s} {:<15s} {:<15s} {:<15s}".format(
                "강의명", "교수", "구분", "학수번호", "시간", "강의실"))
            for result in results:
                subject_name = str(result[5])
                professor = str(result[8])
                category = str(result[1])
                subject_number = str(result[4])
                lecture_time = str(result[9])
                lecture_room = str(result[10])
                print("{:<15s} {:<15s} {:<15s} {:<15s} {:<15s} {:<15s}".format(
                    subject_name, professor, category, subject_number, lecture_time, lecture_room))
                
        else:
            print("일치하는 항목이 없습니다.")

    conn.close()

if __name__ == "__main__":
    main()
