 <?php
 require_once("dbconfig.php"); 
$_POST = JSON_DECODE(file_get_contents("php://input"), true);
//받아온 값을 변수에 넣는다
$id = $_POST["id"];
$pwd= $_POST["pwd"];
//아이디와 비밀번호를 이용하여 닉네임을 찾는다.
$sql = "SELECT nickname FROM user WHERE id = '$id' and pwd='$pwd'"; 
$res = $db->query($sql); 
$row = $res->fetch_array(MYSQLI_ASSOC);
if ($row==!NULL) {//row에 값이 있다, 즉 아이디와 비밀번호로 성공적으로 닉네임을 찾았을 경우 실행 
    session_start();//세션 시작
    $_SESSION['User_Name']=$row['nickname'];//닉네임을 세션변수 $_SESSION['User_Name']에 저장
    header('Location: /html/mypage.html');
    //-----이도연 추가-----//
    $_SESSION['userId'] = $id;
    echo true;
} else {            
    echo false;   
}
mysqli_close($db);

