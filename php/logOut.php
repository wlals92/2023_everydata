<?php
// 이지민 작성 : 로그아웃
session_start();
unset($_SESSION['name']);
unset($_SESSION['id']);
unset($_SESSION['curriculum_year']);
session_destroy();
?>