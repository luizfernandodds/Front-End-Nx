//http://www.jqplot.com/docs/files/jqPlotOptions-txt.html
function pieChartOnlineExtender() {
  this.cfg.grid = {
    gridLineColor : '#000000',
    background : '#FFFDF6',
    borderWidth : 0,
    shadow : false
  };
}

function speedometerChart(id, name, value, unit) {

  $('#' + id).highcharts({

    chart : {
      type : 'gauge',
      plotBackgroundColor : null,
      plotBackgroundImage : null,
      plotBorderWidth : 0,
      plotShadow : false
    },

    title : {
      text : ''
    },

    pane : {
      startAngle : -150,
      endAngle : 150,
      background : [ {
        backgroundColor : {
          linearGradient : {
            x1 : 0,
            y1 : 0,
            x2 : 0,
            y2 : 1
          },
          stops : [ [ 0, '#FFF' ], [ 1, '#333' ] ]
        },
        borderWidth : 0,
        outerRadius : '109%'
      }, {
        backgroundColor : {
          linearGradient : {
            x1 : 0,
            y1 : 0,
            x2 : 0,
            y2 : 1
          },
          stops : [ [ 0, '#333' ], [ 1, '#FFF' ] ]
        },
        borderWidth : 1,
        outerRadius : '107%'
      }, {
      // default background
      }, {
        backgroundColor : '#DDD',
        borderWidth : 0,
        outerRadius : '105%',
        innerRadius : '103%'
      } ]
    },

    // the value axis
    yAxis : {
      min : 0,
      max : 200,

      minorTickInterval : 'auto',
      minorTickWidth : 1,
      minorTickLength : 10,
      minorTickPosition : 'inside',
      minorTickColor : '#666',

      tickPixelInterval : 30,
      tickWidth : 2,
      tickPosition : 'inside',
      tickLength : 10,
      tickColor : '#666',
      labels : {
        step : 2,
        rotation : 'auto'
      },
      title : {
        text : unit
      },
      plotBands : [ {
        from : 0,
        to : 120,
        color : '#55BF3B' // green
      }, {
        from : 120,
        to : 160,
        color : '#DDDF0D' // yellow
      }, {
        from : 160,
        to : 200,
        color : '#DF5353' // red
      } ]
    },

    series : [ {
      name : name,
      data : [ value ],
      tooltip : {
        valueSuffix : ' ' + unit
      }
    } ]

  });

  $("#" + id).children().find('text').children(':contains("Highcharts.com")')
      .parent().remove();
}

function semiCircleDonutChart(id, name, value, unit) {
  $('#' + id).highcharts({
    chart : {
      plotBackgroundColor : null,
      plotBorderWidth : 0,
      plotShadow : false
    },
    title : {
      text : '',
      align : 'center',
      verticalAlign : 'middle',
      y : 50
    },
    tooltip : {
      pointFormat : '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    plotOptions : {
      pie : {
        dataLabels : {
          enabled : true,
          distance : -50,
          style : {
            fontWeight : 'bold',
            color : 'white',
            textShadow : '0px 1px 2px black'
          }
        },
        startAngle : -90,
        endAngle : 90,
        center : [ '50%', '100%' ]
      }
    },
    series : [ {
      type : 'pie',
      name : name,
      innerSize : '15%',
      data : value
    } ]
  });

  $("#" + id).children().find('text').children(':contains("Highcharts.com")')
      .parent().remove();
}

function pieChart(id, name, value, unit) {
  $('#' + id).highcharts({
    chart : {
      plotBackgroundColor : null,
      plotBorderWidth : null,
      plotShadow : false
    },
    title : {
      text : ''
    },
    tooltip : {
      pointFormat : '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    plotOptions : {
      pie : {
        allowPointSelect : true,
        cursor : 'pointer',
        dataLabels : {
          enabled : true,
          color : '#000000',
          connectorColor : '#000000',
          format : '<b>{point.name}</b>: {point.percentage:.1f} %'
        }
      }
    },
    series : [ {
      type : 'pie',
      name : name,
      data : value
    } ]
  });

  $("#" + id).children().find('text').children(':contains("Highcharts.com")')
      .parent().remove();
}

function stackedBarChart(id, categories, values, unit) {

  $('#' + id).highcharts({
    chart : {
      type : 'bar'
    },
    title : {
      text : ''
    },
    xAxis : {
      categories : categories
    },
    // yAxis : {
    // min : 0,
    // title : {
    // text : ''
    // }
    // },
    yAxis : {
      type : 'linear',
      labels : {
        formatter : function() {
          var seconds = (this.value ) | 0;
          this.value -= seconds ;

          var minutes = (seconds / 60) | 0;
          seconds -= minutes * 60;

          var hours = (minutes / 60) | 0;
          minutes -= hours * 60;
          return hours;
        }
      },
      title : {
        text : ''
      },
    },
    legend : {
      backgroundColor : '#FFFFFF',
      reversed : true
    },
    plotOptions : {
      series : {
        stacking : 'normal'
      }
    },
    series : [ {
      name : 'Off',
      data : [ values[0], 1000000, 1500000 ]
    }, {
      name : 'On',
      data : [ values[1], 2000000, 3600000 ]
    } ]
//    series : [ {
//      name : 'Off',
//      data : [ values[0], values[2], values[4] ]
//    }, {
//      name : 'On',
//      data : [ values[1], values[3], values[5] ]
//    } ]

  // series : [
  // {
  // name : 'Off',
  // data : [ Date.parse("1/1/1 " + '05:00:00'),
  // Date.parse("1/1/1 " + '03:00:00'),
  // Date.parse("1/1/1 " + '04:00:00') ]
  // },
  // {
  // name : 'On',
  // data : [ Date.parse("1/1/1 " + '03:00:00'),
  // Date.parse("1/1/1 " + '04:00:00'),
  // Date.parse("1/1/1 " + '04:00:00') ]
  // } ]
  // series : [
  // {
  // name : 'Off',
  // data : [ [ Date.UTC(2012, 8, 22), 62325000 ],
  // [ Date.UTC(2012, 8, 23), 25201000 ],
  // [ Date.UTC(2012, 8, 20), 68139000 ] ]
  // },
  // {
  // name : 'On',
  // data : [ [ Date.UTC(2012, 8, 22), 62325000 ],
  // [ Date.UTC(2012, 8, 23), 25201000 ],
  // [ Date.UTC(2012, 8, 20), 68139000 ] ]
  // } ]
  });

  $("#" + id).children().find('text').children(':contains("Highcharts.com")')
      .parent().remove();
}
