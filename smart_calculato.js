
let openDiv = document.querySelector('.open');

function createOpenDivContent() {
    // Clear the open div if it already has content
    openDiv.innerHTML = '';

    // Create the new div
    let contentDiv = document.createElement('div');
    contentDiv.classList.add('updating-details');

    // Create the spans with random values
    let salesSpan = document.createElement('span');
    salesSpan.innerText = `Sales: 0`;

    let purchasingSpan = document.createElement('span');
    purchasingSpan.innerText = `Purchasing: 0`;

    let loanSpan = document.createElement('span');
    loanSpan.innerText = `Loan: 0`;

    // Append the spans to the content div
    contentDiv.appendChild(salesSpan);
    contentDiv.appendChild(document.createElement('br')); // Line break
    contentDiv.appendChild(purchasingSpan);
    contentDiv.appendChild(document.createElement('br')); // Line break
    contentDiv.appendChild(loanSpan);

    // Append the content div to the open div
    openDiv.appendChild(contentDiv);
}

function createTransactionDiv() {
    // Check if the transaction div already exists
    let transactionDiv = openDiv.querySelector('.transaction-details');
    console.log(transactionDiv)
    if (!transactionDiv) {
        // Create the transaction div
        transactionDiv = document.createElement('div');
        transactionDiv.classList.add('transaction-details');
        openDiv.appendChild(transactionDiv);
    }
    return transactionDiv;
}

function addTransactionDetail(transactionType, value) {
    // Create the transaction span
    let transactionSpan = document.createElement('span');
    transactionSpan.innerText = `${transactionType}: ${value}`;

    // Append the transaction span to the transaction div
    let transactionDiv = createTransactionDiv();
    transactionDiv.appendChild(transactionSpan);

}
function saveDataToLocalStorage() {
    const transactionData = [];
    const transactionDiv = openDiv.querySelector('.transaction-details');
    const transactionSpans = transactionDiv.querySelectorAll('span');
    transactionSpans.forEach(span => {
        const type = span.innerText.split(': ')[0];
        const value = span.innerText.split(': ')[1];
        transactionData.push({ type, value });
    });

    const updatingDetailsData = [];
    const updatingDetailsDiv = openDiv.querySelector('.updating-details');
    const updatingDetailsSpans = updatingDetailsDiv.querySelectorAll('span');
    updatingDetailsSpans.forEach(span => {
        const type = span.innerText.split(': ')[0];
        const value = span.innerText.split(': ')[1];
        updatingDetailsData.push({ type, value });
    });

    localStorage.setItem('transactionData', JSON.stringify(transactionData));
    localStorage.setItem('updatingDetailsData', JSON.stringify(updatingDetailsData));

    // Get the current date and format it as YYYY-MM-DD
    const currentDate = new Date().toISOString().split('T')[0];

    // Save the data with the date as part of the key
    localStorage.setItem(`transactionData_${currentDate}`, JSON.stringify(transactionData));             
    localStorage.setItem(`updatingDetailsData_${currentDate}`, JSON.stringify(updatingDetailsData));
}

function loadDataFromLocalStorage() {
    const transactionData = JSON.parse(localStorage.getItem('transactionData'));
    const updatingDetailsData = JSON.parse(localStorage.getItem('updatingDetailsData'));
    
    if (transactionData) {
        const transactionDiv = openDiv.querySelector('.transaction-details');
        console.log(transactionDiv)
        transactionDiv.innerHTML = '';
        transactionData.forEach(item => {
            const span = document.createElement('span');
            span.innerText = `${item.type}: ${item.value}`;
            transactionDiv.appendChild(span);
        });
    }

    if (updatingDetailsData) {
        const updatingDetailsDiv = openDiv.querySelector('.updating-details');
        updatingDetailsDiv.innerHTML = '';
        updatingDetailsData.forEach(item => {
            const span = document.createElement('span');
            span.innerText = `${item.type}: ${item.value}`;
            updatingDetailsDiv.appendChild(span);
        });
    }
}




// Load data from local storage when the page is loaded
window.addEventListener('load', function() {
    createOpenDivContent();
    createTransactionDiv()
    loadDataFromLocalStorage();
});

function updateSales(value) {
    let salesSpan = openDiv.querySelector('span:nth-of-type(1)');
    let currentValue = parseInt(salesSpan.innerText.split(':')[1].trim());
    let newValue = currentValue + value;
    salesSpan.innerText = `Sales: ${newValue}`;

    // Add transaction detail to the transaction div
    addTransactionDetail('Sales', value);
    saveDataToLocalStorage();
}

function updatePurchasing(value) {
    let purchasingSpan = openDiv.querySelector('span:nth-of-type(2)');
    let currentValue = parseInt(purchasingSpan.innerText.split(':')[1].trim());
    let newValue = currentValue + value;
    purchasingSpan.innerText = `Purchasing: ${newValue}`;

    // Add transaction detail to the transaction div
    addTransactionDetail('Purchasing', value);
    saveDataToLocalStorage();
}

function updateLoan(value) {
    let loanSpan = openDiv.querySelector('span:nth-of-type(3)');
    let currentValue = parseInt(loanSpan.innerText.split(':')[1].trim());
    let newValue = currentValue + value;
    loanSpan.innerText = `Loan: ${newValue}`;

    // Add transaction detail to the transaction div
    addTransactionDetail('Loan', value);
    saveDataToLocalStorage();
}
function clearDisplay() {
    display.innerText = '';
}

function close() {
    // Save data to local storage
    saveDataToLocalStorage();
    localStorage.removeItem('transactionData');
    localStorage.removeItem('updatingDetailsData');

    window.location.href = 'report.html';
}

function extraButton(action) {
    switch (action) {
        case 'open':
            createOpenDivContent();
            break;
        case 'cashIn':
            let cashInValue = parseFloat(display.innerText);
            updateSales(cashInValue);
            clearDisplay();
            break;
        case 'cashOut':
            let cashOutValue = parseFloat(display.innerText);
            updateSales(-cashOutValue);
            clearDisplay();
            break;
        case 'purchaseIn':
            let purchaseInValue = parseFloat(display.innerText);
            updatePurchasing(purchaseInValue);
            clearDisplay();
            break;
        case 'purchaseOut':
            let purchaseOutValue = parseFloat(display.innerText);
            updatePurchasing(-purchaseOutValue);
            clearDisplay();
            break;
        case 'loanIn':
            let loanInValue = parseFloat(display.innerText);
            updateLoan(loanInValue);
            clearDisplay();
            break;
        case 'loanOut':
            let loanOutValue = parseFloat(display.innerText);
            updateLoan(-loanOutValue);
            clearDisplay();
            break;
            case 'close': // Action for the "Close" button
            close(); // Call the close function to save data to local storage
            break;
        default:
            break;
    }
}
