<?php
// 이지민 작성
session_start();

// 세션 확인
if (isset($_SESSION['name'])) {
    // 세션이 있는 경우 사용자 정보를 반환
    $userInfo = array(
        'name' => $_SESSION['name']
    );
    echo json_encode($userInfo);
} else {
    // 세션이 없는 경우 null 반환
    echo json_encode(null);
}
?>