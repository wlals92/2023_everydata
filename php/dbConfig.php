<?php
//에러처리
error_reporting((E_ALL));
ini_set("display_errors", 1);

//json 통신
header("Content-Type:application/json");

$host = 'localhost';
$user = 'root';
$pw = '123456';
$dbName = 'everydata';

$db = new mysqli($host, $user, $pw, $dbName);

mysqli_set_charset($db, "utf8");