<?php
//이지민 작성 : 전공 커리큘럼 가져오는 파일
require_once('dbConfig.php');
session_start();

// 세션이 있는지 확인
if (!isset($_SESSION['id'])) {
    // 세션이 없는 경우 로그인 페이지로 이동 또는 오류 처리
    echo json_encode(null);
    exit;
}

$id = $_SESSION['id'];

// 이수내역 가져오기
$sql = "SELECT subjects_completed.subjects_completed_id, 1st_subjects.*, subjects_completed.score, subjects_completed.semester_completed
        FROM subjects_completed
        INNER JOIN 1st_subjects ON subjects_completed.1st_subjects_id = 1st_subjects.1st_subjects_id
        WHERE subjects_completed.user_id = '$id'
        ORDER BY semester_completed";
$result_1st = $db->query($sql);

$sql = "SELECT subjects_completed.subjects_completed_id, 2nd_subjects.*, subjects_completed.score, subjects_completed.semester_completed
        FROM subjects_completed
        INNER JOIN 2nd_subjects ON subjects_completed.2nd_subjects_id = 2nd_subjects.2nd_subjects_id
        WHERE subjects_completed.user_id = '$id'
        ORDER BY semester_completed";
$result_2nd = $db->query($sql);

$sql = "SELECT subjects_completed.subjects_completed_id, pre_subjects.*, subjects_completed.score, subjects_completed.semester_completed
        FROM subjects_completed
        INNER JOIN pre_subjects ON subjects_completed.pre_subjects_id = pre_subjects.pre_subjects_id
        WHERE subjects_completed.user_id = '$id'
        ORDER BY semester_completed";
$result_pre = $db->query($sql);

if ($result_1st) {
    $subjects = array();
    while ($row = $result_1st->fetch_assoc()) {
        $subjects[] = $row;
    }
    if ($result_2nd){
        while ($row = $result_2nd->fetch_assoc()) {
            $subjects[] = $row;
        }
    }
    if ($result_pre){
        while ($row = $result_pre->fetch_assoc()) {
            $subjects[] = $row;
        }
    }
    usort($subjects, function($a, $b) {
        return strcmp($a['semester_completed'], $b['semester_completed']);
    });
    // JSON 형식으로 응답 반환
    echo json_encode($subjects);
} else {
    echo json_encode(false);
}
?>