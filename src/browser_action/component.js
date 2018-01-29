var app = new Vue({
  el: '#app',
  data: {
  	visitshown: true,
  	timeshown: false,
    pageviews: 0,
    citeList: {}
  },
  methods: {
    showVisit: function () {
      this.visitshown = true;
      this.timeshown = false;
      this.getData('pageviews');
    },
    showTime: function () {
    	this.visitshown = false;
    	this.timeshown = true;
    },
    getData: function(category) {
      const sr = this.saveResult;
      chrome.storage.sync.get(category, function(result) {
            sr(result[category]);
        });
    },
    saveResult: function(data) {
      if (typeof data === 'number') this.pageviews = data? data: 0;
      else if (typeof data === 'object') this.citeList = data? data: {};
    }
  },
  created() {
    this.getData('pageviews');
    this.getData('cites');
  } 
})