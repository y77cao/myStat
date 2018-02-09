var id;

function setup() {
    this.addEventListener('mousemove', reset, false);
    this.addEventListener('mousedown', reset, false);
    this.addEventListener('keypress', reset, false);
    this.addEventListener('scroll', reset, false);
    this.addEventListener('wheel', reset, false);
    this.addEventListener('touchmove', reset, false);
    this.addEventListener('pointermove', reset, false);
    start();
}

setup();

function start() {
    id = window.setTimeout(goInactive, 5000);
}

function reset(e) {
    window.clearTimeout(id);
    goActive();
}

function goInactive() {
    chrome.runtime.sendMessage({ userActive: false });
}

function goActive() {
    chrome.runtime.sendMessage({ userActive: true });
    start();
}

chrome.runtime.sendMessage({}, function(response) {
    var readyStateCheckInterval = setInterval(function() {
        if (document.readyState === "complete") {
            documentReady();
            clearInterval(readyStateCheckInterval);
        }
    }, 10);
});

function documentReady() {
    chrome.runtime.sendMessage({
        type: "pageLoad",
        currtime: new Date().getTime(),
        domain: window.location.hostname
    });
}
