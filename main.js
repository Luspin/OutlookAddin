Office.onReady((info) => {
    if (info.host === Office.HostType.Outlook) {
        document.getElementById("helloButton").onclick = sayHello;

        let supportsSet = Office.context.requirements.isSetSupported('Mailbox', '1.13');
        document.getElementById("supportedVersion").innerHTML = supportsSet;
    }
});

/**
 * Writes 'Hello world!' to a new message Subject and Body. # UPDATE
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

    

    // sendGETRequest();
}

function sendGETRequest() {

	var xhr = new XMLHttpRequest();

	xhr.open('GET', 'https://oam.lusp.in:8443/')

	xhr.onload = function() {
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