chrome.runtime.sendMessage({}, function(response) {
    var readyStateCheckInterval = setInterval(function() {
        if (document.readyState === "complete") {
            documentReady();
            clearInterval(readyStateCheckInterval);
        }
    }, 10);
});
var oldURL = window.location.href;
var urlChangeHandler = setInterval(checkURLChange, 500);

function checkURLChange() {
    var newURL = window.location.href;
    if (newURL !== oldURL) {
        documentReady();
        oldURL = newURL;
    }
}

function documentReady() {
    chrome.runtime.sendMessage({
        type: "pageLoad",
        domain: window.location.hostname
    });
}
