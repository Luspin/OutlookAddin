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
        "Hello world from GH!",
        {
            coercionType: "html", // Write text as HTML
        },

        // Callback method to check that setAsync succeeded
        function (asyncResult) {
            if (asyncResult.status ==
                Office.AsyncResultStatus.Failed) {
                write(asyncResult.error.message);
            }
        }
    );
}