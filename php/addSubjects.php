<?php
// 이지민 작성 : 강의를 시간표에 추가하는 파일(강의 여러개 추가)
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

// 선택된 강의 배열
$courses = $data['courses'];

// 선택된 강의를 subjects_now 테이블에 추가하는 쿼리
$insert_query = "INSERT INTO subjects_now (user_id, 1st_subjects_id, 2nd_subjects_id) VALUES ";

foreach ($courses as $index => $course) {
    $insert_query .= "('$id', '$course', null)";

    // 마지막 강의가 아닌 경우 콤마(,) 추가
    if ($index !== count($courses) - 1) {
        $insert_query .= ",";
    }
}

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