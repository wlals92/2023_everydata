<?php
//이지민 작성
require_once('dbConfig.php');
session_start();

// 세션이 있는지 확인
if (!isset($_SESSION['id'])) {
    // 세션이 없는 경우 로그인 페이지로 이동 또는 오류 처리
    echo json_encode(null);
    exit;
}


// 교과과정 년도 정보 가져오기
$curriculumYear = $_SESSION['curriculum_year'];
$major = $_SESSION['major'];
$double_major = $_SESSION['double_major'];
$minor = $_SESSION['minor'];

$curriculumTable = $curriculumYear . "_curriculum";

// 교과과정 테이블에서 정보 가져오기
$query = "SELECT * FROM $curriculumTable WHERE department = '$major'
            OR department = '$double_major'
            OR department = '$minor'";
$result = $db->query($query);


if ($result) {
    $subjects = array();
    while ($row = $result->fetch_assoc()) {
        $subject_name = $row['subject_name'];

        // 1st_subjects 테이블에서 subject_name으로 검색
        $searchQuery = "SELECT * FROM 1st_subjects WHERE subject_name = '$subject_name'";
        $searchResult = $db->query($searchQuery);

        if ($searchResult && $searchResult->num_rows > 0) {
            // 검색 결과가 있을 경우
            while ($searchRow = $searchResult->fetch_assoc()) {
                $searchRow['curriculum_grade'] .= '-1';

                if ($searchRow['department'] === $minor) {
                    if ($row['minor_necessary'] === '◇') {
                        $searchRow['category'] = '전공필수';
                    } else {
                        $searchRow['category'] = '전공선택';
                    }
                }

                // 가져온 정보를 배열에 추가
                $subjects[] = $searchRow;
            }
        } else {
            // 검색 결과가 없을 경우 기존의 $query에서 가져온 정보를 배열에 추가
            $row['professor'] = '미개설';
            $row['lecture_time'] = '미개설';

            if ($row['department'] === $minor) {
                if ($row['minor_necessary'] === '◇') {
                    $row['category'] = '전공필수';
                } else {
                    $row['category'] = '전공선택';
                }
            } else {
                if ($row['category'] === '전필') {
                    $row['category'] = '전공필수';
                } elseif ($row['category'] === '전선') {
                    $row['category'] = '전공선택';
                }
            }

            $subjects[] = $row;
        }
    }

    echo json_encode($subjects);
} else {
    echo json_encode(false);
}
?>