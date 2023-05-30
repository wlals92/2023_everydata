<?php
// 이지민 작성 : 비밀번호 찾기 파일
require_once("dbConfig.php");

$data = json_decode(file_get_contents('php://input'), true);
$id = isset($data["id"]) ? $data["id"] : null;
$name = isset($data["name"]) ? $data["name"] : null;
$student_id = isset($data["student_id"]) ? $data["student_id"] : null;

//아이디, 학번, 이름 기준으로 찾음
$sql = "SELECT name, user_id, user_pw FROM user WHERE user_id = '$id' AND name ='$name' AND academic_number ='$student_id'";
$res = $db->query($sql);

if ($res->num_rows > 0) {
    $row = $res->fetch_array(MYSQLI_ASSOC);
    $response = array(
        "success" => true,
        "name" => $row["name"],
        "user_id" => $row["user_id"],
        "user_pw" => $row["user_pw"]
    );
} else {
    $response = array(
        "success" => false
    );
}
echo json_encode($response);
mysqli_close($db);
?>
