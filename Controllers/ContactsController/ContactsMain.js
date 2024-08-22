// Variables for API URL and DOM elements

var webAPIURL = "https://localhost:7145/api/Contact/";
//var webAPIURL = "https://localhost:7077/api/Contact/";

var txtContactEntryId = document.getElementById('txtContactEntryId');
var txtName = document.getElementById('txtName');
var txtEmail = document.getElementById('txtEmail');
var txtPhone = document.getElementById('txtPhone');
var txtAddress = document.getElementById('txtAddress');


//var btnAdd = document.getElementById("btnAdd");
var btnSave = document.getElementById("btnSave");
var btnEdit = document.getElementById("btnEdit");
var btnDelete = document.getElementById("btnDelete");
var btnCancel = document.getElementById("btnCancel");
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

// Event listener for Add button
//btnAdd.addEventListener('click', function () {
//    clearFields();
//});

// Event listener for Edit button
btnEdit.addEventListener('click', function () {
    // Assuming you have a way to select a contact to edit
    // This part needs to be implemented based on how you manage selections
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

// Event listener for Cancel button
btnCancel.addEventListener('click', function () {
    clearFields();
    // Navigate back to the list view
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
        success: function () {
            var msg = "Contact Successfully saved into the system.";
            alert(msg); // Using standard alert for success message
            // Optionally, reset the form or navigate away
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
        success: function () {
            var msg = "Successfully marked as History on the System.";
            alert(msg); // Using standard alert for success message
            // Redirect or refresh the page as needed
            window.location.href = "/Views/ContactsView/frmContactsList.html";
        },
        error: function (error) {
            var ex = window.FormatHttpResponseData(error);
            alert("An error occurred: " + ex.Message); // Using standard alert for error message
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
        success: function () {
            var msg = "Successfully updated in the System.";
            alert(msg); // Using standard alert for success message
            window.location.href = "/Views/ContactsView/frmContactsList.html";
        },
        error: function (error) {
            var ex = window.FormatHttpResponseData(error);
            alert("An error occurred: " + ex.Message); // Using standard alert for error message
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
        success: function (data) {// Populate main view elements with the fetched data
            console.log("Retrieved Entry ID ", data);
            txtContactEntryId.value = data[0].ENTRY_ID;
            txtName.value = data[0].NAME;
            txtEmail.value = data[0].EMAIL;
            txtPhone.value = data[0].PHONE;
            txtAddress.value = data[0].ADDRESS;
        },
        error: function (error) {
            console.error("Error fetching contact:", error);
        }
    });
}

