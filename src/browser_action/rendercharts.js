function renderBars(data) {
	var myChart = Highcharts.chart('container', {
		    colors: ['#4ABDAC', '#FC4A1A', '#F7B733', '#DFDCE3'],
        chart: {
            type: 'bar'
        },
        title: {
            text: 'Website Visits'
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

function renderPies(data) {
  var myChart = Highcharts.chart('container', {
      chart: {
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          type: 'pie'
      },
      title: {
          text: 'Website Visits'
      },
      tooltip: {
          pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      plotOptions: {
          pie: {
              allowPointSelect: true,
              cursor: 'pointer',
              dataLabels: {
                  enabled: false,
                  format: '<b>{point.name}</b>: {point.percentage:.1f} %'
            },
            showInLegend: true
          }
      },
      series: [{
        data: data
      }]
   });
}