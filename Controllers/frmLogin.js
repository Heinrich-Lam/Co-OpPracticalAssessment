var webAPIURL = "https://localhost:7145/api/Contact/";
//var webAPIURL = "https://localhost:7077/api/Contact/";

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

//function login() {
//    var username = document.getElementById("username").value;
//    var password = document.getElementById("password").value;

//    if (username !== "" && password !== "") {
//        var postdata = {
//            Name: username,
//            Password: password
//        };

//        $.ajax({
//            type: 'POST',
//            url: webAPIURL + 'login', // Update to the login endpoint
//            contentType: 'application/json',
//            dataType: 'json',
//            data: JSON.stringify(postdata),
//            success: function (response) {
//                console.log("Response is = ", response.Token);
//                console.log(response);

//                if (response.Token) {
//                    localStorage.setItem("jwtToken", response.Token);
//                    var jwtToken = localStorage.getItem("jwtToken");
//                    console.log("Token is =", jwtToken);
//                } else {
//                    console.error("No token found in response");
//                }


//                // Make an authenticated request immediately after login
//                $.ajax({
//                    type: 'GET',
//                    url: webAPIURL + 'Read/readContact',
//                    headers: {
//                        'Authorization': 'Bearer ' + jwtToken,
//                        'Content-Type': 'application/json'
//                    },
//                    success: function (data) {
//                        // Process data if needed before navigation
//                        console.log(data);
//                        // Navigate to the secured page
//                        window.location.href = "/Views/ContactsView/frmContactsList.html";
//                    },
//                    error: function (error) {
//                        console.error("Error fetching contacts:", error);
//                        // Log the status code and response text for more insight
//                        console.error("Status Code:", error.status);
//                        console.error("Response Text:", error.statusText);
//                        // Optionally, parse and log the response body for more details
//                        if (error.responseText) {
//                            try {
//                                const responseBody = JSON.parse(error.responseText);
//                                console.error("Response Body:", responseBody);
//                            } catch (parseError) {
//                                console.error("Failed to parse response body:", parseError);
//                            }
//                        }
//                        // Handle any error before navigation
//                    }
//                });
//            },
//            error: function (xhr) {
//                console.error("Login error:", xhr);

//                // Display error message from the response
//                document.getElementById('error').innerText = xhr.responseJSON.message;
//            }
//        });
//    } else {
//        // Validate input fields
//        document.getElementById('error').innerText = "Username or Password cannot be empty.";
//    }


//    //if (username !== "" && password !== "") {
//    //    var postdata = {
//    //        Name: username,
//    //        Password: password
//    //    }

//    //    $.ajax({
//    //        type: 'POST',
//    //        url: webAPIURL + 'Read/readSecurity',
//    //        contentType: 'application/json',
//    //        dataType: 'json',
//    //        data: JSON.stringify(postdata),
//    //        success: function (data) {
//    //            console.log(data);
//    //            if (data && data.length > 0) {
//    //                // Process successful login
//    //                // Navigate to list view or perform other actions
//    //                window.location.href = "/Views/ContactsView/frmContactsList.html"; // Direct navigation
//    //            } else {
//    //                // Display error message
//    //                document.getElementById('error').innerText = "Invalid username or password.";
//    //            }
//    //        },
//    //        error: function (error) {
//    //            // Handle network errors or unexpected issues
//    //            console.error("Login error:", error);
//    //            document.getElementById('error').innerText = "An error occurred during login.";

//    //            //window.location.href = "/Views/ContactsView/frmContactsList.html"; // Direct navigation
//    //        }
//    //    });
//    //} else {
//    //    // Validate input fields
//    //    document.getElementById('error').innerText = "Username or Password cannot be empty.";
//    //}
//}
//#region
//#endregion
//function login() {
//    var username = document.getElementById("username").value;
//    var password = document.getElementById("password").value;

//    if (username !== "" && password !== "") {
//        var postData = {
//            Name: username,
//            Password: password
//        };

//        $.ajax({
//            type: 'POST',
//            url: webAPIURL + 'login', // Ensure this is your login endpoint URL
//            contentType: 'application/json',
//            dataType: 'json',
//            data: JSON.stringify(postData),
//            success: function (response) {
//                console.log("Response is = ", response.Token);
//                console.log(response);

//                if (response.Token) {
//                    // Store the JWT token in localStorage
//                    localStorage.setItem("jwtToken", response.Token);

//                    // Retrieve the stored JWT token for immediate use
//                    const jwtToken = localStorage.getItem("jwtToken");
//                    console.log("Token is =", jwtToken);

//                    // Use the token for an authenticated request
//                    makeAuthenticatedRequest(jwtToken);
//                } else {
//                    console.error("No token found in response");
//                }
//            },
//            error: function (xhr) {
//                console.error("Login error:", xhr);

//                // Display error message from the response
//                document.getElementById('error').innerText = xhr.responseJSON ? xhr.responseJSON.message : "An unknown error occurred.";
//            }
//        });
//    } else {
//        // Validate input fields
//        document.getElementById('error').innerText = "Username or Password cannot be empty.";
//    }
//}

//// Function to make an authenticated request using the JWT token
//function makeAuthenticatedRequest(jwtToken) {
//    if (!jwtToken) {
//        console.error("JWT token is null or undefined.");
//        return; // Exit the function if the token is not available
//    }

//    $.ajax({
//        type: 'GET',
//        url: webAPIURL + 'Read/readContact',
//        headers: {
//            'Authorization': 'Bearer ' + jwtToken,
//            'Content-Type': 'application/json'
//        },
//        success: function (data) {
//            console.log("Success:", data);
//            // Navigate to the secured page
//            window.location.href = "/Views/ContactsView/frmContactsList.html";
//        },
//        error: function (error) {
//            console.error("Error fetching contacts:", error);
//            console.error("Status Code:", error.status);
//            console.error("Response Text:", error.statusText);
//            if (error.responseText) {
//                try {
//                    const responseBody = JSON.parse(error.responseText);
//                    console.error("Response Body:", responseBody);
//                } catch (parseError) {
//                    console.error("Failed to parse response body:", parseError);
//                }
//            }
//            // Handle any error before navigation
//        }
//    });
//}


function login() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    if (username !== "" && password !== "") {
        var postData = {
            Name: username,
            Password: password
        };

        $.ajax({
            type: 'POST',
            url: webAPIURL + 'login', // Ensure this is your login endpoint URL
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify(postData),
            success: function (response) {
                console.log("Response is =", response.Token);
                console.log(response);

                if (response.Token) {
                    // Store the JWT token in localStorage
                    localStorage.setItem('token', response.Token); // Use 'token' as per the provided code

                    // Retrieve the stored JWT token for immediate use
                    const jwtToken = localStorage.getItem('token'); // Retrieve using 'token'
                    console.log("Token is =", jwtToken);

                    // Use the token for an authenticated request
                    makeAuthenticatedRequest(jwtToken);
                } else {
                    console.error("No token found in response");
                }
            },
            error: function (xhr) {
                console.error("Login error:", xhr);

                // Display error message from the response
                document.getElementById('error').innerText = xhr.responseJSON ? xhr.responseJSON.message : "An unknown error occurred.";
            }
        });
    } else {
        // Validate input fields
        document.getElementById('error').innerText = "Username or Password cannot be empty.";
    }
}

function makeAuthenticatedRequest(jwtToken) {
    if (!jwtToken) {
        console.error("JWT token is null or undefined.");
        return; // Exit the function if the token is not available
    }

    var username = encodeURIComponent(document.getElementById("username").value);
    var password = encodeURIComponent(document.getElementById("password").value);

    $.ajax({
        type: 'GET',
        url: webAPIURL + 'Read/readContact?Name=' + username + '&Password=' + password,
        headers: {
            'Authorization': 'Bearer ' + jwtToken
        },
        success: function (data) {
            console.log("Success:", data);
            // Navigate to the secured page
            window.location.href = "/Views/ContactsView/frmContactsList.html";
        },
        error: function (error) {
            console.error("Error fetching contacts:", error);
            console.error("Status Code:", error.status);
            console.error("Response Text:", error.statusText);
            if (error.responseText) {
                try {
                    const responseBody = JSON.parse(error.responseText);
                    console.error("Response Body:", responseBody);
                } catch (parseError) {
                    console.error("Failed to parse response body:", parseError);
                }
            }
            // Handle any error before navigation
        }
    });
}


//function makeAuthenticatedRequest(jwtToken) {
//    if (!jwtToken) {
//        console.error("JWT token is null or undefined.");
//        return; // Exit the function if the token is not available
//    }

//    var username = document.getElementById("username").value;
//    var password = document.getElementById("password").value;

//    var postData = {
//        Name: username,
//        Password: password
//    };

//    $.ajax({
//        type: 'GET',
//        url: webAPIURL + 'Read/readContact',
//        headers: {
//            'Authorization': 'Bearer ' + jwtToken,
//            'Content-Type': 'application/json'
//        },
//        data: JSON.stringify(postData),
//        success: function (data) {
//            console.log("Success:", data);
//            // Navigate to the secured page
//            window.location.href = "/Views/ContactsView/frmContactsList.html";
//        },
//        error: function (error) {
//            console.error("Error fetching contacts:", error);
//            console.error("Status Code:", error.status);
//            console.error("Response Text:", error.statusText);
//            if (error.responseText) {
//                try {
//                    const responseBody = JSON.parse(error.responseText);
//                    console.error("Response Body:", responseBody);
//                } catch (parseError) {
//                    console.error("Failed to parse response body:", parseError);
//                }
//            }
//            // Handle any error before navigation
//        }
//    });
//}


var btnlogin = document.getElementById("login");
btnlogin.addEventListener('click', function () {
    login();
});

var btnRegister = document.getElementById("register");
btnRegister.addEventListener('click', function () {
    window.location.href = "/Views/ContactsView/frmContactRegister.html";
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
