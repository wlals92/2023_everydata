<?php
//이지민 작성 : 이수 학점 가져오는 파일
require_once('dbConfig.php');
session_start();

// 세션이 있는지 확인
if (!isset($_SESSION['id'])) {
    // 세션이 없는 경우 로그인 페이지로 이동 또는 오류 처리
    echo json_encode(null);
    exit;
}


// 세션에서 사용자 ID 가져오기
$id = $_SESSION['id'];

$sql = "SELECT * FROM credits WHERE user_id = '$id'";
$result = $db->query($sql);

if ($result) {
    $credits = array();

    // 이수학기 데이터를 배열로 저장
    while ($row = $result->fetch_assoc()) {
        $credits[] = $row;
    }
    // JSON 형식으로 응답 반환
    echo json_encode($credits);
} else {
    // 오류 발생 시 빈 배열 반환
    echo json_encode(false);
}

$db->close();
?>