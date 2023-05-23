<?php
require_once("dbConfig.php"); 
$_POST = JSON_DECODE(file_get_contents("php://input"), true);

$id = $_POST["id"];
$password= $_POST["password"];

$sql = "SELECT name FROM user WHERE id = '$id' and password='$password'"; 
$res = $db->query($sql); 
$row = $res->fetch_array(MYSQLI_ASSOC);
if ($row==!NULL) {
    session_start();
    $_SESSION['name']=$row['name'];
    header('Location: /html/mypage.html');
    $_SESSION['id'] = $id;
    echo true;
} else {            
    echo false;   
}
mysqli_close($db);