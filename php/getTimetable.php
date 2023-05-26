<?php
// 이지민 작성
require_once("dbConfig.php");

//현재 강의 시간표 조회
$query = "SELECT * FROM subjects_now";
$result = $db->query($query);

if ($result) {
    $timetable = array();

    // 강의 데이터를 배열로 저장
    while ($row = $result->fetch_assoc()) {
        $subject = array(
            'id' => $row['id'],
            'name' => $row['name'],
            'day' => $row['day'],
            'time' => $row['time']
        );
        $timetable[] = $subject;
    }

    // JSON 형식으로 응답 반환
    echo json_encode($timetable);
} else {
    // 오류 발생 시 빈 배열 반환
    echo json_encode(array());
}

$db->close();
?>