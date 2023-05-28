<?php
// 이지민 작성
//에러처리
error_reporting((E_ALL));
ini_set("display_errors", 1);

//json 통신
header("Content-Type:application/json");

$host = 'localhost:3307';
$user = 'root';
$pw = '0000';
$dbName = 'everydata';

$db = new mysqli($host, $user, $pw, $dbName);


mysqli_set_charset($db, "utf8");