document.addEventListener("DOMContentLoaded", function () {
    var submitButton = document.getElementById("submit-btn");

    submitButton.addEventListener("click", function (e) {
        e.preventDefault(); // Prevent the default form submission

        var form = document.getElementById("contact-form");

        // Validate the form fields
        if (validateForm(form)) {
            var formData = new FormData(form);

            // Send the form data using Fetch API
            fetch(form.getAttribute("action"), {
                method: "POST",
                body: formData
            })
                .then(response => response.text())
                .then(data => {
                    document.getElementById("res").innerHTML = data;
                    form.reset(); // Reset the form fields
                })
                .catch(error => {
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
