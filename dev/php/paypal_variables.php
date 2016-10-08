<?php

/*object with prices etc.*/
require($_SERVER['DOCUMENT_ROOT'].'/php/paypal_valArr.php');

/*BD credentials*/
$db_serverName = "uitlabcom.ipagemysql.com";
$db_userName = "user1";
$db_password = "123456";
$db_Name = "boostingclub";

/*PayPal credentials*/
$paypal_ClientID = 'AYGSAdvpP8wNdqGuae4GbYadOoZIge9vo1CUAJhS9RUm0_ZHgBcTJrwGuneqjI3ncAor7BbNnFjeGJ1m';
$paypal_Secret = 'EE7tgaiCX05PDQeFS3kb3Xpaab9wdosgdv4RKSyqo-BUBcGGSKISVB3XKYoeJEHb2MRgPYYWkG9M50-q';

/*Redirect URLs*/
$return_url = "http://boostingclub.com/php/paypal_executePayment.php";
$cancel_url = "http://boostingclub.com";
$successPageUrl = "http://boostingclub.com";
$failPageUrl = "http://boostingclub.com/team.html";

/*Mail credentials*/
$mail_host = "uitlabcom.ipage.com";
$mail_port = 587;
$mail_username = "support@uitlab.com";
$mail_password = "WeRl98gA!";

$sendTo_email = "support@uitlab.com";

/*FileName to save orders*/
$ordersFileName = "orders.xlsx";