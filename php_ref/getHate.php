<?php
//이지민 작성//
require_once("dbconfig.php"); 
//로그인시 유저당 저장된 비선호 메뉴 불러오기
session_start();

$data=array();
if(isset($_SESSION['userId'])){
    $loginid = $_SESSION['userId'];
    //해당 유저 아이디를 가진 레코드 전부 불러오기
    $sql = "SELECT * FROM search_word WHERE user_id='$loginid';";
    $res = $db->query($sql);
    if($res){
        //해당 유저 아이디 레코드 개수만큼 data에 넣기
        for($i=0; $i< $res->num_rows ; $i++){
            $row = $res->fetch_array(MYSQLI_ASSOC);
            array_push($data, $row);
        }
    }
}

if($data){
    echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_NUMERIC_CHECK);
}else{
    echo false;
}

mysqli_close($db);
?>