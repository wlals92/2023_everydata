<?php
// 이지민 작성 : 이수학점 추출 파일
require_once("dbConfig.php");

// ocr.py에서 넘겨준 user_id
// if (!isset($_SERVER['argv'][1])) {
//     exit;
// }
// $user_id = $_SERVER['argv'][1];
$user_id = "lee123";

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
$extractedSentences = array();

// 이수학점 추출
foreach ($lines as $line) {
    $foundCreditTarget = false;
    if (strpos($line, '기취득학점') !== false) {
        $start = strpos($line, '기취득학점 ') + strlen('기취득학점 ');  // 시작 위치 계산
        $extractedText = substr($line, $start, $end - $start);  // 시작 위치부터 종료 위치까지 추출

        $extractedSentences[] = $extractedText;
    }
    if (strpos($line, '졸업소요학점') !== false) {
        $foundCreditTarget = true;
    }
    if ($foundCreditTarget) {
        $extractedSentences[] = $line;
    }
}

foreach ($extractedSentences as $sentence) {
    echo $sentence . '\n';
}