// Test for IE at the beginning
TestBrowserIsInternetExplorer();

//===========================================================
//Main Variables
//===========================================================
var Name = "frmContactList";


// Set this value to true if you need security
var SecurityOnForm = true;

// The object that will manage the security on the form
var ObjectFormsSecurity;

// The object that will manage the user using the form
var UserSecurity;

var User = [];

var webAPIURL = "https://localhost:7291/api/Contacts/";

//NavMain functions (TODO: Move to NavMain Maincontroller.js)
//window.fillHeader("Template Form");
//window.setStatusIcon(webAPIURL.includes("internalwebapi.kargo.co.za/api"));

var WindowCurrentState = EnumWindowState.LOCKED;

// #region : Control bar buttons to use variables

var btnAddCompanyUse = false;
var btnAddAllocationUse = false;
var btnSaveUse = false;
var btnDeleteUse = false;
var btnSearchUse = false;
var btnCancelUse = false;
var btnBackUse = false;
var btnPrintUse = false;
var btnEmailUse = false;
var btnExportUse = false;

// #endregion

//===========================================================

// #region : Initialize Components

var btnAddContact = document.getElementById("btnAddContact");

var dgvData = $("#dgvData tbody");


//Add all event handlers for above buttons
btnAddContact.addEventListener('click', handleEnumButtonType);

// #endregion


//===========================================================
//Other Variables here
//===========================================================
var EnvironmentNewLine = "\r\n";
var EnvironmentNewLineHTML = "<br/>";
var enterKey = 13;
var shiftKey = 16;

var DataTable = [];

var cBoxEmployeeLeaveTypeDataSource = [];
var ftxtFilterEmployeesDatasource = [];

//Comboboxes.
var CompanyDatasource = [];
var AllocationDatasource = [];
var GroupDatasoure = [];

var lastSelectedEmployee = "";

var lastSelectedRowIndex = 0;

var replaceUnderscoreRegex = /_/g;

//==========================================


// Set these values to make use of the buttons on the screen
function setButtonsToUse(_btnAddContact, , _btnSaveUse, _btnDeleteUse, _btnSearchUse, _btnCancelUse, _btnBackUse, _btnPrintUse, _btnEmailUse, _btnExportUse) {
    btnAddContactUse = _btnAddContactuse;
    btnSaveUse = _btnSaveUse;
    btnDeleteUse = _btnDeleteUse;
    btnSearchUse = _btnSearchUse;
    btnCancelUse = _btnCancelUse;
    btnBackUse = _btnBackUse;
    btnPrintUse = _btnPrintUse;
    btnEmailUse = _btnEmailUse;
    btnExportUse = _btnExportUse;
}

// The settings of the form to be applied when the form is initialized.
async function SetControlsInit() {

    try {

        //TODO: Temporary until correct security method is implemented
        if (localStorage.getItem("Employee") == null) {
            window.location.href = "../Views/Login.html";
        }
        else {

            User = JSON.parse(localStorage.getItem("Employee"));

            if (User.CREATE_ACCESS == undefined) {
                localStorage.removeItem("Employee")
                window.location.href = "../Views/Login.html";
                return;
            }

            setButtonsToUse(Boolean(User.CREATE_ACCESS), false, false, true, true, true, false, false, false);

            if (SecurityOnForm) {
                if (UserSecurity != null) {
                    throw new Error("The user must be set if security is to be applied on the form");
                }
                else {
                    // TODO: Get the user access rights on the form
                    // ObjectFormsSecurity.getUserCRUD(UserSecurity.UserID, this.Name);
                }
            }


            if (window.fillHeader != undefined) {
                window.fillHeader("Leave Application Summary");
            }

            WindowCurrentState = EnumWindowState.READING;
            ResetScreen();
            SetFormMode();

            await PopulateComboboxes();

            // loading of any additional datasets here
            applySecurityToCurrentScreen();

            switch (User.role) {
                case 1:

                    $(ftxtFilterEmployee).prop("disabled", false);

                    break;
                default:

                    if (User.EMP_NUM.toString().trim() == "") {
                        throw new Error("User Employee Number is empty");
                    }
                    else {
                        ftxtFilterEmployee_SelectedValueChanged(undefined, User.EMP_NUM);
                        ftxtFilterEmployeesDatasource = null;

                    }


                    break;
            }

            DataSetLoad();

        }

    } catch (e) {

        SetToolbarButtons(false, false, false, false, false, false, false, false, false);
        if (e.message != undefined) {
            window.showError("Error initializing: " + e.message);
        }



    }
};

// The state of the buttons when they are refreshed
function resetButtonLayout(ItemsInTable) {

    if (ItemsInTable == undefined || ItemsInTable == null) {
        ItemsInTable = 0;
    }

    if (ItemsInTable > 0) {
        SetToolbarButtons(true, false, true, true, false, true, true, true, true);
    }
    else {
        SetToolbarButtons(true, false, false, true, false, true, true, true, true);
    }
}

// Setting the buttons visibility and usability
function SetToolbarButtons(_btnAddContactStatus, _btnSaveStatus, _btnDeleteStatus, _btnSearchStatus, _btnCancelStatus, _btnBackStatus, _btnPrintStatus, _btnEmailStatus, _btnExportStatus) {

    $("#btnAddContact").toggle(_btnAddContactStatus && btnAddContactUse);
    //$("#btnSave").toggle(_btnSaveStatus && btnSaveUse);
    //$("#btnDelete").toggle(_btnDeleteStatus && btnDeleteUse);
    //$("#btnSearch").toggle(_btnSearchStatus && btnSearchUse);
    //$("#btnCancel").toggle(_btnCancelStatus && btnCancelUse);
    //$("#btnBack").toggle(_btnBackStatus && btnBackUse);
    //$("#btnPrint").toggle(_btnPrintStatus && btnPrintUse);
    //$("#btnEmail").toggle(_btnEmailStatus && btnEmailUse);
    //$("#btnExport").toggle(_btnExportStatus && btnExportUse);
    //$(btnFilter).toggle(_btnAddStatus && btnAddUse);
}

// Populate all fields needed for the details screen.
function PopulateFields(event) {

    if (WindowCurrentState == EnumWindowState.READING) {



    }

}

function dgvData_OnCellClick(event) {

    if (DataTable.ROWCOUNT[0].ROWCOUNT > 0) {

        ToggleModal("#loadPopup", true);

        if (event != undefined) {
            // The event Row Index includes the Table Header, therefore we minus one on the row index for the actual row index
            lastSelectedRowIndex = event.currentTarget.rowIndex - 1;

        }

        OpenMainForm(DataTable.DATA[lastSelectedRowIndex]["ENTRY_ID"]);

    }
}

// Validate the fields before Saving.
function ValidateFields() {

    var errors = 0;


    if (errors == 0) {
        ToggleModal("#loadPopup", true);
        return true;
    }
    else {
        return false;
    }
}

// Validate the search fields if necessary.
function ValidateSearchFields() {

    var errors = 0;

    if (errors == 0) {
        ToggleModal("#loadPopup", true);
        return true;
    }
    else {
        return false;
    }
}

// Clear the details Fields
function ClearFields() {

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
    //WindowCurrentState = EnumWindowState.ADDING;
    //SetToolbarButtons(false, false, true, false, false, true, false, false, false, false);
    //ResetScreen();
    //SetFormMode();
    //applySecurityToCurrentScreen();
    //ClearFields();

    //SetLeavingPageMessage(true);

    // Open Main Form instead due to there being no CRUD functionality on Summary Form
    OpenCompanyForm();

}
async function SetControlsInsertBeforeAllocation() {
    //WindowCurrentState = EnumWindowState.ADDING;
    //SetToolbarButtons(false, false, true, false, false, true, false, false, false, false);
    //ResetScreen();
    //SetFormMode();
    //applySecurityToCurrentScreen();
    //ClearFields();

    //SetLeavingPageMessage(true);

    // Open Main Form instead due to there being no CRUD functionality on Summary Form
    OpenAllocationForm();

}

// The state of the screen before inserting details.
function SetControlsInsertAfter() {
    WindowCurrentState = EnumWindowState.READING;
    SetToolbarButtons(true, false, false, true, false, true, true, true, true);
    ResetScreen();
    SetFormMode();
    DataSetLoad();
    applySecurityToCurrentScreen();

    SetLeavingPageMessage(false);
}

// The state of the screen before inserting details.
async function SetControlsUpdateBefore() {
    WindowCurrentState = EnumWindowState.EDITING;
    SetToolbarButtons(false, true, false, false, true, false, false, false, false);
    ResetScreen();
    SetFormMode();
    PopulateFields();
    applySecurityToCurrentScreen();

    SetLeavingPageMessage(true);


}

// The state of the screen before inserting details.
function SetControlsUpdateAfter() {
    WindowCurrentState = EnumWindowState.READING;
    SetToolbarButtons(true, false, false, true, false, true, true, true, true);
    ResetScreen();
    SetFormMode();
    DataSetLoad();
    applySecurityToCurrentScreen();

    SetLeavingPageMessage(false);
}

// #endregion

// #region Handling Button Events

// =========================================
// Handles the events of the control buttons.
// =========================================
function handleEnumButtonType(event) {

    var btnName = event.currentTarget.id;

    switch (btnName) {
        case 'btnAddContact':
            Adding();
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
        case 'btnPrint':
            Printing();
            break;
        case 'btnEmail':
            Emailing();
            break;
        case 'btnSearch':
            Searching();
            break;
        case 'btnFilter':
            Filtering();
            break;
    }
}


function Adding() {
    SetControlsInsertBefore();
}
function AddingAllocation() {
    SetControlsInsertBeforeAllocation();
}

function Editing() {
    SetControlsUpdateBefore();
}

// Add anything that needs to happen here before saving the record
function BeforeSaving() {

    var placeHolder = true;

    if (placeHolder) {
        window.showConfirmation("Are you sure you want to save?", function () {
            Saving();
        });
    }
    else {
        Saving();
    }
}

function Saving() {
    if (ValidateFields()) {

        try {

            switch (WindowCurrentState) {
                case EnumWindowState.ADDING:

                    insertSQL();

                    break;
                case EnumWindowState.EDITING:

                    updateSQL();

                    break;
                default:
                    throw new Error("Invalid window state. Please contact your System Administrator.");
                    break;
            }

        } catch (e) {
            window.showError("Errors occured on the form!" + e.message);
        }
    }
}

function Deleting() {
    window.showConfirmation("Are you sure you want to delete?", function () {
        deleteSQL();
    });
}

function Searching() {

    $("#pnlFilter").toggle();
}

function Filtering() {
    if (WindowCurrentState == EnumWindowState.READING) {
        DataSetLoad();
    }
}

function Canceling() {
    window.showConfirmation("Are you sure you want to cancel? Any unsaved changes will be lost.", function () {
        SetControlsUpdateAfter();
    });
}

function Returning() {
    window.close(); //TODO: Necessary for web?
}

function Printing() {
    // TODO: Printing
}

function Emailing() {
    // TODO: Emailing (Use server-side coding through ajax)
}

function Exporting() {
    // TODO: Exporting
}


//window.addEventListener('keyup', async function (event) {

//    var messageBoxVisible = $("#mMessageBox").is(":visible");

//    if (!messageBoxVisible) {

//        if (event.shiftKey) {
//            if (event.key.toUpperCase() === 'A' && WindowCurrentState == EnumWindowState.READING) {

//                event.preventDefault();
//                Adding();


//            }
//            else if (event.key.toUpperCase() === 'S' && (WindowCurrentState == EnumWindowState.ADDING || WindowCurrentState == EnumWindowState.EDITING)) {

//                event.preventDefault();
//                BeforeSaving();

//            }
//        }

//    }
//    else {
//        if (event.key.toUpperCase() === 'ESC' || event.key.toUpperCase() === 'ESCAPE') {
//            MessageBoxHide();
//        }
//    }


//});

// #endregion



// #region Database Transactions
// =========================================

// Populate any comboboxes/dropdowns/autocomplete textboxes here
async function PopulateComboboxes() {

    await readSQLCompanyName();
    await readSQLCompanyGroup();

}

// The dataset which will be loaded when the screen refreshes.
function DataSetLoad() {


    ToggleModal("#loadPopup", true);
    readSQL();

}

function DataSetLoadOnSuccess(response) {

    DataTable = response;

    PopulateDataGridView(DataTable);

    PopulateFields();

    //resetButtonLayout(DataTable.ROWCOUNT[0].ROWCOUNT);

    SetFieldsFormatting();

    // TODO:
    //$("#lblCount").text(DataTable.ROWCOUNT[0].ROWCOUNT);

    ToggleModal("#loadPopup", false);

}

// Populates a datatable json object into a HTML table
function PopulateDataGridView(dataTable) {
    dgvData.empty();

    for (var i = 0; i < dataTable.COMPANIES.length; i++) {
        // Create the main row
        var row = document.createElement('tr');
        row.id = dataTable.CONTACTS[i].ENTRY_ID;
        dgvData.append(row);

        // Create the cells for the main row
        var cells = [
            //createCell(dataTable.CONTACTS[i].ENTRY_ID, " d-none d-lg-table-cell"),
            createCell(dataTable.CONTACTS[i].NAME, undefined, "word-wrap: break-word; overflow-wrap: break-word;"),
            createCell(dataTable.CONTACTS[i].EMAIL, undefined, "word-wrap: break-word; overflow-wrap: break-word;"),
            createCell(dataTable.CONTACTS[i].PHONE, undefined, "word-wrap: break-word; overflow-wrap: break-word;",
            createCell(dataTable.CONTACTS[i].ADDRESS, undefined, "word-wrap: break-word; overflow-wrap: break-word;"),
        ];

        // Add the cells to the main row
        cells.forEach(cell => row.append(cell));

        row.addEventListener('click', dgvData_OnCellClick);
    }

    //var columnNames = Object.keys(dataTable.COLUMNS[0]);

    //dgvData.createTHead();
    //dgvData.createTBody();

    //var tHeadRow = dgvData.tHead.insertRow(0);

    //var tBody = dgvData.getElementsByTagName("tbody")[0];

    //for (var i = 0; i < columnNames.length; i++) {
    //    var tHeadCell = tHeadRow.insertCell(i);
    //    tHeadCell.innerHTML = columnNames[i].replace(replaceUnderscoreRegex, " ");
    //    tHeadCell.className = "bg-secondary-subtle";
    //    tHeadCell.style = "overflow-wrap: break-word; overflow: hidden; white-space: nowrap; text-overflow: ellipsis;";
    //}

    //if (dataTable.DATA.length > 0) {

    //    for (var i = 0; i < dataTable.DATA.length; i++) {

    //        var tBodyRow = tBody.insertRow(i);

    //        tBodyRow.addEventListener('click', dgvData_OnCellClick);

    //        tBodyRow.style.cursor = "pointer";

    //        for (var ii = 0; ii < columnNames.length; ii++) {
    //            var columnName = columnNames[ii].toString();
    //            var tBodyCell = tBodyRow.insertCell(ii);

    //            var tBodyCellInnerHTML = dataTable.DATA[i][columnName];

    //            if (typeof tBodyCellInnerHTML === "boolean") {

    //                var checkBoxValue = "";

    //                if (tBodyCellInnerHTML === "" || tBodyCellInnerHTML === null || tBodyCellInnerHTML === undefined || tBodyCellInnerHTML === false) {
    //                    checkBoxValue = "";
    //                }
    //                else {
    //                    checkBoxValue = "checked";
    //                }

    //                var checkBoxElement = document.createElement("input");
    //                checkBoxElement.type = "checkbox";
    //                checkBoxElement.checked = checkBoxValue;
    //                checkBoxElement.value = i.toString();
    //                checkBoxElement.id = "chBoxDgvData" + columnName + i.toString();
    //                //checkBoxElement.disabled = "disabled";

    //                checkBoxElement.addEventListener("change", function () {

    //                    if (this.checked === false) {
    //                        this.checked = true;
    //                    }
    //                    else {
    //                        this.checked = false;
    //                    }
    //                });

    //                tBodyCell.appendChild(checkBoxElement);
    //            }
    //            else {
    //                tBodyCell.innerHTML = tBodyCellInnerHTML;
    //            }

    //        }

    //    }

    //}

}


//Set any specific formatting here for e.g. currency
function SetFieldsFormatting() {



}

// =========================================
// Main data insert function
function insertSQL(response) {

    // When the response is unused, continue with normal code
    if (response == undefined) {

        var parameterData =
        {
            TEXTBOX: $("#txtTextbox").val(),
            COMBOBOX_ID: $("#cBoxCombobox").val(),
            FILTERTEXTBOX_ID: lastSelectedFilterTextboxValue

        };

        $.ajax({
            type: 'POST',
            url: webAPIURL + 'Insert/insertSQLTemplate',
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify(parameterData),
            success: insertSQL,
            error: HttpOnError
        });

    }
    // When the response is received and successful
    else {

        if (response[0].Message == "") {

            SetControlsInsertAfter();

            window.showSuccess("Successfully saved");
        }
        else {
            throw new Error(response);
        }

    }
}

// Main data update function
function updateSQL(response) {

    if (response == undefined) {

        var parameterData =
        {
            ENTRY_ID: $("#txtEntryID").val(),
            TEXTBOX: $("#txtTextbox").val(),
            COMBOBOX_ID: $("#cBoxCombobox").val(),
            FILTERTEXTBOX_ID: lastSelectedFilterTextboxValue

        };


        $.ajax({
            type: 'POST',
            url: webAPIURL + 'Update/updateSQLTemplate',
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify(parameterData),
            success: updateSQL,
            error: HttpOnError
        });

    }
    else {

        if (response[0].Message == "") {

            SetControlsInsertAfter();

            window.showSuccess("Successfully updated");
        }
        else {
            throw new Error(response);
        }

    }
}

// Main data delete function
function deleteSQL(response) {

    if (response == undefined) {

        var parameterData =
        {
            ENTRY_ID: $("#txtEntryID").val()

        };


        $.ajax({
            type: 'POST',
            url: webAPIURL + 'Delete/deleteSQLTemplate',
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify(parameterData),
            success: deleteSQL,
            error: HttpOnError
        });

    }
    else {

        if (response == "") {

            SetControlsUpdateAfter();

            window.showSuccess("Successfully deleted");
        }
        else {
            throw new Error(response)
        }

    }

}

// Main data read function
function readSQL() {

    var postData = {
        //description: null,
        name: null,
    }

    // Sends post data to C# side using a JSON format
    $.ajax({
        type: 'POST',
        url: webAPIURL + 'Read/readContact',
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify(postData),
        success: DataSetLoadOnSuccess,
        error: function (error) {
            window.hideLoading();
            var ex = window.FormatHttpResponseData(error);

            window.showError(ex.Message);
        }
    });
}

async function readSQLCompanyName(response) {

    if (response == undefined) {

        // Sends post data to C# side using a JSON format
        var postData = {
            description: sctLongDescriptionInput.value
        }
        $.ajax({
            type: 'POST',
            url: webAPIURL + 'Read/readCompany',
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify(postData),
            success: async function (data) {
                readSQLCompanyName(data);
            },
            error: function (error) {
                console.log("Error" + error);
                var ex = window.FormatHttpResponseData(error);
                window.showError(ex.Message);
            }
        });
    } else {
        CompanyDatasource = response;
        // Now let's attempt to populate the combo box
        // populateRangeComboBox(ComboboxDatasource);
        CompanyDatasource.unshift({ ID: "0", LONG_DESCRIPTION: "ALL" });

        PopulateComboboxJSON(sctLongDescriptionInput, CompanyDatasource, "ENTRY_ID", "LONG_DESCRIPTION", false);

    }
}

async function readSQLCompanyGroup(response) {

    if (response === undefined) {
        // Sends post data to C# side using a JSON format
        var postData = {
            description: sctGroupInput.value
        }
        $.ajax({
            type: 'POST',
            url: webAPIURL + 'Read/readGroupCombo',
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify(postData),
            success: async function (data) {
                readSQLCompanyGroup(data);
            },
            error: function (error) {
                console.log("Error" + error);
                var ex = window.FormatHttpResponseData(error);
                window.showError(ex.Message);
            }
        });
    } else {
        GroupDatasoure = response;
        // Now let's attempt to populate the combo box
        GroupDatasoure.unshift({ ID: "0", DESCRIPTION: "ALL" });

        PopulateComboboxJSON(sctGroupInput, GroupDatasoure, "ENTRY_ID", "DESCRIPTION", false);

    }

}

// When a value is found in the autocompleteTextbox/FilterTextbox, it will automatically pass through an index value
// Or you can pass through the "ID" value (Must be a Primary Key of the datasource)
// Then either of the above values can find the correct row with your data
function ftxtFilterEmployee_SelectedValueChanged(index, id) {

    var selectedDataRow;


    if (index != undefined) {
        selectedDataRow = ftxtFilterEmployeesDatasource[index];
    }
    else if (id != undefined) {
        selectedDataRow = ftxtFilterEmployeesDatasource.find(row => row.EMPLOYEE_ID == id);
    }

    if (selectedDataRow != undefined && selectedDataRow != null) {

        lastSelectedEmployee = selectedDataRow.EMPLOYEE_ID;
        ftxtFilterEmployee.value = selectedDataRow.FULLNAME;

    }
    else {
        ftxtFilterEmployee_ValuesCleared();
    }

}

function ftxtFilterEmployee_ValuesCleared() {
    lastSelectedEmployee = "";
}


function HttpOnError(response) {

    var errorMessage = FormatHttpResponseDataAJAX(response).Message;

    window.showError(errorMessage);
}

function FormatHttpResponseDataAJAX(response) {

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

// #endregion

function OpenCompanyForm() {

    window.populateBody('/Views/ContactsView/frmContactsMain.html');
}

// #region MessageBox
// ========================

function ButtonDefaultFunctions() {
    ToggleModal("#mMessageBox", false);
}

var MessageBox =
{
    Show: function (Message, Title, MessageBoxButton) {

        ToggleModal("#loadPopup", false);

        $("#lblMessageBoxTitle").text(Title);
        $("#lblMessageBoxMessage").text(Message);

        ToggleModal("#mMessageBox", true);

        $("#btnMessageBoxOK").toggle(false);
        $("#btnMessageBoxYes").toggle(false);
        $("#btnMessageBoxNo").toggle(false);
        $("#btnMessageBoxCancel").toggle(false);

        switch (MessageBoxButton) {
            case MessageBoxButtons.OK:
                $("#btnMessageBoxOK").toggle(true);
                break;
            case MessageBoxButtons.YesNo:
                $("#btnMessageBoxYes").toggle(true);
                $("#btnMessageBoxNo").toggle(true);
                break;
            case MessageBoxButtons.YesNoCancel:
                $("#btnMessageBoxYes").toggle(true);
                $("#btnMessageBoxNo").toggle(true);
                $("#btnMessageBoxCancel").toggle(true);
                break;
            default:
                break;
        }

    },
    Hide: ButtonDefaultFunctions,
    OK_Click: ButtonDefaultFunctions,
    Yes_Click: ButtonDefaultFunctions,
    No_Click: ButtonDefaultFunctions,
    Cancel_Click: ButtonDefaultFunctions

};

// Register MessageBox Buttons Click Events
//document.getElementById("btnMessageBoxOK").addEventListener("click", MessageBox.OK_Click)
//document.getElementById("btnMessageBoxYes").addEventListener("click", MessageBox.Yes_Click)
//document.getElementById("btnMessageBoxNo").addEventListener("click", MessageBox.No_Click)
//document.getElementById("btnMessageBoxCancel").addEventListener("click", MessageBox.Cancel_Click)
//document.getElementById("btnMessageBoxClose").addEventListener("click", MessageBox.Hide)


// #endregion

// #region Other functions

// Helper function to create a cell
function createCell(content, stylingClass, styling) {
    var cell = document.createElement('td');
    cell.textContent = content;

    if (stylingClass != undefined) {
        cell.classList = stylingClass;
    }

    if (styling != undefined) {
        cell.style = styling;
    }

    // Set overflow to hidden to prevent content from overflowing
    // Set white-space to nowrap to prevent text from wrapping
    // Set text-overflow to ellipsis to truncate text with an ellipsis
    cell.style.overflow = "hidden";
    cell.style.whiteSpace = "nowrap";
    cell.style.textOverflow = "ellipsis";

    return cell;
}

// Helper function to create a cell with formatted date
function createDateCell(dateTimeString, stylingClass, styling) {
    var cell = document.createElement('td');

    // Check if the dateTimeString is null or blank
    if (dateTimeString && dateTimeString.trim() !== '') {
        // Format the date and time (assuming dateTimeString is in 'YYYY-MM-DDTHH:mm:ss' format)
        var formattedDateTime = new Date(dateTimeString).toLocaleString('en-UK', { day: 'numeric', month: 'numeric', year: 'numeric' });
        cell.textContent = formattedDateTime;
    } else {
        // Set cell content to an empty string if date and time are null or blank
        cell.textContent = '';
    }

    if (stylingClass != undefined) {
        cell.classList = stylingClass;
    }

    if (styling != undefined) {
        cell.style = styling;
    }

    return cell;
}

// Helper function to create a cell with formatted date time
function createTimeCell(dateTimeString, stylingClass, styling) {
    var cell = document.createElement('td');

    // Check if the dateTimeString is null or blank
    if (dateTimeString && dateTimeString.trim() !== '') {
        // Format the date and time (assuming dateTimeString is in 'YYYY-MM-DDTHH:mm:ss' format)
        var formattedDateTime = new Date(dateTimeString).toLocaleString('en-UK', { hour: 'numeric', minute: 'numeric' });
        cell.textContent = formattedDateTime;
    } else {
        // Set cell content to an empty string if date and time are null or blank
        cell.textContent = '';
    }

    if (stylingClass != undefined) {
        cell.classList = stylingClass;
    }

    if (styling != undefined) {
        cell.style = styling;
    }

    return cell;
}

// Helper function to create a cell with a checkbox
function createCheckboxCell(checked, stylingClass, styling) {
    var cell = document.createElement('td');

    cell.classList = "text-center";

    var checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = checked;
    checkbox.disabled = true;
    cell.appendChild(checkbox);

    if (stylingClass != undefined) {
        cell.classList = "mt-0" + stylingClass;
    } else {
        checkbox.classList = "mt-0";
    }

    if (styling != undefined) {
        cell.style = styling;
    }

    return cell;
}

// #endregion ========================
function ToggleModal(modalID, flag) {
    //$("#loadOverlay").toggle(flag);

    if (modalID == "#loadPopup") {

        if (flag) {
            if (window.showLoading != undefined) {
                window.showLoading();
            }
        }
        else {
            if (window.hideLoading != undefined) {
                window.hideLoading();
            }
        }

    }
    else {

        $(modalID).toggle(flag);
    }

}

//Initialize at the end
SetControlsInit();