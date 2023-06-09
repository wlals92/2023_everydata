<?php
// 이지민 작성 : 사용자 정보 가져오는 파일
session_start();

// 세션 확인
if (isset($_SESSION['id'])) {
    // 세션이 있는 경우 사용자 정보를 반환
    $userInfo = array(
        'id' => $_SESSION['id'],
        'name' => $_SESSION['name'],
        'major' => $_SESSION['major'],
        'double_major' => $_SESSION['double_major'],
        'minor' => $_SESSION['minor']
    );
    echo json_encode($userInfo);
} else {
    // 세션이 없는 경우 null 반환
    echo json_encode(null);
}
?>