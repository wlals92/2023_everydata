<?php
require_once("dbconfig.php"); 
session_start();
$_POST = JSON_DECODE(file_get_contents("php://input"), true);
$nick=$_SESSION['User_Name'];
//바꿀 비밀번호 값을 받아와서 changedpass 변수에 넣는다.
$changedpass=$_POST["changepwd"];
//세션이 가지고 있는 닉네임을 가진 행의 db의 내용(비밀번호)을 바꾼다
$sql="UPDATE user SET pwd='$changedpass'
WHERE nickname='$nick' ";
$db->query($sql);
echo true;
mysqli_close($db);