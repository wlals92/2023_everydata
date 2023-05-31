<?php
require_once("dbConfig.php");

// ocr.py에서 넘겨준 user_id
if (!isset($_SERVER['argv'][1])) {
    exit;
}
$user_id = $_SERVER['argv'][1];
echo $user_id;

// OCR.py에서 생성된 txt 파일 경로
$txtFilePath = 'C:/Bitnami/wampstack-8.0.3-2/apache2/htdocs/txt/output_' . $user_id . '.txt';

// 파일 존재 여부 확인
if (!file_exists($txtFilePath)) {
    // echo "File not found.";
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

    
        
        $query = "INSERT INTO `subjects_completed` (`user_id`, `1st_subjects_id`, `2nd_subjects_id`, `semester_completed`, `score`)
            VALUES ('$user_id', $st_subjects_id, $nd_subjects_id, '$items[0]', '$score')";

        $result_completed = $db->query($query);
    } else {
        // 1학기, 2학기 개설 강의 테이블에서 학수번호를 찾을 수 없는 경우 : 통합 이전 변경 전 학수번호 과목, 현재 자연대 이외 타전공 과목도 이 테이블에 있음.
        $subjects_completed_id_sql = "SELECT `pre_subjects_id` FROM `pre_subjects` WHERE `subject_code` = '$subject_code'"; // 학기별 테이블의 학수번호가 11021126이면 그 과목의 id 가져오기
        $result_pre = $db->query($subjects_completed_id_sql);  // 실제 db에서 id 가져오기

        if ($result_pre && $result_pre->num_rows > 0) {
            $row = $result_pre->fetch_assoc();
            $pre_subjects_id = intval($row['pre_subjects_id']);

            $query = "INSERT INTO `subjects_completed` (`user_id`, `pre_subjects_id`, `semester_completed`, `score`)
                VALUES ('$user_id', $pre_subjects_id, '$items[0]', '$score')";

            $result_completed = $db->query($query);

        }
    }
}

if ($result_completed) {
    echo "Completed : Data inserted successfully.";
} else {
    echo "Completed : Error inserting data.";
}
// 성적이 없는 경우(점검 과목 일부)에는 null을 삽입하도록 수정
// 현재 개설과목에 없는 경우에는 안됨. 과목명이 바뀐 경우를 추가(대학영어1, 대학영어2)
$db->close();
?>
