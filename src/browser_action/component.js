//var renderBars = require('rendercharts').renderBars;
var app = new Vue({
  el: '#app',
  data: {
  	visitshown: true,
  	timeshown: false,
    pageviews: 0,
    citeList: [],
    visitsdisplay: 'Bars'
  },
  watch: {
    visitsdisplay: function(newv, oldv) {
         this.displayData();
      }
    },
  methods: {
    showVisit: function () {
      this.visitshown = true;
      this.timeshown = false;
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
      else if (typeof data === 'object') {
        this.citeList = data && Object.keys(data).length >= 10? this.formatData(data): [];
        renderBars(this.citeList);
      }
    },
    formatData: function(data) {
      var sorted = this.sortObject(data);
      var len = sorted.length;
      var others = 0;
      var res = [];
      for (var i = 0; i < len; ++i) {
        const item = sorted[i];
        if (i < 10) {
          res.push([item[0], item[1]]);
        } else {
          others += item[1];
        }
      }
      res.push(["others", others]);
      return res;
    },
    sortObject: function(obj) {
      var sortable = [];
      for (var i in obj) {
         sortable.push([i, obj[i]]);
      }

      sortable.sort(function(a, b) {return b[1] - a[1];});
      return sortable;
    },
    displayData: function() {
      switch (this.visitsdisplay) {
        case 'Bars':
          renderBars(this.citeList);
          break;
        case 'Pies':
          renderPies(this.citeList);
          break;
      }
    }
  },
  created() {
    this.getData('pageviews');
    this.getData('cites');
  } 
})