<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Retrieve form data
    $fullname = $_POST["fullname"];
    $email = $_POST["email"];
    $phone = $_POST["phone"];
    $message = $_POST["message"];

    // Create email message
    $to = "milanone4@gmail.com"; // Replace with your email address
    $subject = "New Contact Form Submission";
    $body = "Full Name: $fullname\n";
    $body .= "Email: $email\n";
    $body .= "Phone: $phone\n";
    $body .= "Message: $message\n";

    // Send email
    if (mail($to, $subject, $body)) {
        echo "Your message has been sent successfully.";

    } else {
        echo "Failed to send your message. Please try again later.";
    }
} else {
    // If accessed directly, redirect to the form page
    header("Location: /ar.html"); // Replace with the path to your HTML form page
    exit;
}
?>