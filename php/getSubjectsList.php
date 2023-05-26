<?php
// 이지민 작성
require_once("dbConfig.php");

//강의목록 조회
$query = "SELECT * FROM 1st_subjects";
$result = $db->query($query);

if ($result) {
    $subjects = array();

    // 강의 데이터를 배열로 저장
    while ($row = $result->fetch_assoc()) {
        $subjects[] = $row;
    }

    // JSON 형식으로 응답 반환
    echo json_encode($subjects);
} else {
    // 오류 발생 시 빈 배열 반환
    echo json_encode(array());
}

$db->close();
?>