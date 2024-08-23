// Variables for API URL and DOM elements

var webAPIURL = "https://localhost:7145/api/Contact/";

var txtUserEntryId = document.getElementById('txtUserEntryId');
var txtName = document.getElementById('txtName');
var txtSurname = document.getElementById('txtSurname');
var txtEmail = document.getElementById('txtEmail');
var txtPassword = document.getElementById('txtPassword');

var btnSave = document.getElementById("btnSave");
var btnEdit = document.getElementById("btnEdit");
var btnDelete = document.getElementById("btnDelete");
var btnBack = document.getElementById("btnBack");

// Function to display message
function showMessage(message, type) {
    const msgBox = document.createElement('div');
    msgBox.textContent = message;
    msgBox.className = `message ${type}`;
    document.body.appendChild(msgBox);
}

// Event listener for Edit button
btnEdit.addEventListener('click', function () {
    updateUser();
});

// Event listener for Save button
btnSave.addEventListener('click', function () {
    insertUser();
});

// Event listener for Delete button
btnDelete.addEventListener('click', function () {
    deleteUser();
});

// Event listener for Back button
btnBack.addEventListener('click', function () {
    // Navigate back to the previous screen
    window.location.href = "/Views/frmLogin.html";
});

function insertUser() {
    var parameterData = {
        Name: $('#txtName').val(),
        Surname: $('#txtSurname').val(),
        Email: $('#txtEmail').val(),
        Password: $('#txtPassword').val(),
        History: 0
    };

    $.ajax({
        type: 'POST',
        url: webAPIURL + 'Insert/insertUser',
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        data: JSON.stringify(parameterData),
        beforeSend: function (xhr) {
            const jwtToken = localStorage.getItem('token');
            if (jwtToken) {
                xhr.setRequestHeader('Authorization', 'Bearer ' + jwtToken);
            }
        },
        success: function () {
            var msg = "User Successfully saved into the system.";
            alert(msg);
            window.location.href = "/Views/frmLogin.html";
        },
        error: function (error) {
            var ex = window.FormatHttpResponseData(error);
            alert("An error occurred: " + ex.Message); // Using standard alert for error message
        }
    });
}


function deleteUser() {
    var parameterData = {
        EntryID: $('#txtUserEntryId').val()
    };

    $.ajax({
        type: 'POST',
        url: webAPIURL + 'Delete/deleteUser',
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        data: JSON.stringify(parameterData),
        beforeSend: function (xhr) {
            const jwtToken = localStorage.getItem('token');
            if (jwtToken) {
                xhr.setRequestHeader('Authorization', 'Bearer ' + jwtToken);
            }
        },
        success: function () {
            var msg = "Successfully removed from the System.";
            alert(msg); // Using standard alert for success message
            window.location.href = "/Views/frmLogin.html";
        },
        error: function (error) {
            var ex = window.FormatHttpResponseData(error);
            alert("An error occurred: " + ex.Message); // Using standard alert for error message
        }
    });
}


function updateUser() {
    var parameterData = {
        EntryID: $('#txtUserEntryId').val(),
        Name: $('#txtName').val(),
        Surname: $('#txtSurname').val(),
        Email: $('#txtEmail').val(),
        Password: $('#txtPassword').val()
    };

    $.ajax({
        type: 'POST',
        url: webAPIURL + 'Update/updateUser',
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        data: JSON.stringify(parameterData),
        beforeSend: function (xhr) {
            const jwtToken = localStorage.getItem('token');
            if (jwtToken) {
                xhr.setRequestHeader('Authorization', 'Bearer ' + jwtToken);
            }
        },
        success: function () {
            var msg = "Successfully updated in the System.";
            alert(msg); // Using standard alert for success message
            window.location.href = "/Views/frmLogin.html";
        },
        error: function (error) {
            var ex = window.FormatHttpResponseData(error);
            alert("An error occurred: " + ex.Message); // Using standard alert for error message
        }
    });
}

if (contactId) {
    var postData = { EntryID: contactId };

    txtPassword.disabled = true;

    $.ajax({
        type: 'POST',
        url: webAPIURL + 'Read/readUserInfo',
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify(postData),
        beforeSend: function (xhr) {
            // Optional: Add JWT token if required
            const jwtToken = localStorage.getItem('token');
            if (jwtToken) {
                xhr.setRequestHeader('Authorization', 'Bearer ' + jwtToken);
            }
        },
        success: function (data) {
            console.log("Retrieved Entry ID: ", data);

            // Check if data is an array and has the expected structure
            if (Array.isArray(data) && data.length > 0) {
                // Populate main view elements with the fetched data
                txtUserEntryId.value = data[0].ENTRY_ID || '';
                txtName.value = data[0].NAME || '';
                txtSurname.value = data[0].SURNAME || '';
                txtEmail.value = data[0].EMAIL || '';
            } else {
                console.warn("Unexpected data format:", data);
            }
        },
        error: function (xhr, status, error) {
            console.error("Error fetching contact:", status, error);
            alert("An error occurred while fetching contact details.");
        }
    });
}