<?php
require_once("dbConfig.php"); 
$_POST = JSON_DECODE(file_get_contents("php://input"), true);

$id = $_POST["id"];
$password= $_POST["password"];

$sql = "SELECT name, academic_number FROM user WHERE user_id ='$id' and user_pw ='$password'"; 
$res = $db->query($sql); 
$row = $res->fetch_array(MYSQLI_ASSOC);
if ($row==!NULL) {
    session_start();
    $_SESSION['name']=$row['name'];
    header('Location: /html/mypage.html');
    $_SESSION['id'] = $id;
    echo true;
} else {            
    echo("
        <script>
            window.alert('등록되지 않은 아이디입니다.')
            history.go(-1)
        </script>  
    ")
    echo false;   
}
mysqli_close($db);