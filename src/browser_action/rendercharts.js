const COLORS = ['#7a91f9', '#f9ad5c', '#72c8ff', '#c899ff', 
                '#faa0ff', '#84e4ee', '#47edb0', '#c0ea27', 
                '#ffb8aa', '#fff284', '#ff7777']

function renderBars(data, container, title) {
	var myChart = Highcharts.chart(container, {
		    colors: COLORS,
        chart: {
            type: 'bar'
        },
        title: {
            text: title
        },
        xAxis: {
            type: 'category',
            labels: {
            	align: 'left',
            	x: 2,
            	y: -10,
            },
        },
        yAxis: {
            gridLineWidth: 0.5,
            title: {
            	text: 'Visits'
            },
        },
        plotOptions: {
           series: {
               borderWidth: 0,
               dataLabels: {
                   enabled: true,
                   format: '{point.y}'
               },
               showInLegend: false
             },
            bar: {
               colorByPoint: true,
               pointwidth: 5,
               pointPadding: 0.3
            }
       },
       tooltip: {
       	pointFormat: '<span style="color:{point.color}">\u25CF</span> Count: <b>{point.y}</b><br/>'
       },
        series: [{
            data: data
        }],
  })
}

function renderPies(data, container, title) {
  var myChart = Highcharts.chart(container, {
      chart: {
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          type: 'pie'
      },
      title: {
          text: title
      },
      tooltip: {
          pointFormat: 'percentage: <b>{point.percentage:.1f}%</b>'
      },
      plotOptions: {
          pie: {
              allowPointSelect: true,
              cursor: 'pointer',
              dataLabels: {
                  enabled: false,
                  format: '<b>{point.name}</b>: {point.percentage:.1f} %'
            },
            colors: COLORS,
            showInLegend: true
          }
      },
      series: [{
        data: data
      }]
   });
}