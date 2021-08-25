// Grab all the necessary elements from the DOM
const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const passwordRetype = document.getElementById("password-retype");
const submit = document.getElementById("submit");

// Prevent Submitting the form when input value empty
form.addEventListener("submit", (e) => {
    e.preventDefault();



    checkInput();
});

// Check whether the input values are valid or not
const checkInput = () => {
    // Get the input values
    const usernameValue = username.value.trim();
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();
    const passwordRetypeValue = passwordRetype.value.trim();

    if (usernameValue === "") {
        displayErrorFor(username, "Please Enter a Username!");
    } else {
        displaySuccessFor(username);
    }

    if (emailValue === "") {
        displayErrorFor(email, "Please Enter an Email Address!");
    } else if (!validateEmail(emailValue)) {
        displayErrorFor(email, "Please Enter a Valid Email Address!");
    } else {
        displaySuccessFor(email);
    }

    if (passwordValue === "") {
        displayErrorFor(password, "Please Enter a Password!");
    } else if (!validatePassword(passwordValue)) {
        alert(`Password must contain 
        between 8 -15 characters,
        at least one lowercase letter,
        at least one uppercase letter,
        at least one numeric digit,
        at least one special character.`);
        displayErrorFor(password, "Please Enter a Valid Password!");
    } else {
        displaySuccessFor(password);
    }

    if (passwordRetypeValue === "") {
        displayErrorFor(passwordRetype, "Please Enter your Password Again!");
    } else if (passwordValue !== passwordRetypeValue) {
        displayErrorFor(passwordRetype, "Your Passwords do not Match!!!");
    } else {
        displaySuccessFor(passwordRetype);
    }
};

// Display Error function
const displayErrorFor = (input, message) => {
    const formControl = input.parentElement;
    const small = formControl.querySelector("small");

    // Display error message inside small element
    small.innerText = message;

    // Add error class
    formControl.className = "form-control error";
};

// Display Success function
const displaySuccessFor = (input) => {
    const formControl = input.parentElement;

    // Add success class
    formControl.className = "form-control success";
};

const validateEmail = email => {
    const regexEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regexEmail.test(email);
};

const validatePassword = password => {
    const regexPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
    return regexPassword.test(password);
};

// Trigger Button Click on Enter keystroke
passwordRetype.addEventListener("keyup", function(event) {
    if (event.key === 13) {
        event.preventDefault();
        submit.click();
    }
});