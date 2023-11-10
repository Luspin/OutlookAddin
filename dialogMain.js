Office.onReady(function() {
    document.getElementById("authButton").onclick = userSignedIn;
    document.getElementById("closeButton").onclick = closeButtonClick;
});
 
// Called when dialog signs in the user.
function userSignedIn() {
    let messageObject_userAuthenticated = {messageType: "userAuthenticated"};
    let jsonMessage = JSON.stringify(messageObject_userAuthenticated);
    Office.context.ui.messageParent(jsonMessage);
}

function closeButtonClick() {
    let messageObject_dialogClosed = {messageType: "dialogClosed"};
    let jsonMessage = JSON.stringify(messageObject_dialogClosed);
    Office.context.ui.messageParent(jsonMessage);
}

// a Javascript clock implementation
function updateClock() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const timeString = `${hours}:${minutes}:${seconds}`;
    document.getElementById("clock").textContent = timeString;
}

// a Javascript timer implementation
let timerInterval;
let timerSeconds = 0;

function startTimer() {
    timerInterval = setInterval(updateTimer, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
}

function resetTimer() {
    timerSeconds = 0;
    updateTimer();
}

function updateTimer() {
    timerSeconds++;
    const minutes = Math.floor(timerSeconds / 60);
    const seconds = timerSeconds % 60;
    const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    document.getElementById("timer").textContent = timeString;
}

// set up event listeners
document.getElementById("startButton").addEventListener("click", startTimer);
document.getElementById("stopButton").addEventListener("click", stopTimer);
document.getElementById("resetButton").addEventListener("click", resetTimer);

startTimer();