<?php
require_once("dbConfig.php");

$data = json_decode(file_get_contents('php://input'), true);
$id = isset($data["id"]) ? $data["id"] : null;
$name = isset($data["name"]) ? $data["name"] : null;
$student_id = isset($data["student_id"]) ? $data["student_id"] : null;

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
