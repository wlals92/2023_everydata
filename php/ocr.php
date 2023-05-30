<?php
require_once("dbConfig.php");

// user 테이블에서 user_id 가져올 때 어떤 유저걸 가져올건지만 잘 생각해서 하면 될 것 같아요!
// user 테이블에서 user_id 가져오기
// $query = "SELECT user_id FROM user";
// $result = $db->query($query);

// if ($result->num_rows > 0) {
//     $row = $result->fetch_assoc();
//     $user_id = $row["user_id"];
// } else {
//     echo "No records found.";
//     exit;
// }

$user_id = 'dlwlals1234';
// OCR.py에서 생성된 txt 파일 경로
$txtFilePath = 'C:/Bitnami/wampstack-8.0.3-2/apache2/htdocs/txt/output_' . $user_id . '.txt';

// 파일 존재 여부 확인
if (!file_exists($txtFilePath)) {
    echo "File not found.";
    exit;
}

// 파일 내용을 읽어옴
$fileContents = file_get_contents($txtFilePath);

// 줄 단위로 분할
$lines = explode("\n", $fileContents);

// 결과를 담을 배열 초기화
$extractedSentences = array();

// 해당 문장 이전 내용 삭제하고 20으로 시작하는 문장만 추출
$foundTarget = false;
foreach ($lines as $line) {
    if (strpos($line, '공통(12년)/공통(13년)/역량(17년)/핵심(22년)') !== false) {
        $foundTarget = true;
    }
    
    if ($foundTarget && strpos($line, '20') === 0) {
        $extractedSentences[] = $line;
    }
}

// 추출된 문장 출력
foreach ($extractedSentences as $sentence) {
    echo $sentence . "\n";

    $items = explode(" ", $sentence);

    $name = $items[2];  // name에는 GNU인성이 들어감
    $subject_code = $items[1]; // subject_code에는 11021126이 들어감

    $st_subjects_id = 0;  // st_subject_id는 학기가 1인 경우 1학기 테이블에서 해당 과목의 identity를 받아올 변수
    $nd_subjects_id = 0; // nd_subject_id는 학기가 2인 경우 2학기 테이블에서 해당 과목의 identity를 받아올 변수
    $lastChar = substr($items[0], -1);  // lastChar는 학기를 구분하는 변수 (1 or 2의 값을 가짐)

    if ($lastChar === "1") {
        $semester_table = "1st_subjects";
        $semester_id = "1st_subjects_id";
    } elseif ($lastChar === "2") {
        $semester_table = "2nd_subjects";
        $semester_id = "2nd_subjects_id";
    } else {
        $semester_table = "1st_subjects"; // 계절 강의목록을 만들지 않았기 때문에 임의 설정
        $semester_id = "1st_subjects_id";
    }

    if (isset($items[5])) {
        $score = str_replace("\r", "", $items[5]);
    } else {
        $score = NULL;
    }
    $semester_completed = $lastChar; // semester_completed는 학기를 구분하는 변수 (1 혹은 2의 값을 가짐)

    // 우선 불러올 sql문을 적어주고 적은 후에 db에서 찾아줌
    if ($subject_code == "11021121"){
        $subject_code = "11021430";
    } elseif($subject_code == "11021123"){
        $subject_code = "11021398";
    } elseif($subject_code == "11021122"){
        $subject_code = "11021431";
    }
    $subjects_completed_id_sql = "SELECT `$semester_id` FROM `$semester_table` WHERE `subject_code` = '$subject_code'"; // 학기별 테이블의 학수번호가 11021126이면 그 과목의 id 가져오기
    $result = $db->query($subjects_completed_id_sql);  // 실제 db에서 id 가져오기
    
    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();  // 학수번호가 일치하는 과목의 열에서 id 가져오기

        if ($semester_completed == 1) {
            $st_subjects_id = intval($row[$semester_id]);
            $nd_subjects_id = 'NULL';  // 2학기 과목 ID를 NULL로 설정
        } elseif ($semester_completed == 2) {
            $nd_subjects_id = intval($row[$semester_id]);
            $st_subjects_id = 'NULL';  // 1학기 과목 ID를 NULL로 설정
        } else {
            $st_subjects_id = intval($row[$semester_id]);
            $nd_subjects_id = 'NULL';  // 2학기 과목 ID를 NULL로 설정
        }


        echo "user_id: " . $user_id . "\n";
        echo "st_subjects_id: " . $st_subjects_id . "\n";
        echo "nd_subjects_id: " . $nd_subjects_id . "\n";
        echo "semester_completed: " . $items[0] . "\n";
        echo "score: " . $score . "\n";
    
        
        $query = "INSERT INTO `subjects_completed` (`user_id`, `1st_subjects_id`, `2nd_subjects_id`, `semester_completed`, `score`)
          VALUES ('$user_id', $st_subjects_id, $nd_subjects_id, '$semester_completed', '$score')";

        echo $query;
        
        if ($db->query($query) === true) {
            echo "Data inserted successfully.";
        } else {
            echo "Error inserting data: " . $db->error ."\n";
        }
    } else {
        echo "No matching records found.";
    }
}
// 성적이 없는 경우(점검 과목 일부)에는 null을 삽입하도록 수정
// 현재 개설과목에 없는 경우에는 안됨. 과목명이 바뀐 경우를 추가(대학영어1, 대학영어2)
$db->close();
?>
