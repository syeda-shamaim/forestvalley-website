<?php
include 'db.php'; // include connection

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get form data
    $name     = $_POST['name'];
    $email    = $_POST['email'];
    $phone    = $_POST['phone']; // ✅ match column name
    $subject  = $_POST['subject'];
    $details  = $_POST['message']; // your form field is "message"

    // Prepare SQL
    $stmt = $conn->prepare("INSERT INTO contact_form1 (name, email, phonenumber, subject, project_details) VALUES (?, ?, ?, ?, ?)");
    $stmt->bind_param("sssss", $name, $email, $phone, $subject, $details);

    if ($stmt->execute()) {
        header("Location: ../html/contact.html?success=1");
        exit();
    } else {
        echo "Error: " . $stmt->error;
    }

    $stmt->close();
    $conn->close();
}
?>
