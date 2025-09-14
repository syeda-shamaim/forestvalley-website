<?php
// Database connection
$servername = "localhost";
$username   = "root";
$password   = "";
$dbname     = "form_database"; // Your database name

$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Only process POST requests
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get form data and sanitize
    $name    = htmlspecialchars($_POST['name']);
    $email   = htmlspecialchars($_POST['email']);
    $phone   = htmlspecialchars($_POST['phone']);
    $subject = htmlspecialchars($_POST['subject']);

    // Prepare SQL statement
    $stmt = $conn->prepare("INSERT INTO Customer (name, email, phone_number, subject) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("ssss", $name, $email, $phone, $subject);

    if ($stmt->execute()) {
        // Redirect back to contact page with success message
        header("Location: ../html/contact.html?success=1");
        exit();
    } else {
        echo "Error: " . $stmt->error;
    }

    $stmt->close();
    $conn->close();
}
?>
