<?php
// 이지민 작성 : 회원정보 수정
require_once("dbConfig.php"); 
session_start();
// 세션이 있는지 확인
if (!isset($_SESSION['id'])) {
    // 세션이 없는 경우 로그인 페이지로 이동 또는 오류 처리
    echo json_encode(null);
    exit;
}
$id = $_SESSION['id'];

$password = isset($_POST["password"]) ? $_POST["password"] : null;
$name = isset($_POST["name"]) ? $_POST["name"] : null;
$student_id = isset($_POST["student_id"]) ? $_POST["student_id"] : null;
$academic_status = isset($_POST["academic_status"]) ? $_POST["academic_status"] : null;
$curriculum_year = isset($_POST["curriculum_year"]) ? $_POST["curriculum_year"] : null;
$grade = isset($_POST["grade"]) ? $_POST["grade"] : null;
$major = isset($_POST["major"]) ? $_POST["major"] : null;
$double_major = isset($_POST["double_major"]) ? $_POST["double_major"] : null;
$minor = isset($_POST["minor"]) ? $_POST["minor"] : null;
$file = isset($_FILES["file"]) ? $_FILES["file"] : null;

if ($file !== null) {
    $pdf_path = "./pdf/" . $id . ".pdf";
    $save_path = "../pdf/" . $id . ".pdf";
    move_uploaded_file($file["tmp_name"], $save_path);
    $sql = "UPDATE user SET user_pw='$password', name='$name', academic_number='$student_id', status='$academic_status', curriculum_year='$curriculum_year', grade='$grade',  
        major='$major', double_major='$double_major', minor='$minor', subjects_completed_pdf='$pdf_path' where user_id = '$id'";
} else {
    $sql = "UPDATE user SET user_pw='$password', name='$name', academic_number='$student_id', status='$academic_status', curriculum_year='$curriculum_year', grade='$grade',  
        major='$major', double_major='$double_major', minor='$minor', subjects_completed_pdf=null where user_id = '$id'";
}
$db->query($sql);

$_SESSION['name']=$name;
$_SESSION['curriculum_year']=$curriculum_year;
$_SESSION['major']=$major;
$_SESSION['double_major']=$double_major;
$_SESSION['minor']=$minor;

exec("python ocr.py ".$id);

mysqli_close($db);