import mysql.connector

db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="123456",
    database="everydata",
    charset="utf8"
)

mycursor = db.cursor()


# 선호 공강 요일(단일선택), 선호 영역(복수선택), 과목 아이디를 리스트안에
subject_list = []
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
if "문학과문화" == True or "역사와철학" == True or "인간과사회" == True or "생명과환경" == True or "과학과기술" == True or "예술과체육" == True or "융복합영역" == True or "진로와개척" == True or "영어" == True or "글쓰기" == True or "디지털리터러시" == True or "외국어" == True or "인문" == True or "자연" == True:
    categories = ["문학과문화", "역사와철학", "인간과사회", "생명과환경", "과학과기술", "예술과체육", "융복합영역", "진로와개척", "영어", "글쓰기", "디지털리터러시", "외국어", "인문", "자연"]
day = "월"
categories = ["문학과문화"]
category_string = "'" + "', '".join(categories) + "'"
mycursor.execute(f"SELECT * FROM 1st_subjects WHERE lecture_time NOT LIKE '%{day}%' AND ge_category IN ({category_string})")
for subject_row in mycursor.fetchall():
    subject_list.append(subject_row)
    '''subject_list.append(tuple(cell.decode('utf-8') if isinstance(cell, bytes) else cell for cell in subject_row))
print(subject_list)'''


# 이수내역확인표 들은 과목 리스트 데이터베이스에서 찾기
ocr_list = [] # ocrSubjectsComplited에서 결과로 나온 리스트 사용
completed_subjects_list = []
for item in ocr_list:
    query = "SELECT * FROM 1st_subjects WHERE subject_name = %s"
    mycursor.execute(query, (item,))
    result = mycursor.fetchall()
    
    if result:
        completed_subjects_list.extend(result)
'''
print(completed_subjects_list)
'''

# 들은 과목 제외
subject_list = [item for item in subject_list if item not in completed_subjects_list]
'''
print(subject_list)
'''

# 현재 시간표 과목 리스트에 넣기
mycursor.execute("SELECT *\
                  FROM subjects_now \
                  JOIN 1st_subjects ON subjects_now.subjects_id = 1st_subjects.subjects_id \
                  JOIN user ON subjects_now.user_id = user.user_id")
subjects_now_list = []
for subject_now in mycursor.fetchall():
    subjects_now_list.append(subject_now)
    '''subjects_now_list.append(tuple(cell.decode('utf-8') if isinstance(cell, bytes) else cell for cell in subject_now))
print(subjects_now_list)'''

# 현재 시간표 과목들은 다 제외
subject_list = [item for item in subject_list if item not in subjects_now_list]
'''
print(subject_list)
'''

# 현재 시간표 시간을 받아오기, 시간을 리스트에 넣기 (학과별 들어야하는 교양 미리 넣어놔야 함)
mycursor.execute("SELECT 1st_subjects.lecture_time\
                  FROM subjects_now \
                  JOIN 1st_subjects ON subjects_now.subjects_id = 1st_subjects.subjects_id \
                  JOIN user ON subjects_now.user_id = user.user_id")
lecture_time_now = [elem for record in mycursor.fetchall() for elem in record.split(',')]

'''
for record in mycursor.fetchall():
       lecture_time = record[0].decode('utf8')
       lecture_time_now_list.extend(lecture_time.splite)
print(lecture_time_list)
'''

# 현재 시간표 시간의 과목들은 다 제외
lecture_time_now_days = []
for elem in lecture_time_now:
    lecture_time_now_days.extend(elem.splite(','))
recommend_list = []
for tpl in subject_list:
    days = tpl[9].splite(',')
    overlap = False
    for day in days:
        if day in lecture_time_now_days:
            overlap = True
            break
    if not overlap:
        result.append(tpl)

'''print(recommend_list)'''

# 듣고 싶은 학점 수(숫자만 입력가능, 학점계산후 조합 짜도록(코랩 코드 참조), 조합끼리 강의시간 겹치면 안됨(위 코드 참조))
import itertools

grade = int(input()) # 현재 시간표 넣은 학점 받아오기
num = int(input())

recommend_comb = []
for i in range(2, len(recommend_list)+1):
    for comb in itertools.comvinations(recommend_list, i):
        if sum([c[0] for c in comb]) == num:
            recommend_comb.append(list(comb))


time_list = [[t[9].split(',') for t in r] for r in result]
recommend_comb_list = [result[i] for i in range(len(result)) if all(len(set(a) & set(b)) == 0 for a, b in itertools.combinations(time_list[i], 2))]
'''
print(recommend_comb_list)
'''

'''
if recommend_comb:
    print(recommend_comb)

elif num + grade > 24:
    print("듣고싶은 학점과 현재학점의 합이 23학점을 초과해서 추천이 불가능 합니다.")

else:
    print(f"앞 숫자의 합이 {num}인 조합이 존재하지 않습니다.")
'''

# 랜덤 함수 이용해서 추천결과 나오도록(랜덤 조합 텍스트 파일에 저장하도록)
import random

recommend_random_choice = random.choice(recommend_comb_list)

recommend_comb_list.remove(recommend_random_choice)

print(recommend_random_choice)