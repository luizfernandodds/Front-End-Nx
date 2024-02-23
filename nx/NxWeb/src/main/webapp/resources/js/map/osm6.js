/**
 * OSM Map Prototype class
 * 
 */
MapController.prototype = {
   Provider : function() {
      return "OSM";
   },

   /**
   * Funcao para carregar dependencias iniciais do Mapa
   */
   init : function() {
	  console.log('INIT');
	  this._Map = new ol.Map({
         target: 'map_canvas',
         layers: [
            new ol.layer.Tile({
    	    	source: new ol.source.OSM()
            })
         ],
         view: new ol.View({
            center: ol.proj.fromLonLat([-49.888,-17.151]),
            zoom: 4
         })
      });
		
	  this.load()

      return this._Map;
   },

   /**
   * Funcao para carregar dependencias do Mapa
   */
   load : function() {
	
	console.log('load');

      for ( var i in MapController.prototype._configure.mapButtons) {

      var funcOn = MapController.prototype._configure.mapButtons[i].funcOn.substring(0, MapController.prototype._configure.mapButtons[i].funcOn.indexOf("(")).split(".");
      var funcOff = MapController.prototype._configure.mapButtons[i].funcOff.substring(0, MapController.prototype._configure.mapButtons[i].funcOff.indexOf("(")).split(".");
      var onClass = funcOn[0];
      var offClass = funcOff[0];
      funcOn = funcOn[funcOn.length - 1];
      funcOff = funcOff[funcOff.length - 1];

      if ((onClass === "MapLayer" && typeof this[funcOn] !== "function")
          || (offClass === "MapLayer" && typeof this[funcOff] !== "function"))
         continue;

      }

  	 if ($.type(MapController.prototype._configure.loadExecute) == "function") {
	    try {
		   MapController.prototype._configure.loadExecute();
		} catch (e) {
			console.log("Error while execute on loadExecute: " + e);
				// console.log(MapController.prototype._configure.loadExecute);
		}
	 }
   },

   /**
   * Exibe o mapa no nivel de zoom apropriado a visualizar as coordenadas
   * passadas por parametros.
   * 
   * @param zoom
   *          Nivel de zoom (INT or WKT)
   */
   zoom : function(zoom) {
      zoom = this.getWkt(zoom);

	  console.log('zoom getWkt: '+zoom);

	     if ($.type(zoom) == "number") {
	        this._Map.zoomTo(zoom);
	     } else {
	        var indexStart = zoom.indexOf("(") + 1;
	        var type = $.trim(zoom.substring(0, indexStart)).replace(/\ |\(|\)|,/g,"");
	
 		    console.log('zoom type: '+type);
			var wkt = zoom.replace(type,"").replace('(','[').replace(')',']');
			console.log('wkt: '+wkt);

console.log('DEPOIS DO TESTE');

var format = new ol.format.WKT();

var feature = format.readFeature(zoom, {
});

var coordinate = feature.getGeometry().getCoordinates();
console.log('coordinate: '+coordinate[0]);

var teste = ol.proj.fromLonLat([coordinate])
console.log('teste.latitude: '+teste[0]);

	        switch (type) {
	        case "POINT":
				this._Map.getView().animate({center:ol.proj.fromLonLat([coordinate[0],coordinate[1]])}, {zoom: 13});
	           break;
	        case "LINESTRING":
	        case "MULTIPOINT":
	        case "POLYGON":
				this._Map.getView().animate({center:ol.proj.fromLonLat([-49.276021,-18.105094])}, {zoom: 4});
	           break;
	        default:
	          console.log("ZOOM[" + type + "][" + zoom + "]");
	        }
	    }
  	},

    /**
     * Redimensiona tamanho do mapa
     */
    resizeCanvas : function() {
      this._Map.updateSize();
    },

	addMarker : function(obj, config) {

	   var container = document.getElementById('popup');
	   var content = document.getElementById('popup-content');
	   var closer = document.getElementById('popup-closer');
		
	   var iconWidth = config.icon != 20 ? 40 : 16;
       var iconHeigth = config.icon != 20 ? 40 : 16;
       iconWidth += obj.index ? 19 : 0;
       iconHeigth += obj.index ? 7 : 0;

       if (typeof obj.deviceId === "undefined") {
          return;
       }

	   	
       config.shift = 0;
       var balloon = this.getBalloon(obj, config);

console.log('balloon: '+balloon);

	   var layer = new ol.layer.Vector({
	      source: new ol.source.Vector({
	         features: [
	            new ol.Feature({
	               geometry: new ol.geom.Point(ol.proj.fromLonLat([obj.longitude,obj.latitude])),
				   name: 'TESTE 1',
	            })
	         ]
	      }),
		  style: new ol.style.Style({
		     image: new ol.style.Icon({
		        anchor: [0.5, 46],
		        anchorXUnits: 'fraction',
		        anchorYUnits: 'pixels',
		        src: balloon.icon
		     })
		   }),
	   });

	var overlay = new ol.Overlay({
	  element: container,
	  autoPan: true,
	  autoPanAnimation: {
	    duration: 250,
	  },
	});
	
	var iconFeature = new ol.Feature({
	  geometry: new ol.geom.Point(ol.proj.fromLonLat([obj.longitude,obj.latitude])),
	  name: 'Null Island',
	  population: 4000,
	  rainfall: 500,
	});
	
	var iconStyle = new ol.style.Style({
	  image: new ol.style.Icon({
	    anchor: [0.5, 46],
	    anchorXUnits: 'fraction',
	    anchorYUnits: 'pixels',
	    src: balloon.icon,
	  }),
	});
	
	iconFeature.setStyle(iconStyle);
	
	var vectorSource = new ol.source.Vector({
	  features: [iconFeature],
	});
	
	var vectorLayer = new ol.layer.Vector({
	  source: vectorSource,
	});
//
//var element = document.getElementById('popup');
//var popup = new ol.Overlay({
//  element: element,
//  positioning: 'bottom-center',
//  stopEvent: false,
//  offset: [0, -50],
//});


//this._Map.on('singleclick', function (evt) {
//  var coordinate = evt.coordinate;

//  content.innerHTML = '<p>You clicked here:</p><code>';
//  overlay.setPosition(coordinate);
//});

//this._Map.addOverlay(popup);

   this._Map.addLayer(vectorLayer);	

    var lonLatMarker = new ol.geom.Point(ol.proj.fromLonLat([obj.longitude,obj.latitude]));
//    var olicon = new OpenLayers.Icon(balloon.icon, size, offset);

	var marker = new ol.Feature({
		geometry: new ol.geom.Point(ol.proj.fromLonLat([obj.longitude,obj.latitude])
	     ),  // Cordinates of New York's City Hall
	});

	this._Map.on('click', function (evt) {
		console.log('Event click');
		if (this.popup == null) {
           this.popup = MapController.prototype.popUpCreate(marker, null, iconHeigth);
           MapController.prototype._Map.addPopup(this.popup);
           this.popup.show();
        } else {
           MapController.prototype.popUpCreate(marker, this.popup, iconHeigth);
           this.popup.toggle();
       }

	});

	},
	
	popUpCreate : function(marker, popUp, offset) {
		console.log('marker.geometry: '+marker.getGeometry().getCoordinates());
		
		
	  var pixel = marker ? this._Map.getPixelFromCoordinate(marker.getGeometry().getCoordinates()) : null;
	
	  if (!popUp) {
	
		var element = document.getElementById('popup');
		var popup = new ol.Overlay({
		  element: element,
		  positioning: 'bottom-center',
		  stopEvent: false,
		  offset: [0, -50],
		});
	

		var popup = new ol.Overlay({
		  element: element,
		  positioning: 'bottom-center',
		  stopEvent: false,
		  offset: [0, -50],
		});



//	    popUp = new OpenLayers.Popup.FramedCloud("PopUpIkonn_" + marker.id,
//	        this._Map.getLonLatFromPixel(pixel), null,
//	        marker.feature.data.popupContentHTML, null, true);
//	    popUp.calculateRelativePosition = function() {
//	      return "tr";
//	    };
	  } else if (Object.prototype.toString.call(popUp) === "[object Object]") {
	    popUp.lonlat = this._Map.getLonLatFromPixel(pixel);
	  } else {
	    var markers = this._Map.getLayersByName("PositionMarker")[0].markers;
	    for ( var i in markers) {
	      if (markers[i].feature.popup) {
	        this.popUpCreate(markers[i], markers[i].feature.popup, offset / 2);
	      }
	    }
	  }
	
	  return popUp;
	},
	
	removeMarker : function(obj) {
		
		console.log('removeMarker: ')
		
		var layersToRemove = [];
		this._Map.getLayers().forEach(function (layer) {
		    if (layer.get('name') != undefined && layer.get('name') === 'selectvector') {
		        layersToRemove.push(layer);
		    }
		});
		
		var len = layersToRemove.length;
		for(var i = 0; i < len; i++) {
		    this._Map.removeLayer(layersToRemove[i]);
		}
	},
	
	removeMarkerAnt : function(obj) {
		
		console.log('removeMarker: ')
		
				console.log('removeMarker obj: '+obj)

       if (typeof obj.deviceId === "undefined")
          return;

		console.log('removeMarker obj.deviceId: '+obj.deviceId)
		console.log('removeMarker IF: ')

	   var layerId = new String(obj.deviceId + "" + obj.gpsTime);
	   var markersLayer = this._Map.getLayersByName("PositionMarker")[0];
	   var markers = markersLayer.markers;
	   for ( var i in markers) {
	      if (markers[i].id.toString() == layerId) {
	        markersLayer.removeMarker(markers[i]);
	      }
	   }
	},
	
	
	calculateAndDisplayRoute : function() {
		console.log('osmRoute 6 6'  );
		var url = 'http://maps.paranagr.com.br/styles/klokantech-basic/?z=8&center=-23.870141%2C-46.202855&loc=-25.143022%2C-48.525695&loc=-22.571130%2C-43.867492&hl=pt-BR&alt=0&srv=1';
		    $.ajax(url, {
      dataType : "jsonp",
      jsonp : "jsonp",
      cache : true,
      async : false,
 	  headers: {  'Access-Control-Allow-Origin': '*','Content-Type': 'text/html' },
      success : function() {
        switch (arguments[0].status) {
        case 0:
          callback(MapController.prototype
              .osrmGeometry2Wkt(arguments[0].route_geometry), arguments[0]);
          break;

        default:
          callback(null, arguments[0]);
          break;
        }
      }
    });
		
//		let headers = new Headers();
//
//	    headers.append('Content-Type', 'application/json');
//	    headers.append('Accept', 'application/json');
//	    headers.append('Access-Control-Allow-Origin','*');
//	
//	    fetch(url, {
//		    dataType : "jsonp",
//	        method: 'GET',
//	        headers: headers,
//            mode: 'no-cors'
//	    })
//	    .then(response => response.json())
//	    .then(json => console.log(json))
//	    .catch(error => console.log('Authorization failed : ' + error.message));


//		var http_request;
//		http_request = new XMLHttpRequest();
//		http_request.onreadystatechange = function () { /* .. */ };
//		http_request.open("GET", url);
//		http_request.withCredentials = true;
//		http_request.setRequestHeader("Content-Type", "text/json");
//		http_request.setRequestHeader("Access-Control-Allow-Origin", "*");
//		http_request.send({ 'request': "authentication token" });
//		
//		var request = new XMLHttpRequest();
//		request.open('GET',  url);
//		request.setRequestHeader('Content-Type', 'application/json'); //Obrigatorio API
//		request.setRequestHeader('Access-Control-Allow-Origin', '*');
//		request.send(); 

//		var xhttp = new XMLHttpRequest();
//		xhttp.open("GET", url, true);
//    	xhttp.setRequestHeader('Content-Type', 'application/json');
//		xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
//		xhttp.setRequestHeader('Accept', 'application/json');
//    	xhttp.setRequestHeader('Access-Control-Allow-Origin', '*');
//
//		xhttp.send();

//    let headers = new Headers();
//
//    headers.append('Content-Type', 'application/json');
//    headers.append('Accept', 'application/json');
//    headers.append('Access-Control-Allow-Origin','*');
//
//    fetch(url, {
//        mode: 'no-cors',
//        method: 'GET',
//        headers: headers
//    })
//    .then(response => response.json())
//    .then(json => console.log(json))
//    .catch(error => console.log('Authorization failed : ' + error.message));
		
	},
	

	reset : function() {
		
		//this._Map.getLayers().getArray().slice().forEach(layer => this._Map.removeLayer(layer))
	},

	mountGeometry : function(field) {
		var centerLongitudeLatitude = ol.proj.fromLonLat([-49.888,-17.151]);

		stylePoint = new ol.style.Style({
			stroke: new ol.style.Stroke({
		       color: 'blue',
		       width: 2
		    }),
		    fill: new ol.style.Fill({
		       color: 'rgba(0, 0, 255, 0.1)'
		    })
		})

		if (document.getElementById(field).value != null && document.getElementById(field).value !== undefined) {
			var contact = JSON.parse(document.getElementById(field).value);

			eval('var obj=' + document.getElementById(field).value);
			
			if(obj.ORIGIN_LATITUDE != null && obj.ORIGIN_LATITUDE !== undefined && obj.ORIGIN_LONGITUDE != null && obj.ORIGIN_LONGITUDE !== undefined){
				this.addPoint(obj.ORIGIN_LONGITUDE, obj.ORIGIN_LATITUDE, stylePoint);
			}
			if(obj.DESTINY_LATITUDE != null && obj.DESTINY_LATITUDE !== undefined && obj.DESTINY_LONGITUDE != null && obj.DESTINY_LONGITUDE !== undefined){

				stylePoint = new ol.style.Style({
					stroke: new ol.style.Stroke({
				       color: 'green',
				       width: 2
				    }),
				    fill: new ol.style.Fill({
				       color: 'rgba(0, 0, 255, 0.1)'
				    })
				})
		
				this.addPoint(obj.DESTINY_LONGITUDE, obj.DESTINY_LATITUDE, stylePoint);
			}
			//this.addLineString();
			
//			var coords = "[-50.160140000000006,-25.089350000000003],[-50.161440000000006,-25.08876],[-47.647760000000005,-22.735830000000004],[-47.64779,-22.735660000000003],[-47.64781000000001,-22.735590000000002],[-47.648010000000006,-22.734730000000003],[-47.64802,-22.73469],[-47.648030000000006,-22.73466],[-47.648030000000006,-22.734650000000002],[-47.648030000000006,-22.734630000000003],[-47.647650000000006,-22.736430000000002]";
			//this.createRoute(coords, stylePoint);
			//this.addLineString(coords, stylePoint);
			this.route(this._Map, obj.ROUTE);
		}
		
	},
	
	addPoint : function(longitude, latitude, stylePoint) {
		
       var centerLongitudeLatitude = ol.proj.fromLonLat([-49.888,-17.151]);
	   var centerLongitudeLatitude = ol.proj.fromLonLat([longitude, latitude]);
   	   var viewProjection = this._Map.getView().getProjection();
	   var pointResolution = ol.proj.getPointResolution(viewProjection , 1, centerLongitudeLatitude );
	   var radius = 2600 ;
	
       var fcircle = new ol.layer.Vector({
		   source: new ol.source.Vector({
		      features: [new ol.Feature(new ol.geom.Circle(centerLongitudeLatitude, radius))]
		   }),
		   style: [stylePoint],
		   zIndex: 6,
	   });
	   this._Map.addLayer(fcircle);

		this._Map.getView().setCenter(ol.proj.fromLonLat([longitude, latitude]));
		this._Map.getView().setZoom(7);

    },

    createRoute: function(polyline, stylePoint) {
	console.log('createRoute');
	
	   styles = { 
          route: new ol.style.Style({
             stroke: new ol.style.Stroke({
                width: 6, color: [40, 40, 40, 0.8]
             })
          })
       }

    // route is ol.geom.LineString
       var route = new ol.geom.LineString({
       factor: 1e5
       }).readGeometry(polyline, {
          dataProjection: 'EPSG:4326',
          featureProjection: 'EPSG:3857'
       });
       var feature = new ol.Feature({
          type: 'route',
          geometry: route
       });
       feature.setStyle(styles.route);

       var fPolyline = new ol.layer.Vector({
		   source: new ol.source.Vector({
		      features: [new ol.Feature(feature)]
		   }),
		   style: [stylePoint],
		   zIndex: 6,
	   });
	   this._Map.addLayer(fPolyline);

    },

	addLineString : function(coords, stylePoint) {
		console.log('addLineString');
		console.log('addLineString 1');
       let path = [];
		console.log('addLineString 2');
       for(let i = 0; i < coords.length; i+=3) {
          path.push([coords[i], coords[i + 1], coords[i + 2]]);
       }
		console.log('addLineString 3');

       var lineString = new ol.geom.LineString(path);
		console.log('addLineString 4');

       lineString.transform('EPSG:4326', 'EPSG:3857');
		console.log('addLineString 5');

       var feature = new ol.Feature({
          geometry: lineString
       });

		console.log('addLineString 6');

       var fLineString = new ol.layer.Vector({
		   source: new ol.source.Vector({
		      features: [new ol.Feature(feature)]
		   }),
		   style: [stylePoint],
		   zIndex: 6,
	   });
	   this._Map.addLayer(fLineString);


		var waypoints = [
		  [11.94, 57.74],
		  [11.949, 57.6792]
		]
		var control = new olrm.Control({
		  map,
		  waypoints
		});
		
		this._Map.addControl(control)

	},

	route : function(map, coords){
//		const coordinates = "["+coords+"]";
		
		var coordinates = (new Function("return [" + coords+ "];")());
		
		console.log('coordinates: '+coordinates);
		
		fetch(
		  'https://router.project-osrm.org/route/v1/driving/' +
		    coordinates.join(';') +
		    '?overview=full&geometries=polyline6'
		).then(function (response) {
		  response.json().then(function (result) {
		    const polyline = result.routes[0].geometry;
		
		    const route = new ol.format.Polyline({
		      factor: 1e6,
		    }).readGeometry(polyline, {
		      dataProjection: 'EPSG:4326',
		      featureProjection: map.getView().getProjection()
		    });
		    const routeFeature = new ol.Feature({
		      type: 'route',
		      geometry: route,
		    });
		
		    const vectorLayer = new ol.layer.Vector({
		      source: new ol.source.Vector({
		        features: [routeFeature],
		      }),
		      style: new ol.style.Style({
		        stroke: new ol.style.Stroke({
		          width: 4,
		          color: 'red',
		        }),
		      }),
		    });
		
		    map.addLayer(vectorLayer);
		    map.getView().fit(routeFeature.getGeometry());
		  });
		});		
	},
	
	drawBermuda : function(map) {
	   var centerLongitudeLatitude = ol.proj.fromLonLat([-49.23344, -25.43393]);
   	   var viewProjection = this._Map.getView().getProjection();
	   var pointResolution = ol.proj.getPointResolution(viewProjection , 1, centerLongitudeLatitude );
	   var radius = 2600 ;
	
       var fcircle = new ol.layer.Vector({
		   source: new ol.source.Vector({
		      features: [new ol.Feature(new ol.geom.Circle(centerLongitudeLatitude, radius))]
		   }),
		   style: [
		      new ol.style.Style({
		         stroke: new ol.style.Stroke({
		            color: 'blue',
		            width: 2
		        }),
		        fill: new ol.style.Fill({
		           color: 'rgba(0, 0, 255, 0.1)'
		        })
		      })
		   ],
		   zIndex: 6,
	   });
	   this._Map.addLayer(fcircle)

    },


	drawBermudasss : function() {
	    // Bermuda triangle (approximate) GPS coordinates in [lon,lat] format
	    var arPath = [[
	        [-66.123934, 18.472282], // Bermuda
	        [-64.778447, 32.297504], // Puerto Rico
	        [-80.133221, 25.732447], // Miami
	        [-66.123934, 18.472282]  // Bermuda
	    ]];
	
	    var pPath = {
	        'type': 'Polygon',
	        'coordinates': arPath
	    };
	    
	    var fPath = {
	        'type': 'Feature',
	        'geometry': pPath
	    };
	    
	    var svPath = new ol.source.Vector({
	        features: new ol.format.GeoJSON().readFeatures(fPath, {featureProjection: this._Map.getView().getProjection()})
	    });
	    
	    var lvPath = new ol.layer.Vector({
	        source: svPath,
	    });
	    
	    this._Map.addLayer(lvPath);
	}
	
};
