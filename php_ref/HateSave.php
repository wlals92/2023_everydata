<?php
//이지민 작성//
require_once("dbconfig.php");
session_start();

$_POST = JSON_DECODE(file_get_contents("php://input"), true);
$foodInput = $_POST["hateList"];

$user_id = $_SESSION['userId'];

//로그인되어 있을 시
if($user_id){
    //해당 유저 아이디를 가진 레코드 불러오기
    $sql2 = "SELECT * FROM search_word WHERE user_id='$user_id'";
    $res = $db->query($sql2);
    //이전 기록 삭제
    if ($res->num_rows>0){
        $sql = "DELETE FROM `search_word` 
        WHERE user_id='$user_id';";
        $db->query($sql);
    }
    //로그인된 유저 아이디와 함께 검색어 저장
    for($i=0; $i<count($foodInput); $i++){
        $sql = "INSERT INTO `search_word` 
        (`user_id`, `search_word`,`search_num`) 
        VALUES ('$user_id','$foodInput[$i]','$i');";
        $db->query($sql);
    }
    echo '저장 성공';
}

mysqli_close($db);
?>