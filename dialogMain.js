Office.onReady(function() {
    document.getElementById("authButton").onclick = userSignedIn;
    document.getElementById("closeButton").onclick = closeButtonClick;
});
 
// Called when dialog signs in the user.
function userSignedIn() {
    console.log("User clicked in");
    Office.context.ui.messageParent(true.toString());
}

function closeButtonClick() {
    const messageObject = {messageType: "dialogClosed"};
    const jsonMessage = JSON.stringify(messageObject);
    Office.context.ui.messageParent(jsonMessage);
}