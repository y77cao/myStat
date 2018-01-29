var app = new Vue({
  el: '#app',
  data: {
  	visitshown: true,
  	timeshown: false,
    pageviews: 0
  },
  methods: {
    showVisit: function () {
      this.visitshown = true,
      this.timeshown = false
    },
    showTime: function () {
    	this.visitshown = false,
    	this.timeshown = true
    },
    getData: function(category) {
      chrome.storage.sync.get(category, function(result) {
            this.pageviews = result[category];
            console.log("page views: " + this.pageviews);
        });
    }
  }, 
  beforeMount() {
      this.getData('pageviews')
  }
})