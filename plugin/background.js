console.log("background is running");

chrome.runtime.onInstalled.addListener(function (tab) {
    let msg = {
        txt: "This is a message"
    }
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, msg, function (response) {
            console.log(response.farewell);
        });
    });
});