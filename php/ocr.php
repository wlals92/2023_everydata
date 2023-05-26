<?php
// 남서린 작성
require_once("dbConfig.php"); 
// $query = "SELECT * FROM 2nd_subjects";
// $result = $db->query($query);

// $data = "2021/1 11021121 대학영어1 역교 2 A0";
// $data = "2021/1 11020882 고사와성어의탐구 통교 2 A0";
$data = "2021/1 11021126 GNU인성 역교 2 B+"; //0, 1, 2, 3, 4, 5, 6 순서
$items = explode(" ", $data);

$name = $items[2];
$subject_code = $items[1];


$user_id = isset($_POST["id"]) ? $_POST["id"] : null;
// $1st_subjects_id = ;
// $2nd_subjects_id = ;
$lastChar = substr($items[0], -1);
echo $lastChar;
if ($lastChar === "1") {
    $semester_table = "1st_subjects";
    $semester_id = "1st_subjects_id";
} elseif ($lastChar === "2") {
    $semester_table = "2nd_subjects";
    $semester_id = "2nd_subjects_id";
} else {
    $semester_table = "1st_subjects"; //계절 강의목록을 만들지 않았기 때문에 임의 설정
    $semester_id = "1st_subjects_id";
}
$score = $items[5];
//우선 불러올 sql문을 적어주고 적은 후에 db에서 찾아줌
$semester_completed_id_sql = "SELECT $semester_id FROM $semester_table WHERE subject_code = $subject_code";
$result = $db->query($semester_completed_id_sql);
$row = $result->fetch_assoc();

echo "semester_table: " . $semester_id . "\n";
echo "score: " . $score . "\n";
echo "semester_completed_id: ";
print_r($row[$semester_id]); //echo는 배열 출력이 안되서 print_r로 출력해뒀어요!




// $sql = "INSERT INTO `subjects_completed` (`semester_completed_id`, `user_id`,`1st_subjects_id`,`2nd_subjects_id`,`semester_completed`,`score`) 
// VALUES (`$semester_completed_id`, `$user_id`,`$1st_subjects_id`,`$2nd_subjects_id`,`$semester_completed`,`$score`);";
$db->close();
?>
