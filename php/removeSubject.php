<?php
// 이지민 작성 : 강의 삭제
require_once("dbConfig.php");

$subjectId = $_POST['subjectId'];

// 강의 삭제 SQL 쿼리 실행
$sql = "DELETE FROM subjects_now WHERE subjects_now_id = $subjectId";

if ($db->query($sql) === TRUE) {
  echo json_encode(true);
} else {
    echo json_encode(false);
}

$db->close();
?>
