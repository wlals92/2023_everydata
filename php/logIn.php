<?php
// 이지민 작성
require_once("dbConfig.php"); 


$id = $_POST["id"];
$password= $_POST["password"];

$sql = "SELECT name FROM user WHERE user_id ='$id' and user_pw ='$password'"; 
$res = $db->query($sql); 
$row = $res->fetch_array(MYSQLI_ASSOC);

if ($row !== null) {
    session_start();
    $_SESSION['name']=$row['name'];
    $_SESSION['id']=$id;
    echo json_encode(true);
} else {            
    echo json_encode(false);   
}
mysqli_close($db);
?>