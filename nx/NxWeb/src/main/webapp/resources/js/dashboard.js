var DashBoard = {};

var DashBoardController = function() {
	Highcharts.setOptions({
		lang : {
			months : [ 'Janeiro', 'Fevereiro', 'Mar\u00e7o', 'Abril', 'Maio',
					'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro',
					'Novembro', 'Dezembro' ],
			weekdays : [ 'Segunda', 'Ter\u00e7a', 'Quarta', 'Quinta', 'Sexta',
					'S\u00e1bado', 'Domingo' ],
			shortMonths : [ 'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul',
					'Ago', 'Set', 'Out', 'Nov', 'Dez' ],
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
				// colors : [ "#2e94da", "#95614c", "#ee7e46", "#6ec59b",
				// "#44c3c8",
				// "#feb954", "#a8a6d2"],
				colors : [ "#3e98d3", "#f15732", "#2bb673", "#a7c3d9" ],
				chart : {
					backgroundColor : {
						linearGradient : {
							x1 : 0,
							y1 : 0,
							x2 : 0,
							y2 : 1
						},
						stops : [ [ 0, 'rgb(255, 255, 255)' ],
								[ 1, 'rgb(255, 255, 255)' ] ]
					},
					borderWidth : 0,
					borderRadius : 15,
					plotBackgroundColor : null,
					plotShadow : false,
					plotBorderWidth : 0
				},
				title : {
					style : {
						color : '#7f8295',
						font : '16px Lucida Grande, Lucida Sans Unicode, Verdana, Arial, Helvetica, sans-serif'
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
							color : '#999',
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
							color : '#999',
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
						color : '#CCC'
					},
					itemHoverStyle : {
						color : '#FFF'
					},
					itemHiddenStyle : {
						color : '#333'
					}
				},
				labels : {
					style : {
						color : '#CCC'
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
						shadow : false
					},
					column : {
						colorByPoint : true
					},
					line : {
						dataLabels : {
							color : '#CCC'
						},
						marker : {
							lineColor : '#333'
						},
						
						zones : [ {
							value : 5,
							color : '#3e98d3'
						}, {
							value : 10,
							color : '#3e98d3'
						}, {
							value : 15,
							color : '#1b80b8'
						}, {
							value : 20,
							color : '#e6e7a3'
						}, {
							value : 25,
							color : '#d6e0a0'
						}, {
							value : 30,
							color : '#d8d87c'
						}, {
							value : 35,
							color : '#ddca5c'
						}, {
							value : 40,
							color : '#bdd176'
						}, {
							value : 45,
							color : '#c5cf5a'
						}, {
							value : 50,
							color : '#b2bb5b'
						}, {
							value : 55,
							color : '#afbb34'
						}, {
							value : 60,
							color : '#ffd967'
						}, {
							value : 65,
							color : '#f8d02e'
						}, {
							value : 70,
							color : '#eecd40'
						}, {
							value : 75,
							color : '#efc900'
						}, {
							value : 80,
							color : '#fcbe39'
						}, {
							value : 85,
							color : '#f0be00'
						}, {
							value : 90,
							color : '#fca400'
						}, {
							value : 100,
							color : '#d75413'
						}, {
							value : 110,
							color : '#c33f28'
						}, {
							value : 120,
							color : '#a23530'
						}, {
							value : 130,
							color : '#a82223'
						}, {
							color : '#5c3225'
						} ]
						
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
						colors : [ "#FF6347", "#DDDF0D" ]
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
								stops : [ [ 0.4, '#606060' ],
										[ 0.6, '#333333' ] ]
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

				// special colors for some of the demo examples
				legendBackgroundColor : 'rgba(48, 48, 48, 0.8)',
				legendBackgroundColorSolid : 'rgb(70, 70, 70)',
				dataLabelsColor : '#444',
				textColor : '#E0E0E0',
				maskColor : 'rgba(255,255,255,0.3)'
			});
};

DashBoardController.prototype = {

	load : function(xhr, status, args) {
		if (typeof args.packages === "packages")
			return;
		this._biPackages = eval('(' + args.packages + ')');
	},

	setTimeZone : function(timeZone) {
		this._timeZone = timeZone;
	},

	loadSpeedAverageChart : function(id, name) {
		var value = 0;
		for ( var key in this._biPackages) {
			value += this._biPackages[key].speed;
		}
		value = value / this._biPackages.length;
		value = Math.round(value * 100) / 100;

		this.speedometerChart(id, name, value);
	},

	loadSpeedometerChart : function(id, type, name) {
		var axis = {
			type : 'line',
			xAxis : {
				type : 'datetime',
				title : {
					text : null
				},
				maxZoom : null
			},
			yAxis : {
				min : 0,
				title : {
					text : ''
				},
				labels : {
					formatter : function() {
						return Math.round((this.value * 100) / 100) + ' '
								+ 'Km/h';
					}
				}
			}
		};

		this.basicChart(id, axis, name, this.dateAverage('speed'), 'Km/h');
	},

	loadSpeedometerWeeklyDayChart : function(id, type, name) {
		var axis = {
			type : type,
			xAxis : {
				title : {
					text : null
				},
				labels : {
					formatter : function() {
						return Highcharts.getOptions().lang.weekdays[this.value];
					}
				},
				tickInterval : 1,
				maxZoom : null,
				min : 0,
				max : 6
			},
			yAxis : {
				min : 0,
				title : {
					text : ''
				},
				labels : {
					formatter : function() {
						return Math.round((this.value * 100) / 100) + ' '
								+ 'Km/h';
					}
				}
			},
			tooltip : {
				formatter : function() {
					return Highcharts.getOptions().lang.weekdays[this.x]
							+ '<br/>' + '<b>' + name + ': '
							+ (Math.floor(this.point.y * 100) / 100)
							+ ' Km/h</b>';
				}
			}
		};

		this.basicChart(id, axis, name, this.weeklyDayAverage('speed'), 'Km/h');
	},

	loadOdometerChart : function(id, type, name) {
		var axis = {
			type : type,
			xAxis : {
				type : 'datetime',
				title : {
					text : null
				},
				maxZoom : null
			},
			yAxis : {
				min : 0,
				title : {
					text : ''
				},
				labels : {
					formatter : function() {
						return Highcharts.numberFormat(this.value, 0) + ' '
								+ 'Km';
					}
				}
			}
		};

		this.basicChart(id, axis, name, this.deviceAverage('odo', 1 / 1000),
				'Km');
	},

	loadHourmeterChart : function(id, type, name) {
		var axis = {
			type : type,
			xAxis : {
				type : 'datetime',
				title : {
					text : null
				},
				maxZoom : null
			},
			yAxis : {
				min : 0,
				title : {
					text : ''
				},
				labels : {
					formatter : function() {
						return Math.round((this.value * 100) / 100) + ' '
								+ 'Hs';
					}
				}
			}
		};

		this.basicChart(id, axis, name, this.deviceAverage('ignOn', 1 / 3600),
				'Hs');
	},

	loadHourmeterHourlyDayChart : function(id, type, name) {
		var axis = {
			type : type,
			xAxis : {
				// type : 'linear',
				title : {
					text : null
				},
				labels : {
					formatter : function() {
						return this.value;
					}
				},
				tickInterval : 1,
				maxZoom : null,
				min : 0,
				max : 23
			},
			yAxis : {
				min : 0,
				max : 1,
				title : {
					text : ''
				},
				labels : {
					formatter : function() {
						return this.value * 60 + ' m';
					}
				}
			},
			tooltip : {
				formatter : function() {
					var min = Math.floor(this.point.y * 60);
					return this.x + ' Hs<br/>' + '<b>' + name + ': '
							+ Math.floor(this.point.y / 60) + ':'
							+ (min < 10 ? '0' + min : min) + 'hs</b>';
				}
			}
		};
		this.basicChart(id, axis, name, this.hourlyDayAverage('ignHours',
				1 / 3600), 'Hs');
	},

	loadHourmeterWeeklyDayChart : function(id, type, name) {
		var axis = {
			type : type,
			xAxis : {
				// type : 'datetime',
				title : {
					text : null
				},
				labels : {
					formatter : function() {
						return Highcharts.getOptions().lang.weekdays[this.value];
					}
				},
				tickInterval : 1,
				maxZoom : null,
				min : 0,
				max : 6
			},
			yAxis : {
				min : 0,
				max : 23,
				title : {
					text : ''
				},
				labels : {
					formatter : function() {
						return Math.round((this.value * 100) / 100) + ' '
								+ 'Hs';
					}
				}
			},
			tooltip : {
				formatter : function() {
					var min = Math.floor((this.point.y * 60) % 60);
					return Highcharts.getOptions().lang.weekdays[this.x]
							+ '<br/>' + '<b>' + name + ': '
							+ Math.floor(this.point.y) + ':'
							+ (min < 10 ? '0' + min : min) + 'hs</b>';
				}
			}
		};

		this.basicChart(id, axis, name, this
				.weeklyDayAverage('ignOn', 1 / 3600), 'Hs');
	},

	loadHourmeterMonthlyChart : function(id, type, name) {
		var axis = {
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
				labels : {
					formatter : function() {
						return Math.round((this.value * 100) / 100) + ' '
								+ 'Hs';
					}
				}
			},
			tooltip : {
				formatter : function() {
					var min = Math.floor((this.point.y * 60) % 60);
					var d = new Date();
					d.setTime(this.x);
					return Highcharts.getOptions().lang.months[d.getMonth()]
							+ ' ' + (d.getYear() + 1900) + '<br/>' + '<b>'
							+ name + ': ' + Math.floor(this.point.y) + ':'
							+ (min < 10 ? '0' + min : min) + 'hs</b>';
				}
			}
		};

		this.basicChart(id, axis, name, this.monthlyAverage('ignOn', 1 / 3600),
				'Hs');
	},

	loadHourmeterWeeklyDayAmountChart : function(id, type, name, analisys) {
		var axis = {
			name : name + ' ' + analisys + ' Hs',
			type : type,
			xAxis : {
				title : {
					text : null
				},
				labels : {
					formatter : function() {
						return Highcharts.getOptions().lang.weekdays[this.value];
					}
				},
				tickInterval : 1,
				maxZoom : null,
				min : 0,
				max : 6
			},
			yAxis : {
				min : 0,
				title : {
					text : ''
				},
				labels : {
					formatter : function() {
						return Math.round((this.value));
					}
				}
			},
			tooltip : {
				formatter : function() {
					return Highcharts.getOptions().lang.weekdays[this.x]
							+ '<br/>' + '<b>' + name + ' ' + analisys + 'Hs '
							+ ': ' + this.point.y + '</b>';
				}
			}
		};

		this.basicChart(id, axis, name, this.weeklyDayAmountAverage('ignOn',
				1 / 3600, analisys), 'Hs');
	},

	loadHourmeterMonthlyAmountChart : function(id, type, name, analisys) {
		var axis = {
			name : name + ' ' + analisys + ' Hs',
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
				labels : {
					formatter : function() {
						return Math.round(this.value);
					}
				}
			},
			tooltip : {
				formatter : function() {
					var d = new Date();
					d.setTime(this.x);
					return Highcharts.getOptions().lang.months[d.getMonth()]
							+ ' ' + (d.getYear() + 1900) + '<br/>' + '<b>'
							+ name + ' ' + analisys + 'Hs ' + ': '
							+ this.point.y + '</b>';
				}
			}
		};

		this.basicChart(id, axis, name, this.monthlyAmountAverage('ignOn',
				1 / 3600, analisys), 'Hs');
	},

	loadHourmeterTotalAmountChart : function(id, type, name, analisys) {
		var axis = {
			name : name + ' ' + analisys + ' Hs',
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
					return '<b>' + name + ' ' + ' ' + this.point.name + ' '
							+ ' ' + analisys + 'Hs: ' + this.y + '</b>';
				}
			}
		};

		this.basicChart(id, axis, name, this.totalAmountAverage('ignOn',
				1 / 3600, analisys), '');
	},

	loadOdometerHourlyDayChart : function(id, type, name) {
		var axis = {
			type : type,
			xAxis : {
				// type : 'linear',
				title : {
					text : null
				},
				labels : {
					formatter : function() {
						return this.value;
					}
				},
				tickInterval : 1,
				maxZoom : null,
				min : 0,
				max : 23
			},
			yAxis : {
				min : 0,
				title : {
					text : ''
				},
				labels : {
					formatter : function() {
						return Highcharts.numberFormat(this.value, 0) + ' Km';
					}
				}
			},
			tooltip : {
				formatter : function() {
					return this.x + ' h<br/>' + '<b>' + name + ': '
							+ Highcharts.numberFormat(this.point.y) + ' Km</b>';
				}
			}
		};
		this.basicChart(id, axis, name, this.hourlyDayAverage('odoHours',
				1 / 1000), 'Km');
	},

	loadOdometerWeeklyDayChart : function(id, type, name) {
		var axis = {
			type : type,
			xAxis : {
				// type : 'datetime',
				title : {
					text : null
				},
				labels : {
					formatter : function() {
						return Highcharts.getOptions().lang.weekdays[this.value];
					}
				},
				tickInterval : 1,
				maxZoom : null,
				min : 0,
				max : 6
			},
			yAxis : {
				min : 0,
				title : {
					text : ''
				},
				labels : {
					formatter : function() {
						return Highcharts.numberFormat(this.value, 0) + ' '
								+ 'Km';
					}
				}
			},
			tooltip : {
				formatter : function() {
					return Highcharts.getOptions().lang.weekdays[this.x]
							+ '<br/>' + '<b>' + name + ': '
							+ Highcharts.numberFormat(this.point.y) + ' Km</b>';
				}
			}
		};

		this.basicChart(id, axis, name, this.weeklyDayAverage('odo', 1 / 1000),
				'Km');
	},

	loadOdometerMonthlyChart : function(id, type, name) {
		var axis = {
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
				labels : {
					formatter : function() {
						return Highcharts.numberFormat(Math
								.round((this.value * 100) / 100), 0)
								+ ' ' + 'Km';
					}
				}
			},
			tooltip : {
				formatter : function() {
					var d = new Date();
					d.setTime(this.x);
					return Highcharts.getOptions().lang.months[d.getMonth()]
							+ ' ' + (d.getYear() + 1900) + '<br/>' + '<b>'
							+ name + ': '
							+ Highcharts.numberFormat(this.point.y) + ' Km</b>';
				}
			}
		};

		this.basicChart(id, axis, name, this.monthlyAverage('odo', 1 / 1000),
				'Km');
	},

	loadOdometerWeeklyDayAmountChart : function(id, type, name, analisys) {
		var axis = {
			name : name + ' ' + analisys + ' Km',
			type : type,
			xAxis : {
				title : {
					text : null
				},
				labels : {
					formatter : function() {
						return Highcharts.getOptions().lang.weekdays[this.value];
					}
				},
				tickInterval : 1,
				maxZoom : null,
				min : 0,
				max : 6
			},
			yAxis : {
				min : 0,
				title : {
					text : ''
				},
				labels : {
					formatter : function() {
						return Math.round((this.value));
					}
				}
			},
			tooltip : {
				formatter : function() {
					return Highcharts.getOptions().lang.weekdays[this.x]
							+ '<br/>' + '<b>' + name + ' ' + analisys + ' Km '
							+ ': ' + this.point.y + '</b>';
				}
			}
		};

		this.basicChart(id, axis, name, this.weeklyDayAmountAverage('odo',
				1 / 1000, analisys), 'Km');
	},

	loadOdometerMonthlyAmountChart : function(id, type, name, analisys) {
		var axis = {
			name : name + ' ' + analisys + ' Km',
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
				labels : {
					formatter : function() {
						return Math.round(this.value);
					}
				}
			},
			tooltip : {
				formatter : function() {
					var d = new Date();
					d.setTime(this.x);
					return Highcharts.getOptions().lang.months[d.getMonth()]
							+ ' ' + (d.getYear() + 1900) + '<br/>' + '<b>'
							+ name + ' ' + analisys + ' Km ' + ': '
							+ Math.floor((this.point.y * 100) / 100) + '</b>';
				}
			}
		};

		this.basicChart(id, axis, name, this.monthlyAmountAverage('odo',
				1 / 1000, analisys), 'Km');
	},

	loadOdometerTotalAmountChart : function(id, type, name, analisys) {
		var axis = {
			name : name + ' ' + analisys + ' Km',
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
					return '<b>' + name + ' ' + ' ' + this.point.name + ' '
							+ ' ' + analisys + ' Km: ' + this.y + '</b>';
				}
			}
		};

		this.basicChart(id, axis, name, this.totalAmountAverage('odo',
				1 / 1000, analisys), '');
	},

	loadSpeedometerHourlyDayChart : function(id, type, name) {
		var axis = {
			type : type,
			xAxis : {
				// type : 'linear',
				title : {
					text : null
				},
				labels : {
					formatter : function() {
						return this.value;
					}
				},
				tickInterval : 1,
				maxZoom : null,
				min : 0,
				max : 23
			},
			yAxis : {
				min : 0,
				title : {
					text : ''
				},
				labels : {
					formatter : function() {
						return this.value + ' Km/h';
					}
				}
			},
			tooltip : {
				formatter : function() {
					return this.x + ' Hs<br/>' + '<b>' + name + ': '
							+ Math.floor(this.point.y) + ' Km/h</b>';
				}
			}
		};
		this.basicChart(id, axis, name, this.hourlyDayAverage('speedHours'),
				'Km/h');
	},

	loadSpeedometerWeeklyDayChart : function(id, type, name) {
		var axis = {
			type : type,
			xAxis : {
				// type : 'datetime',
				title : {
					text : null
				},
				labels : {
					formatter : function() {
						return Highcharts.getOptions().lang.weekdays[this.value];
					}
				},
				tickInterval : 1,
				maxZoom : null,
				min : 0,
				max : 6
			},
			yAxis : {
				min : 0,
				title : {
					text : ''
				},
				labels : {
					formatter : function() {
						return Math.floor((this.value * 100) / 100) + ' '
								+ 'Km/h';
					}
				}
			},
			tooltip : {
				formatter : function() {
					return Highcharts.getOptions().lang.weekdays[this.x]
							+ '<br/>' + '<b>' + name + ': '
							+ Math.floor(this.point.y) + ' Km/h</b>';
				}
			}
		};

		this.basicChart(id, axis, name, this.weeklyDayAverage('speed'), 'Km/h');
	},

	loadSpeedometerMonthlyChart : function(id, type, name) {
		var axis = {
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
				labels : {
					formatter : function() {
						return Math.floor((this.value * 100) / 100) + ' '
								+ 'Km/h';
					}
				}
			},
			tooltip : {
				formatter : function() {
					var d = new Date();
					d.setTime(this.x);
					return Highcharts.getOptions().lang.months[d.getMonth()]
							+ ' ' + (d.getYear() + 1900) + '<br/>' + '<b>'
							+ name + ': ' + Math.floor(this.point.y)
							+ ' Km/h</b>';
				}
			}
		};

		this.basicChart(id, axis, name, this.monthlyAverage('speed'), 'Km/h');
	},

	loadSpeedometerWeeklyDayAmountChart : function(id, type, name, analisys) {
		var axis = {
			name : name + ' ' + analisys + ' Km/h',
			type : type,
			xAxis : {
				title : {
					text : null
				},
				labels : {
					formatter : function() {
						return Highcharts.getOptions().lang.weekdays[this.value];
					}
				},
				tickInterval : 1,
				maxZoom : null,
				min : 0,
				max : 6
			},
			yAxis : {
				min : 0,
				title : {
					text : ''
				},
				labels : {
					formatter : function() {
						return Math.round((this.value));
					}
				}
			},
			tooltip : {
				formatter : function() {
					return Highcharts.getOptions().lang.weekdays[this.x]
							+ '<br/>' + '<b>' + name + ' ' + analisys + 'Km/h '
							+ ': ' + this.point.y + '</b>';
				}
			}
		};

		this.basicChart(id, axis, name, this.weeklyDayAmountAverage('speed', 1,
				analisys), 'Km/h');
	},

	loadSpeedometerMonthlyAmountChart : function(id, type, name, analisys) {
		var axis = {
			name : name + ' ' + analisys + ' Km/h',
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
				labels : {
					formatter : function() {
						return Math.round(this.value);
					}
				}
			},
			tooltip : {
				formatter : function() {
					var d = new Date();
					d.setTime(this.x);
					return Highcharts.getOptions().lang.months[d.getMonth()]
							+ ' ' + (d.getYear() + 1900) + '<br/>' + '<b>'
							+ name + ' ' + analisys + 'Km/h ' + ': '
							+ this.point.y + '</b>';
				}
			}
		};

		this.basicChart(id, axis, name, this.monthlyAmountAverage('speed', 1,
				analisys), 'Km/h');
	},

	loadSpeedometerTotalAmountChart : function(id, type, name, analisys) {
		var axis = {
			name : name + ' ' + analisys + ' Km/h',
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
					return '<b>' + name + ' ' + ' ' + this.point.name + ' '
							+ ' ' + analisys + ' Km/h: ' + this.y + '</b>';
				}
			}
		};

		this.basicChart(id, axis, name, this.totalAmountAverage('speed', 1,
				analisys), '');
	},

	speedometerChart : function(id, name, value) {
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
					text : 'Km/h'
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
					valueSuffix : ' Km/h'
				}
			
			} ]
			
		});
	},

	basicChart : function(id, axis, name, value, unit) {
		$('#' + id).highcharts({
			chart : {
				type : axis.type,
				zoomType : 'x',
				spacingRight : 10
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
					borderWidth : 0,

					zones : [ {
						value : 5,
						color : '#3e98d3'
					}, {
						value : 10,
						color : '#3e98d3'
					}, {
						value : 15,
						color : '#1b80b8'
					}, {
						value : 20,
						color : '#e6e7a3'
					}, {
						value : 25,
						color : '#d6e0a0'
					}, {
						value : 30,
						color : '#d8d87c'
					}, {
						value : 35,
						color : '#ddca5c'
					}, {
						value : 40,
						color : '#bdd176'
					}, {
						value : 45,
						color : '#c5cf5a'
					}, {
						value : 50,
						color : '#b2bb5b'
					}, {
						value : 55,
						color : '#afbb34'
					}, {
						value : 60,
						color : '#ffd967'
					}, {
						value : 65,
						color : '#f8d02e'
					}, {
						value : 70,
						color : '#eecd40'
					}, {
						value : 75,
						color : '#efc900'
					}, {
						value : 80,
						color : '#fcbe39'
					}, {
						value : 85,
						color : '#f0be00'
					}, {
						value : 90,
						color : '#fca400'
					}, {
						value : 100,
						color : '#d75413'
					}, {
						value : 110,
						color : '#c33f28'
					}, {
						value : 120,
						color : '#a23530'
					}, {
						value : 130,
						color : '#a82223'
					}, {
						color : '#5c3225'
					} ]

				},
				pie : {
					allowPointSelect : true,
					cursor : 'pointer',
					dataLabels : {
						enabled : true,
						color : '#FFFFFF',
						connectorColor : '#FFFFFF',
						format : '{point.percentage:.2f} %'
					}
				}
			},

			series : value
		});
	},

	dateAverage : function(objKey, unit) {
		var multiply = (typeof unit === 'undefined') ? 1 : unit;
		var labelData = new Object();

		for ( var key in this._biPackages) {
			var d = new Date();
			d.setTime(this._biPackages[key].pk.date);
			d.setHours(0, 0, 0, 0);
			var date = d.getTime();

			if (!labelData.hasOwnProperty(date)) {
				labelData[date] = this._biPackages[key][objKey] * multiply;
			} else {
				labelData[date] += this._biPackages[key][objKey] * multiply;
				labelData[date] = Math.floor((labelData[date] / 2) * 100) / 100;
			}
		}
		var value = new Array();
		var obj = new Object();
		obj.name = name;
		obj.data = new Array();
		Object.keys(labelData).sort().forEach(function(k) {
			obj.data.push([ parseInt(k), labelData[k] ]);
		});

		value.push(obj);
		return value;
	},

	hourlyDayAverage : function(objKey, unit) {
		var multiply = (typeof unit === 'undefined') ? 1 : unit;
		var labelData = new Object();

		for ( var key in this._biPackages) {
			for ( var hour in this._biPackages[key][objKey]) {
				var userTzHour = parseInt(hour) + parseInt(this._timeZone);
				userTzHour = userTzHour < 0 ? (userTzHour + 24) : userTzHour;
				userTzHour = userTzHour < 10 ? '0' + userTzHour : userTzHour;
				if (!labelData.hasOwnProperty(userTzHour)) {
					labelData[userTzHour] = this._biPackages[key][objKey][hour]
							* multiply;
				} else {
					labelData[userTzHour] += this._biPackages[key][objKey][hour]
							* multiply;
					labelData[userTzHour] = Math
							.floor((labelData[userTzHour] / 2) * 100) / 100;
				}
			}
		}
		var value = new Array();
		var obj = new Object();
		obj.name = name;
		obj.data = new Array();
		var lastHour = 0;
		Object.keys(labelData).sort().forEach(function(k) {
			if (parseInt(k) > lastHour) {
				for (; lastHour < parseInt(k); lastHour++) {
					obj.data.push([ lastHour, 0 ]);
				}
			}
			lastHour = parseInt(k);
			obj.data.push([ parseInt(k), labelData[k] ]);
		});

		value.push(obj);
		return value;
	},

	weeklyDayAverage : function(objKey, unit) {
		var multiply = (typeof unit === 'undefined') ? 1 : unit;
		var labelData = new Object();

		for ( var key in this._biPackages) {
			var userTzDate = this._biPackages[key].pk.date
					+ (parseInt(this._timeZone) * 60 * 60 * 1000);

			var d = new Date();
			d.setTime(userTzDate);
			var date = d.getDay();

			if (!labelData.hasOwnProperty(date)) {
				labelData[date] = this._biPackages[key][objKey] * multiply;
			} else {
				labelData[date] += this._biPackages[key][objKey] * multiply;
				labelData[date] = Math.floor((labelData[date] / 2) * 100) / 100;
			}
		}
		var value = new Array();
		var obj = new Object();
		obj.name = name;
		obj.data = new Array();
		Object.keys(labelData).sort().forEach(function(k) {
			obj.data.push([ parseInt(k), labelData[k] ]);
		});

		value.push(obj);
		return value;
	},

	deviceAverage : function(objKey, unit) {
		var multiply = (typeof unit === 'undefined') ? 1 : unit;
		var size = 0;
		var deviceUnique = new Object();
		var deviceData = new Object();
		for ( var key in this._biPackages) {
			var d = new Date();
			d.setTime(this._biPackages[key].pk.date);
			d.setHours(0, 0, 0, 0);
			var date = d.getTime();

			var device = this._biPackages[key].pk.deviceId;
			if (!deviceData.hasOwnProperty(date))
				deviceData[date] = new Object();
			if (!deviceData[date].hasOwnProperty(device)) {
				deviceData[date][device] = this._biPackages[key][objKey]
						* multiply;
			} else {
				deviceData[date][device] += this._biPackages[key][objKey]
						* multiply;
				deviceData[date][device] = Math
						.floor((deviceData[date][device] / 2) * 100) / 100;
			}

			if (!deviceUnique.hasOwnProperty(device)) {
				deviceUnique[device] = true;
				++size;
			}
		}

		var labelData = new Object();
		for ( var date in deviceData) {
			for ( var device in deviceData[date]) {
				if (!labelData.hasOwnProperty(date)) {
					labelData[date] = deviceData[date][device];
				} else {
					labelData[date] += deviceData[date][device];
				}
			}
			labelData[date] = Math.floor((labelData[date] / size) * 100) / 100;
		}

		var value = new Array();
		var obj = new Object();
		obj.name = name;
		obj.data = new Array();
		Object.keys(labelData).sort().forEach(function(k) {
			obj.data.push([ parseInt(k), labelData[k] ]);
		});

		value.push(obj);
		return value;
	},

	weeklyDayAmountAverage : function(objKey, unit, analisys) {
		var multiply = (typeof unit === 'undefined') ? 1 : unit;
		var deviceData = new Object();
		for ( var key in this._biPackages) {
			var userTzDate = this._biPackages[key].pk.date
					+ (parseInt(this._timeZone) * 60 * 60 * 1000);
			var d = new Date();
			d.setTime(userTzDate);
			var date = d.getDay();
			var device = this._biPackages[key].pk.deviceId;
			if (!deviceData.hasOwnProperty(date))
				deviceData[date] = new Object();
			if (!deviceData[date].hasOwnProperty(device)) {
				deviceData[date][device] = this._biPackages[key][objKey]
						* multiply > analisys ? 1 : 0;
			} else {
				deviceData[date][device] = deviceData[date][device] == 0 ? (this._biPackages[key][objKey]
						* multiply > analisys ? 1 : 0)
						: 1;
			}
		}

		var labelData = new Object();
		for ( var weekDay in deviceData) {
			for ( var device in deviceData[weekDay]) {
				if (!labelData.hasOwnProperty(weekDay)) {
					labelData[weekDay] = deviceData[weekDay][device];
				} else {
					labelData[weekDay] += deviceData[weekDay][device];
				}
			}
		}

		var value = new Array();
		var obj = new Object();
		obj.name = name;
		obj.data = new Array();
		Object.keys(labelData).sort().forEach(function(k) {
			obj.data.push([ parseInt(k), labelData[k] ]);
		});

		value.push(obj);
		return value;
	},

	monthlyAverage : function(objKey, unit) {
		var multiply = (typeof unit === 'undefined') ? 1 : unit;
		var labelData = new Object();

		for ( var key in this._biPackages) {
			var userTzDate = this._biPackages[key].pk.date
					+ (parseInt(this._timeZone) * 60 * 60 * 1000);
			var d = new Date();
			d.setTime(userTzDate);
			d.setDate(1);
			d.setHours(0, 0, 0, 0);
			var date = d.getTime();

			if (!labelData.hasOwnProperty(date)) {
				labelData[date] = this._biPackages[key][objKey] * multiply;
			} else {
				labelData[date] += this._biPackages[key][objKey] * multiply;
				labelData[date] = Math.floor((labelData[date] / 2) * 100) / 100;
			}
		}
		var value = new Array();
		var obj = new Object();
		obj.name = name;
		obj.data = new Array();
		Object.keys(labelData).sort().forEach(function(k) {
			obj.data.push([ parseInt(k), labelData[k] ]);
		});

		value.push(obj);
		return value;
	},

	monthlyAmountAverage : function(objKey, unit, analisys) {
		var multiply = (typeof unit === 'undefined') ? 1 : unit;
		var deviceData = new Object();
		for ( var key in this._biPackages) {
			var userTzDate = this._biPackages[key].pk.date
					+ (parseInt(this._timeZone) * 60 * 60 * 1000);
			var d = new Date();
			d.setTime(userTzDate);
			d.setDate(1);
			d.setHours(0, 0, 0, 0);
			var date = d.getTime();
			var device = this._biPackages[key].pk.deviceId;
			if (!deviceData.hasOwnProperty(date))
				deviceData[date] = new Object();
			if (!deviceData[date].hasOwnProperty(device)) {
				deviceData[date][device] = this._biPackages[key][objKey]
						* multiply > analisys ? 1 : 0;
			} else {
				deviceData[date][device] = deviceData[date][device] == 0 ? (this._biPackages[key][objKey]
						* multiply > analisys ? 1 : 0)
						: 1;
			}
		}

		var labelData = new Object();
		for ( var weekDay in deviceData) {
			for ( var device in deviceData[weekDay]) {
				if (!labelData.hasOwnProperty(weekDay)) {
					labelData[weekDay] = deviceData[weekDay][device];
				} else {
					labelData[weekDay] += deviceData[weekDay][device];
				}
			}
		}

		var value = new Array();
		var obj = new Object();
		obj.name = name;
		obj.data = new Array();
		Object.keys(labelData).sort().forEach(function(k) {
			obj.data.push([ parseInt(k), labelData[k] ]);
		});

		value.push(obj);
		return value;
	},

	totalAmountAverage : function(objKey, unit, analisys) {
		var multiply = (typeof unit === 'undefined') ? 1 : unit;
		var deviceStatus = new Object();
		for ( var key in this._biPackages) {
			var device = this._biPackages[key].pk.deviceId;
			if (!deviceStatus.hasOwnProperty(device)) {
				deviceStatus[device] = this._biPackages[key][objKey] * multiply > analisys ? 1
						: 0;
			} else {
				deviceStatus[device] = deviceStatus[device] == 0 ? this._biPackages[key][objKey]
						* multiply > analisys ? 1 : 0
						: 1;
			}
		}

		var data = [ 0, 0 ];
		for ( var key in deviceStatus) {
			data[deviceStatus[key]]++;
		}

		var value = new Array();
		var obj = new Object();
		obj.name = name;
		obj.data = [ [ '&lt;', data[0] ], [ '&gt;', data[1] ] ];
		value.push(obj);
		return value;
	},
	
	drawChart : function (xhr, status, args) {
		
	    var posObj = eval('(' + args.journeyTargets + ')');
		
		var container = document.getElementById('timeline');
		var chart = new google.visualization.Timeline(container);
		var dataTable = new google.visualization.DataTable();
		
		dataTable.addColumn({ type: 'string', id: 'Data' });
		dataTable.addColumn({ type: 'date', id: 'Início' });
		dataTable.addColumn({ type: 'date', id: 'Fim' });

 		var matrizReport = [];
 		var auxMatrizReport = [];
 	    if (Object.prototype.toString.call(posObj) === "[object Array]") {
 		    for (var i = 0; i < posObj.length; i++) {
 		    	auxMatrizReport = [];
 		    	auxMatrizReport[0]=posObj[i].dateOnlyFormated;
 
 		    	var sp = posObj[i].dateStart.split(",");
		        auxMatrizReport[1]=new Date(sp[0],sp[1],sp[2],sp[3],sp[4],sp[5]);
		        
 		    	var spE = posObj[i].dateEnd.split(",");
		        auxMatrizReport[2]=new Date(spE[0],spE[1],spE[2],spE[3],spE[4],spE[5]);

 		    	matrizReport[i] = auxMatrizReport;
 		    }
 		}
 	    if(matrizReport.length > 0){
 		    dataTable.addRows(matrizReport);
 	    }
	    var options = {
	    		hAxis: {
	    	        format: 'HH:mm:ss'
	    	    },	
	    	timeline: { colorByRowLabel: true }
        };

	    chart.draw(dataTable, options);		
	}

	
};
