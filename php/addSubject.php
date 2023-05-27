<?php
// 이지민 작성
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

$data = json_decode(file_get_contents("php://input"), true);

// 추가할 강의 정보
$subjects_id = $data['1st_subjects_id'];

// 강의 정보를 subjects_now 테이블에 추가하는 쿼리
$insert_query = "INSERT INTO subjects_now (user_id, 1st_subjects_id, 2nd_subjects_id)
                VALUES ('$id', '$subjects_id', null)";

if ($db->query($insert_query) === TRUE) {
    // 성공적으로 추가되었을 경우 응답
    http_response_code(200);
    echo json_encode(array("message" => "강의가 성공적으로 추가되었습니다."));
} else {
    // 추가 실패 시 에러 응답
    http_response_code(500);
    echo json_encode(array("message" => "강의 추가에 실패하였습니다."));
}

// 데이터베이스 연결 종료
$db->close();
?>
