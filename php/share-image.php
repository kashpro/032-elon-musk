<?php

try {
    echo request();
} catch (\Throwable $th) {
    $response = [
        'status' => 'Error',
        'data' => [
            $th->getMessage(),
            $th->getLine()
        ],
    ];

    echo json_encode($response);
}

function request()
{
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");

    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        return 0;
    }

    $response = [
        'status' => 'Error',
        'data' => null,
    ];

    $post_array = $_POST;

    $post_data = file_get_contents("php://input");
    if (!empty($post_data)) {
        $res = json_decode($post_data, true);
        $post_array['data'] = $res['data'] ?? false;
        // file_put_contents('./logs.log', "$post_data\n", FILE_APPEND | LOCK_EX);
        // file_put_contents('./logs.log', $post_array['data'] . "\n", FILE_APPEND | LOCK_EX);
    }

    if ($post_array['data'] ?? false) {
        $name = 'shareimages/'.time().'.png';
        $res = file_put_contents(__DIR__.'/'.$name, base64_decode($post_array['data']));
        $actual_link = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://$_SERVER[HTTP_HOST]/";

        $response = [
            'status' => 'Success',
            'data' => $actual_link . $name,
        ];
    }

    header('Content-Type: application/json');
    return json_encode($response);
}