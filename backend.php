<?php 
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

/**
 * CONFIG
 */
$root = getcwd() . '/';
$host = 'http://localhost/webex/';
$image_dir = 'images/';
$db_file = $root . 'DB.json';

if ($_POST) {

  //nacitam si data z db
  $data = json_decode(join('', file($db_file)));

  //upravujem post
  $postdata = $_POST;
  unset($postdata['file']);
  $postdata['image'] = '';
  $postdata['created_at'] = date("Y-m-d H:i:s");

  //upload obrazka
  if ($_FILES) {
    $imgName = md5(time());
    $ext = strtolower(strrchr($_FILES['file']['name'], "."));
    move_uploaded_file($_FILES['file']['tmp_name'], $root . $image_dir . $imgName . $ext);
    @chmod($root . $image_dir, 755);
    $postdata['image'] = $host . $image_dir . $imgName . $ext;
  }

  $data[] = $postdata;

  //zapis dat do databazy
  $fh = fopen($db_file, 'w');
  fwrite($fh, json_encode($data));
  fclose($fh);

}

//nacitam si aktualne data z db
$data = json_decode(join('', file($db_file)));

echo json_encode(array(
  'response' => (!$data ? array() : $data)
));