<?php
require_once("dbconfig.php"); 

$_POST = JSON_DECODE(file_get_contents("php://input"), true);
//변수를 받아와서 저장한다
$id = $_POST["id"];
$password = $_POST["password"];
$nickname = $_POST["nickname"];
$q1 = $_POST["q1"];
$q2 = $_POST["q2"];

//db의 테이블에서 id가 일치하는 데이터가 있는지 검사함
$sql = "SELECT * FROM user WHERE id = '$id'";
$res = $db->query($sql); 
$row = $res->fetch_array(MYSQLI_ASSOC); 
//row값이 존재 하지 않는다면 중복되는 아이디가 없다는 뜻이므로 
//값을 넣어서 회원가입한다.
if ($row === null) { 
    $sql = "INSERT INTO `user` (`id`, `pwd`,`nickname`,`Q1`,`Q2`)
    VALUES ('$id','$password','$nickname','$q1','$q2');";
    $db->query($sql);
    echo true;
} else { //중복되는 값이 있는경우
    echo false;
} 
mysqli_close($db);
