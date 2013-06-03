<?php

$response = array('type' => '', 'message' => '');

$name         = $_POST['name'];
$email        = $_POST['email'];
$friend_name  = $_POST['friend_name'];
$friend_email = $_POST['friend_email'];
$message      = $_POST['message'];

if (!empty($name) && !empty($email) && !empty($friend_name) && !empty($friend_email) && !empty($message)) {
  if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $response['type']    = 'error';
    $response['message'] = '"email" isn\'t a valid email address';
  }
  if (!filter_var($friend_email, FILTER_VALIDATE_EMAIL)) {
    $response['type']    = 'error';
    $response['message'] = '"friend email" isn\'t a valid email address';
  }
}
else {
  $response['type']    = 'error';
  $response['message'] = 'All fields except "message" are mandatory';
}

// No errors so send the email
if ($response['type'] != 'error') {
  $response['type']    = 'success';
  $response['message'] = 'Email has been sent';
}

header('Content-Type: application/json');
print(json_encode($response));

?>