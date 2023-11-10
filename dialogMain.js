Office.onReady(function() {
    document.getElementById("authButton").onclick = userSignedIn;
});
 
// Called when dialog signs in the user.
function userSignedIn() {
    console.log("User clicked in");
    Office.context.ui.messageParent("Auth success");
}