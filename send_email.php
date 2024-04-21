<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Check the hidden input for bot detection
    if (!empty($_POST['bot-field'])) {
        // If the hidden input is filled, consider it as spam and do not process the form
        echo "<p>Spam detected. Form submission aborted.</p>";
        exit; // Stop further execution
    }

    // Get form data
    $fullname = $_POST['fullname'];
    $email = $_POST['email'];
    $phone = $_POST['phone'];
    $message = $_POST['message'];

    // Email recipient
    $to = "noi20241@gmail.com";

    // Email subject
    $subject = "New Contact Form Submission";

    // Email message
    $email_message = "Name: $fullname\n";
    $email_message .= "Email: $email\n";
    $email_message .= "Phone: $phone\n\n";
    $email_message .= "Message:\n$message";

    // Send email
    if (mail($to, $subject, $email_message)) {
        echo "<p>Email sent successfully!</p>";
    } else {
        echo "<p>Failed to send email. Please try again later.</p>";
    }
} else {
    // If accessed directly, redirect to the form page
    header("Location: index.html");
    exit;
}
?>
