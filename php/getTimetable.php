<?php
// 이지민 작성 : 사용자 현재 시간표 가져오는 파일
require_once("dbConfig.php");
session_start();

// 세션이 있는지 확인
if (!isset($_SESSION['id'])) {
    // 세션이 없는 경우 로그인 페이지로 이동 또는 오류 처리
    echo json_encode(null);
    exit;
}

// 세션에서 사용자 ID 가져오기
$id = $_SESSION['id'];

//현재 강의 시간표 조회
$sql = "SELECT subjects_now.subjects_now_id, 1st_subjects.*
        FROM subjects_now
        INNER JOIN 1st_subjects ON subjects_now.1st_subjects_id = 1st_subjects.1st_subjects_id
        WHERE subjects_now.user_id = '$id'";
$result = $db->query($sql);

if ($result) {
    $timetable = array();

    // 강의 데이터를 배열로 저장
    while ($row = $result->fetch_assoc()) {
        $timetable[] = $row;
    }
    // JSON 형식으로 응답 반환
    echo json_encode($timetable);
} else {
    // 오류 발생 시 빈 배열 반환
    echo json_encode(array());
}

$db->close();
?>