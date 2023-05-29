<?php
//이지민 작성
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
$sql = "SELECT *  FROM user WHERE user_id = '$id'";
$result = mysqli_query($db, $sql);

if ($result) {
    $userInfo = array();
    while ($row = $result->fetch_assoc()) {
        $userInfo[] = $row;
    }
    // JSON 형식으로 사용자 정보 반환
    echo json_encode($userInfo);
} else {
    // 데이터베이스 조회 실패 처리
    echo json_encode(null);
}

// 데이터베이스 연결 종료
mysqli_close($db);
exit;
?>
