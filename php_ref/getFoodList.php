<?php
    require_once("dbconfig.php"); 

    $_POST = JSON_DECODE(file_get_contents("php://input"), true);

    // 선택된 음식 분류 (한식, 양식, 중식, 일식, 패스트푸드, 디저트 중 1개)를 js에서 넘겨 받는다.
    $selectedFoodType = $_POST["selectedFoodType"];

    //해당 분류를 가진 음식 레코드를 모두 가져온다.
    $sql = "SELECT * FROM food WHERE food_type='$selectedFoodType';"; //sql 구문 넣기

    $data = array();
    
    $res = $db->query($sql);
    
    for($i = 0; $i < $res->num_rows; $i++) {
        $row = $res->fetch_array(MYSQLI_ASSOC);
        array_push($data, $row);
    }
    
    if($data != null) {
        echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_NUMERIC_CHECK);
    } else {
        echo false;
    }
    
    mysqli_close($db);
?>