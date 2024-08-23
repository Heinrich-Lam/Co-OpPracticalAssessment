// Test for IE at the beginning
//TestBrowserIsInternetExplorer();

var webAPIURL = "https://localhost:7145/api/Contact/";

var dataTable = $('#dgvData tbody');
var sctHistory = document.getElementById('statusFilter');

var ContactHistory;

//#region Database Transactions
function DataLoad() {
    console.log("DataLoad is hit");

    if (sctHistory.value == 0) {
        ContactHistory = 0;
    }
    else if (sctHistory.value == 1) {
        ContactHistory = 1;
    }

    var postData = {
        History: sctHistory.value
        }

    // Retrieve the JWT token from localStorage
    const jwtToken = localStorage.getItem('token');

    $.ajax({
        type: 'POST',
        url: webAPIURL + 'Read/readContacts',
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify(postData),
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Bearer ' + jwtToken);
        },
        success: function (data) {
            console.log("API Data: ", data);
            populateTable(data);
        },
        error: function (error) {
            var ex = "Errors occurred while loading the List.";
            alert(ex);
        }
    });    
}

//#endregion

// #region Populating Tables
async function populateTable(data) {
    dataTable.empty();

    for (var i = 0; i < data.length; i++) {
        var row = document.createElement('tr');
        row.id = data[i].ENTRY_ID;

        dataTable.append(row);

        var cells = [
            createCell(data[i].ENTRY_ID, "word-wrap: break-word; overflow-wrap: break-word;"),
            createCell(data[i].NAME, " d-none d-lg-table-cell", "word-wrap: break-word; overflow-wrap: break-word;"),
            createCell(data[i].EMAIL, "word-wrap: break-word; overflow-wrap: break-wrap;"),
            createCell(data[i].PHONE, "d-none d-md-table-cell", "word-wrap: break-word; overflow-wrap: break-wrap;"),
            createCell(data[i].ADDRESS, "d-none d-md-table-cell", "word-wrap: break-word; overflow-wrap: break-wrap;")
        ];

        cells.forEach(cell => row.append(cell));

        // Moved event listener inside the loop
        row.addEventListener('click', function () {
            localStorage.setItem('ContactSelected', this.id);
            window.location.href = "/Views/ContactsView/frmContactsMain.html?contactId=" + encodeURIComponent(this.id); // Include contactId as a query parameter
        });
    }

    // Initialize DataTables after populating the table
    $('#dgvData').DataTable();
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

var btnAdd = document.getElementById('btnAddContact');
var btnSearch = document.getElementById('btnSearch');
var btnUser = document.getElementById('btnViewUser');

btnAdd.addEventListener('click', function () {
    window.location.href = "/Views/ContactsView/frmContactsMain.html"; // Direct navigation
});

btnSearch.addEventListener('click', function () {
    DataLoad();
});

btnUser.addEventListener('click', function () {
    window.location.href = "/Views/ContactsView/frmUserList.html"; // Direct navigation
});

// #endregion
window.onload = function () {
    DataLoad();
};

