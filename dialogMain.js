Office.onReady(function() {
    document.getElementById("authButton").onclick = userSignedIn;
    document.getElementById("closeButton").onclick = closeButtonClick;
});
 
// Called when dialog signs in the user.
function userSignedIn() {
    let messageObject_dialogClosed = {messageType: "user Authenticated"};
    let jsonMessage = JSON.stringify(messageObject_dialogClosed);
    Office.context.ui.messageParent(jsonMessage);
}

function closeButtonClick() {
    let messageObject_dialogClosed = {messageType: "dialog Closed"};
    let jsonMessage = JSON.stringify(messageObject_dialogClosed);
    Office.context.ui.messageParent(jsonMessage);
}