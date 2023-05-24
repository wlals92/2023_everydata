<?php
require_once("dbConfig.php");
// $_POST = json_decode(file_get_contents("php://input"), true);

$id = isset($_POST["id"]) ? $_POST["id"] : null;

if ($id !== null) {
    // 아이디 중복 여부를 확인
    $sql = "SELECT COUNT(*) AS count FROM user WHERE user_id = '$id'";
    $result = $db->query($sql);
    
    if ($result) {
        count = $result->num_rows;
        $response = array("duplicate" => ($count > 0)); // 중복 여부를 응답에 포함
        echo json_encode($response);
    } else {
        echo json_encode(array("error" => "Database query failed: " . $db->error));
    }
} else {
    echo json_encode(array("error" => "Invalid request."));
}
?>