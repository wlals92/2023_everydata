<?php
// 이지민 작성
require_once("dbConfig.php"); 
// $_POST = JSON_DECODE(file_get_contents("php://input"), true);

$id = isset($_POST["id"]) ? $_POST["id"] : null;
$password = isset($_POST["password"]) ? $_POST["password"] : null;
$name = isset($_POST["name"]) ? $_POST["name"] : null;
$student_id = isset($_POST["student_id"]) ? $_POST["student_id"] : null;
$academic_status = isset($_POST["academic_status"]) ? $_POST["academic_status"] : null;
$curriculum_year = isset($_POST["curriculum_year"]) ? $_POST["curriculum_year"] : null;
$grade = isset($_POST["grade"]) ? $_POST["grade"] : null;
$major = isset($_POST["major"]) ? $_POST["major"] : null;
$double_major = isset($_POST["double_major"]) ? $_POST["double_major"] : null;
$minor = isset($_POST["minor"]) ? $_POST["minor"] : null;
$file = isset($_FILES["file"]) ? $_FILES["file"] : null;

if ($file !== null) {
    $fileData = file_get_contents($file["tmp_name"]);
    $fileData = $db->real_escape_string($fileData);
    $sql = "INSERT INTO `user` (`user_id`, `user_pw`,`name`,`academic_number`,`status`,`curriculum_year`, `grade`, `major`, `double_major`,`minor`,`subjects_completed_pdf`) 
    VALUES ('$id','$password','$name','$student_id','$academic_status', '$curriculum_year', '$grade', '$major', '$double_major', '$minor', '$fileData');";
} else {
    $sql = "INSERT INTO `user` (`user_id`, `user_pw`,`name`,`academic_number`,`status`,`curriculum_year`, `grade`, `major`, `double_major`,`minor`,`subjects_completed_pdf`) 
    VALUES ('$id','$password','$name','$student_id','$academic_status', '$curriculum_year', '$grade', '$major', '$double_major', '$minor', null);";
}
$db->query($sql);

mysqli_close($db);
?>