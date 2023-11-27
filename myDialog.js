Office.onReady(function () {
  document.getElementById("authButton").onclick = userSignedIn;
  document.getElementById("closeButton").onclick = closeButtonClick;
  document.getElementById("startButton").onclick = startTimer;
  document.getElementById("stopButton").onclick = stopTimer;
  document.getElementById("resetButton").onclick = resetTimer;
  document.getElementById("authButton_Msal").onclick = auth_Msal;
});



// Called when dialog signs in the user.
function userSignedIn() {
  let messageObject_userAuthenticated = { messageType: "userAuthenticated" };
  let jsonMessage = JSON.stringify(messageObject_userAuthenticated);
  Office.context.ui.messageParent(jsonMessage);
}

function closeButtonClick() {
  let messageObject_dialogClosed = { messageType: "dialogClosed" };
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
  var msalInstance = new msal.PublicClientApplication({
    auth: {
      clientId: '95735d7a-6233-4d23-94b6-398b0f716e80',
      authority: 'https://login.microsoftonline.com/57cbf392-5174-46fa-b118-774b8410e0ca',
      redirectUri: 'https://luspin.github.io/OutlookAddin/myDialog.html' // Must be registered as "spa" type
    },
    cache: {
      cacheLocation: 'localStorage', // needed to avoid "login required" error
      storeAuthStateInCookie: true   // recommended to avoid certain IE/Edge issues
    }
  });

  // https://github.com/OfficeDev/Office-Add-in-samples/blob/main/Samples/auth/Office-Add-in-Microsoft-Graph-React/login/login.ts#L32

  // handleRedirectPromise should be invoked on every page load
  msalInstance.handleRedirectPromise()
    .then((response) => {
      // If response is non-null, it means page is returning from AAD with a successful response
      if (response) {
        console.log('Response: ' + response.accessToken);

        let payload = fetch('https://graph.microsoft.com/v1.0/me', {
          headers: {
            'Authorization': 'Bearer ' + response.accessToken
          }
        });

        let userDetailsJson = payload.json();

        Office.context.ui.messageParent(JSON.stringify({ status: 'userAuthenticated', result: response.accessToken }));
      } else {
        // Otherwise, invoke login
        msalInstance.loginRedirect({
          scopes: ['User.Read']
        });
      }
    })
    .catch((error) => {
      const errorData = `errorMessage: ${error.errorCode}
                                  message: ${error.errorMessage}
                                  errorCode: ${error.stack}`;

      Office.context.ui.messageParent(JSON.stringify({ status: 'failure', result: errorData }));
    });
};

/*

var loginRequest = {
  scopes: ['User.Read']
};

let loginResponse = await client.loginPopup(loginRequest);
console.log('Response: ' + loginResponse);

var tokenRequest = {
  scopes: ['User.Read'],
  account: loginResponse.account
};

let tokenResponse = await client.acquireTokenSilent(tokenRequest);
console.log('Token: ' + JSON.stringify(tokenResponse, null, 2));




let payload = await fetch('https://graph.microsoft.com/v1.0/me', {
  headers: {
    'Authorization': 'Bearer ' + tokenResponse.accessToken
  }
});



let userDetailsJson = await payload.json();
console.log('Graph Response: ' + JSON.stringify(userDetailsJson, null, 2));

userProfileSignedIn(userDetailsJson);



}
*/

function userProfileSignedIn(profile) {
  const profileMessage = {
    "name": profile.name,
    "email": profile.email,
  };
  Office.context.ui.messageParent(JSON.stringify(profileMessage));
}
