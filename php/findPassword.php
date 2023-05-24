<?php
require_once("dbConfig.php"); 
$_POST = JSON_DECODE(file_get_contents("php://input"), true);

$id = $_POST["id"];/
$name = $_POST["name"];
$student_id = $_POST["student_id"];

// user 테이블에서 입력된 정보를 이용하여 비밀번호 값을 찾음
$sql = "SELECT user_pw FROM user WHERE user_id = '$id'
and name ='$name' and academic_number ='$student_id'";

//res에 실행결과 저장 
$res = $db->query($sql);
$row = $res->fetch_array(MYSQLI_ASSOC); 
if ($row==!null) { 
    //비밀번호를 찾았을 경우
    echo($row['pwd']);
} else {   
    //비밀번호찾기에 실패 했을경우 "실패" 값
    echo("실패"); 
}
mysqli_close($db);
