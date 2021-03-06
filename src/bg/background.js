var interval = null;
var currtab = {};
var userActive = true;

/* Data structure:
   pageviews: Int,
   cites: {
     domain: {
       visit: Int,
       time: Int
     }
   }
*/

/* Time spent */
function updateTime(domain) {
    if (userActive) {
        console.log('User is active on ' + domain);
        chrome.storage.local.get('cites', function(result) {
        if(!result || !result['cites']) {
            var setter = {};
            setter['cites'] = {};
            setter['cites'][domain] = {};
            setter['cites'][domain]["visit"] = 1;
            setter['cites'][domain]["time"] = 1;
            chrome.storage.local.set(setter, function() {});
        } else {
            var cites = result['cites'];
            if (!cites[domain]) {
                cites[domain] = {};
                cites[domain]["visit"] = 1;
                cites[domain]["time"] = 1;
            } else {
                cites[domain]['time'] += 1;
                //console.log(result['cites'][domain]['time']);
           }
           var setter = {};
           setter['cites'] = cites;
           chrome.storage.local.set(setter, function() {});
        }
      });
    } else {
        console.log('User is not active on ' + domain);
    }
};

function getCurrentTab() {
    chrome.tabs.query({
        currentWindow: true,
        active: true
    }, function(tabs) {
        var hostname = new URL(tabs[0].url).hostname;
        var found = false;
        //getURL(tabs[0].url);
        if (hostname) {
        clearInterval(interval);
        interval = null;
        interval = setInterval(function() {
            updateTime(hostname);
        }, 5000); 
      }
    });
};

/* Page visits */
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if(request.type) {
            switch(request.type) {
                case "pageLoad":
                    incrementValue('pageviews', 1);
                    if (request.domain && request.currtime) incrementSubCategory('cites', request.domain, request.currtime);
                    break;
            }
        }
        sendResponse();
});

function incrementValue(storageKey, amount) {
    chrome.storage.local.get(storageKey, function(result) {
        if(!result || !result[storageKey]) {
            result = 0;
        } else {
            result = result[storageKey];
        }
        result += amount;
        var setter = {};
        setter[storageKey] = result;
        chrome.storage.local.set(setter, function() {});
    })

}

function incrementSubCategory(storageKey, domain, time) {
    chrome.storage.local.get(storageKey, function(result) {
        if(!result || !result[storageKey]) {
            var setter = {};
            setter[storageKey] = {};
            setter[storageKey][domain] = {};
            setter[storageKey][domain]["visit"] = 1;
            setter[storageKey][domain]["time"] = 0;
            chrome.storage.local.set(setter, function() {});
        } else {
            var cites = result[storageKey];
            if (!cites[domain]) {
                cites[domain] = {};
                cites[domain]["visit"] = 1;
                cites[domain]["time"] = 0;
            } else {
                ++cites[domain]["visit"];
            }
            var setter = {};
            setter[storageKey] = cites;
            chrome.storage.local.set(setter, function() {});
        }
        console.log("Visited: "+ domain);
    })

}

getCurrentTab();
chrome.tabs.onUpdated.addListener(getCurrentTab);
chrome.tabs.onActivated.addListener(getCurrentTab);
