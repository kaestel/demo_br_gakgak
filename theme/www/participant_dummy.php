<?php

$response = array('type' => '', 'message' => '');

$name        = $_POST['name'];
$age         = $_POST['age'];
$address     = $_POST['address'];
$zipcode     = $_POST['zipcode'];
$city        = $_POST['city'];
$phone       = $_POST['phone'];
$email       = $_POST['email'];
$club_member = $_POST['club_member'];

if (!empty($name) && !empty($age) && !empty($address) && !empty($zipcode) &&
    !empty($city) && !empty($phone) && !empty($email) && isset($club_member)) {
      
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
      $response['type']    = 'error';
      $response['message'] = '"email" isn\'t a valid email address';
    }
}
else {
  $response['type']    = 'error';
  $response['message'] = 'All fields are mandatory';
}

// No errors so send the email
if ($response['type'] != 'error') {
  $response['type']    = 'success';
  $response['message'] = 'Email has been sent';
}

header('Content-Type: application/json');
print(json_encode($response));

?>