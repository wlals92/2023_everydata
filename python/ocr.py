# pip install tika # tika 라이브러리 설치

from tika import parser # pdf를 txt파일로 변환
pdf_path = "C:\mysql_data\skatjfls.pdf"
parsed = parser.from_file(pdf_path)
txt = open('output.txt', 'w', encoding = 'utf-8')
print(parsed['content'], file = txt)
txt.close()

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

print(final_lst)