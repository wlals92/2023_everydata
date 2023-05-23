<?php
    require_once("dbconfig.php");
    session_start();

    $loginUserId = $_SESSION['userId'];
    
    //wish 테이블에서 현재 유저에 대한 레코드 불러오기
    $sql = "SELECT * FROM wish WHERE user_id='$loginUserId';"; //sql 구문 넣기

    $data = array();

    $resWish = $db->query($sql);
    
    for($i = 0; $i < $resWish->num_rows; $i++) {
        $rowWish = $resWish->fetch_array(MYSQLI_ASSOC);

        //food 테이블에서 food id로 찜한 목록 불러오기
        $foodId = $rowWish['food_id'];
        $sql = "SELECT * FROM food WHERE id='$foodId';";
        $resFood = $db->query($sql);
        $rowFood = $resFood->fetch_array(MYSQLI_ASSOC);

        array_push($data, $rowFood);
    }

    //데이터 echo
    if($data != null) {
        echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_NUMERIC_CHECK);
    } else {
        echo false;
    }
    
    mysqli_close($db);
?>
