<?php
session_start();

// 세션이 있는지 확인
if (!isset($_SESSION['id'])) {
    // 세션이 없는 경우 로그인 페이지로 이동 또는 오류 처리
    echo json_encode(null);
    exit;
}

// 세션에서 사용자 ID 가져오기
$id = $_SESSION['id'];

$data = json_decode(file_get_contents('php://input'), true);

// 데이터 파라미터 추출
$day = isset($data["day"]) ? $data["day"] : null;
$credit = isset($data["credit"]) ? $data["credit"] : null;
$areas = isset($data["areas"]) ? $data["areas"] : null;


$_SESSION['day'] = $day;
$_SESSION['credit'] = $credit;
$_SESSION['areas'] = $areas;

echo json_encode("입력 전달 완료");
?>