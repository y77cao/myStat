// if you checked "fancy-settings" in extensionizr.com, uncomment this lines

// var settings = new Store("settings", {
//     "sample_setting": "This is how you use Store.js to remember values"
// });
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if(request.type) {
            switch(request.type) {
                case "pageLoad":
                    incrementStatistic('pageviews');
                    if(request.domain) {}
                    console.log("Page view calculator triggered");
                    break;
            }
        }
        sendResponse();
});

function StatTracker(name, velocityEnabled) {
    this.name = name;
    this.timer = null;
    this.valueWithinInterval = 0;
    this.minValue = 50;
}

var statTrackers = {
    pageviews: new StatTracker('pageviews'),
};

function incrementStatistic(statisticName) {
    if(!statTrackers[statisticName]) {
    	let temp = new StatTracker(statisticName);
        statTrackers[statisticName] = temp;
    }
    var tracker = statTrackers[statisticName];
    tracker.valueWithinInterval++;

    incrementValue(tracker.name, 1);
    statTrackers[statisticName] = tracker; //Just in case...
}


function incrementValue(storageKey, amount) {
    chrome.storage.sync.get(storageKey, function(result) {
        if(!result || !result[storageKey]) {
            result = 0;
        } else {
            result = result[storageKey];
        }
        result += amount;
        var setter = {};
        setter[storageKey] = result;
        chrome.storage.sync.set(setter, function() {});
    })

}
