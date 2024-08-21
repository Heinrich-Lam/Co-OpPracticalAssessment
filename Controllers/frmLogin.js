var webAPIURL = "https://localhost:7145/api/Contact/"; //TEST

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
    //showLoading();

    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    if (username !== "" && password !== "") {
        // Creates post data to send to C# side to validate
        var postdata = {
            name: username,
            password: password,
            access: "" // Or set this value if required by your API
        }

        // Sends post data to C# side using a JSON format
        $.ajax({
            type: 'POST',
            url: webAPIURL + 'Read/readSecurity', // Replace with your actual controller and action names
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify(postdata),
            success: function (data) {
                if (data && data.length > 0) {
                    // Assuming the API returns the `name`, `password`, and `access` fields
                    var userData = data[0]; // Access the first record if it's an array

                    // Extract only the required fields
                    var name = userData.NAME;
                    var password = userData.PASSWORD; // Ensure you handle this securely
                    var access = userData.ACCESS;

                    // Handle the extracted data (for example, save to local storage or session)
                    window.localStorage.setItem('UserData', JSON.stringify({
                        name: name,
                        password: password,
                        access: access
                    }));

                    document.getElementById("password").value = "";
                    hideLoading();

                    window.location.href = "frmContactsList.html";

                } else {
                    hideLoading();
                    document.getElementById('error').value = "Username or Password is Incorrect!";
                    PasswordClearAndFocus();
                }
            },
            error: function (error) {
                hideLoading();
                document.getElementById('error').value = FormatHttpResponseData(error).Message;
            }
        });
    } else {
        hideLoading();
        document.getElementById('error').value = "Username or Password is Incorrect!";
        PasswordClearAndFocus();
    }
}

var btnlogin = document.getElementById("login");
btnlogin.addEventListener('click', function () {
    login();
});

// Checks if user is already logged in
//if (window.localStorage.getItem('Employee') == null) {
//    // Login button is clicked
//    $('#login').click(function (e) {
//        e.preventDefault();

//        login();
//    });

//    document.getElementById('username').addEventListener('keypress', function (e) {
//        if (e.key === 'Enter') {
//            document.getElementById('password').focus();
//        }
//    });

//    document.getElementById('password').addEventListener('keypress', function (e) {
//        if (e.key === 'Enter') {
//            login()
//        }
//    });
//} else {
//    window.location.href = "navMain.html";
//    PasswordClearAndFocus();
//}

hideLoading();

function FormatHttpResponseData(response) {

    var responseTextReturn =
    {
        Message: ""
    };

    try {
        //When there is no status for e.g. on a timeout, if the request was somehow aborted or blocked
        if (response.status <= 0) {
            responseTextReturn.Message = "Response Error. Request timed out, was aborted or blocked.";
        }
        else if (response.responseText.toString().includes("||||")) {
            var responseDataSplit = response.responseText.toString().split("||||")
            responseTextReturn.Message = responseDataSplit[1].toString();
        }
        else if (response.responseText.toString().toUpperCase().startsWith('<!DOCTYPE HTML')) {
            //When an error is returned in HTML format, it's usually a server/programmer error. Return custom hard-coded error in JSON format as per below.

            var htmlError = document.createElement('div');

            htmlError.innerHTML = response.responseText.toString();

            var actualError = htmlError.getElementsByTagName("h2");

            if (actualError.length > 0) {
                responseTextReturn.Message = actualError[0].innerHTML;
            }
            else {
                responseTextReturn.Message = "Please contact your web administrator.";
            }
        }
        else if (response.data != undefined) {

            if (response.data.errors != undefined) {

                var errorKeys = Object.keys(response.data.errors);

                for (var i = 0; i < errorKeys.length; i++) {
                    responseTextReturn.Message += response.data.errors[errorKeys[i]][0] + ",";
                }

                if (responseTextReturn.Message != "") {
                    responseTextReturn.Message = responseTextReturn.Message.substring(0, responseTextReturn.Message.length - 1);
                }
                else {
                    responseTextReturn.Message = 'Unknown error. Please contact your system administrator.';
                }
            }
            else if (response.data.Message != undefined) {
                responseTextReturn.Message = response.data.Message;
            }
            else {

                if (response.data != undefined) {
                    if (response.data != '') {
                        responseTextReturn.Message = response.data;
                    }
                    else if (response.statusText != undefined) {

                        if (response.statusText != '') {
                            responseTextReturn.Message = response.status.toString() + ' ' + response.statusText;
                        }
                        else {
                            responseTextReturn.Message = 'Unknown error. Please contact your system administrator.';
                        }

                    }
                }
            }
            if (response.data.ExceptionMessage !== undefined) {
                responseTextReturn.Message += ', ' + response.data.ExceptionMessage;
            }
        }
        else if (response.responseJSON != undefined) {
            if (response.responseJSON.errors != undefined) {
                responseTextReturn.Message = Object.values(response.responseJSON.errors)[0][0].toString()

            }
        }
        else {
            responseTextReturn.Message = "Unknown error: " + response.status.toString();
        }

        if (responseTextReturn.Message == "") {
            responseTextReturn.Message = "Unknown error: " + response.status.toString();
        }
    } catch (e1) {
        //Set the return message to a system error if the responseText in the above code failed
        responseTextReturn.Message = "System error: " + e1.message + ' . Please contact the website administrator.';
    }
    return responseTextReturn;
}