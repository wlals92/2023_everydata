from tika import parser
import mysql.connector
import os
import subprocess
import sys

db = mysql.connector.connect(
            host="localhost",
            # port=3307,
            user="root",
            password="123456",
            database="everydata"
        )


file_id = sys.argv[1]

# SQL 쿼리
user_query = "SELECT user_id, subjects_completed_pdf FROM user"
completed_query = "SELECT user_id FROM subjects_completed"

try:
    # cursor 정의
    cursor = db.cursor()


    # 텍스트 파일 출력 폴더 생성
    output_folder = 'c:/Bitnami/wampstack-8.0.3-2/apache2/htdocs/txt'
    os.makedirs(output_folder, exist_ok=True)
    
    php_file = 'c:/Bitnami/wampstack-8.0.3-2/apache2/htdocs/php/ocr.php'
    php_file_c = 'c:/Bitnami/wampstack-8.0.3-2/apache2/htdocs/php/ocrCredit.php'
    
    pdf_path_query = "SELECT subjects_completed_pdf FROM user WHERE user_id = %s"
    cursor.execute(pdf_path_query, (file_id,))
    result = cursor.fetchone()
    pdf_path = result[0].decode() if result else None

    if pdf_path:
        print("Processing file ID:", file_id)

        # PDF를 텍스트로 변환
        try:
            parsed = parser.from_file(pdf_path)
            text_content = parsed['content']
            if text_content:
                output_filename = f'output_{file_id}.txt'
                output_path = os.path.join(output_folder, output_filename)
                # 텍스트 파일로 출력
                with open(output_path, 'w', encoding='utf-8') as txt_file:
                    txt_file.write(text_content)
                print("Text file created:", output_filename)
            else:
                print("Failed to extract text from PDF:", pdf_path)
        except Exception as e:
            print("Error occurred while parsing the PDF:", e)

    original_filename = f'output_{file_id}.txt'
    user_id_str = str(file_id)
    new_filename = f'output_{user_id_str}.txt'
    new_filename = new_filename.replace("bytearray(b'", "").replace("')", "")
    original_path = os.path.join(output_folder, original_filename)
    new_path = os.path.join(output_folder, new_filename)
    try:
        os.replace(original_path, new_path)
        print("File renamed:", original_filename, "->", new_filename)
        if 'bytearray' in user_id_str:
            file_id = user_id_str.replace("bytearray(b'", "").replace("')", "")
        result = subprocess.run(['php', 'ocr.php', str(file_id)], capture_output=True, text=True)
        result_c = subprocess.run(['php', 'ocrCredit.php', str(file_id)], capture_output=True, text=True)
        
        if result.returncode == 0:
            output = result.stdout
            output_c = result_c.stdout
            print("실행 결과:", output)
            print("실행 결과:", output_c)
            print("PHP 파일이 정상적으로 실행되었습니다.")
        else:
            print("PHP 파일 실행 중 오류가 발생하였습니다. 반환 코드:", result.returncode)
    
    except Exception as e:
        print("Error occurred while renaming the file:", e)
        
except mysql.connector.Error as error:
    print("Error occurred while executing the SQL query: ", error)



# DB 연결 종료
if db.is_connected():
    cursor.close()
    db.close()
    print("Database connection closed")
