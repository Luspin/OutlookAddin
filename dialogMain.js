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

function auth_Msal() {

  const clientId = '95735d7a-6233-4d23-94b6-398b0f716e80';
  const clientSecret = document.getElementById("clientSecretInput").value;
  const tenantId = '57cbf392-5174-46fa-b118-774b8410e0ca'
  
  getOffice365Token(clientId, clientSecret, tenantId)
    .then((accessToken) => {
      console.log('Access Token:', accessToken);
    })
    .catch((error) => {
      console.error('Error:', error.message);
    });
}

async function getOffice365Token(clientId, clientSecret, tenantId) {
    const tokenEndpoint = 'https://login.microsoftonline.com/' + tenantId + '/oauth2/v2.0/token';
  
    try {
      const response = await fetch(tokenEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          grant_type: 'client_credentials',
          client_id: clientId,
          client_secret: clientSecret,
          scope: 'https://graph.microsoft.com/.default',
          redirect_uri: 'http://127.0.0.1:5000',
        }),
      });
  
      // Check if the request was successful (status code 200)
      if (!response.ok) {
        throw new Error(`Failed to get Office 365 token. Status: ${response.status}`);
      }
  
      // Parse the JSON response
      const data = await response.json();
  
      // Extract the access token from the response
      const accessToken = data.access_token;
  
      // Return the access token
      console.log(accessToken);
    } catch (error) {
      console.error('Error getting Office 365 token:', error.message);
      throw error;
    }
  }
  
