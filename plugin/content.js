console.log("The extension is working");

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        console.log(sender.tab ?
            "from a content script:" + sender.tab.url :
            "from the extension");
        if (request.greeting == "hello")
            sendResponse({
                farewell: "goodbye"
            });
    });

if (window.location.href.indexOf("amazon") > -1) {
    console.log("This is Amazon");
}