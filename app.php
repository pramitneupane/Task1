<?php
$servername = "localhost";
$username = "username";
$password = "password";
$dbname = "database";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$username = $_POST["username"];
$password = $_POST["password"];

$stmt = $conn->prepare("SELECT first_name, last_name FROM users WHERE username = ?
 AND password = ?");
$stmt->bind_param("ss", $username, $password);
$stmt->execute();
$stmt->store_result();

$response = array();

if ($stmt->num_rows > 0) {
  $stmt->bind_result($first_name, $last_name);
  $stmt->fetch();
  $response["exists"] = true;
  $response["first_name"] = $first_name;
  $response["last_name"] = $last_name;
} else {
  $response["exists"] = false;
}

echo json_encode($response);

$stmt->close();
$conn->close();
?>