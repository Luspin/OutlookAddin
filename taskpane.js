Office.onReady((info) => {
    console.log("Office.onReady called");
    if (info.host === Office.HostType.Outlook) {
        document.getElementById("helloButton").onclick = sayHello;
        document.getElementById("displayDialogAsyncButton").onclick = openDialog;
        document.getElementById("openBrowserWindowButton").onclick = openBrowserWindow;


        let supportsSet = JSON.stringify(Office.context.requirements.isSetSupported("mailbox", "1.13"))
        document.getElementById("supportedVersion").innerHTML = supportsSet;

        console.log(JSON.stringify(Office.context.requirements.isSetSupported("mailbox", "1.13")));

    }
});

/**
 * Writes 'Hello world!' to a new message Subject and Body. # UPDATE
 */
function sayHello() {
    console.log("Saying hello");

    Office.context.mailbox.item.body.setAsync(
        "Hello world!",
        {
            coercionType: "html", // Write text as HTML
        },

        // Callback method to check that setAsync succeeded
        function (asyncResult) {
            if (asyncResult.status == Office.AsyncResultStatus.Failed) {
                write(asyncResult.error.message);
            }
        }
    );



    // sendGETRequest();
}

function sendGETRequest() {

    var xhr = new XMLHttpRequest();

    xhr.open('GET', 'https://oam.lusp.in:8443/')

    xhr.onload = function () {
        if (xhr.status === 200) {
            // Process the response data
            console.log(xhr.responseText);
        } else {
            // Handle errors
            console.error('Request failed. Status: ', xhr.status);
        }
    };

    xhr.send();
}

let dialog; // Declare dialog as global for use in later functions.

function openDialog() {
    console.log("Opening dialog");

    Office.context.ui.displayDialogAsync('https://luspin.github.io/OutlookAddin/myDialog.html', { height: 60, width: 30, promptBeforeOpen: false },
        function (asyncResult) {
            dialog = asyncResult.value;
            dialog.addEventHandler(Office.EventType.DialogMessageReceived, (arg) => {
                processMessage(arg);
            });
        }
    );
}

function processMessage(arg) {
    const messageFromDialog = JSON.parse(arg.message.slice(1, -1).replace(/\\"/g, '"'));
    console.log(messageFromDialog);

    if (messageFromDialog.messageType === "dialogClosed") {
        console.log("Dialog closed");
        document.getElementById("dialogResultText").innerHTML = "Result: " + messageFromDialog.messageType;
        dialog.close();
    }

    if (messageFromDialog.messageType === "userAuthenticated") {
        console.log("user Authenticated");
        document.getElementById("dialogResultText").innerHTML = "Hello: " + messageFromDialog.displayName;
        console.log(messageFromDialog.accessToken);
        dialog.close();
    }
}

function openBrowserWindow() {
    Office.context.ui.openBrowserWindow("https://www.google.com");
}