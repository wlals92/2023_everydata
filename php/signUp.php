<?php
require_once("dbConfig.php"); 
$_POST = JSON_DECODE(file_get_contents("php://input"), true);

$id = $_POST["id"];
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

$sql = "SELECT * FROM user WHERE id = '$id'";
$res = $db->query($sql); 
$row = $res->fetch_array(MYSQLI_ASSOC); 

if ($row === null) { 
    $sql = "INSERT INTO `user` (`user_id`, `user_pw`,`name`,`academic_number`,`status`,`curriculum_year`, `grade`, `major`, `double_major`,`minor`,`subjects_completed_pdf`)
    VALUES ('$id','$password','$name','$student_id','$academic_status', '$curriculum_year', '$grade', '$major', '$double_major', '$minor', '$file');";
    $db->query($sql);
    echo true;
} else { //중복되는 값이 있는경우
    echo false;
} 
mysqli_close($db);