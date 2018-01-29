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
            	y: -10
            },
        },
        yAxis: {
            title: {
                text: 'Websites'
            },
            gridLineWidth: 0.5
        },
        plotOptions: {
           series: {
               borderWidth: 0,
               dataLabels: {
                   enabled: true,
                   format: '{point.y:.1f}%'
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