$(function () {
    
    var _dataLabels = {};
    var addDiscreteDataLabel = function (discreteName, transitions) {
        _dataLabels[discreteName] = {
            enabled: true,
            align: 'left',
            crop: false,
            style: {
                fontWeight: 'bold'
            },
            x: 3,
            verticalAlign: 'middle',
            formatter: function() {
                return transitions[this.x];
            },
            // I'm just stuffing these attributes here ..
            yAxisVal: Object.keys(_dataLabels).length + 1,
            transitions: transitions
        };
    }
    
    addDiscreteDataLabel('Gear', {
        0: 'Gear Down',
        1.3: 'Gear Transition',
        2: 'Gear Up',
        2.7: 'Gear Transtion',
        4: 'Gear Down, hopefully',
    });
    
    addDiscreteDataLabel('Autopilot Mode', {
        0: 'Off',
        .5: 'Retard',
        1: 'Speed/Mach Flap Limited',
        3.1: 'Speed EPR Limited',
        4: 'Retard',
    });
    
    var discreteYAxisValToName = {};
    var discreteData = [];
    for (discreteName in _dataLabels) {
        var dataLabel = _dataLabels[discreteName];
        discreteYAxisValToName[dataLabel.yAxisVal] = discreteName;
        for (i in dataLabel.transitions) {
            discreteData.push({
                dataLabels: dataLabel,
                y: dataLabel.yAxisVal,
                x: i
            });
        }
    }
    
    var chart = new Highcharts.Chart({
        
        chart: {
            renderTo: 'container',
            marginRight: 50
        },
        
        series: [{
            data: discreteData,
            lineWidth: 0
        }],
        
        yAxis: {
            lineColor: '#0000FF',
            lineWidth: 1,
            labels: {
                formatter: function() {
                    return discreteYAxisValToName[this.value];
                }
            }
        },
    });
});
