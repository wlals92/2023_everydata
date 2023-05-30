<?php
// 이지민 작성 : 로그인
require_once("dbConfig.php"); 


$id = $_POST["id"];
$password= $_POST["password"];

$sql = "SELECT * FROM user WHERE user_id ='$id' and user_pw ='$password'"; 
$res = $db->query($sql); 
$row = $res->fetch_array(MYSQLI_ASSOC);

if ($row !== null) {
    session_start();
    $_SESSION['name']=$row['name'];
    $_SESSION['id']=$id;
    $_SESSION['curriculum_year']=$row['curriculum_year'];
    $_SESSION['major']=$row['major'];
    $_SESSION['double_major']=$row['double_major'];
    $_SESSION['minor']=$row['minor'];
    echo json_encode(true);
} else {            
    echo json_encode(false);   
}
mysqli_close($db);
?>