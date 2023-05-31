# SQL 쿼리
# user_query = "SELECT user_id, subjects_completed_pdf FROM user"
# completed_query = "SELECT user_id FROM subjects_completed"

# try:
    # # cursor 정의
    # cursor = db.cursor()

    # # 사용자 정보 쿼리 실행
    # cursor.execute(user_query)
    # user_results = cursor.fetchall()

    # # 완료된 과목 정보 쿼리 실행
    # cursor.execute(completed_query)
    # completed_results = cursor.fetchall()

    # # 사용자 ID 목록과 완료된 ID 목록 추출
    # user_ids = [result[0] for result in user_results]
    # completed_ids = [result[0] for result in completed_results]

    # # 중복된 값을 제거하여 유일한 값만 남김
    # completed_ids = list(filter(lambda x: x in user_ids, completed_ids))

    # print("user_ids:", user_ids)
    # print("completed_ids:", completed_ids)



    # # 미완료된 ID 목록 추출
    # missing_ids = [user_id for user_id in user_ids if user_id not in completed_ids]
    # print("Missing IDs:", missing_ids)

    # # 텍스트 파일 출력 폴더 생성
    # output_folder = 'c:/Bitnami/wampstack-8.0.3-2/apache2/htdocs/txt'
    # os.makedirs(output_folder, exist_ok=True)
    
    # php_file = 'c:/Bitnami/wampstack-8.0.3-2/apache2/htdocs/php/ocr.php'
    # php_file_c = 'c:/Bitnami/wampstack-8.0.3-2/apache2/htdocs/php/ocrCredit.php'
    # pdf_path_query = "SELECT subjects_completed_pdf FROM user WHERE user_id = %s"
    # cursor.execute(pdf_path_query, (file_id,))
    # result = cursor.fetchone()
    # pdf_path = result[0].decode() if result else None

    # if pdf_path:
    #     print("Processing file ID:", file_id)

    #         # PDF를 텍스트로 변환
    #     try:
    #         parsed = parser.from_file(pdf_path)
    #         text_content = parsed['content']
    #         if text_content:
    #             output_filename = f'output_{file_id}.txt'
    #             output_path = os.path.join(output_folder, output_filename)
    #             # 텍스트 파일로 출력
    #             with open(output_path, 'w', encoding='utf-8') as txt_file:
    #                 txt_file.write(text_content)
    #             print("Text file created:", output_filename)
    #         else:
    #             print("Failed to extract text from PDF:", pdf_path)
    #     except Exception as e:
    #         print("Error occurred while parsing the PDF:", e)
    # 미완료된 ID에 대해 처리 수행
    # for file_id in missing_ids:
    #     # PDF 경로 쿼리 실행
    #     pdf_path_query = "SELECT subjects_completed_pdf FROM user WHERE user_id = %s"
    #     cursor.execute(pdf_path_query, (file_id,))
    #     result = cursor.fetchone()
    #     pdf_path = result[0].decode() if result else None

    #     if pdf_path:
    #         print("Processing file ID:", file_id)

    #         # PDF를 텍스트로 변환
    #         try:
    #             parsed = parser.from_file(pdf_path)
    #             text_content = parsed['content']
    #             if text_content:
    #                 output_filename = f'output_{file_id}.txt'
    #                 output_path = os.path.join(output_folder, output_filename)

    #                 # 텍스트 파일로 출력
    #                 with open(output_path, 'w', encoding='utf-8') as txt_file:
    #                     txt_file.write(text_content)
    #                 print("Text file created:", output_filename)
    #             else:
    #                 print("Failed to extract text from PDF:", pdf_path)
    #         except Exception as e:
    #             print("Error occurred while parsing the PDF:", e)
    # original_filename = f'output_{file_id}.txt'
    # user_id_str = str(file_id)
    # new_filename = f'output_{user_id_str}.txt'
    # new_filename = new_filename.replace("bytearray(b'", "").replace("')", "")
    # original_path = os.path.join(output_folder, original_filename)
    # new_path = os.path.join(output_folder, new_filename)
    # try:
    #     os.replace(original_path, new_path)
    #     print("File renamed:", original_filename, "->", new_filename)
    #     if 'bytearray' in user_id_str:
    #         file_id = user_id_str.replace("bytearray(b'", "").replace("')", "")
    #     result = subprocess.run(['php', php_file, str(file_id)], capture_output=True, text=True)
    #     result_c = subprocess.run(['php', php_file_c, str(file_id)], capture_output=True, text=True)
        
    #     if result.returncode == 0:
    #         output = result.stdout
    #         output_c = result_c.stdout
    #         print("실행 결과:", output)
    #         print("실행 결과:", output_c)
    #         print("PHP 파일이 정상적으로 실행되었습니다.")
    #     else:
    #         print("PHP 파일 실행 중 오류가 발생하였습니다. 반환 코드:", result.returncode)
        
    # except Exception as e:
    #     print("Error occurred while renaming the file:", e)
    # 파일명 변경 및 txt 폴더로 이동
    # for file_id in missing_ids:
        
    #     original_filename = f'output_{file_id}.txt'
    #     user_id_str = str(file_id)
    #     new_filename = f'output_{user_id_str}.txt'
    #     new_filename = new_filename.replace("bytearray(b'", "").replace("')", "")
    #     original_path = os.path.join(output_folder, original_filename)
    #     new_path = os.path.join(output_folder, new_filename)
    #     try:
    #         os.replace(original_path, new_path)
    #         print("File renamed:", original_filename, "->", new_filename)
    #         if 'bytearray' in user_id_str:
    #             file_id = user_id_str.replace("bytearray(b'", "").replace("')", "")
    #         result = subprocess.run(['php', php_file, str(file_id)], capture_output=True, text=True)
    #         result_c = subprocess.run(['php', php_file_c, str(file_id)], capture_output=True, text=True)
            
    #         if result.returncode == 0:
    #             output = result.stdout
    #             output_c = result_c.stdout
    #             print("실행 결과:", output)
    #             print("실행 결과:", output_c)
    #             print("PHP 파일이 정상적으로 실행되었습니다.")
    #         else:
    #             print("PHP 파일 실행 중 오류가 발생하였습니다. 반환 코드:", result.returncode)
            
    #     except Exception as e:
    #         print("Error occurred while renaming the file:", e)

# except mysql.connector.Error as error:
#     print("Error occurred while executing the SQL query: ", error)

# # DB 연결 종료
# if db.is_connected():
#     cursor.close()
#     db.close()
#     print("Database connection closed")





    # # 사용자 정보 쿼리 실행
    # cursor.execute(user_query)
    # user_results = cursor.fetchall()

    # # 완료된 과목 정보 쿼리 실행
    # cursor.execute(completed_query)
    # completed_results = cursor.fetchall()

    # # 사용자 ID 목록과 완료된 ID 목록 추출
    # user_ids = [result[0] for result in user_results]
    # completed_ids = [result[0] for result in completed_results]

    # # 중복된 값을 제거하여 유일한 값만 남김
    # completed_ids = list(filter(lambda x: x in user_ids, completed_ids))

    # print("user_ids:", user_ids)
    # print("completed_ids:", completed_ids)



    # # 미완료된 ID 목록 추출
    # missing_ids = [user_id for user_id in user_ids if user_id not in completed_ids]
    # print("Missing IDs:", missing_ids)
    # 미완료된 ID에 대해 처리 수행
    # for file_id in missing_ids:
    #     # PDF 경로 쿼리 실행
    #     pdf_path_query = "SELECT subjects_completed_pdf FROM user WHERE user_id = %s"
    #     cursor.execute(pdf_path_query, (file_id,))
    #     result = cursor.fetchone()
    #     pdf_path = result[0].decode() if result else None

    #     if pdf_path:
    #         print("Processing file ID:", file_id)

    #         # PDF를 텍스트로 변환
    #         try:
    #             parsed = parser.from_file(pdf_path)
    #             text_content = parsed['content']
    #             if text_content:
    #                 output_filename = f'output_{file_id}.txt'
    #                 output_path = os.path.join(output_folder, output_filename)

    #                 # 텍스트 파일로 출력
    #                 with open(output_path, 'w', encoding='utf-8') as txt_file:
    #                     txt_file.write(text_content)
    #                 print("Text file created:", output_filename)
    #             else:
    #                 print("Failed to extract text from PDF:", pdf_path)
    #         except Exception as e:
    #             print("Error occurred while parsing the PDF:", e)
        # # 파일명 변경 및 txt 폴더로 이동
    # for file_id in missing_ids:
        
    #     original_filename = f'output_{file_id}.txt'
    #     user_id_str = str(file_id)
    #     new_filename = f'output_{user_id_str}.txt'
    #     new_filename = new_filename.replace("bytearray(b'", "").replace("')", "")
    #     original_path = os.path.join(output_folder, original_filename)
    #     new_path = os.path.join(output_folder, new_filename)
    #     try:
    #         os.replace(original_path, new_path)
    #         print("File renamed:", original_filename, "->", new_filename)
    #         if 'bytearray' in user_id_str:
    #             file_id = user_id_str.replace("bytearray(b'", "").replace("')", "")
    #         result = subprocess.run(['php', php_file, str(file_id)], capture_output=True, text=True)
    #         result_c = subprocess.run(['php', php_file_c, str(file_id)], capture_output=True, text=True)
            
    #         if result.returncode == 0:
    #             output = result.stdout
    #             output_c = result_c.stdout
    #             print("실행 결과:", output)
    #             print("실행 결과:", output_c)
    #             print("PHP 파일이 정상적으로 실행되었습니다.")
    #         else:
    #             print("PHP 파일 실행 중 오류가 발생하였습니다. 반환 코드:", result.returncode)
            
    #     except Exception as e:
    #         print("Error occurred while renaming the file:", e)







# # 남서린 작성
# app = Flask(__name__)
# @app.route('/execute-python-script', methods=['POST'])
# def execute_python_script():
#     data = request.get_json()
#     user_id = data.get('userId')

#     # 유저 아이디를 활용한 파이썬 스크립트 실행
#     result = run_python_script(user_id)

#     return jsonify(result)

# def initialize_db_connection():
#     try:
#         db = mysql.connector.connect(
#             host="localhost",
#             # port=3307,
#             user="root",
#             password="123456",
#             database="everydata"
#         )
#         print("Connected to the database")
#         return db
#     except mysql.connector.Error as error:
#         print("Failed to connect to the database: ", error)
#         return None

# def run_python_script(user_id):
#     db = initialize_db_connection()
#     if db is None:
#         return {
#             'status': 'error',
#             'message': 'Failed to connect to the database'
#         }
#     py_result = {
#         'status': 'success',
#         'message': '파이썬 스크립트 실행 결과',
#         'userId': user_id
#     }
#     try:
#         # cursor 정의
#         cursor = db.cursor()
        
#         # 텍스트 파일 출력 폴더 생성
#         output_folder = 'c:/Bitnami/wampstack-8.0.3-2/apache2/htdocs/txt'
#         os.makedirs(output_folder, exist_ok=True)
        
#         php_file = 'c:/Bitnami/wampstack-8.0.3-2/apache2/htdocs/php/ocr.php'
#         php_file_c = 'c:/Bitnami/wampstack-8.0.3-2/apache2/htdocs/php/ocrCredit.php'
#         pdf_path_query = "SELECT subjects_completed_pdf FROM user WHERE user_id = %s"
#         cursor.execute(pdf_path_query, (user_id,))
#         result = cursor.fetchone()
#         pdf_path = result[0].decode() if result else None
        
#         if pdf_path:
#             print("Processing file ID:", user_id)

#                 # PDF를 텍스트로 변환
#             try:
#                 parsed = parser.from_file(pdf_path)
#                 text_content = parsed['content']
#                 if text_content:
#                     output_filename = f'output_{user_id}.txt'
#                     output_path = os.path.join(output_folder, output_filename)
#                     # 텍스트 파일로 출력
#                     with open(output_path, 'w', encoding='utf-8') as txt_file:
#                         txt_file.write(text_content)
#                     print("Text file created:", output_filename)
#                 else:
#                     print("Failed to extract text from PDF:", pdf_path)
#             except Exception as e:
#                 print("Error occurred while parsing the PDF:", e)
        
#         original_filename = f'output_{user_id}.txt'
#         user_id_str = str(user_id)
#         new_filename = f'output_{user_id_str}.txt'
#         new_filename = new_filename.replace("bytearray(b'", "").replace("')", "")
#         original_path = os.path.join(output_folder, original_filename)
#         new_path = os.path.join(output_folder, new_filename)
#         try:
#             os.replace(original_path, new_path)
#             print("File renamed:", original_filename, "->", new_filename)
#             if 'bytearray' in user_id_str:
#                 user_id = user_id_str.replace("bytearray(b'", "").replace("')", "")
#             result = subprocess.run(['php', php_file, str(user_id)], capture_output=True, text=True)
#             result_c = subprocess.run(['php', php_file_c, str(user_id)], capture_output=True, text=True, check=True)
            
#             if result.returncode == 0:
#                 py_result['ocr'] = result.stdout
#                 py_result['credit'] = result_c.stdout
#             else:
#                 print("PHP 파일 실행 중 오류가 발생하였습니다. 반환 코드:", result.returncode)
#                 py_result['status'] = 'error'
#                 py_result['message'] = 'PHP 파일 실행 중 오류가 발생하였습니다.'
            
#         except Exception as e:
#             print("Error occurred while renaming the file:", e)
#             py_result['status'] = 'error'
#             py_result['message'] = '파일 이름 변경 중 오류가 발생하였습니다.'
#     except mysql.connector.Error as error:
#         print("Error occurred while executing the SQL query: ", error)
    

    
#     # DB 연결 종료
#     if db.is_connected():
#         cursor.close()
#         db.close()
#         print("Database connection closed")
#     return jsonify(py_result)

# if __name__ == '__main__':
#     app.run(host='localhost', port=5000)
    