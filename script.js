// function calls
getCurrentDay();
getCurrentTime();
getCurrentDate();

function getCurrentDay() {
    $("#currentDay").text(moment().format("dddd"));
}

function getCurrentDate() {
    $("#currentDate").text(moment().format("MMM Do, YYYY"));
}

function getCurrentTime() {
    $("#currentTime").text(moment().format("h:mma"));
    militaryTime = (moment().format("HH"));
}