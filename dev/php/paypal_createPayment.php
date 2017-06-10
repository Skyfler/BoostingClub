<?php

//ini_set('display_errors', 1);
//ini_set('display_startup_errors', 1);
//error_reporting(E_ALL);

require($_SERVER['DOCUMENT_ROOT'].'/php/lib/PHPExcel-1.8/Classes/PHPExcel.php');
require($_SERVER['DOCUMENT_ROOT'].'/php/lib/PHPExcel-1.8/Classes/PHPExcel/Writer/Excel2007.php');

require($_SERVER['DOCUMENT_ROOT'].'/php/variables.php');

if ($_POST['serviceType'] === 'divisionBoost') {
    require($_SERVER['DOCUMENT_ROOT'].'/php/paypal_calculateDivisionBoost.php');

} else if ($_POST['serviceType'] === 'winsBoost') {
    require($_SERVER['DOCUMENT_ROOT'].'/php/paypal_calculateWinsBoost.php');

} else if ($_POST['serviceType'] === 'duoqBoost') {
    require($_SERVER['DOCUMENT_ROOT'].'/php/paypal_calculateDuoQBoost.php');

} else {
    $res['msg'] = "Unknown service type: " . $_POST['serviceType'];
    goto onFail;
}

$price = floor(getTotalPrice());
$description = createDescription(); //. " Total price: " . $price . "€";

if ($price === 0) {
    $res['msg'] = "Invalid values for calculating a price.";
    goto onFail;
}

try {
    /*$conn = new PDO("mysql:host=" . $db_serverName . ";dbname=" . $db_Name, $db_userName, $db_password);
    // set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
//    echo "Connected successfully";

    $curl = curl_init();

    curl_setopt_array($curl, array(
        CURLOPT_URL => "https://api" . $paypal_mode_aval_arr[$paypal_mode] . ".paypal.com/v1/oauth2/token",
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => "",
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 30,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => "POST",
        CURLOPT_POSTFIELDS => "grant_type=client_credentials",
        CURLOPT_HTTPHEADER => array(
            "accept: application/json",
            "accept-language: en_US",
            "authorization: Basic " . base64_encode(${"paypal_" . $paypal_mode . "ClientID"} . ":" . ${"paypal_" . $paypal_mode . "Secret"}),
            "content-type: application/x-www-form-urlencoded"
        ),
    ));

    $response = curl_exec($curl);
    $err = curl_error($curl);

    $http_code = curl_getinfo($curl, CURLINFO_HTTP_CODE);

    if ($http_code !== 200) {
        $res['msg'] = "Get-Token request failed. Response Code: " . $http_code . "Response text: " . $response;
        goto onFail;
    }

    curl_close($curl);

    if ($err) {
//        echo "cURL Error #:" . $err;
        $res['msg'] = "Get-Token request failed. cURL Error #: " . $err;
        goto onFail;
    }

    $now = date('U');
    $access_token = json_decode($response, true)["access_token"];
    $creation_date = $now;
    $expires_in = json_decode($response, true)["expires_in"];
    $expiration_date = $now + $expires_in;

    $curl = curl_init();

    curl_setopt_array($curl, array(
        CURLOPT_URL => "https://api" . $paypal_mode_aval_arr[$paypal_mode]. ".paypal.com/v1/payments/payment",
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => "",
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 30,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => "POST",
        CURLOPT_POSTFIELDS => "{
        \"intent\": \"sale\",
        \"redirect_urls\":
            {
                \"return_url\": \"" . $return_url . "\",
                \"cancel_url\": \"" . $cancel_url . "\"
            },
        \"payer\":
            {
                \"payment_method\": \"paypal\"
            },
        \"transactions\":
            [
                {
                    \"amount\":
                    {
                        \"total\": \"" . $price . "\",
                        \"currency\": \"EUR\"
                    },
                    \"description\": \"" . $description . "\",
                    \"item_list\": {
                        \"items\":[
                            {
                                \"quantity\":\"1\",
                                \"name\":\"" . $description . "\",
                                \"price\":\"" . $price . "\",
                                \"currency\":\"EUR\"
                            }
                        ]
                    }
                }
            ]
    }",
        CURLOPT_HTTPHEADER => array(
            "authorization: Bearer " . $access_token,
            "content-type: application/json"
        ),
    ));

    $response = curl_exec($curl);
    $err = curl_error($curl);

    $http_code = curl_getinfo($curl, CURLINFO_HTTP_CODE);

    if ($http_code !== 200 && $http_code !== 201) {
        $res['msg'] = "Create-Payment request failed. Response Code: " . $http_code . "Response text: " . $response;
        goto onFail;
    }

    curl_close($curl);

    if ($err) {
//        echo "cURL Error #:" . $err;
        $res['msg'] = "Create-Payment request failed. cURL Error #: " . $err;
        goto onFail;
    }

//    print_r(json_decode($response, true));
    $payment_ID = json_decode($response, true)["id"];

    $approval_link = json_decode($response, true)["links"]["1"]["href"];
    $execute_link = json_decode($response, true)["links"]["2"]["href"];

    $sql = "INSERT INTO `orders` (`auth_token`,  `token_creation_date`,  `token_expiration_date`, `payment_ID`,
        `execute_payment_link`, `name`, `email`, `summoner_name`, `server`, `description`, `price`)
        VALUES ('" . $access_token . "', '" . $creation_date . "', '" . $expiration_date . "', '" . $payment_ID . "', '" .
        $execute_link . "', '" . $_POST['name'] . "', '" . $_POST['email'] . "', '" . $_POST['summonerName'] . "', '" . $_POST['server'] . "', '" . $description . "', '" . $price . "')";
//     use exec() because no results are returned

    $conn->exec($sql);*/

    // Create new PHPExcel object
    /* echo date('H:i:s') . " Create new PHPExcel object\n"; */
    $objPHPExcel = new PHPExcel();
    try {
        /* echo date('H:i:s') . " Try reading file<br>"; */
        $objPHPExcel = PHPExcel_IOFactory::load($_SERVER['DOCUMENT_ROOT']."/".$ordersFileName);
        $objPHPExcel->setActiveSheetIndex(0);
        $row = $objPHPExcel->getActiveSheet()->getHighestRow()+1;
    }
    catch(Exception $e)
    {
        /* echo date('H:i:s') . " Reading failed<br>"; */
        $objPHPExcel->setActiveSheetIndex(0);
        $row = 1;
        /* echo date('H:i:s') . " Row set to " . $row . "<br>"; */
        /* echo date('H:i:s') . " Adding titles<br>"; */
        $objPHPExcel->getActiveSheet()->SetCellValue('A'.$row, 'Name');
        $objPHPExcel->getActiveSheet()->SetCellValue('B'.$row, 'Email');
        $objPHPExcel->getActiveSheet()->SetCellValue('C'.$row, 'Summoner Name');
        $objPHPExcel->getActiveSheet()->SetCellValue('D'.$row, 'Description');
        $objPHPExcel->getActiveSheet()->SetCellValue('E'.$row, 'Server');
        $objPHPExcel->getActiveSheet()->SetCellValue('F'.$row, 'Total Price (€)');
        /* echo date('H:i:s') . " Setting 1st row to BOLD<br>"; */
        $objPHPExcel->getActiveSheet()->getStyle("A1:F1")->getFont()->setBold(true);
        $row = 2;
    }
    /* echo date('H:i:s') . " Row set to " . $row . "<br>"; */
    /* echo date('H:i:s') . " Adding data<br>"; */
    $objPHPExcel->getActiveSheet()->SetCellValue('A'.$row, $_POST['name']);
    $objPHPExcel->getActiveSheet()->SetCellValue('B'.$row, $_POST['email']);
    $objPHPExcel->getActiveSheet()->SetCellValue('C'.$row, $_POST['summonerName']);
    $objPHPExcel->getActiveSheet()->SetCellValue('D'.$row, $description);
    $objPHPExcel->getActiveSheet()->SetCellValue('E'.$row, $_POST['server']);
    $objPHPExcel->getActiveSheet()->SetCellValue('F'.$row, $price);
    // Save Excel 2007 file
    /* echo date('H:i:s') . " Write to Excel2007 format<br>"; */
    $objWriter = new PHPExcel_Writer_Excel2007($objPHPExcel);
    $objWriter->save($_SERVER['DOCUMENT_ROOT']."/".$ordersFileName);
    /* echo date('H:i:s') . " Done writing file.<br>"; */

    $res['success'] = 1;
    /*$res['msg'] = "Payment Created!";*/
    /*$res['approval_link'] = $approval_link;*/

    /*=================================*/
    $row = array(
        'name' => $_POST['name'],
        'email' => $_POST['email'],
        'summoner_name' => $_POST['summonerName'],
        'description' => $description,
        'price' => $price,
        'server' => $_POST['server'],
    );
    require($_SERVER['DOCUMENT_ROOT'].'/php/sendNotification.php');
    /*=================================*/
}
catch(PDOException $e)
{
    $res['msg'] = "Connection to DB failed: " . $e->getMessage();
//    echo "Connection failed: " . $e->getMessage();
    onFail:
    $res['success'] = 0;
}

echo json_encode($res);
