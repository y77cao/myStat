function renderBars(data) {
	var myChart = Highcharts.chart('container', {
        chart: {
            type: 'bar'
        },
        title: {
            text: 'Website Visits'
        },
        xAxis: {
            type: 'category'
        },
        yAxis: {
            title: {
                text: 'Websites'
            }
        },
        plotOptions: {
           series: {
               borderWidth: 0,
               dataLabels: {
                   enabled: true,
                   format: '{point.y:.1f}%'
               }
             }
       },
        series: [{
            data: data
        }],
    })
}