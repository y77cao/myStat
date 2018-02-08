/* TODO:
   recent history
   clickable links??
   Show collecting data when data is not enough(< 10 entries)
*/
var app = new Vue({
  el: '#app',
  data: {
  	visitshown: true,
  	timeshown: false,
    historyshown: false,
    //pageviews: 0,
    citeListVisit: [],
    citeListTime:[],
    history: [],
    visitsdisplay: 'Bars',
    timedisplay: 'List',
    colors: COLORS.slice(0, 3)
  },
  watch: {
    visitsdisplay: function(newv, oldv) {
         this.displayData('visit');
      },
    timedisplay: function(newv, oldv) {
         this.displayData('time');
      }
  }, 
  computed: {
    pageVisitTab: function() {
      return {
           'active-tab': this.visitshown,
           'inactive-tab': !this.visitshown
         }
    },
    timeSpentTab: function() {
      return {
           'active-tab': this.timeshown,
           'inactive-tab': !this.timeshown
         }    
    },
    historyTab: function() {
      return {
           'active-tab': this.historyshown,
           'inactive-tab': !this.historyshown
         }    
    }
  },
  methods: {
    showVisit: function () {
      this.timeshown = false;
      this.historyshown = false;
      this.visitshown = true;
      this.displayData('visit');
    },

    showTime: function () {
    	this.visitshown = false;
      this.historyshown = false;
    	this.timeshown = true;
      this.displayData('time');
    },

    showHistory: function () {
      this.visitshown = false;
      this.timeshown = false;
      this.historyshown = true;
    },

    newTab: function (domain) {
      chrome.tabs.create({url:"https://" + domain});
    },

    getData: function(category) {
      const sr = this.saveResult;
      chrome.storage.sync.get(category, function(result) {
            sr(result[category], 'object');
        });
    },

    getHistory: function() {
      const sr = this.saveResult;
      chrome.history.search({text: '', maxResults: 10}, function(data) {
            sr(data, 'array');
       });
    },

    saveResult: function(data, type) {
      if (type === 'object') {
        this.citeListVisit = data&& Object.keys(data).length >= 10? 
        this.formatData(data, 'visit'): [];

        this.citeListTime = data && Object.keys(data).length >= 10? 
        this.formatData(data, 'time'): [];

        renderBars(this.citeListVisit, 'container1', 'Website Visits');
      } else if (type === 'array') {
        var len = data.length;
        for (var i = 0; i < len; ++i) {
          this.history.push(data[i].title, data[i].url);
        }
      }
    },

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

    convertTime: function(duration) {
      var seconds = duration;
      var minutes = (duration / 60).toFixed(1);
      var hours = (duration / (60 * 60)).toFixed(1);
      var days = (duration /  (60 * 60 * 24)).toFixed(1);
      //console.log("sec: " + seconds + ", min: " + minutes + ", hours: " + hours + ", days:" + days);
      if (seconds < 60) {
          return [seconds, " Sec"];
      } else if (minutes < 60) {
          return [minutes, " Min"];
      } else if (hours < 24) {
          return [hours, " Hrs"];
      } else {
          return [days, " Days"];
      }
    },

    displayData: function(view) {
      switch (view) {
        case 'visit':
          this.visitsdisplay === 'Bars'? renderBars(this.citeListVisit, 'container1', 'Website Visits')
                                       : renderPies(this.citeListVisit, 'container1', 'Website Visits');
          break;
        case 'time':
          this.timedisplay === 'List'? '' : renderPies(this.citeListTime, 'container2', 'Time Spent on Websites');
          break;
      }
    }
  },
  created() {
    //this.getData('pageviews');
    this.getData('cites');
    this.getHistory();
  } 
})