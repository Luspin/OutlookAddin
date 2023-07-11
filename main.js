Office.onReady((info) => {
    if (info.host === Office.HostType.Outlook) {
        document.getElementById("helloButton").onclick = sayHello;
    }
});

/**
 * Writes 'Hello world!' to a new message body.
 */
function sayHello() {
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

    Office.context.mailbox.item.subject.setAsync("HELLO WORLD!", function (asyncResult) {
        if (asyncResult.status === "failed") {
            console.log("Action failed with error: " + asyncResult.error.message);
        }
    });

}