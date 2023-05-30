<?php
// 이지민 작성 : 강의 추천 및 결과 반환 파일
// 강의 추천 입력 : 공강 요일, 총 학점, 선호 영역
// 공강 요일이 아닌 요일로 추천, 선호 영역인 강의만 추천, 추천된 강의의 합이  입력받은 총 학점이 되게 추천(못찾으면 아닐수도 있음)
// 사용자의 시간표에 이미 있는 강의 제외, 사용자가 이수한 강의 제외 추천
// 사용자의 시간표에 있는 강의의 시간과 겹치지 않게 추천
// 추천하는 강의끼리 같은 강의 없게(과목코드 겹치지 않게), 추천 강의끼리 시간이 겹치지 않게 추천
require_once("dbConfig.php");
session_start();

// 세션이 있는지 확인
if (!isset($_SESSION['id'])) {
    // 세션이 없는 경우 로그인 페이지로 이동 또는 오류 처리
    echo json_encode(null);
    exit;
}

// 세션에서 사용자 ID 가져오기
$id = $_SESSION['id'];

$day = $_SESSION['day'];
$credit = $_SESSION['credit'];
$areas = $_SESSION['areas'];

// subjects_now, subjects_completed 강의 아이디 가져오기
$query = "SELECT 1st_subjects_id FROM subjects_now UNION SELECT 1st_subjects_id FROM subjects_completed WHERE user_id='$id'";
$result = $db->query($query);
$existingSubjects = array();
while ($row = $result->fetch_assoc()) {
    $existingSubjects[] = $row['1st_subjects_id'];
}



// 공강 요일로 선택한 요일의 강의는 제외
$query = "SELECT * FROM 1st_subjects WHERE lecture_time NOT LIKE '%$day%'";

// subjects_now, subjects_completed에 없는 강의 가져오기
if ($existingSubjects !== null && !in_array(null, $existingSubjects, true)) {
    $query .= " AND 1st_subjects_id NOT IN ('" . implode("', '", $existingSubjects) . "')";
}

// 선택 받은 영역의 강의만 가져옴
$query .= " AND ge_category IN ('" . implode("', '", $areas) . "') ORDER BY RAND()";

$result = $db->query($query);
$selectedSubjects = array();
$totalCredit = 0;
$selectedSubjectCodes = array();

// 입력 받은 추천 총 학점
while ($row = $result->fetch_assoc()) {
    if ($totalCredit > $credit) {
        break;
    }
    $conflict = false;
    foreach ($selectedSubjects as $subject) {
        if (doSubjectsConflict($subject, $row)) {
            $conflict = true;
            break;
        }
    }
    if (!$conflict) {
        $subjectsNowQuery = "SELECT 1st_subjects.*
                                FROM subjects_now
                                INNER JOIN 1st_subjects ON subjects_now.1st_subjects_id = 1st_subjects.1st_subjects_id
                                WHERE subjects_now.user_id = '$id'";
        $subjectsNowResult = $db->query($subjectsNowQuery);
    
        while ($subject = $subjectsNowResult->fetch_assoc()) {
            if (doSubjectsConflict($subject, $row)) {
                $conflict = true;
                break;
            }
        }
    }
    if (!$conflict) {
        // 과목 코드 중복 확인
        if (!in_array($row['subject_code'], $selectedSubjectCodes)) {
            $selectedSubjects[] = $row;
            $selectedSubjectCodes[] = $row['subject_code'];
            $totalCredit += $row['credit'];
        }
    }
}

$maxAttempts = 100; // 최대 시도 횟수
$attempts = 0; // 현재 시도 횟수

// 마지막으로 추가한 과목 제거하고 다른 과목 추가
while ($totalCredit != $credit && $attempts < $maxAttempts) {
    // 마지막으로 추가한 과목 제거
    $lastSubject = array_pop($selectedSubjects);
    $totalCredit -= $lastSubject['credit'];
    //총 학점이 입력 학점보다 1 작으면 한 과목 더 제거
    if ($totalCredit == $credit - 1) {
        $lastSubject = array_pop($selectedSubjects);
        $totalCredit -= $lastSubject['credit'];
    }
    // 다른 과목 추가
    while ($row = $result->fetch_assoc()) {
        // 시간이 겹치지 않는지 확인
        $conflict = false;
        foreach ($selectedSubjects as $subject) {
            if (doSubjectsConflict($subject, $row)) {
                $conflict = true;
                break;
            }
        }
        if (!$conflict) {
            $subjectsNowQuery = "SELECT 1st_subjects.*
                                FROM subjects_now
                                INNER JOIN 1st_subjects ON subjects_now.1st_subjects_id = 1st_subjects.1st_subjects_id
                                WHERE subjects_now.user_id = '$id'";
            $subjectsNowResult = $db->query($subjectsNowQuery);
        
            while ($subject = $subjectsNowResult->fetch_assoc()) {
                if (doSubjectsConflict($subject, $row)) {
                    $conflict = true;
                    break;
                }
            }
        }
        
        // 과목 코드 중복 확인
        if (!$conflict && $totalCredit + $row['credit'] <= $credit && !in_array($row['subject_code'], $selectedSubjectCodes)) {
            $selectedSubjects[] = $row;
            $selectedSubjectCodes[] = $row['subject_code'];
            $totalCredit += $row['credit'];
            break;
        }
    }
    $attempts++; // 시도 횟수 증가
}

if (!empty($selectedSubjects)) {
    $response = array();
    foreach ($selectedSubjects as $subject) {
        $category = $subject['category'];
        $geCategory = $subject['ge_category'];
        $categoryValue = $category . ' ' . $geCategory;

        $response[] = array(
            'subject_name' => $subject['subject_name'],
            'professor' => $subject['professor'],
            'category' => $categoryValue,
            'credit' => $subject['credit'],
            'lecture_time' => $subject['lecture_time'],
            'lecture_room' => $subject['lecture_room'],
            'subject_id' => $subject['1st_subjects_id']
        );
    }
    echo json_encode($response);
} else {
    echo json_encode(false);
}


// 두 강의의 시간이 겹치는지 확인하는 함수
function doSubjectsConflict($subject1, $subject2) {
    $time1 = explode(',', $subject1['lecture_time']);
    $time2 = explode(',', $subject2['lecture_time']);

    foreach ($time1 as $day1) {
        foreach ($time2 as $day2) {
            if ($day1 === $day2) {
                return true; // 시간이 겹치는 경우 true 반환
            }
        }
    }
    return false; // 겹치지 않을 경우 false 반환
}


mysqli_close($db);
exit;
?>