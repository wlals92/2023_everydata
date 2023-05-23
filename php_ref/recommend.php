<?php 
//이지민 작성//
require_once("dbconfig.php"); 
//비선호 음식 input
$_POST = JSON_DECODE(file_get_contents("php://input"), true);
$foodInput = $_POST["hateList"];
$foodInputToString="'";
for($i=0; $i<count($foodInput); $i++){
    if($i == count($foodInput) - 1)
        $foodInputToString = $foodInputToString.$foodInput[$i]."'";
    else
        $foodInputToString = $foodInputToString.$foodInput[$i]."', '";
}

//비선호 음식 제외하고 음식 종류별로 한 가지씩 뽑아서 넣기
$data = array();
$types=array('한식', '양식', '중식', '일식', '패스트푸드', '디저트');
for($i=0; $i<6; $i++){
    $sql="SELECT * FROM food WHERE food_type='$types[$i]' AND (food_name) NOT IN($foodInputToString) ORDER BY rand()";
    $res = $db->query($sql);
    $row = $res->fetch_array(MYSQLI_ASSOC);
    array_push($data, $row);
}

if($data){
    echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_NUMERIC_CHECK);
}else{
    echo false;
}

mysqli_close($db);
?>