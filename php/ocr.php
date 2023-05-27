<?php
// 남서린 작성
require_once("dbConfig.php");

// user 테이블에서 user_id 가져오기
$query = "SELECT user_id FROM user";
$result = $db->query($query);

if ($result->num_rows > 0) {
    // 결과에서 첫 번째 행의 user_id 가져오기
    $row = $result->fetch_assoc();
    $user_id = $row["user_id"];
} else {
    echo "No records found.";
}

$query = "SELECT * FROM 2nd_subjects";
$result = $db->query($query);

$data = "2021/2 11021126 GNU인성 역교 2 A+"; //0, 1, 2, 3, 4, 5, 6 순서
$items = explode(" ", $data);

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

$score = $items[5];  // score에는 B+이 들어감
$semester_completed = $lastChar; // semester_completed는 학기를 구분하는 변수 (1 or 2의 값을 가짐)

// 우선 불러올 sql문을 적어주고 적은 후에 db에서 찾아줌
$subjects_completed_id_sql = "SELECT `$semester_id` FROM `$semester_table` WHERE `subject_code` = '$subject_code'"; // 학기별 테이블의 학수번호가 11021126이면 그 과목의 id 가져오기
$result = $db->query($subjects_completed_id_sql);  // 실제 db에서 id 가져오기

// ...

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();  // 학수번호가 일치하는 과목의 열에서 id 가져오기

    if ($semester_completed == 1) {
        $st_subjects_id = $row[$semester_id];
        $nd_subjects_id = null;  // 2학기 과목 ID를 NULL로 설정
    } elseif ($semester_completed == 2) {
        $nd_subjects_id = $row[$semester_id];
        $st_subjects_id = null;  // 1학기 과목 ID를 NULL로 설정
    } else {
        $st_subjects_id = $row[$semester_id];
        $nd_subjects_id = null;  // 2학기 과목 ID를 NULL로 설정
    }

    echo "user_id: " . $user_id . "\n";
    echo "st_subjects_id: " . $st_subjects_id . "\n";
    echo "nd_subjects_id: " . $nd_subjects_id . "\n";
    echo "semester_completed: " . $semester_completed . "\n";
    echo "score: " . $score . "\n";

    $sql = "INSERT INTO `subjects_completed` (`user_id`, `1st_subjects_id`, `2nd_subjects_id`, `semester_completed`, `score`)
            VALUES ('$user_id', ";

    if ($st_subjects_id === null) {
        $sql .= "NULL, ";
    } else {
        $sql .= "'$st_subjects_id', ";
    }

    if ($nd_subjects_id === null) {
        $sql .= "NULL, ";
    } else {
        $sql .= "'$nd_subjects_id', ";
    }

    $sql .= "'$semester_completed', '$score')";

    if ($db->query($sql) === TRUE) {
        echo "Record inserted successfully.";
    } else {
        echo "Error inserting record: " . $db->error;
    }
} else {
    echo "No matching subjects found.";
}

mysqli_close($db);
?>
