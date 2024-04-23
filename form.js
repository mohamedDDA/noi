document.addEventListener("DOMContentLoaded", function () {
    var submitButton = document.getElementById("submit-btn");

    submitButton.addEventListener("click", function (e) {
        e.preventDefault(); // Prevent the default form submission

        var form = document.getElementById("contact-form");

        // Validate the form fields
        if (validateForm(form)) {
            var formData = new FormData(form);

            // Construct email data
            var emailData = {
                personalizations: [
                    {
                        to: [{ email: "noi20241@gmail.com" }] // Replace with recipient's email address
                    }
                ],
                from: { email: "milanone4@gmail.com" }, // Replace with sender's email address
                subject: "New Contact Form Submission",
                content: [
                    {
                        type: "text/plain",
                        value: "Full Name: " + formData.get("fullname") + "\n" +
                            "Email: " + formData.get("email") + "\n" +
                            "Phone: " + formData.get("phone") + "\n" +
                            "Message: " + formData.get("message")
                    }
                ]
            };

            // Send the email using SendGrid API
            fetch("https://api.sendgrid.com/v3/mail/send", {
                method: "POST",
                headers: {
                    "Authorization": "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",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(emailData)
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    document.getElementById("res").innerHTML = "Your message has been sent successfully.";
                    form.reset(); // Reset the form fields
                })
                .catch(error => {
                    console.error(error);
                    document.getElementById("res").innerHTML = "An error occurred. Please try again.";
                });
        }
    });
});

function validateForm(form) {
    var token = form.querySelector('input[name="_token"]').value.trim();
    var fullname = form.querySelector('input[name="fullname"]').value.trim();
    var email = form.querySelector('input[name="email"]').value.trim();
    var phone = form.querySelector('input[name="phone"]').value.trim();
    var message = form.querySelector('textarea[name="message"]').value.trim();

    // Basic validation - check if fields are not empty
    if (token !== "2uwQdvonnBJ3iYEMbPQrHfTWSNU78GiO6WEFXKFq") {
        alert("Bot detected. Please refresh the page and try again.");
        return false;
    }

    if (fullname === "" || email === "" || phone === "" || message === "") {
        alert("Please fill out all fields.");
        return false;
    }

    // Email format validation
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert("Please enter a valid email address.");
        return false;
    }

    return true;
}
