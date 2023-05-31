<?php
//이지민 작성 : 사용자 프로필 정보 가져오는 파일
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

// 사용자 프로필 정보 조회
$sql = "SELECT name, major, status, academic_number, grade, curriculum_year, double_major, minor  FROM user WHERE user_id = '$id'";
$result = mysqli_query($db, $sql);

$sql = "SELECT cumulative, total FROM credits WHERE user_id = '$id'";
$result_credit = mysqli_query($db, $sql);

if ($result && $result_credit) {
    $row = mysqli_fetch_assoc($result);
    $row_credit = mysqli_fetch_assoc($result_credit);

    // 사용자 프로필 정보를 연관 배열로 생성
    $profile = array(
        'name' => $row['name'],
        'user_credit' => $row_credit['cumulative'],
        'total_credit' => $row_credit['total'],
        'major' => $row['major'],
        'status' => $row['status'],
        'academic_number' => $row['academic_number'],
        'grade' => $row['grade'],
        'curriculum_year' => $row['curriculum_year'],
        'double_major' => ($row['double_major'] !== 'none') ? $row['double_major'] : '-',
        'minor' => ($row['minor'] !== 'none') ? $row['minor'] : '-'
    );

    // JSON 형식으로 사용자 프로필 정보 반환
    echo json_encode($profile);
} else {
    // 데이터베이스 조회 실패 처리
    echo json_encode(null);
}

// 데이터베이스 연결 종료
mysqli_close($db);
exit;
?>
