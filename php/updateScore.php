<?php
// 이지민 작성 : 성적 수정
require_once("dbConfig.php");
session_start();
// 세션이 있는지 확인
if (!isset($_SESSION['id'])) {
    // 세션이 없는 경우 로그인 페이지로 이동 또는 오류 처리
    echo json_encode(null);
    exit;
}
$id = $_SESSION['id'];

$data = json_decode(file_get_contents('php://input'), true);

$score = isset($data["score"]) ? $data["score"] : null;
$subjects_completed_id = isset($data["subjects_completed_id"]) ? $data["subjects_completed_id"] : null;

$sql = "UPDATE subjects_completed SET score='$score' where user_id = '$id' and subjects_completed_id = $subjects_completed_id";
$result = $db->query($sql);

if ($result) {
    echo json_encode(true);
} else {
    // 오류 발생 시 빈 배열 반환
    echo json_encode(false);
}
mysqli_close($db);
?>