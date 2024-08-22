// Test for IE at the beginning
//TestBrowserIsInternetExplorer();

var webAPIURL = "https://localhost:7145/api/Contact/"; 
//var webAPIURL = "https://localhost:7077/api/Contact/";

//window.fillHeader("Contacts List");

var dataTable = $('#dataTable tbody')

function ValidateFields() {
    var isValid = true;
    errorArray = [];

    if (!isValid) {
        window.showError('Some fields are not valid!', errorArray);
    }

    return isValid;
}

//#region Database Transactions

function DataLoad() {
    console.log("DataLoad is hit");
    if (ValidateFields()) {
        var postData = {
        }

        // Sends post data to C# side using a JSON format
        $.ajax({
            type: 'POST',
            url: webAPIURL + 'Read/readContact',
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify(postData),
            success: function (data) {
                console.log("API Data: ", data);
                populateTabe(data);
            },
            error: function (error) {
                var ex = window.FormatHttpResponseData(error);

                window.showError(ex.Message);
            }
            //error: function (error) {
            //    console.log('AJAX Error:', error);
            //    var ex = window.FormatHttpResponseData(error);
            //    window.showError(ex.Message);
            //}
        });
    }
}

//#endregion

// #region Populating Tables

async function populateTabe(data) {
    dataTable.empty();

    // Iterate through the data and append rows to the table
    for (var i = 0; i < data.length; i++) {
        // Create the main row
        var row = document.createElement('tr');
        row.id = data[i].ENTRY_ID;

        dataTable.append(row);

        // Create the cells for the main row
        var cells = [
            createCell(data[i].ENTRY_ID, "word-wrap: break-word; overflow-wrap: break-word;"),
            createCell(data[i].NAME, " d-none d-lg-table-cell", "word-wrap: break-word; overflow-wrap: break-word;"),
            createCell(data[i].EMAIL, "word-wrap: break-word; overflow-wrap: break-word;"),
            createCell(data[i].PHONE, "d-none d-md-table-cell", "word-wrap: break-word; overflow-wrap: break-word;"),
            createCell(data[i].ADDRESS, "d-none d-md-table-cell", "word-wrap: break-word; overflow-wrap: break-word;"),
        ];

        // Add the cells to the main row
        cells.forEach(cell => row.append(cell));

        row.addEventListener('click', function () {
            localStorage.setItem('ContactSelected', this.id);
            window.populateBody('/Views/ContactsView/frmContactsMain.html');
        });
    }

    window.hideLoading();
}

// Helper function to create a cell
function createCell(content, stylingClass, styling) {
    const cell = document.createElement('td');
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
    const cell = document.createElement('td');

    // Check if the dateTimeString is null or blank
    if (dateTimeString && dateTimeString.trim() !== '') {
        // Format the date and time (assuming dateTimeString is in 'YYYY-MM-DDTHH:mm:ss' format)
        const formattedDateTime = new Date(dateTimeString).toLocaleString('en-UK', { day: 'numeric', month: 'numeric', year: 'numeric' });
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
    const cell = document.createElement('td');

    // Check if the dateTimeString is null or blank
    if (dateTimeString && dateTimeString.trim() !== '') {
        // Format the date and time (assuming dateTimeString is in 'YYYY-MM-DDTHH:mm:ss' format)
        const formattedDateTime = new Date(dateTimeString).toLocaleString('en-UK', { hour: 'numeric', minute: 'numeric' });
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
    const cell = document.createElement('td');

    cell.classList = "text-center";

    const checkbox = document.createElement('input');
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

// #endregion

//#region "Show Functions"
window.showLoading = function () {
    // Implementation for showing a loading indicator
    console.log("Loading...");
};

window.hideLoading = function () {
    // Implementation for hiding the loading indicator
    console.log("Loading complete.");
};

window.showError = function (message, errors) {
    // Implementation for showing error messages
    console.error("Error: " + message);
    if (errors) {
        errors.forEach(err => console.error(err));
    }
};

//#endregion

var btnAdd = document.getElementById('btnAddContact')

btnAdd.addEventListener('click', function () {
    window.location.href = "/Views/ContactsView/frmContactsMain.html"; // Direct navigation
});

// #endregion
window.onload = function () {
    DataLoad();
};

//$(document).ready(function () {
//    window.showLoading();

//    DataLoad();
//});
