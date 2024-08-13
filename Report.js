window.addEventListener('load', function() {
    // Get the current date in the format YYYY-MM-DD
    const currentDate = new Date().toISOString().split('T')[0];

    // Retrieve data from local storage
    const transactionData = JSON.parse(localStorage.getItem(`transactionData_${currentDate}`));
    const updatingDetailsData = JSON.parse(localStorage.getItem(`updatingDetailsData_${currentDate}`));
    // console.log(transactionData)
    // Get the daily_record div
    const dailyRecordDiv = document.querySelector('.daily_record');

    if (transactionData || updatingDetailsData) {
        // Create a new div for the current date
        const dateDiv = document.createElement('div');
        dateDiv.classList.add("Record-Data");
        dateDiv.innerHTML = `<h3>${currentDate}</h3>`;
    
        // Append transaction data
        if (transactionData) {
            transactionData.forEach(item => {
                const span = document.createElement('span');
                span.innerText = `${item.type}: ${item.value}`;
                dateDiv.appendChild(span);
                dateDiv.appendChild(document.createElement('br'));
            });
        }
    
        dateDiv.appendChild(document.createElement('hr'));
    
        // Append updating details data
        if (updatingDetailsData) {
            updatingDetailsData.forEach(item => {
                const span = document.createElement('span');
                span.innerText = `${item.type}: ${item.value}`;
                dateDiv.appendChild(span);
                dateDiv.appendChild(document.createElement('br'));
            });
        }
    
        // Create and add event listener to the "Clear" button
        let button = dateDiv.appendChild(document.createElement('button'));
        button.innerText = "Clear";
        button.classList.add("btn");
        button.addEventListener('click', function() {
            // Remove data from local storage
            localStorage.removeItem(`transactionData_${currentDate}`);
            localStorage.removeItem(`updatingDetailsData_${currentDate}`);
    
            // Remove the dateDiv from the DOM
            dailyRecordDiv.removeChild(dateDiv);
        });
    
        // Append the dateDiv to the daily_record div
        dailyRecordDiv.appendChild(dateDiv);
    } else {
        // No current data to show
        dailyRecordDiv.innerHTML = "No current data to show.";
    }
});
// let button = document.querySelector('.btn')
    
    // button.addEventListener('click',function clear() {
    //     localStorage.removeItem(`transactionData_${currentDate}`);
    //     localStorage.removeItem(`updatingDetailsData_${currentDate}`);
    
    // })