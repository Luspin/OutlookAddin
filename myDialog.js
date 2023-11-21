Office.onReady(function() {
    document.getElementById("authButton").onclick = userSignedIn;
    document.getElementById("closeButton").onclick = closeButtonClick;
    document.getElementById("startButton").onclick = startTimer;
    document.getElementById("stopButton").onclick = stopTimer;
    document.getElementById("resetButton").onclick = resetTimer;
    document.getElementById("authButton_Msal").onclick = auth_Msal;
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

setInterval(updateClock, 1000);

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
startTimer();


async function auth_Msal() {
  // https://www.youtube.com/watch?v=YVLaQHePKaQ
  const config = {
    auth: {
      clientId: "95735d7a-6233-4d23-94b6-398b0f716e80",
      authority: "https://login.microsoftonline.com/57cbf392-5174-46fa-b118-774b8410e0ca",
      redirectUri: "https://luspin.github.io/OutlookAddin/"
    }
  };

  var client = new msal.PublicClientApplication(config);

  var loginRequest = {
    scopes: [ 'User.Read' ]
  };

  let loginResponse = await client.loginPopup(loginRequest);
  console.log('Response: ' + loginResponse);

  var tokenRequest = {
    scopes: [ 'User.Read' ],
    account: loginResponse.account
  };

  let tokenResponse = await client.acquireTokenSilent(tokenRequest);
  console.log('Token: ' + JSON.stringify(tokenResponse, null, 2));

  let payload = await fetch('https://graph.microsoft.com/v1.0/me', {
      headers: {
        'Authorization': 'Bearer ' + tokenResponse.accessToken
      }
    });

    let json = await payload.json();
    console.log('Graph Response: ' + JSON.stringify(json, null, 2));

}

