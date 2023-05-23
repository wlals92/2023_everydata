<?php
    require_once("dbconfig.php"); 
    session_start();

    //로그인 세션 변수
    $loginUserId = $_SESSION['userId'];

    //로그인 된 상태일 때만 실행
    if($loginUserId){
        //json input
        $_POST = JSON_DECODE(file_get_contents("php://input"), true);
        $wishFoodId = $_POST["wishFoodId"];

        //이미 있는 찜인지 확인하기
        $sql = "SELECT * FROM wish WHERE user_id='$loginUserId' AND food_id='$wishFoodId';";

        $data = array();

        $res = $db->query($sql);

        $row = $res->fetch_array(MYSQLI_ASSOC);
        
        //이미 있는 레코드가 없다면 => wish 테이블에 추가 과정 진행
        if($row == null){
                $sql = "INSERT INTO `wish` (`user_id`, `food_id`) 
                VALUES ('$loginUserId','$wishFoodId');";
                $db->query($sql);

                echo true;
        } 
        //이미 있는 레코드가 있다면 삭제
        else {
            $sql = "DELETE FROM `wish` WHERE user_id='$loginUserId' AND food_id='$wishFoodId';";
            $res = $db->query($sql);

            echo false;
        }
    } else {
        echo "회원가입/로그인을 먼저 해주세요";
    }

    mysqli_close($db);
?>