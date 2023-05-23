<?php
require_once("dbconfig.php"); 
$_POST = JSON_DECODE(file_get_contents("php://input"), true);
//받아온 값을 변수에 넣는다 
$passfind01 = $_POST["passfind01"];//아이디
$passfind02 = $_POST["passfind02"];//보안질문01
$passfind03 = $_POST["passfind03"];//보안질문02
// user 테이블에서 입력된 정보를 이용하여 비밀번호 값을 찾음
$sql = "SELECT pwd FROM user WHERE id = '$passfind01'
and Q1 ='$passfind02' and Q2 ='$passfind03'"; 
//res에 실행결과 저장 
$res = $db->query($sql);
//row 배열에 넣음 
$row = $res->fetch_array(MYSQLI_ASSOC); 
if ($row==!null) { 
    //배열에 값이 있다. 즉 비밀번호를 찾았다라는 뜻. 
    echo($row['pwd']);//비밀번호값 을 준다
} else {   
    //비밀번호찾기에 실패 했을경우 "실패" 값
    echo("실패"); 
}
mysqli_close($db);

