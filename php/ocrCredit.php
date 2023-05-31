<?php
// 이지민 작성 : 이수학점 추출 후 저장 파일
require_once("dbConfig.php");

// ocr.py에서 넘겨준 user_id
if (!isset($_SERVER['argv'][1])) {
    exit;
}
$user_id = $_SERVER['argv'][1];

// OCR.py에서 생성된 txt 파일 경로
$txtFilePath = 'C:/Bitnami/wampstack-8.0.3-2/apache2/htdocs/txt/output_' . $user_id . '.txt';

// 파일 존재 여부 확인
if (!file_exists($txtFilePath)) {
    echo "File not found.";
    exit;
}

// 파일 내용을 읽어옴
$fileContents = file_get_contents($txtFilePath);

// 줄 단위로 분할
$lines = explode("\n", $fileContents);

// 결과를 담을 배열 초기화
$credits = array();
$completedCredits = array();
$requiredCredits = array();

// 이수학점 추출
foreach ($lines as $line) {
    if (strpos($line, '총취득학점') !== false) {
        $start = strpos($line, '총취득학점 : ') + strlen('총취득학점 : ');  // 시작 위치 계산
        $end = strpos($line, '평점');
        $credits[] = substr($line, $start, $end - $start);  // 시작 위치부터 종료 위치까지 추출
    }
    if (strpos($line, '기취득학점') !== false) {
        $start = strpos($line, '기취득학점 ') + strlen('기취득학점 ');  // 시작 위치 계산
        $extractedText = substr($line, $start);

        $completedCredits = explode(' ', $extractedText);
    }
    if (strpos($line, '졸업소요학점') !== false) {
        $start = strpos($line, '졸업소요학점 ') + strlen('졸업소요학점 ');  // 시작 위치 계산
        $extractedText = substr($line, $start);

        $requiredCredits = explode(' ', $extractedText);
    }
}

if($completedCredits){
    $credits[] = $completedCredits[0] + $completedCredits[1];
    $credits[] = $completedCredits[10];
    $credits[] = $completedCredits[11] + $completedCredits[12] + $completedCredits[13] + $completedCredits[14];
    $credits[] = $completedCredits[15] + $completedCredits[16];
    $credits[] = $completedCredits[18];
    $credits[] = $completedCredits[19];
    $credits[] = $completedCredits[21];
    $credits[] = $completedCredits[22];
    $credits[] = $completedCredits[27];
    $credits[] = $completedCredits[29];
}

if($requiredCredits){
    $credits[] = $requiredCredits[0];
    $credits[] = $requiredCredits[1];
    $credits[] = $requiredCredits[2];
    $credits[] = $requiredCredits[3];
    $credits[] = $requiredCredits[5];
    $credits[] = $requiredCredits[6];
    $credits[] = $requiredCredits[8];
    $credits[] = $requiredCredits[9];
    $credits[] = $requiredCredits[14];
    $credits[] = $requiredCredits[16];
    $credits[] = $requiredCredits[18];
}

if($completedCredits){
    $credits[] = $completedCredits[2];
    $credits[] = $completedCredits[3];
    $credits[] = $completedCredits[4];
    $credits[] = $completedCredits[5];
    $credits[] = $completedCredits[6];
    $credits[] = $completedCredits[7];
    $credits[] = $completedCredits[8];
    // $credits[] = $completedCredits[16];
}
if(count($credits) >= 20){
    $query = "INSERT INTO `credits` (`user_id`, `cumulative`,
                `coreCapacityAcquire`, `balanceIntegrationAcquire`, `foundationAcquire`, `generalAcquire`,
                `majorEssentialAcquire`, `majorElectiveAcquire`, `doubleMajorEssentialAcquire`, `doubleMajorElectiveAcquire`, `minorAcquire`, `teachingAcquire`,
                `coreCapacityNeed`, `balanceIntegrationNeed`, `foundationNeed`, `generalNeed`,
                `majorEssentialNeed`, `majorElectiveNeed`, `doubleMajorEssentialNeed`, `doubleMajorElectiveNeed`, `minorNeed`, `teachingNeed`, `total`,
                `area1`, `area2`, `area3`, `area4`, `area5`, `area6`, `area7`)
                VALUES ('$user_id', $credits[0],
                '$credits[1]', '$credits[2]', '$credits[3]', '$credits[4]',
                '$credits[5]', '$credits[6]', '$credits[7]', '$credits[8]', '$credits[9]', '$credits[10]',
                '$credits[11]', '$credits[12]', '$credits[13]', '$credits[14]',
                '$credits[15]', '$credits[16]', '$credits[17]', '$credits[18]', '$credits[19]', '$credits[20]', '$credits[21]',
                '$credits[22]', '$credits[23]', '$credits[24]', '$credits[25]', '$credits[26]', '$credits[27]', '$credits[28]')";
    $result = $db->query($query);
}

if ($result) {
    echo "Credits : Data inserted successfully.";
} else {
    echo "Credits : Error inserting data.";
}

?>