<?php
// 남서린 작성
require_once("dbConfig.php"); 
$query = "SELECT * FROM 2nd_subjects";
$result = $db->query($query);

$data = "2021/1 11021121 대학영어1 역교 2 A0";
$items = explode(" ", $data);

$name = $items[3];
$subject_code = $items[2];


$user_id = isset($_POST["id"]) ? $_POST["id"] : null;
// $1st_subjects_id = ;
// $2nd_subjects_id = ;
$lastChar = substr($items[0], -1);
if ($lastChar === "1") {
    $semester_completed = 1;
} elseif ($lastChar === "2") {
    $semester_completed = 2;
} else {
    $semester_completed = "계절";
}
$score = $items[5];
$semester_completed_id = "SELECT 2nd_subjects_id FROM 2nd_subjects WHERE subject_code = '$semester_completed'";


echo "semester_completed: " . $semester_completed . "\n";
echo "score: " . $score . "\n";
echo "semester_completed_id" . $semester_completed_id . "\n";




// $sql = "INSERT INTO `subjects_completed` (`semester_completed_id`, `user_id`,`1st_subjects_id`,`2nd_subjects_id`,`semester_completed`,`score`) 
// VALUES (`$semester_completed_id`, `$user_id`,`$1st_subjects_id`,`$2nd_subjects_id`,`$semester_completed`,`$score`);";
$db->close();
?>
