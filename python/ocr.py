from tika import parser
import mysql.connector
import os

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

# 사용자 정보 쿼리 실행
cursor.execute(user_query)
user_results = cursor.fetchall()

# 완료된 과목 정보 쿼리 실행
cursor.execute(completed_query)
completed_results = cursor.fetchall()

# 사용자 ID 목록과 완료된 ID 목록 추출
user_ids = [result[0] for result in user_results]
completed_ids = [result[0] for result in completed_results]

# 미완료된 ID 목록 추출
missing_ids = [user_id for user_id in user_ids if user_id not in completed_ids]

# 텍스트 파일 출력 폴더 생성
output_folder = 'txt'
os.makedirs(output_folder, exist_ok=True)

# 미완료된 ID에 대해 처리 수행
for file_id in missing_ids:
    # PDF 경로 쿼리 실행
    pdf_path_query = "SELECT subjects_completed_pdf FROM user WHERE user_id = %s"
    cursor.execute(pdf_path_query, (file_id,))
    result = cursor.fetchone()
    pdf_path = result[0] if result else None

    if pdf_path:
        # PDF를 텍스트로 변환
        parsed = parser.from_file(pdf_path)
        output_filename = f'output_{file_id}.txt'
        output_path = os.path.join(output_folder, output_filename)
        
        # 텍스트 파일로 출력
        with open(output_path, 'w', encoding='utf-8') as txt_file:
            txt_file.write(parsed['content'])

# 파일명 변경 및 txt 폴더로 이동
for file_id in missing_ids:
    original_filename = f'output_{file_id}.txt'
    user_id_str = file_id.decode('utf-8')  # bytes-like 객체인 경우 문자열로 변환
    new_filename = f'output_{user_id_str}.txt'  # 변경된 파일명
    new_filename = new_filename.replace("bytearray(b'", "").replace("')", "")  # bytearray 관련 부분 제거
    original_path = os.path.join(output_folder, original_filename)  # 경로 수정
    new_path = os.path.join(output_folder, new_filename)
    os.replace(original_path, new_path)





