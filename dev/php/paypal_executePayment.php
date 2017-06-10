<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require($_SERVER['DOCUMENT_ROOT'].'/php/variables.php');

$redirectUrl = $successPageUrl;

try {
    $conn = new PDO("mysql:host=" . $db_serverName . ";dbname=" . $db_Name, $db_userName, $db_password);
    // set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
//    echo "Connected successfully";

    $sql = "SELECT `auth_token`,  `token_creation_date`,  `token_expiration_date`, `payment_ID`,  
        `execute_payment_link`, `name`, `email`, `summoner_name`, `server`, `description`, `price` FROM `orders` WHERE `payment_ID`=\"" . $_GET["paymentId"] . "\"";
    $result = $conn->query($sql);

    $now = date('U');

    $row = $result->fetch(PDO::FETCH_ASSOC);
    $expiration_date = $row["auth_token"];

    if ($expiration_date <= $now) {
        $redirectUrl = $failPageUrl;
        goto onFail;
    }

    $auth_token = $row["auth_token"];
    $payer_ID = $_GET["PayerID"];
    $execute_payment_link = $row["execute_payment_link"];

    $curl = curl_init();

    curl_setopt_array($curl, array(
        CURLOPT_URL => $execute_payment_link,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => "",
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 30,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => "POST",
        CURLOPT_POSTFIELDS => "{ \"payer_id\" : \"" . $payer_ID . "\" }",
        CURLOPT_HTTPHEADER => array(
            "authorization: Bearer " . $auth_token,
            "content-type: application/json"
        ),
    ));

    $response = curl_exec($curl);
    $err = curl_error($curl);

    $http_code = curl_getinfo($curl, CURLINFO_HTTP_CODE);

    if ($http_code !== 200) {
        $redirectUrl = $failPageUrl;
//        echo "Execute-Payment request failed.<br> Response Code: " . $http_code . "<br>Response text: <br>" . $response;
        goto onFail;
    }

    curl_close($curl);

    if ($err) {
        $redirectUrl = $failPageUrl;
        goto onFail;
//        echo "cURL Error #:" . $err;
    }

    require($_SERVER['DOCUMENT_ROOT'].'/php/sendNotification.php');

    $sql = "DELETE FROM `orders` WHERE `payment_ID`=\"" . $_GET["paymentId"] . "\"";

    // use exec() because no results are returned
    $conn->exec($sql);

    onFail:
    $sql = "DELETE FROM `orders` WHERE `token_expiration_date`<=" . $now;
    $conn->exec($sql);
}
catch(PDOException $e)
{
//    echo "Connection failed: " . $e->getMessage();
    $redirectUrl = $failPageUrl;
}

header("Location: " . $redirectUrl);