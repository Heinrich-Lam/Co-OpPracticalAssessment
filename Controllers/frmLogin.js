var webAPIURL = "https://localhost:7145/api/Contact/";

function PasswordClearAndFocus() {
    document.getElementById("password").value = "";
    document.getElementById("password").focus();
}

function showLoading() {
    $('#button-loading').show();
    $('#button-text').hide();
}

function hideLoading() {
    $('#button-text').show();
    $('#button-loading').hide();
}

function login() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    if (username !== "" && password !== "") {
        var postdata = {
            Name: username,
            Password: password
        }

        $.ajax({
            type: 'POST',
            url: webAPIURL + 'Read/readSecurity',
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify(postdata),
            success: function (data) {
                console.log(data);
                if (data && data.length > 0) {
                    // Process successful login
                    // Navigate to list view or perform other actions
                    window.location.href = "/Views/ContactsView/frmContactsList.html"; // Direct navigation
                } else {
                    // Display error message
                    document.getElementById('error').innerText = "Invalid username or password.";
                }
            },
            error: function (error) {
                // Handle network errors or unexpected issues
                console.error("Login error:", error);
                document.getElementById('error').innerText = "An error occurred during login.";

                //window.location.href = "/Views/ContactsView/frmContactsList.html"; // Direct navigation
            }
        });
    } else {
        // Validate input fields
        document.getElementById('error').innerText = "Username or Password cannot be empty.";
    }
}

var btnlogin = document.getElementById("login");
btnlogin.addEventListener('click', function () {
    login();
});

hideLoading();

function FormatHttpResponseData(response) {
    var responseTextReturn = {
        Message: ""
    };

    try {
        if (response.status <= 0) {
            responseTextReturn.Message = "Response Error. Request timed out, was aborted or blocked.";
        } else if (response.responseText.toString().includes("||||")) {
            var responseDataSplit = response.responseText.toString().split("||||")
            responseTextReturn.Message = responseDataSplit[1].toString();
        } else if (response.responseText.toString().toUpperCase().startsWith('<!DOCTYPE HTML')) {
            var htmlError = document.createElement('div');
            htmlError.innerHTML = response.responseText.toString();
            var actualError = htmlError.getElementsByTagName("h2");
            if (actualError.length > 0) {
                responseTextReturn.Message = actualError[0].innerHTML;
            } else {
                responseTextReturn.Message = "Please contact your web administrator.";
            }
        } else if (response.data != undefined) {
            if (response.data.errors != undefined) {
                var errorKeys = Object.keys(response.data.errors);
                for (var i = 0; i < errorKeys.length; i++) {
                    responseTextReturn.Message += response.data.errors[errorKeys[i]][0] + ",";
                }
                if (responseTextReturn.Message != "") {
                    responseTextReturn.Message = responseTextReturn.Message.substring(0, responseTextReturn.Message.length - 1);
                } else {
                    responseTextReturn.Message = 'Unknown error. Please contact your system administrator.';
                }
            } else if (response.data.Message != undefined) {
                responseTextReturn.Message = response.data.Message;
            } else {
                if (response.data != undefined) {
                    if (response.data != '') {
                        responseTextReturn.Message = response.data;
                    } else if (response.statusText != undefined) {
                        if (response.statusText != '') {
                            responseTextReturn.Message = response.status.toString() + ' ' + response.statusText;
                        } else {
                            responseTextReturn.Message = 'Unknown error. Please contact your system administrator.';
                        }
                    }
                }
            }
            if (response.data.ExceptionMessage !== undefined) {
                responseTextReturn.Message += ', ' + response.data.ExceptionMessage;
            }
        } else if (response.responseJSON != undefined) {
            if (response.responseJSON.errors != undefined) {
                responseTextReturn.Message = Object.values(response.responseJSON.errors)[0][0].toString()
            }
        } else {
            responseTextReturn.Message = "Unknown error: " + response.status.toString();
        }

        if (responseTextReturn.Message == "") {
            responseTextReturn.Message = "Unknown error: " + response.status.toString();
        }
    } catch (e1) {
        responseTextReturn.Message = "System error: " + e1.message + ' . Please contact the website administrator.';
    }
    return responseTextReturn;
}
