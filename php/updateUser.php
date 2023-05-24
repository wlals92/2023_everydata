<?php
// 이지민 작성
require_once("dbConfig.php"); 
$_POST = JSON_DECODE(file_get_contents("php://input"), true);

$id = $_GET["id"];

$password = $_POST["password"];
$name = $_POST["name"];
$student_id = $_POST["student_id"];
$academic_status = $_POST["academic_status"];
$curriculum_year = $_POST["curriculum_year"];
$grade = $_POST["grade"];
$major = $_POST["major"];
$double_major = $_POST["double_major"];
$minor = $_POST["minor"];
$file = $_POST["file"];

$sql = "update user set user_pw='$password', name='$name', academic_number='$student_id', status='$academic_status', curriculum_year='$curriculum_year', 
    grade='$grade', major='$major', double_major='$double_major', minor='$minor', file='$file' where user_id = '$id'";
$db->query($sql); 
mysqli_close($db);