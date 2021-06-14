<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    return 0;
}

try {
    echo json_encode(request());
} catch (\Throwable $th) {
    $response = [
        'status' => 'Error',
        'data' => [$th->getMessage()],
    ];

    echo json_encode($response);
}

function request()
{
    $response = [
        'status' => 'Error',
        'data' => null,
    ];

    $post_array = $_POST;

    $post_data = file_get_contents("php://input");
    if (!empty($post_data)) {
        $res = json_decode($post_data, true);
        $post_array['data'] = isset($res['data']) ? $res['data'] : false;
    }

    $root_path = $_SERVER['DOCUMENT_ROOT'];
    $folder_path = str_replace($root_path, '', __DIR__. '/') . '/shareimages/';
    $folder_path = str_replace('//', '/', $folder_path);
    $folder_path = ltrim($folder_path, '/');
    $folder_path = "/$folder_path";
 
    if (((isset($post_array['data']) && $post_array['data']) ? $post_array['data'] : false)) {

        if (!file_exists($root_path.$folder_path)) {
            mkdir($root_path.$folder_path, 0777, true);
        }
        
        $name = $folder_path.time().'.png';
        $res = file_put_contents($root_path.$name, base64_decode($post_array['data']));

        if (file_exists($root_path.$name)) {
            $actual_link = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://$_SERVER[HTTP_HOST]";
            $response['status'] = 'Success';
            $response['data'] = $actual_link . $name;
        } else {
            $response['data'] = 'Cant save image';
        }
    }

    return $response;
}