<?php

require($_SERVER['DOCUMENT_ROOT'].'/php/lib/PHPMailer/PHPMailerAutoload.php');

$mailer = new PHPMailer;

$mailer->setLanguage('ru', $_SERVER['DOCUMENT_ROOT'].'/php/lib/PHPMailer/language/');
$mailer->CharSet = 'UTF-8';

$mailer->IsSMTP();                              // telling the class to use SMTP
$mailer->SMTPAuth   = true;                     // enable SMTP authentication
$mailer->Host       = $mail_host;               // SMTP server
$mailer->SMTPDebug  = 0;                        // enables SMTP debug information (for testing)
// 1 = errors and messages
// 2 = messages only
$mailer->Port       = $mail_port;               // set the SMTP port for the GMAIL server
$mailer->Username   = $mail_username;           // SMTP account username
$mailer->Password   = $mail_password;           // SMTP account password

$mailer->setFrom($row["email"], $row["name"]);

$mailer->addAddress($sendTo_email, '');

$mailer->Subject = 'New Payment Recived from ' . $row["name"];

// sumbission data
$date = date('d/m/Y');
$time = date('H:i:s');

$messageBody = "<p><strong>Name: </strong>" . $row["name"] . "</p>
        				<p><strong>Email: </strong>" . $row["email"] . "</p>
        				<p><strong>Summoner Name: </strong>" . $row["summoner_name"] . "</p>
        				<p><strong>Description: </strong>" . $row["description"] . "</p>
        				<p><strong>Total Price: </strong>" . $row["price"] . "€</p>
        				<p><strong>Server: </strong>" . $row["server"] . "</p>
        				<p>{$date} {$time}</p>";

$contents = file_get_contents($_SERVER['DOCUMENT_ROOT'].'/php/mailTemplate.html');
$contents = str_replace('{%message%}', $messageBody, $contents);

$mailer->msgHTML($contents);

//$img = $_FILES['file'];
//
//if(!empty($img))
//{
//    $img_desc = reArrayFiles($img);
//
//    foreach($img_desc as $val)
//    {
//        $mailer->addAttachment($val['tmp_name'], $val['name']);
//    }
//}
//
//function reArrayFiles($file)
//{
//    $file_ary = array();
//    $file_count = count($file['name']);
//    $file_key = array_keys($file);
//
//    for($i=0;$i<$file_count;$i++)
//    {
//        foreach($file_key as $val)
//        {
//            $file_ary[$i][$val] = $file[$val][$i];
//        }
//    }
//    return $file_ary;
//}


if (!$mailer->send()) {
    //echo "Mailer Error: " . $mailer->ErrorInfo;
//    $res['success'] = 0;
//    $res['msg'] = "Mailer Error: " . $mailer->ErrorInfo;
} else {
    //echo "Message sent!";
//    $res['success'] = 1;
//    $res['msg'] = "Message sent!";
}

//echo json_encode($res);
$mailer->clearAddresses();
$mailer->clearAttachments();