//var renderBars = require('rendercharts').renderBars;
var app = new Vue({
  el: '#app',
  data: {
  	visitshown: true,
  	timeshown: false,
    pageviews: 0,
    citeListVisit: [],
    citeListTime:[],
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
      this.displayData();
    },
    showTime: function () {
    	this.visitshown = false;
    	this.timeshown = true;
      this.displayData();
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
        this.citeListVisit = data && Object.keys(data).length >= 10? this.formatData(data, 'visit'): [];
        this.citeListTime = data && Object.keys(data).length >= 10? this.formatData(data, 'time'): [];
        renderBars(this.citeListVisit, 'container1');
        renderBars(this.citeListTime, 'container2');
      }
    },
    //CHANGE THIS
    formatData: function(data, type) {
      var sorted = this.sortObject(data,type);
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
    sortObject: function(obj, type) {
      var sortable = [];
      if (type == 'visit') {
          for (var i in obj) {
          sortable.push([i, obj[i]['visit']]);
         }
      } else if (type == 'time') {
          for (var i in obj) {
          sortable.push([i, obj[i]['time']]);
         }
      }

      sortable.sort(function(a, b) {return b[1] - a[1];});
      return sortable;
    },
    displayData: function() {
      switch (this.visitsdisplay) {
        case 'Bars':
          this.visitshown? renderBars(this.citeListVisit, 'container1'): renderBars(this.citeListTime, 'container2');
          break;
        case 'Pies':
          this.visitshown? renderPies(this.citeListVisit, 'container1'): renderPies(this.citeListTime, 'container2');
          break;
      }
    }
  },
  created() {
    this.getData('pageviews');
    this.getData('cites');
  } 
})