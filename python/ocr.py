
from tika import parser # pdf를 txt파일로 변환
import mysql.connector

# DB 연결
db = mysql.connector.connect(
  host="localhost",
  port=3307,
  
  user="root",
  password="0000",
  database="everydata"
  
)

# SQL 쿼리
user_query = "SELECT user_id, subjects_completed_pdf FROM user"
completed_query = "SELECT user_id FROM subjects_completed"

cursor = db.cursor()

cursor.execute(user_query)
user_results = cursor.fetchall()


cursor.execute(completed_query)
completed_results = cursor.fetchall()

user_ids = [result[0] for result in user_results]
completed_ids = [result[0] for result in completed_results]
missing_ids = [user_id for user_id in user_ids if user_id not in completed_ids]


for file_id in missing_ids:
    pdf_path_query = "SELECT subjects_completed_pdf FROM user WHERE user_id = %s"
    cursor.execute(pdf_path_query, (file_id,))
    result = cursor.fetchone()
    pdf_path = result[0] if result else None

    if pdf_path:
        parsed = parser.from_file(pdf_path)
        txt = open(f'output_{file_id}.txt', 'w', encoding='utf-8')
        print(parsed['content'], file = txt)
        txt.close()
        
db.close()

# pdf_path = "C:\mysql_data\skatjfls.pdf"/
# parsed = parser.from_file(pdf_path)
# txt = open('output.txt', 'w', encoding = 'utf-8')
# print(parsed['content'], file = txt)
# txt.close()

def read_txt(filename, sep='', encoding='utf-8'):
    str = ''
    with open(filename, 'r', encoding=encoding) as file:
        str = file.readlines()
        for i in range(len(str)):
            str[i] = str[i].strip().split(sep)
    return str

    
    file.close()

l1 = read_txt("output.txt", "\n") # 리스트를 띄어쓰기별로 구분
l2 = [elem for elem in l1 if elem != ['']]
final_lst = []
for row in l2:
    new_row = []
    for elem in row:
        new_row.extend(elem.split())
    final_lst.append(new_row)

# ['공통(12년)/공통(13년)/역량(17년)/핵심(22년)'] 요소 이전의 모든 요소를 제거
new_list = final_lst[final_lst.index(['공통(12년)/공통(13년)/역량(17년)/핵심(22년)']):]
# 이수한 과목(년도, 학수번호, 과목명, 영역구분, 학점(credit), 성적)이 들어있는 값만 새로이 저장. 기준은 첫번째 요소가 '2'로 시작하면 됨 
my_list = new_list = [item for item in new_list if isinstance(item, list) and len(item) > 0 and str(item[0]).startswith('2')]


print(my_list)
def save_list_to_txt(lst, filename, encoding='utf-8'):
    with open(filename, 'w', encoding=encoding) as file:
        for item in lst:
            file.write(' '.join(item) + '\n')

save_list_to_txt(my_list, "my_list.txt")
