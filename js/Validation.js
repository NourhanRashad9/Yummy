function Contacts() {
    rowData.innerHTML = `
    <div class="contact min-vh-100 d-flex justify-content-center align-items-center">
        <div class="container w-75 text-center">
            <div class="row g-4">
                <div class="col-md-6">
                    <input id="nameInput" onkeyup="Validation()" type="text" class="form-control" placeholder="Enter Your Name">
                    <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                        Special characters and numbers not allowed
                    </div>
                </div>
                <div class="col-md-6">
                    <input id="emailInput" onkeyup="Validation()" type="email" class="form-control" placeholder="Enter Your Email">
                    <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                        Email not valid *exemple@yyy.zzz
                    </div>
                </div>
                <div class="col-md-6">
                    <input id="phoneInput" onkeyup="Validation()" type="text" class="form-control" placeholder="Enter Your Phone">
                    <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                        Enter valid Phone Number
                    </div>
                </div>
                <div class="col-md-6">
                    <input id="ageInput" onkeyup="Validation()" type="number" class="form-control" placeholder="Enter Your Age">
                    <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                        Enter valid age
                    </div>
                </div>
                <div class="col-md-6">
                    <input id="passwordInput" onkeyup="Validation()" type="password" class="form-control" placeholder="Enter Your Password">
                    <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                        Enter valid password *Minimum eight characters, at least one letter and one number:*
                    </div>
                </div>
                <div class="col-md-6">
                    <input id="repasswordInput" onkeyup="Validation()" type="password" class="form-control" placeholder="Repassword">
                    <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                        Enter valid repassword 
                    </div>
                </div>
            </div>
            <button id="submitBtn" disabled class="btn btn-outline-danger px-2 mt-3">Submit</button>
        </div>
    </div>`;

    const inputs = [
        "nameInput",
        "emailInput",
        "phoneInput",
        "ageInput",
        "passwordInput",
        "repasswordInput"
    ];

    inputs.forEach(inputId => {
        document.getElementById(inputId).addEventListener("focus", () => {
            window[inputId + "Touched"] = true; 
        });
    });
}





var nameInput = false;
var emailInput = false;
var phoneInput = false;
var ageInput = false;
var passwordInput = false;
var repasswordInput = false;

function Validation() {
    let errorMessage = "";

    if (nameInput) {
        if (nameValidation()) {
            document.getElementById("nameAlert").classList.replace("d-block", "d-none");
        } else {
            errorMessage += "Invalid name: Only letters and spaces allowed.\n";
            document.getElementById("nameAlert").classList.replace("d-none", "d-block");
        }
    }

    if (emailInput) {
        if (emailValidation()) {
            document.getElementById("emailAlert").classList.replace("d-block", "d-none");
        } else {
            errorMessage += "Invalid email format.\n";
            document.getElementById("emailAlert").classList.replace("d-none", "d-block");
        }
    }

    if (phoneInput) {
        if (phoneValidation()) {
            document.getElementById("phoneAlert").classList.replace("d-block", "d-none");
        } else {
            errorMessage += "Invalid phone number format.\n";
            document.getElementById("phoneAlert").classList.replace("d-none", "d-block");
        }
    }

    if (ageInput) {
        if (ageValidation()) {
            document.getElementById("ageAlert").classList.replace("d-block", "d-none");
        } else {
            errorMessage += "Invalid age. Must be between 1 and 200.\n";
            document.getElementById("ageAlert").classList.replace("d-none", "d-block");
        }
    }

    if (passwordInput) {
        if (passwordValidation()) {
            document.getElementById("passwordAlert").classList.replace("d-block", "d-none");
        } else {
            errorMessage += "Invalid password: Minimum eight characters, at least one letter and one number.\n";
            document.getElementById("passwordAlert").classList.replace("d-none", "d-block");
        }
    }

    if (repasswordInput) {
        if (repasswordValidation()) {
            document.getElementById("repasswordAlert").classList.replace("d-block", "d-none");
        } else {
            errorMessage += "Passwords do not match.\n";
            document.getElementById("repasswordAlert").classList.replace("d-none", "d-block");
        }
    }

    if (errorMessage) {
        alert(errorMessage); 
    }

    if (nameValidation() && emailValidation() &&  phoneValidation() &&  ageValidation() &&  passwordValidation() &&  repasswordValidation()) {
        submitBtn.removeAttribute("disabled");
    } else {
        submitBtn.setAttribute("disabled", true);
    }
}

function nameValidation() {
    return /^[a-zA-Z\s]+$/.test(document.getElementById("nameInput").value);
}

function emailValidation() {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(document.getElementById("emailInput").value);
}

function phoneValidation() {
    return /^\+?[1-9]\d{1,14}$/.test(document.getElementById("phoneInput").value);
}

function ageValidation() {
    return /^(1?[0-9]{1,2}|200)$/.test(document.getElementById("ageInput").value);
}

function passwordValidation() {
    return /^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d]{8,}$/.test(document.getElementById("passwordInput").value);
}

function repasswordValidation() {
    return document.getElementById("repasswordInput").value === document.getElementById("passwordInput").value;
}
