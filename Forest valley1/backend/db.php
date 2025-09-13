<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "forestvalley_db";  // ✅ make sure you created this database in phpMyAdmin

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
