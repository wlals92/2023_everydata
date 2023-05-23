<?php
require_once("dbconfig.php"); 
session_start();
//세션 변수의 값 , 닉네임을 받아온다.
if($_SESSION['User_Name']){
    echo($_SESSION['User_Name']);
} else{
    //세션변수값이 없을때 false값
    echo false;
}