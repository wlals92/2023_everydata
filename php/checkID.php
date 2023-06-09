<?php
// 이지민 작성 : 아이디 중복 여부 확인하는 파일
require_once("dbConfig.php");

$id = isset($_POST["id"]) ? $_POST["id"] : null;

if ($id !== null) {
    // 아이디 중복 여부를 확인
    $sql = "SELECT COUNT(*) AS count FROM user WHERE user_id = '$id'";
    $result = $db->query($sql);

    if ($result) {
        $row = $result->fetch_assoc();
        $count = $row["count"];
        $response = array("duplicate" => ($count > 0)); // 중복 여부를 응답에 포함
        echo json_encode($response);
    } else {
        echo json_encode(array("error" => "Database query failed: " . $db->error));
    }
} else {
    echo json_encode(array("error" => "Invalid request."));
}
?>