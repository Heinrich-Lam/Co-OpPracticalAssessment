// Test for IE at the beginning
TestBrowserIsInternetExplorer();

//Main Variables

// Set this value to true if you need security
var SecurityOnForm = true;

// The object that will manage the security on the form
var ObjectFormsSecurity;

// The object that will manage the user using the form
var UserSecurity;

var Employee = [];

var webAPIURL = "https://localhost:7291/api/Contacts/"; //TEST

var WindowCurrentState = EnumWindowState.LOCKED;

// #region : Control bar buttons to use variables

var btnAddUse = false;
var btnEditUse = false;
var btnReactivateUse = false;
var btnSaveUse = false;
var btnDeleteUse = false;
var btnCancelUse = false;
var btnBackUse = false;

// #endregion

//Other Variables here
var EnvironmentNewLine = "\r\n";
var EnvironmentNewLineHTML = "<br/>";
var enterKey = 13;
var shiftKey = 16;

var DataTable = [];
var IPList = [];

//Comboboxes.
var VATDatasource = [];
var CurrencyDatasoure = [];


var lastSelectedFilterTextboxValue = "";
var lastSelectedFilterTextboxFilterValue = "";

var lastSelectedRowIndex = 0;

// #region Input & Select elements

//COMPANY DETAILS
var txtContactEntryId = document.getElementById('txtContactEntryId');
var txtName = document.getElementById('txtName');
var txtEmail = document.getElementById('txtEmail');
var txtPhone = document.getElementById('txtPhone');
var txtAddress = document.getElementById('txtAddress');

// #endregion

// Set these values to make use of the buttons on the screen
function setButtonsToUse(_btnAddUse, _btnEditUse, _btnSaveUse, _btnDeleteUse, _btnCancelUse, _btnBackUse) {
    btnAddUse = _btnAddUse;
    btnEditUse = _btnEditUse;
    btnSaveUse = _btnSaveUse;
    btnDeleteUse = _btnDeleteUse;
    btnCancelUse = _btnCancelUse;
    btnBackUse = _btnBackUse;
}

// The settings of the form to be applied when the form is initialized.
async function SetControlsInit() {

    try {
        //TODO: Temporary until correct security method is implemented
        if (localStorage.getItem("Employee") == null) {
            window.location.href = "/Login.html";
        }
        else {
            Employee = JSON.parse(localStorage.getItem("Employee"));

            if (Employee.company == undefined) {
                localStorage.removeItem("Employee")
                window.location.href = "/Login.html";
                return;
            }

            setButtonsToUse(true, true, true, true, true, true);

            if (SecurityOnForm) {
                if (UserSecurity != null) {
                    throw new Error("The user must be set if security is to be applied on the form");
                }
                else {
                    // TODO: Get the user access rights on the form
                    // ObjectFormsSecurity.getUserCRUD(UserSecurity.UserID, this.Name);
                }
            }


            WindowCurrentState = EnumWindowState.ADDING;
            SetToolbarButtons(false, false, true, false, true, false);

            ResetScreen();
            SetFormMode();

            // loading of any additional datasets here
            applySecurityToCurrentScreen();

            DataSetLoad();
        }
    } catch (e) {
        SetToolbarButtons(false, false, false, false, false, false);
        if (e.message != undefined) {
        }
    }
};

// The state of the buttons when they are refreshed
function resetButtonLayout(ItemsInTable) {

    if (ItemsInTable == undefined || ItemsInTable == null) {
        ItemsInTable = 0;
    }

    if (ItemsInTable > 0) {
        SetToolbarButtons(true, true, true, false, true, true, false, true, true, true, true);
    }
    else {
        SetToolbarButtons(true, false, true, false, false, true, false, true, true, true, true);
    }
}

// Setting the buttons visibility and usability
function SetToolbarButtons(_btnAddStatus, _btnEditStatus, _btnSaveStatus, _btnDeleteStatus, _btnCancelStatus, _btnBackStatus) {

    $("#btnAdd").toggle(_btnAddStatus && btnAddUse);
    $("#btnEdit").toggle(_btnEditStatus && btnEditUse);
    $("#btnSave").toggle(_btnSaveStatus && btnSaveUse);
    $("#btnDelete").toggle(_btnDeleteStatus && btnDeleteUse);
    $("#btnCancel").toggle(_btnCancelStatus && btnCancelUse);
    $("#btnBack").toggle(_btnBackStatus && btnBackUse);
}

// Validate the fields before Saving.
function ValidateFields() {
    var isValid = true;
    errorArray = [];

    //if ((document.getElementById("sctTicketStatus").value == 2 || document.getElementById("sctTicketStatus").value == 3) && (document.getElementById("txtStartDate").value == "" || document.getElementById("txtEndDate").value == "")) {
    //    errorArray.push("Select a start and end date!");
    //    isValid = false;
    //}

    //Company Validation
    if (txtName.value.trim() == "") {
        errorArray.push("Contact Name is Required!");
        isValid = false;
    }

    if (txtEmail.value.trim() == "") {
        errorArray.push("Contact Email is Required!");
        isValid = false;
    }

    if (txtPhone.value.trim() == "") {
        errorArray.push("Contact Phone is Required!");
        isValid = false;
    }

    if (txtAddress.value.trim() == "") {
        errorArray.push("Contact Address is Required!");
        isValid = false;
    }

    if (!isValid) {
        window.showError('Some fields are not valid!', errorArray);
    }

    return isValid;
}

// Validate the search fields if necessary.
function ValidateSearchFields() {

}

// Clear the details Fields
function ClearFields() {
    // Get all input and select fields
    var inputs = document.querySelectorAll("input");

    // Reset all input and select fields to their default values
    for (var i = 0; i < inputs.length; i++) {
        if (inputs[i].type == "checkbox" || inputs[i].type == "radio") {
            inputs[i].checked = inputs[i].defaultChecked;
        } else {
            inputs[i].value = inputs[i].defaultValue;
        }
    }

    // Get all input and select fields
    var selects = document.querySelectorAll("select");

    // Reset all input and select fields to their default values
    for (var i = 0; i < selects.length; i++) {
        selects[i].value = selects[i].defaultValue;
    }

    // Get all input and select fields
    var textareas = document.querySelectorAll("textarea");

    // Reset all input and select fields to their default values
    for (var i = 0; i < textareas.length; i++) {
        textareas[i].textContent = textareas[i].defaultValue;
    }
}

// Clear the search Fields
function ClearSearchFields() {

}

// Reset the screen
function ResetScreen() {
    // Unused
}

// Set all your individual fields' properties here depending on the Window's Current State
function SetFormMode() {
    console.log("Current Window state is " + WindowCurrentState);
    switch (WindowCurrentState) {
        case EnumWindowState.ADDING:

            // Get all input and select fields
            var inputs = document.querySelectorAll("input");

            //// Reset all input and select fields to their default values
            //for (var i = 0; i < inputs.length; i++) {
            //    if (inputs[i].id != txtCompEntryId.id && inputs[i].id) {
            //        inputs[i].disabled = false;
            //    }
            //}

            // Get all input and select fields
            var selects = document.querySelectorAll("select");

            // Reset all input and select fields to their default values
            for (var i = 0; i < selects.length; i++) {
                selects[i].disabled = false;
            }

            break;
        case EnumWindowState.DELETING:

            break;
        case EnumWindowState.EDITING:

            // Get all input and select fields
            var inputs = document.querySelectorAll("input");

            // Reset all input and select fields to their default values
            for (var i = 0; i < inputs.length; i++) {
                if (inputs[i].id != txtContactEntryId.id && inputs[i].id) {
                    inputs[i].disabled = false;
                }
            }

            // Get all input and select fields
            var selects = document.querySelectorAll("select");

            // Reset all input and select fields to their default values
            for (var i = 0; i < selects.length; i++) {
                selects[i].disabled = false;
            }

            break;
        case EnumWindowState.READING:

            // Get all input and select fields
            var inputs = document.querySelectorAll("input");

            // Reset all input and select fields to their default values
            for (var i = 0; i < inputs.length; i++) {
                inputs[i].disabled = true;
            }

            // Get all input and select fields
            var selects = document.querySelectorAll("select");

            // Reset all input and select fields to their default values
            for (var i = 0; i < selects.length; i++) {
                selects[i].disabled = true;
            }
            break;
        case EnumWindowState.SEARCHING:

            break;
        default:
            break;

    }
}

// Put all the controls that must remain hidden here.
function SetControlsHidden() {

    switch (WindowCurrentState) {
        case EnumWindowState.ADDING:
            break;
        case EnumWindowState.DELETING:
            break;
        case EnumWindowState.EDITING:
            break;
        case EnumWindowState.READING:
            break;
        case EnumWindowState.SEARCHING:
            break;
        default:
            break;

    }
}

// Apply security to the current form looking at the state the form is in currently.
function applySecurityToCurrentScreen() {
    if (SecurityOnForm) {
        // Apply field level security on the form
        // The security is derived from the from the database for different window states: ADDING; EDITING; READING; DELETING
        // TODO: ObjectFormsSecurity.setFormSecurity(UserSecurityValue.UserId, Me, WindowCurrentState)
    }
}

// #region CONTROL STATUS IN DIFFERENT SCREEN STATES

// The state of the screen before inserting details.
async function SetControlsInsertBefore() {
    WindowCurrentState = EnumWindowState.ADDING;
    SetToolbarButtons(false, false, true, false, true, false);
    ResetScreen();
    SetFormMode();
    applySecurityToCurrentScreen();
    ClearFields();

    SetLeavingPageMessage(true);
}

// The state of the screen before inserting details.
function SetControlsInsertAfter() {
    WindowCurrentState = EnumWindowState.READING;
    SetToolbarButtons(true, true, false, true, false, true);
    ResetScreen();
    SetFormMode();
    DataSetLoad();
    applySecurityToCurrentScreen();

    SetLeavingPageMessage(false);
}

// The state of the screen before inserting details.
function SetControlsCanceltAfter() {
    WindowCurrentState = EnumWindowState.READING;
    SetToolbarButtons(true, true, false, true, false, true);
    ResetScreen();
    SetFormMode();
    DataSetLoad();
    applySecurityToCurrentScreen();

    SetLeavingPageMessage(false);
}

// The state of the screen before inserting details.
async function SetControlsUpdateBefore() {
    WindowCurrentState = EnumWindowState.EDITING;
    SetToolbarButtons(false, false, true, false, true, false);
    ResetScreen();
    SetFormMode();
    PopulateFields();
    applySecurityToCurrentScreen();

    SetLeavingPageMessage(true);


}

// The state of the screen before inserting details.
function SetControlsUpdateAfter() {
    WindowCurrentState = EnumWindowState.READING;
    SetToolbarButtons(true, true, false, true, false, true);
    ResetScreen();
    SetFormMode();
    DataSetLoad();
    applySecurityToCurrentScreen();

    SetLeavingPageMessage(false);
}

// #endregion

// #region Handling Button Events
// Handles the events of the control buttons.
function handleEnumButtonType(event) {

    var btnName = event.currentTarget.id;

    switch (btnName) {
        case 'btnAdd':
            Adding();
            break;
        case 'btnEdit':
            Editing();
            break;
        case 'btnSave':
            BeforeSaving();
            break;
        case 'btnDelete':
            Deleting();
            break;
        case 'btnCancel':
            Canceling();
            break;
        case 'btnBack':
            Returning();
            break;
    }
}

//Add all event handlers for above buttons
document.getElementById("btnAdd").addEventListener('click', handleEnumButtonType);
document.getElementById("btnEdit").addEventListener('click', handleEnumButtonType);
document.getElementById("btnSave").addEventListener('click', handleEnumButtonType);
document.getElementById("btnDelete").addEventListener('click', handleEnumButtonType);
document.getElementById("btnCancel").addEventListener('click', handleEnumButtonType);
document.getElementById("btnBack").addEventListener('click', handleEnumButtonType);


function Adding() {
    SetControlsInsertBefore();
}

function Editing() {
    SetControlsUpdateBefore();
}

// Add anything that needs to happen here before saving the record
function BeforeSaving() {
    Saving();
}

function Saving() {
    if (ValidateFields()) {
        try {
            switch (WindowCurrentState) {
                case EnumWindowState.ADDING:

                    insertContact();

                    break;
                case EnumWindowState.EDITING:

                    updateSQL();

                    break;
                case EnumWindowState.READING:

                    insertSQL();

                    break;
                default:
                    throw new Error("Invalid window state. Please contact your System Administrator.");
                    break;
            }

        } catch (e) {
        }
    }
}

function Deleting() {
    deleteSQL();
}

function Filtering() {
    if (WindowCurrentState == EnumWindowState.READING) {
        DataSetLoad();
    }
}

function Canceling() {
    //if (WindowCurrentState == EnumWindowState.EDITING) {
    //    SetControlsCanceltAfter();
    //} else if (WindowCurrentState == EnumWindowState.ADDING) {
    //    window.populateBody('/Views/Company_Management/frmCompanyManagementList.html');
    //}
    window.populateBody('/Views/ContactsView/frmContactList.html');
}

function Returning() {
    window.populateBody('/Views/ContactsView/frmContactList.html');
}
// #endregion

// #region Database Transactions
// Populate any comboboxes/dropdowns/autocomplete textboxes here
async function PopulateComboboxes() {

}

// The dataset which will be loaded when the screen refreshes.
function DataSetLoad() {
    //readGroup();
    //readEntryID();
}

function DataSetLoadOnSuccess(response) {

    DataTable = response;

    PopulateFields();

    SetFieldsFormatting();
}

// Populates a datatable json object into a HTML table
//function PopulateDataGridView(dgvDataName, dataTable) {

//    var dgvDataElement = document.getElementById(dgvDataName);

//    dgvDataElement.innerHTML = "";

//    var columnNames = Object.keys(dataTable.COLUMNS[0]);

//    dgvDataElement.createTHead();
//    dgvDataElement.createTBody();

//    var tHeadRow = dgvDataElement.tHead.insertRow(0);

//    var tBody = dgvDataElement.getElementsByTagName("tbody")[0];


//    for (var i = 0; i < columnNames.length; i++) {
//        var tHeadCell = tHeadRow.insertCell(i);
//        tHeadCell.innerHTML = columnNames[i];

//    }

//    if (dataTable.DATA.length > 0) {

//        for (var i = 0; i < dataTable.DATA.length; i++) {

//            var tBodyRow = tBody.insertRow(i);

//            tBodyRow.addEventListener('click', PopulateFields);

//            for (var ii = 0; ii < columnNames.length; ii++) {
//                var columnName = columnNames[ii].toString();
//                var tBodyCell = tBodyRow.insertCell(ii);
//                tBodyCell.innerHTML = dataTable.DATA[i][columnName];
//            }

//        }

//    }

//}


//Set any specific formatting here for e.g. currency
function SetFieldsFormatting() {

}

// Main data insert function




// When a value is found in the autocompleteTextbox/FilterTextbox, it will automatically pass through an index value
// Or you can pass through the "ID" value (Must be a Primary Key of the datasource)
// Then either of the above values can find the correct row with your data
function FilterTextbox1_SelectedValueChanged(index, id) {

    var selectedDataRow;

    if (index != undefined) {
        selectedDataRow = FilterTextBoxDataSource[index];
    }
    else if (id != undefined) {
        selectedDataRow = FilterTextBoxDataSource.find(row => row.ID == id);
    }

    if (selectedDataRow != undefined && selectedDataRow != null) {

        lastSelectedFilterTextboxValue = selectedDataRow.ID

        $('#txtFilterTextbox').val(selectedDataRow.PLACENAME);
        $('#txtFilterTextboxValueChanged').val(selectedDataRow.NAME);

    }
    else {
        FilterTextbox1_ValuesCleared();
    }

}

function FilterTextbox1_ValuesCleared() {
    lastSelectedFilterTextboxValue = "";
    $('#txtFilterTextboxValueChanged').val("");
}

function FilterTextboxFilter_SelectedValueChanged(index, id) {
    var selectedDataRow = FilterTextBoxDataSourceCopy[index];

    if (index != undefined) {
        selectedDataRow = FilterTextBoxDataSourceCopy[index];
    }
    else if (id != undefined) {
        selectedDataRow = FilterTextBoxDataSourceCopy.find(row => row.ID == id);
    }

    if (selectedDataRow != undefined && selectedDataRow != null) {
        lastSelectedFilterTextboxFilterValue = selectedDataRow.ID

    } else {
        FilterTextboxFilter_ValuesCleared();
    }

}

function FilterTextboxFilter_ValuesCleared() {
    lastSelectedFilterTextboxFilterValue = "";
}

// #endregion

// Other functions

// Helper function to populate date fields
//function populateDateField(selector, dateTimeString) {
//    // Check if the dateTimeString is null or blank
//    if (dateTimeString && dateTimeString.trim() !== '') {
//        // Parse the date string
//        const dateObject = new Date(dateTimeString);
//        // Extract year, month, and day components
//        const year = dateObject.getFullYear();
//        const month = (dateObject.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-indexed, so add 1
//        const day = dateObject.getDate().toString().padStart(2, '0');
//        // Construct the formatted date string in "yyyy-MM-dd" format
//        const formattedDate = `${year}-${month}-${day}`;
//        // Set the value of the input field
//        $(selector).val(formattedDate);
//    } else {
//        // Set an empty string as the value if date is null or blank
//        $(selector).val('');
//    }
//}

//#endregion

//#region Insert into Contacts Table.

function insertContact(response) {

    // When the response is unused, continue with normal code
    if (response == undefined) {
        var parameterData =
        {
            Name: txtName.value,
            Email: txtEmail.value,
            Phone: txtPhone.value,
            Address: txtAddress.value
        };

        $.ajax({
            type: 'POST',
            url: webAPIURL + 'Insert/insertContact',
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify(parameterData),
            success: insertContact,

            error: function (error) {
                var ex = window.FormatHttpResponseData(error).Message;
                window.hideLoading();
                window.showError(ex.Message);
            }
        });

    }
    // When the response is received and successful
    else {
        msg = "Contact Successfully saved into the system.";
        window.showSuccess(msg, function () {
            SetControlsInsertAfter();
        });

    }
}
//#endregion

//#region "Delete Contact"
function deleteSQL(response) {

    if (response == undefined) {

        var parameterData =
        {
            EntryID: txtContactEntryId.value,
        };


        $.ajax({
            type: 'POST',
            url: webAPIURL + 'Delete/deleteContact',
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify(parameterData),
            success: deleteSQL,

            error: function (error) {
                window.hideLoading();
                var ex = window.FormatHttpResponseData(error);

                window.showError(ex.Message);
            }
        });
    }
    else {
        msg = "Successfully marked as History on the System.";
        window.showSuccess(msg, function () {
            window.populateBody('/Views/ContactsView/frmContactList.html');
        });

    }

}
//#endregion

//#region "Update Contact"
function updateSQL(response) {

    if (response == undefined) {

        var parameterData =
        {
            EntryID: txtContactEntryId.value,
            Name: txtName.value,
            Email: txtEmail.value,
            Phone: txtPhone.value,
            Address: txtAddress.value
        };


        $.ajax({
            type: 'POST',
            url: webAPIURL + 'Update/updateContact',
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify(parameterData),
            success: updateSQL,

            error: function (error) {
                window.hideLoading();
                var ex = window.FormatHttpResponseData(error);

                window.showError(ex.Message);
            }
        });

    }
    else {

        msg = "Successfully updated in the System.";
        window.showSuccess(msg, function () {
            SetControlsUpdateAfter();
        });
    }
}
//#endregion

//Initialize at the end
SetControlsInit();