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