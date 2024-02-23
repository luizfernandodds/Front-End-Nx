function validateSelectManyCheckbox(page, id, form) {
	console.log('validateSelectManyCheckbox');
	createHiddenFrame(page, id, form);
}

function unselectAll(value) {
	console.log('unselectAll');

//  var x = document.getElementById('center_form:atlas_report_type')
//      .getElementsByTagName('input');
//
//  for ( var i in x) {
//    if (x[i].checked && x[i].value != value) {
//      x[i].checked = false;
//    }
//  }

}

var Report = {};

var ReportController = function() {
  Highcharts.setOptions({
    lang : {
      months : [ 'Janeiro', 'Fevereiro', 'Mar\u00e7o', 'Abril', 'Maio',
          'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro',
          'Dezembro' ],
      weekdays : [ 'Domingo', 'Segunda', 'Ter\u00e7a', 'Quarta', 'Quinta',
          'Sexta', 'S\u00e1bado' ],
      shortMonths : [ 'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago',
          'Set', 'Out', 'Nov', 'Dez' ],
      thousandsSep : '.',
      decimalPoint : ',',
      loading : 'Carregando...',
      resetZoom : 'Remover zoom',
      resetZoomTitle : 'Remover zoom',
    }
  });

  Highcharts.setOptions({
    credits : {
      enabled : false
    },
    exporting : {
      enabled : false
    },
    global : {
      useUTC : false
    },
    title : {
      text : null
    },
    subtitle : {
      text : null
    },
  });

  Highcharts
      .setOptions({
        colors : [ "#DDDF0D", "#7798BF", "#55BF3B", "#DF5353", "#aaeeee",
            "#ff0066", "#eeaaee", "#55BF3B", "#DF5353", "#7798BF", "#aaeeee" ],
        chart : {
          backgroundColor : 'rgba(255, 255, 255, 0.1)',
          // backgroundColor : {
          // linearGradient : {
          // x1 : 0,
          // y1 : 0,
          // x2 : 0,
          // y2 : 1
          // },
          // stops : [ [ 0, 'rgb(96, 96, 96)' ], [ 1, 'rgb(16, 16, 16)' ] ]
          // },
          borderWidth : 0,
          borderRadius : 15,
          plotBackgroundColor : null,
          plotShadow : false,
          plotBorderWidth : 0
        },
        title : {
          style : {
            color : '#363636',
            font : '12px Lucida Grande, Lucida Sans Unicode, Verdana, Arial, Helvetica, sans-serif'
          }
        },
        subtitle : {
          style : {
            color : '#DDD',
            font : '12px Lucida Grande, Lucida Sans Unicode, Verdana, Arial, Helvetica, sans-serif'
          }
        },
        xAxis : {
          gridLineWidth : 0,
          lineColor : '#999',
          tickColor : '#999',
          labels : {
            style : {
              color : '#000',
              fontWeight : 'bold'
            }
          },
          title : {
            style : {
              color : '#AAA',
              font : 'bold 12px Lucida Grande, Lucida Sans Unicode, Verdana, Arial, Helvetica, sans-serif'
            }
          }
        },
        yAxis : {
          alternateGridColor : null,
          minorTickInterval : null,
          gridLineColor : 'rgba(255, 255, 255, .1)',
          minorGridLineColor : 'rgba(255,255,255,0.07)',
          lineWidth : 0,
          tickWidth : 0,
          labels : {
            style : {
              color : '#363636',
              fontWeight : 'bold'
            }
          },
          title : {
            style : {
              color : '#AAA',
              font : 'bold 12px Lucida Grande, Lucida Sans Unicode, Verdana, Arial, Helvetica, sans-serif'
            }
          }
        },
        legend : {
          itemStyle : {
            color : '#363636'
          },
          itemHoverStyle : {
            color : '#363636'
          },
          itemHiddenStyle : {
            color : '#363636'
          }
        },
        labels : {
          style : {
            color : '#363636'
          }
        },
        tooltip : {
          backgroundColor : {
            linearGradient : {
              x1 : 0,
              y1 : 0,
              x2 : 0,
              y2 : 1
            },
            stops : [ [ 0, 'rgba(96, 96, 96, .8)' ],
                [ 1, 'rgba(16, 16, 16, .8)' ] ]
          },
          borderWidth : 0,
          style : {
            color : '#FFF'
          }
        },

        plotOptions : {
          series : {
            shadow : true,
            pointPadding : 0,
            groupPadding : 0,
          },
          line : {
            dataLabels : {
              color : '#CCC'
            },
            marker : {
              lineColor : '#333'
            }
          },
          spline : {
            marker : {
              lineColor : '#333'
            }
          },
          scatter : {
            marker : {
              lineColor : '#333'
            }
          },
          candlestick : {
            lineColor : 'white'
          },
          pie : {
            colors : [ "#FF6347", "#DDDF0D", "#00BFFF", "#7FFF00", "#218868",
                "#F08080", "#8470FF", "#87CEFF" ],
            dataLabels : {
              distance : -5,
            }
          }
        },

        toolbar : {
          itemStyle : {
            color : '#CCC'
          }
        },

        navigation : {
          buttonOptions : {
            symbolStroke : '#DDDDDD',
            hoverSymbolStroke : '#FFFFFF',
            theme : {
              fill : {
                linearGradient : {
                  x1 : 0,
                  y1 : 0,
                  x2 : 0,
                  y2 : 1
                },
                stops : [ [ 0.4, '#606060' ], [ 0.6, '#333333' ] ]
              },
              stroke : '#000000'
            }
          }
        },

        // scroll charts
        rangeSelector : {
          buttonTheme : {
            fill : {
              linearGradient : {
                x1 : 0,
                y1 : 0,
                x2 : 0,
                y2 : 1
              },
              stops : [ [ 0.4, '#888' ], [ 0.6, '#555' ] ]
            },
            stroke : '#000000',
            style : {
              color : '#CCC',
              fontWeight : 'bold'
            },
            states : {
              hover : {
                fill : {
                  linearGradient : {
                    x1 : 0,
                    y1 : 0,
                    x2 : 0,
                    y2 : 1
                  },
                  stops : [ [ 0.4, '#BBB' ], [ 0.6, '#888' ] ]
                },
                stroke : '#000000',
                style : {
                  color : 'white'
                }
              },
              select : {
                fill : {
                  linearGradient : {
                    x1 : 0,
                    y1 : 0,
                    x2 : 0,
                    y2 : 1
                  },
                  stops : [ [ 0.1, '#000' ], [ 0.3, '#333' ] ]
                },
                stroke : '#000000',
                style : {
                  color : 'yellow'
                }
              }
            }
          },
          inputStyle : {
            backgroundColor : '#333',
            color : 'silver'
          },
          labelStyle : {
            color : 'silver'
          }
        },

        navigator : {
          handles : {
            backgroundColor : '#666',
            borderColor : '#AAA'
          },
          outlineColor : '#CCC',
          maskFill : 'rgba(16, 16, 16, 0.5)',
          series : {
            color : '#7798BF',
            lineColor : '#A6C7ED'
          }
        },

        scrollbar : {
          barBackgroundColor : {
            linearGradient : {
              x1 : 0,
              y1 : 0,
              x2 : 0,
              y2 : 1
            },
            stops : [ [ 0.4, '#888' ], [ 0.6, '#555' ] ]
          },
          barBorderColor : '#CCC',
          buttonArrowColor : '#CCC',
          buttonBackgroundColor : {
            linearGradient : {
              x1 : 0,
              y1 : 0,
              x2 : 0,
              y2 : 1
            },
            stops : [ [ 0.4, '#888' ], [ 0.6, '#555' ] ]
          },
          buttonBorderColor : '#CCC',
          rifleColor : '#FFF',
          trackBackgroundColor : {
            linearGradient : {
              x1 : 0,
              y1 : 0,
              x2 : 0,
              y2 : 1
            },
            stops : [ [ 0, '#000' ], [ 1, '#333' ] ]
          },
          trackBorderColor : '#666'
        },

        legendBackgroundColor : 'rgba(48, 48, 48, 0.8)',
        legendBackgroundColorSolid : 'rgb(70, 70, 70)',
        dataLabelsColor : '#444',
        textColor : '#E0E0E0',
        maskColor : 'rgba(255,255,255,0.3)'
      });
};

ReportController.prototype = {

  // Report.loadTotalAmountChart('fuelAverageType', 'pie',
  // #{reportFuelControl.fuelTypePieChart})
  loadTotalAmountChart : function(id, type, value) {
    name = "";
    var axis = {
      name : name,
      type : type,
      xAxis : {
        type : 'datetime',
        title : {
          text : null
        },
        tickInterval : 1,
        maxZoom : null,
      },
      yAxis : {
        min : 0,
        title : {
          text : ''
        },
      },
      tooltip : {
        formatter : function() {
          return '<b>' + this.point.name + '</b>';
        }
      }
    };

    if (typeof value === "undefined")
      return;

    var val = new Array();
    var obj = new Object();
    obj.data = new Array();
    for ( var key in value.chart) {
      if (value.chart.hasOwnProperty(key)) {
        obj.data.push([ key, Math.floor((value.chart[key] * 100) / 100) ]);
      }
    }
    obj.name = name;
    val.push(obj);

    this.basicChart(id, axis, name, val, '');
  },

  basicChart : function(id, axis, name, value, unit) {
    $('#' + id).highcharts({
      chart : {
        type : axis.type,
        zoomType : 'x',
        spacingRight : 10,
        margin : [ -25, -25, -25, -25 ]
      },
      title : {
        text : (typeof axis.name === 'undefined' ? name : axis.name)
      },
      xAxis : axis.xAxis,
      yAxis : axis.yAxis,
      legend : {
        enabled : false
      },
      tooltip : (typeof axis.tooltip === 'undefined' ? {
        pointFormat : name + ': <b>{point.y:,.0f} ' + unit + '</b>'
      } : axis.tooltip),
      plotOptions : {
        series : {
          pointPadding : 0,
          groupPadding : 0,
        },
        area : {
          pointStart : 1940,
          marker : {
            enabled : false,
            symbol : 'circle',
            radius : 2,
            states : {
              hover : {
                enabled : true
              }
            }
          }
        },
        column : {
          pointPadding : 0,
          borderWidth : 0
        },
        pie : {
          allowPointSelect : true,
          cursor : 'pointer',
          dataLabels : {
            enabled : true,
            color : '#363636',
            connectorColor : '#363636',
            format : '{point.percentage:.2f} %'
          }
        }
      },

      series : value
    });
  },
};
