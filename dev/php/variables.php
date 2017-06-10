<?php

$paypal_mode = 'test'; //live || test

/*object with prices etc.*/
require($_SERVER['DOCUMENT_ROOT'].'/php/paypal_valArr.php');

/*BD credentials*/
$db_serverName = "uitlabcom.ipagemysql.com";
$db_userName = "user1";
$db_password = "123456";
$db_Name = "boostingclub";

/*PayPal credentials*/
$paypal_liveClientID = 'AcS6wzmtciytrPcThu8famUuoxHRqOTb2LB1UxRLL9tTj3VbjFRrPG6PvFhgDtKDdSSgJ81oLcv4I3aO';
$paypal_liveSecret = 'EGEiUR1Ep3f-ywBD4DVaVnX3pBJwPG_yX-PF7w_Vr_MhxtChkyLOvA9aM8NZGJlZu_U_3sJpb6OPagAU';
$paypal_testClientID = 'Aanpm9vpc9YO0tFS672V-JDBb-lyWNj-fKV7U2wugZjkn-yLNqNH9N8ECfPvaM3i7Cx9y1Qs8bCX4Odf';
$paypal_testSecret = 'EEYJPDjmiuprlOaACdxXNcNjAk25ihmmZySBrTEvUJgr4Z9aRZwgBJconKfMa-tDiRsXxeGHQYKO-LXb';

$paypal_mode_aval_arr = array(
    'live' => "",
    'test' => ".sandbox"
);

/*Redirect URLs*/
$return_url = "http://boostingclub.com/php/paypal_executePayment.php";
$cancel_url = "http://boostingclub.com/php/paypal_cancel_redirect.php";
$successPageUrl = "http://boostingclub.com/#payment-success";
$failPageUrl = "http://boostingclub.com/#payment-error";

/*Mail credentials*/
$mail_host = "uitlabcom.ipage.com";
$mail_port = 587;
$mail_username = "support@boostingclub.com";
$mail_password = "Uitlabuser01";

$sendTo_email = "support@boostingclub.com";

/*FileName to save orders*/
$ordersFileName = "orders.xlsx";
