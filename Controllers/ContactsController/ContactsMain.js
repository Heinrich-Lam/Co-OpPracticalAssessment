// Variables for API URL and DOM elements

var webAPIURL = "https://localhost:7145/api/Contact/";

var txtContactEntryId = document.getElementById('txtContactEntryId');
var txtName = document.getElementById('txtName');
var txtEmail = document.getElementById('txtEmail');
var txtPhone = document.getElementById('txtPhone');
var txtAddress = document.getElementById('txtAddress');

var btnSave = document.getElementById("btnSave");
var btnEdit = document.getElementById("btnEdit");
var btnDelete = document.getElementById("btnDelete");
var btnBack = document.getElementById("btnBack");

// Function to clear input fields
function clearFields() {
    txtContactEntryId.value = "";
    txtName.value = "";
    txtEmail.value = "";
    txtPhone.value = "";
    txtAddress.value = "";
}

// Function to display message
function showMessage(message, type) {
    const msgBox = document.createElement('div');
    msgBox.textContent = message;
    msgBox.className = `message ${type}`;
    document.body.appendChild(msgBox);
}

// Event listener for Edit button
btnEdit.addEventListener('click', function () {
    updateContact();
});

// Event listener for Save button
btnSave.addEventListener('click', function () {
    insertContact();
});

// Event listener for Delete button
btnDelete.addEventListener('click', function () {
    deleteContact();
});

// Event listener for Back button
btnBack.addEventListener('click', function () {
    // Navigate back to the previous screen
    window.location.href = "/Views/ContactsView/frmContactsList.html";
});

function insertContact() {
    var parameterData = {
        Name: $('#txtName').val(),
        Email: $('#txtEmail').val(),
        Phone: $('#txtPhone').val(),
        Address: $('#txtAddress').val(),
        History: 0
    };

    $.ajax({
        type: 'POST',
        url: webAPIURL + 'Insert/insertContact',
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
            var msg = "Contact Successfully saved into the system.";
            alert(msg);
            window.location.href = "/Views/ContactsView/frmContactsList.html";
        },
        error: function (error) {
            var ex = window.FormatHttpResponseData(error);
            alert("An error occurred: " + ex.Message); // Using standard alert for error message
        }
    });
}


function deleteContact() {
    var parameterData = {
        EntryID: $('#txtContactEntryId').val()
    };

    $.ajax({
        type: 'POST',
        url: webAPIURL + 'Delete/deleteContact',
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
            var msg = "Successfully marked as History on the System.";
            alert(msg);
            window.location.href = "/Views/ContactsView/frmContactsList.html";
        },
        error: function (error) {
            var ex = window.FormatHttpResponseData(error);
            alert("An error occurred: " + ex.Message);
        }
    });
}


function updateContact() {
    var parameterData = {
        EntryID: $('#txtContactEntryId').val(),
        Name: $('#txtName').val(),
        Email: $('#txtEmail').val(),
        Phone: $('#txtPhone').val(),
        Address: $('#txtAddress').val()
    };

    $.ajax({
        type: 'POST',
        url: webAPIURL + 'Update/updateContact',
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
            alert(msg); 
            window.location.href = "/Views/ContactsView/frmContactsList.html";
        },
        error: function (error) {
            var ex = window.FormatHttpResponseData(error);
            alert("An error occurred: " + ex.Message); 
        }
    });
}

if (contactId) {
    var postData = { EntryID: contactId };

    $.ajax({
        type: 'POST',
        url: webAPIURL + 'Read/readContactInfo',
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify(postData),
        beforeSend: function (xhr) {
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
                txtContactEntryId.value = data[0].ENTRY_ID || '';
                txtName.value = data[0].NAME || '';
                txtEmail.value = data[0].EMAIL || '';
                txtPhone.value = data[0].PHONE || '';
                txtAddress.value = data[0].ADDRESS || '';
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

