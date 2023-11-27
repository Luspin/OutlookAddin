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
// tokenCallback()

async function tokenCallback() {

  window.getCookie = function (name) {
    var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    if (match) return match[2];
  }

  const clientId = '95735d7a-6233-4d23-94b6-398b0f716e80';
  const sessionStorageKey = 'msal.' + clientId + '.urlHash'
  // try to retrieve a token from the msal.clientID storage under session storage
  let token = sessionStorage.getItem(sessionStorageKey);

  // get a cookie with the same name as the session storage key
  const msalCookie = getCookie(sessionStorageKey);

  // Extract the code from the URL-encoded string
  const codeStartIndex = msalCookie.indexOf('%23code%3D') + '%23code%3D'.length;
  const codeEndIndex = msalCookie.indexOf('%26client_info%3D');
  const code = msalCookie.substring(codeStartIndex, codeEndIndex);

  console.log('Extracted code:', code);

  if (msalCookie || token) {
    const tenantId = '57cbf392-5174-46fa-b118-774b8410e0ca';
    const tokenEndpoint = `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`;
    const scope = '2ff814a6-3304-4ab8-85cb-cd0e6f879c1d/.default';
    const authorizationCode = code;
    const redirectUri = 'https://luspin.github.io/OutlookAddin/myDialog.html';
    const grantType = 'authorization_code';
    const state = '1234';

    const postData = new URLSearchParams({
      client_id: clientId,
      scope: scope,
      code: authorizationCode,
      redirect_uri: redirectUri,
      grant_type: grantType,
      state: state,
    });

    fetch(tokenEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: postData,
    })
      .then(response => response.json())
      .then(data => {
        console.log('Token response:', data);
      })
      .catch(error => {
        console.error('Error fetching token:', error);
      });
  }
}



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
  await msalInstance.handleRedirectPromise()
    .then((response) => {
      // If response is non-null, it means page is returning from AAD with a successful response
      if (response) {
        // console.log('Response: ' + response.accessToken);

        // Call the async function
        getUserDetails(response.accessToken).then((userDetails) => {
          Office.context.ui.messageParent(JSON.stringify({ messageType: 'userAuthenticated', result: userDetails }));
        });
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

      Office.context.ui.messageParent(JSON.stringify({ messageType: 'failure', result: errorData }));
    });
};

async function getUserDetails(accessToken) {
  try {
    const response = await fetch('https://graph.microsoft.com/v1.0/me', {
      headers: {
        'Authorization': 'Bearer ' + accessToken, // Assuming accessToken is defined elsewhere
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const userDetailsJson = response.json();
    console.log('User details:', userDetailsJson);

    return userDetailsJson;

    // Continue with any further processing using userDetailsJson
  } catch (error) {
    console.error('Error fetching user details:', error);
  }
}
