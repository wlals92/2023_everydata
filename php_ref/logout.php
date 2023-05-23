<?php
//세션을 삭제하는 php
require_once("dbconfig.php");
session_start();
//세션 삭제
session_destroy();