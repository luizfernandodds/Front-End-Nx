/**
 * Google Map Prototype class
 * 
 */
var listMarkers = [];
var markerCluster;
var markers = [];

var load = function() {
	MapController.prototype.load();
};

MapController.prototype = {

	Provider : function() {
		return "GOOGLE";
	},

	/**
	 * Funcao para carregar dependencias iniciais do Mapa
	 */
	init : function() {

		this._Map = new google.maps.Map(document.getElementById('map_canvas'),
				{
					center : {
						lat : -25.412906,
						lng : -49.201410
					},
					mapTypeId: 'roadmap',
					zoom : 4
				});
		MapLayer.load();

		return this._Map;
	},
	/**
	 * Funcao para carregar dependencias do Mapa
	 */
	load : function() {

		/* Add Buttons */
		for ( var i in MapController.prototype._configure.mapButtons) {
			var funcOn = MapController.prototype._configure.mapButtons[i].funcOn
					.substring(
							0,
							MapController.prototype._configure.mapButtons[i].funcOn
									.indexOf("(")).split(".");
			var funcOff = MapController.prototype._configure.mapButtons[i].funcOff
					.substring(
							0,
							MapController.prototype._configure.mapButtons[i].funcOff
									.indexOf("(")).split(".");
			var onClass = funcOn[0];
			var offClass = funcOff[0];
			funcOn = funcOn[funcOn.length - 1];
			funcOff = funcOff[funcOff.length - 1];

			if ((onClass === "MapLayer" && typeof this[funcOn] !== "function")
					|| (offClass === "MapLayer" && typeof this[funcOff] !== "function"))
				continue;

			// this.addButton(MapController.prototype._configure.mapButtons[i]);
		}

		// MapController.prototype._configure.init();
		if ($.type(MapController.prototype._configure.loadExecute) == "function") {
			try {
				MapController.prototype._configure.loadExecute();
			} catch (e) {
				console.log("Error while execute on loadExecute: " + e);
				// console.log(MapController.prototype._configure.loadExecute);
			}
		}

	},
	center : function(lng, lat) {
		this._Map.setCenter(new google.maps.LatLng(lat, lng));
	},

	drawClear : function() {
		this.init();
	},

	setMapOnAll : function(map) {
		listMarkers = [];
	},

	reset : function() {
		this.drawClear();
	},

	/**
	 * Redimensiona tamanho do mapa
	 */
	resizeCanvas : function() {
		google.maps.event.trigger(this._Map, "resize");
	},

	/**
	 * Exibe o mapa no nivel de zoom apropriado a visualizar as coordenadas
	 * passadas por parametros.
	 * 
	 * @param zoom
	 *            Nivel de zoom (INT or WKT)
	 */
	zoom : function(zoom, cad) {
		
		zoom = this.getWkt(zoom);

		if(cad=='rightPanel'){
			zoom =document.getElementById('main_map_form:mousePositionWkt').value;
			if(zoom!='undefined' || zoom!=''){
				var array = zoom.split(',');
				var lat = array[0].replace("(", "");
				var lng = array[1].replace(")", "");
				
				zoom = "("+lng.replace(" ","")+" "+lat+")";
			}
		}

		if ($.type(zoom) == "number") {
			
			// Ver como seta zoom através de valor inteiro
			this._Map.setZoom(zoom);
			if (cad == 'poc') {
				this.drawControlPoint('wkt');
			} else if (cad == 'poi') {
				this.drawPoint('wkt');
			} else if (cad == 'fence') {
				this.drawPolygon('wkt');
			} else if (cad == 'route') {
				this.drawLine('wkt');
			}
		} else {

			var coords = zoom.replace(/\ /g, ",").replace(/,+/g, ",");

			var indexStart = coords.indexOf("(") + 1;
			var indexEnd = coords.indexOf(")");
			var type = $.trim(coords.substring(0, indexStart)).replace(
					/\(|\)|,/g, "");

			coords = coords.substring(indexStart, indexEnd).replace(/\(|\)/g,
					"");

			var pointsAux = [];
			var latLng = coords.split(",");
			for (var i = 0; i < latLng.length; i++) {
				if (i == 0) {
					pointsAux[i] = {
						lng : "" + latLng[i] + "",
						lat : "" + latLng[++i] + ""
					};
				} else {
					pointsAux[i] = {
						lng : "" + latLng[i] + "",
						lat : "" + latLng[++i] + ""
					};
				}
			}
			var points = [];
			points = this.cleanArray(pointsAux);

			var bound = new google.maps.LatLngBounds();

			for (var i = 0; i < points.length; ++i) {
				bound.extend(new google.maps.LatLng(points[i].lat,
						points[i].lng));
			}

			switch (type) {
			case "POINT":
			case "LINESTRING":
				this._Map.fitBounds(bound);
			case "MULTIPOINT":
				this._Map.fitBounds(bound);
			case "POLYGON":
				this._Map.fitBounds(bound);
				break;
			default:
				console.log("ZOOM[" + type + "][" + zoom + "]");
			}
		}
	},


	zoomNumber : function(zoom) {
		
		console.log('zomm: '+zoom);
		var coordinates = new google.maps.LatLng(-23.77992, -52.346646);
		
		this._Map.setCenter(coordinates);
		this._Map.setZoom(4);
		
//		this._Map.setOptions({ maxZoom: 15 });
	},
	
	cleanArray : function(actual) {
		var newArray = new Array();
		for (var i = 0; i < actual.length; i++) {
			if (actual[i]) {
				newArray.push(actual[i]);
			}
		}
		return newArray;
	},

	removeMarker : function(obj) {
		if (typeof obj.deviceId === "undefined")
			return;

		var layerId = new String(obj.deviceId + "" + obj.gpsTime);

		for (var i = 0; i < listMarkers.length; i++) {
			if (listMarkers[i].id == layerId) {
				// Remove the marker from Map
				listMarkers[i].setMap(null);

				// Remove the marker from array.
				listMarkers.splice(i, 1);
				return;
			}
		}
	},

//	addMarker : function(obj, config) {
//
//		var iconWidth = config.icon != 20 ? 40 : 16;
//		var iconHeigth = config.icon != 20 ? 40 : 16;
//		iconWidth += obj.index ? 19 : 0;
//		iconHeigth += obj.index ? 7 : 0;
//
//		if (typeof obj.deviceId === "undefined") {
//			return;
//		}
//
//		config.shift = 0;
//		var balloon = this.getBalloon(obj, config);
//
//		var layerId = new Number(obj.deviceId + "" + obj.gpsTime);
//		
//		var marker = new google.maps.Marker({
//				position : {
//					lat : obj.latitude,
//					lng : obj.longitude
//				},
//				id : Number(layerId),
//				icon : balloon.icon,
//				map : this._Map
//		});
//		
//		listMarkers.push(marker);
//		
//		var options = {
//	            imagePath: 'https://gmaps-marker-clusterer.github.io/gmaps-marker-clusterer/assets/images/m'
//	        };
//		// Add a marker clusterer to manage the markers.
//		markerCluster = new MarkerClusterer(
//				this._Map,
//				listMarkers,options);
//		
//		var infoWindow = new google.maps.InfoWindow({
//			content : balloon.html
//		});
//		// Add info window to marker
//		google.maps.event.addListener(marker, 'click', (function(marker) {
//			return function() {
//				infoWindow.open(this._Map, marker);
//			}
//		})(marker));
//
//		// Center the map to fit all markers on the screen
//		// this._Map.fitBounds(bounds);
//	},

	addMarkerAdditional : function() {
		
		if(document.getElementById("inputAdditional").value != "" ){
			eval('var obj=' + document.getElementById('inputAdditional').value);
			var markers=[];
	
			for (var i = 0; i < obj.length; i++) {
				var res = obj[i].wkt;
				var lgnLat;
				lgnLat = res.substring((+res.indexOf("(") + 1), +res.indexOf(")")).split(" ");
	
				var latitude;
				var longitude;
				
				var coord = lgnLat.toString().split(",");
				
				latitude = coord[1];
				longitude =	coord[0];
	
				var coordinates = new google.maps.LatLng(latitude, longitude);

				var infowindow = new google.maps.InfoWindow({
		          content: obj[i].name
	 		    });

				var marker = new google.maps.Marker({
				   position : coordinates,
				   map : this._Map,
				   title: obj[i].name,
				   icon: '/resources/images/map/pin_green.png'
				});
				
			}
		}
	},
	
	
	addMarker : function(obj, config) {

		var iconWidth = config.icon != 20 ? 40 : 16;
		var iconHeigth = config.icon != 20 ? 40 : 16;
		iconWidth += obj.index ? 19 : 0;
		iconHeigth += obj.index ? 7 : 0;

		if (typeof obj.deviceId === "undefined") {
			return;
		}

		config.shift = 0;
		var balloon = this.getBalloon(obj, config);

		var layerId = new Number(obj.deviceId + "" + obj.gpsTime);

		var marker = new google.maps.Marker({
			position : {
				lat : obj.latitude,
				lng : obj.longitude
			},
			id: Number(layerId),
			icon : balloon.icon,
			map : this._Map
		});
		
		listMarkers.push(marker);
		var infoWindow = new google.maps.InfoWindow({
			content : balloon.html
		});
		// Add info window to marker
		google.maps.event.addListener(marker, 'click', (function(marker) {
			return function() {
				infoWindow.open(this._Map, marker);
			}
		})(marker));
			
			markers = [];
		
			for (var i = 0; i < listMarkers.length; ++i) {
				var latLng = new google.maps.LatLng(listMarkers[i].getPosition().lat(), listMarkers[i].getPosition().lng())
				
				var marker = new google.maps.Marker({
					position: latLng,
					draggable: false,
					visible: false
				});
				markers.push(marker);
          }
			
			if(markerCluster){
				markerCluster.clearMarkers();
			}
			
	        markerCluster = new MarkerClusterer(this._Map, markers, {
	        	maxZoom: 11,
				gridSize: 50,
	        	imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
            // Center the map to fit all markers on the screen
		// this._Map.fitBounds(bounds);
	},

	infoWindow : function(contentString, title) {

		var pos = {
			lat : -25.363,
			lng : -49.044
		};
		var infowindow = new google.maps.InfoWindow({
			content : contentString
		});

		var marker = new google.maps.Marker({
			position : pos,
			map : this._Map,
			title : title
		});
		marker.addListener('click', function() {
			infowindow.open(this._Map, marker);
		});
	},
	// removeMarker : function(obj) {
	// if (typeof obj.deviceId === "undefined") {
	// return;
	// }
	//
	// this.clearMarkers();
	// listMarkers = [];
	// },
	// Removes the markers from the map, but keeps them in the array.
	clearMarkers : function() {
		this.setMapOnAll(null);
	},

	addControlPointMultiple : function(type, change) {

		if(document.getElementById("inputValue").value === "" || document.getElementById('inputValue').value === undefined){
			return;
		}

		var contact = JSON.parse(document.getElementById('inputValue').value);

		eval('var obj=' + document.getElementById('inputValue').value);
		
		this._Map.setCenter(coordinates);
		this._Map.setZoom(10);
		for (var i = 0; i < obj.length; i++) {
			var res = obj[i].wkt;
			var lgnLat;
			
			lgnLat = res.substring((+res.indexOf("(") + 1), +res.indexOf(")")).split(" ");

			if(lgnLat === "" || lgnLat === undefined){
				return;
			}

			var latitude;
			var longitude;
			var radiusPoint = obj[i].radius;
			
			var coord = lgnLat.toString().split(",");
			
			latitude = coord[1];
			longitude =	coord[0];

			var coordinates = new google.maps.LatLng(latitude, longitude);

			if (type == 'POC') {

				name = "POC_"+ Math.round((new Date()).getTime());
				
				if (radiusPoint != null) {
					radiusPoint = parseInt(radiusPoint);
				}
				var circle = new google.maps.Circle({
					strokeColor : '#FF0000',
					strokeOpacity : 0.8,
					strokeWeight : 2,
					fillColor : '#FF0000',
					fillOpacity : 0.35,
					draggable : false,
					editable : false,
					map : this._Map,
					center : {
						lat : coordinates.lat(),
						lng : coordinates.lng()
					},
					radius : radiusPoint
				});

				this._Map.fitBounds(circle.getBounds());

			}
		}
		
		if(change){
			this.changeRouteMultiplePoints(obj);
		}else{
			if(obj.length > 1){
//				this.addRouteMultiplePointsMarkers(obj);
				this.addRouteMultiplePoints(obj);
			}
		}
	},
	
	addControlPointMultipleRoute : function(type, change) {

		if(document.getElementById("inputValue_route").value === "" || document.getElementById('inputValue_route').value === undefined){
			return;
		}
		
		var contact = JSON.parse(document.getElementById('inputValue_route').value);
		
		eval('var obj=' + document.getElementById('inputValue_route').value);
		
		this._Map.setCenter(coordinates);
		this._Map.setZoom(10);
		for (var i = 0; i < obj.length; i++) {
			var res = obj[i].wkt;
			var lgnLat;
			lgnLat = res.substring((+res.indexOf("(") + 1), +res.indexOf(")")).split(" ");

			var latitude;
			var longitude;
			var radiusPoint = obj[i].radius;
			
			var coord = lgnLat.toString().split(",");
			
			latitude = coord[1];
			longitude =	coord[0];

			var coordinates = new google.maps.LatLng(latitude, longitude);
			
			if (type == 'POC') {
				name = "POC_"+ Math.round((new Date()).getTime());
				
				if (radiusPoint != null) {
					radiusPoint = parseInt(radiusPoint);
				}
				var circle = new google.maps.Circle({
					strokeColor : '#FF0000',
					strokeOpacity : 0.8,
					strokeWeight : 2,
					fillColor : '#FF0000',
					fillOpacity : 0.35,
					draggable : false,
					editable : false,
					map : this._Map,
					center : {
						lat : coordinates.lat(),
						lng : coordinates.lng()
					},
					radius : radiusPoint
				});

				this._Map.fitBounds(circle.getBounds());

			}
		}
		
		if(change){
			this.changeRouteMultiplePoints(obj);
		}else{
			if(obj.length > 1){
//				this.addRouteMultiplePointsMarkers(obj);
				this.addRouteMultiplePoints(obj);
			}
		}
	},
	
	addRouteMultiplePointsMarkers : function(obj) {
       startPoint = {lat: -24.5454, lng: -49.5454};
       endPoint = {lat: -25.6655, lng: -49.6454};



//	   var flightPlanCoordinates = new Array();
//   	   for (var y = 0; y < obj.length; y++) {
//	      var resOrigin = obj[y].wkt;
//	   	  var lgnLatOrigin = resOrigin.substring((+resOrigin.indexOf("(") + 1), +resOrigin.indexOf(")")).split(" ");
//		  var coordOrigin = lgnLatOrigin.toString().split(",");
//			
// 		  var latitudeOrigin = coordOrigin[1];
//		  var longitudeOrigin = coordOrigin[0];
//		
//		   var point =new google.maps.LatLng(latitudeOrigin,longitudeOrigin);
// 		   flightPlanCoordinates.push(point);   
//	   } 
//
//		poly = new google.maps.Polyline({
//			path: flightPlanCoordinates,
//		    strokeColor: "#FF0000",
//		    strokeOpacity: 1.0,
//		    strokeWeight: 3,
//		  });
//		  poly.setMap(this._Map);

	},
	
	addRouteMultiplePoints : function(obj) {
		
		var latitudeOrigin;
		var longitudeOrigin;
		var latitudeDestination;
		var longitudeDestination;
		var waypoints = Array();
//		var waypoints2 = Array();

		var resOrigin = obj[0].wkt;
		var lgnLatOrigin = resOrigin.substring((+resOrigin.indexOf("(") + 1), +resOrigin.indexOf(")")).split(" ");

		var coordOrigin = lgnLatOrigin.toString().split(",");
			
		latitudeOrigin = coordOrigin[1];
		longitudeOrigin = coordOrigin[0];

		var coordinateOrigin = new google.maps.LatLng(latitudeOrigin, longitudeOrigin);
			
		
		var resDestination = obj[obj.length - 1].wkt;
		var lgnLatDestination = resDestination.substring((+resDestination.indexOf("(") + 1), +resDestination.indexOf(")")).split(" ");

		var coordDestination = lgnLatDestination.toString().split(",");
			
		latitudeDestination = coordDestination[1];
		longitudeDestination = coordDestination[0];

		var coordinateDestination = new google.maps.LatLng(latitudeDestination, longitudeDestination);
		
		var pointA = new google.maps.LatLng(coordinateOrigin.lat(),coordinateOrigin.lng());
		var pointB = new google.maps.LatLng(coordinateDestination.lat(),coordinateDestination.lng());
		
		var nameOrigin = obj[0].name;
		var nameDestination = obj[obj.length - 1].name;
		var resWaypoints;
		var coordWaypoints;
		var lgnLatWaypoints;
		var coordinateWaypoints;

		if(obj.length > 2 && obj.length < 25){
    	    for (var y = 0; y < obj.length; y++) {
        		resWaypoints= obj[y].wkt;

				lgnLatWaypoints = resWaypoints.substring((+resWaypoints.indexOf("(") + 1), +resWaypoints.indexOf(")")).split(" ");
        		coordWaypoints = lgnLatWaypoints.toString().split(",");
        		coordinateWaypoints = new google.maps.LatLng(coordWaypoints[1], coordWaypoints[0]);
                waypoints.push({
                    location: coordinateWaypoints,
                    stopover: true
                });	
    	    }
		}

		directionsService = new google.maps.DirectionsService,
				directionsDisplay = new google.maps.DirectionsRenderer({
					draggable: true,
					map : this._Map
				}), markerA = new google.maps.Marker({
					position : pointA,
					title : "Origen",
					label: {
					    text: nameOrigin,
					    color: 'red',
					    fontSize: '14px',
					    fontWeight: 'bold',
					  },					
					map : this._Map
				}), markerB = new google.maps.Marker({
					position : pointB,
					title : "Destino",
					label: {
					    text: nameDestination ,
					    color: 'red',
					    fontSize: '14px',
					    fontWeight: 'bold',
					  },
					map : this._Map
				});

		directionsService.route({
			origin : pointA,
			destination : pointB,
		    waypoints: waypoints,
            optimizeWaypoints: false,
			travelMode : google.maps.TravelMode.DRIVING
		}, function(response, status) {
			if (status == google.maps.DirectionsStatus.OK) {
				var bounds = new google.maps.LatLngBounds();
				
				directionsDisplay.setDirections(response);
				
				var totalDistance = 0;
				var distance = 0;

				var points_text = "";
			    var legs = response.routes[0].legs;
			    for (i = 0; i < legs.length; i++) {
			    	var steps = legs[i].steps;

			        for (j = 0; j < steps.length; j++) {
			          var nextSegment = steps[j].path;

			          for (k = 0; k < nextSegment.length; k++) {

						points_text += nextSegment[k].lng() + ' ' + nextSegment[k].lat() + ',';
						
			            bounds.extend(nextSegment[k]);
			          }
			        }
			    }
			     
				for (var y = 0; y < response.routes[0].legs.length; y++) { 
					if(y < (response.routes[0].legs.length - 1)){
//						if(response.routes[0].legs[y].distance.value > 0){
							distance += response.routes[0].legs[y].distance.value+ ',';
							totalDistance += response.routes[0].legs[y].distance.value;
//						}
					}else{
//						if(response.routes[0].legs[y].distance.value > 0){
							distance += response.routes[0].legs[y].distance.value;
							totalDistance += response.routes[0].legs[y].distance.value;
//						}
					}
				}
				
				if(response.routes[0].legs.length > 2){
					distance = distance.slice(0, -1);
				}
				
				document.getElementById('distancePoint').value = distance;
				document.getElementById('totalDistance').value = totalDistance;

			    var n=points_text.lastIndexOf(",");

				document.getElementById('wktPoints').value = points_text.substring(0,n); 

				if (bounds != null && bounds !== undefined) {
					var resBounds = bounds.toString();
					var resBounds1 = resBounds.replace('((','').replace('(','').replace('))','').replace(')','');
					
					var res = resBounds1.split(",");
					latitudeIni = res[0];
					longitudeIni =	res[1];
					
					latitudeEnd = res[2];
					longitudeEnd =	res[3];
					
					var strBound = '['+longitudeIni+','+latitudeIni+','+longitudeEnd+','+latitudeEnd+']';

					document.getElementById('bounds').value = strBound;
				}

				google.maps.event.addListener(directionsDisplay, 'directions_changed',         
					    function() {
					
					var result = directionsDisplay.getDirections();
					var points_text_change = "";
					var legs_change = result.routes[0].legs;

					var pointRoute = '';
					if(legs_change.length > 1){
						for(i = 0; i < legs_change.length; i++){
							if(i==0){
								pointRoute = legs_change[i].start_location.lat()+' '+legs_change[i].start_location.lng();
							}
							if(legs_change!=null && legs_change!==undefined && legs_change[i].via_waypoint.length > 0){
								if(i < legs_change.length-1){
									if(legs_change[i].via_waypoint===undefined){
										alert('Ponto Inválido');
									}
									for(j = 0; j < legs_change[i].via_waypoint.length; j++){
										pointRoute = pointRoute+'|'+legs_change[i].via_waypoint[j].location.toString().replace('(','').replace(')','').replace(',','');
									}
								}
							}
							if(i > 0 && i < legs_change.length-1){
								pointRoute = pointRoute+'|'+legs_change[i].end_location.lat()+' '+legs_change[i].end_location.lng();
							}
						}
					}else{
						pointRoute = legs_change[0].start_location.lat()+' '+legs_change[0].start_location.lng();
						if(legs_change!=null && legs_change!==undefined && legs_change[0].via_waypoint.length > 0){
							if(legs_change[0].via_waypoint.length > 0){
								for(j = 0; j < legs_change[0].via_waypoint.length; j++){
									pointRoute = pointRoute+'|'+legs_change[0].via_waypoint[j].location.toString().replace('(','').replace(')','').replace(',','');
								}
							}
						}
						pointRoute = pointRoute+'|'+legs_change[0].end_location.lat()+' '+legs_change[0].end_location.lng();
					}

					document.getElementById('waypoint').value = pointRoute;

					for (i = 0; i < legs_change.length; i++) {
					  	var steps_change = legs_change[i].steps;

					    for (j = 0; j < steps_change.length; j++) {
					       var nextSegment = steps_change[j].path;

					       for (k = 0; k < nextSegment.length; k++) {

								points_text_change += nextSegment[k].lng() + ' ' + nextSegment[k].lat() + ',';
						        bounds.extend(nextSegment[k]);
						   }
						}
					}
					
					
				    var n=points_text_change.lastIndexOf(",");

					document.getElementById('wktPoints').value = points_text_change.substring(0,n); 

				});
			} else {
				window.alert('Directions request failed due to ' + status);
			}
		});
	},
	
	changeRouteMultiplePoints : function(obj) {

		var coordOrigin;
		var resOrigin;
		var lgnLatOrigin;
		var coordinateOrigin;
		var latitudeOrigin;
		var longitudeOrigin;
		var nameOrigin;
		var latitudeDestination;
		var longitudeDestination;
		var coordDestination;
		var coordinateDestination;
		var resDestination;
		var lgnLatDestination;
		var nameDestination;
		var pointA;
		var pointB;
		var arrWayPoints = Array();
		var waypoints = Array();
		var resWaypoints;
		var coordWaypoints;
		var lgnLatWaypoints;
		var coordinateWaypoints;

		if(document.getElementById('waypoint').value){
			nameOrigin = obj[0].name;
			nameDestination = obj[obj.length - 1].name;

			arrWayPoints = document.getElementById('waypoint').value.split('|');
			coordOrigin = arrWayPoints[0].split(' ');
				
			latitudeOrigin = coordOrigin[0];
			longitudeOrigin = coordOrigin[1];
			coordinateOrigin = new google.maps.LatLng(latitudeOrigin, longitudeOrigin);
			coordDestination = arrWayPoints[arrWayPoints.length - 1].split(' ');
			latitudeDestination = coordDestination[0];
			longitudeDestination = coordDestination[1];
	
			coordinateDestination = new google.maps.LatLng(latitudeDestination, longitudeDestination);
			
			pointA = new google.maps.LatLng(coordinateOrigin.lat(),coordinateOrigin.lng());
			pointB = new google.maps.LatLng(coordinateDestination.lat(),coordinateDestination.lng());
			

			
			if(arrWayPoints.length > 1){
	    	    for (var y = 0; y < arrWayPoints.length; y++) {
					if(y > 0 && y < arrWayPoints.length-1 ){
		        		resWaypoints= arrWayPoints[y];
						coordWaypoints = resWaypoints.split(' '); 
		        		coordinateWaypoints = new google.maps.LatLng(coordWaypoints[0], coordWaypoints[1]);
		                waypoints.push({
		                    location: coordinateWaypoints,
		                    stopover: true
		                });	
					}
	    	    }
			}
		}else{
			resOrigin = obj[0].wkt;
			lgnLatOrigin = resOrigin.substring((+resOrigin.indexOf("(") + 1), +resOrigin.indexOf(")")).split(" ");
	
			coordOrigin = lgnLatOrigin.toString().split(",");
				
			latitudeOrigin = coordOrigin[1];
			longitudeOrigin = coordOrigin[0];
	
			coordinateOrigin = new google.maps.LatLng(latitudeOrigin, longitudeOrigin);
				
			
			resDestination = obj[obj.length - 1].wkt;
			lgnLatDestination = resDestination.substring((+resDestination.indexOf("(") + 1), +resDestination.indexOf(")")).split(" ");
	
			coordDestination = lgnLatDestination.toString().split(",");
				
			latitudeDestination = coordDestination[1];
			longitudeDestination = coordDestination[0];
	
			coordinateDestination = new google.maps.LatLng(latitudeDestination, longitudeDestination);
			
			pointA = new google.maps.LatLng(coordinateOrigin.lat(),coordinateOrigin.lng());
			pointB = new google.maps.LatLng(coordinateDestination.lat(),coordinateDestination.lng());
			
			nameOrigin = obj[0].name;
			nameDestination = obj[obj.length - 1].name;
			resWaypoints;
			coordWaypoints;
			lgnLatWaypoints;
			coordinateWaypoints;
			
			if(obj.length > 2){
	    	    for (var y = 0; y < obj.length; y++) {
	        		resWaypoints= obj[y].wkt;
	
					lgnLatWaypoints = resWaypoints.substring((+resWaypoints.indexOf("(") + 1), +resWaypoints.indexOf(")")).split(" ");
	        		coordWaypoints = lgnLatWaypoints.toString().split(",");
	        		coordinateWaypoints = new google.maps.LatLng(coordWaypoints[1], coordWaypoints[0]);
	                waypoints.push({
	                    location: coordinateWaypoints,
	                    stopover: true
	                });	
	    	    }
			}
		}


		directionsService = new google.maps.DirectionsService,
				directionsDisplay = new google.maps.DirectionsRenderer({
					draggable: true,
					map : this._Map
				}), markerA = new google.maps.Marker({
					position : pointA,
					title : "Origen",
					label: {
					    text: nameOrigin,
					    color: 'red',
					    fontSize: '14px',
					    fontWeight: 'bold',
					  },					
					map : this._Map
				}), markerB = new google.maps.Marker({
					position : pointB,
					title : "Destino",
					label: {
					    text: nameDestination,
					    color: 'red',
					    fontSize: '14px',
					    fontWeight: 'bold',
					  },
					map : this._Map
				});

		directionsService.route({
			origin : pointA,
			destination : pointB,
		    waypoints: waypoints,
            optimizeWaypoints: false,
			travelMode : google.maps.TravelMode.DRIVING
		}, function(response, status) {
			if (status == google.maps.DirectionsStatus.OK) {
				var bounds = new google.maps.LatLngBounds();
				
				directionsDisplay.setDirections(response);
				var distance = "";
				var totalDistance = 0;

				var points_text = "";
			    var legs = response.routes[0].legs;

			    for (i = 0; i < legs.length; i++) {
			    	var steps = legs[i].steps;

			        for (j = 0; j < steps.length; j++) {
			          var nextSegment = steps[j].path;

			          for (k = 0; k < nextSegment.length; k++) {

						points_text += nextSegment[k].lng() + ' ' + nextSegment[k].lat() + ',';
			            bounds.extend(nextSegment[k]);
			          }
			        }
			    }
			     
				for (var y = 0; y < response.routes[0].legs.length; y++) { 
					if(y < (response.routes[0].legs.length - 1)){
						if(response.routes[0].legs[y].distance.value > 0){
							distance += response.routes[0].legs[y].distance.value+ ',';
							totalDistance += response.routes[0].legs[y].distance.value;
						}
					}else{
						if(response.routes[0].legs[y].distance.value > 0){
							distance += response.routes[0].legs[y].distance.value;
							totalDistance += response.routes[0].legs[y].distance.value;
						}
					}
				}
				
				if(response.routes[0].legs.length > 2){
					distance = distance.slice(0, -1);
				}
				document.getElementById('distancePoint').value = distance;
				document.getElementById('totalDistance').value = totalDistance;
				
			    var nChange=points_text.lastIndexOf(",");

				document.getElementById('wktPoints').value = points_text.substring(0,nChange); 

				if (bounds != null && bounds !== undefined) {
					var resBounds = bounds.toString();
					var resBounds1 = resBounds.replace('((','').replace('(','').replace('))','').replace(')','');
					
					var res = resBounds1.split(",");
					latitudeIni = res[0];
					longitudeIni =	res[1];
					
					latitudeEnd = res[2];
					longitudeEnd =	res[3];
					
					var strBound = '['+longitudeIni+','+latitudeIni+','+longitudeEnd+','+latitudeEnd+']';

					document.getElementById('bounds').value = strBound;
				}

				google.maps.event.addListener(directionsDisplay, 'directions_changed',         
					    function() {
					
					var result = directionsDisplay.getDirections();
					var points_text_change = "";
					var legs_change = result.routes[0].legs;

					var pointRoute = '';
					
					var points_text_teste= "";

					var firstLatLng = true;
					
					for (i = 0; i < legs_change.length; i++) {
					  	var steps_change = legs_change[i].steps;

					    for (j = 0; j < steps_change.length; j++) {
					       var nextSegment = steps_change[j].path;

					       for (k = 0; k < nextSegment.length; k++) {
								if(firstLatLng){
									firstLatLng = false;
									points_text_change += nextSegment[k].lng() + ' ' + nextSegment[k].lat();
								}else{
									points_text_change +=  ','+nextSegment[k].lng() + ' ' + nextSegment[k].lat();
								}

						        bounds.extend(nextSegment[k]);
						   }
						}
					}

					if(legs_change.length > 1){
						for(x = 0; x < legs_change.length; x++){
							if(x==0){
								pointRoute = legs_change[x].start_location.lat()+' '+legs_change[x].start_location.lng();
							}else{
								pointRoute = pointRoute+'|'+legs_change[x].start_location.lat()+' '+legs_change[x].start_location.lng();
								if(legs_change!=null && legs_change!==undefined && legs_change[x].via_waypoint.length > 0){
									for(j = 0; j < legs_change[x].via_waypoint.length; j++){
										pointRoute = pointRoute+'|'+legs_change[x].via_waypoint[j].location.toString().replace('(','').replace(')','').replace(',','');
									}
								}
							}	
							if(x == legs_change.length-1){
								pointRoute = pointRoute+'|'+legs_change[x].end_location.lat()+' '+legs_change[x].end_location.lng();
							}
						}
					}else{
						pointRoute = legs_change[0].start_location.lat()+' '+legs_change[0].start_location.lng();
						if(legs_change!=null && legs_change!==undefined && legs_change[0].via_waypoint.length > 0){
							if(legs_change[0].via_waypoint.length > 0){
								for(j = 0; j < legs_change[0].via_waypoint.length; j++){
									pointRoute = pointRoute+'|'+legs_change[0].via_waypoint[j].location.toString().replace('(','').replace(')','').replace(',','');
								}
							}
						}else{
							alert('Ponto Inválido');
						}
						pointRoute = pointRoute+'|'+legs_change[0].end_location.lat()+' '+legs_change[0].end_location.lng();
					}
					
					document.getElementById('waypoint').value = pointRoute;

					document.getElementById('wktPoints').value = points_text_change;
				});
			} else {
				window.alert('Directions request failed due to ' + status);
			}
		});
	},
	
	addControlPointJourney : function(type, origin) {
		
		var latitude;
		var longitude;
		var radiusPoint = 200;

		if(origin == true){
			if (document.getElementById('coordinateOrigin').value != null && document.getElementById('coordinateOrigin').value !== undefined) {
				var res = document.getElementById('coordinateOrigin').value.split(",");
				radiusPoint = document.getElementById('radiusOrigin').value;
				latitude = res[0];
				longitude =	res[1];
			}
		}else if(origin == false){
			if (document.getElementById('coordinateDestination').value != null && document.getElementById('coordinateDestination').value !== undefined) {
				var res = document.getElementById('coordinateDestination').value.split(",");
				radiusPoint = document.getElementById('radiusDestination').value;
				latitude = res[0];
				longitude =	res[1];
			}
		}

		var coordinates = new google.maps.LatLng(latitude, longitude);
		this._Map.setCenter(coordinates);
		this._Map.setZoom(10);
		
		document.getElementById("wkt").innerHTML = 'POINT' +coordinates;
		
		if (type == 'POC') {
			name = "POC_"+ Math.round((new Date()).getTime());
			
			if (radiusPoint != null) {
				radiusPoint = parseInt(radiusPoint);
			}
			var circle = new google.maps.Circle({
				strokeColor : '#FF0000',
				strokeOpacity : 0.8,
				strokeWeight : 2,
				fillColor : '#FF0000',
				fillOpacity : 0.35,
				draggable : true,
				editable : true,
				map : this._Map,
				center : {
					lat : coordinates.lat(),
					lng : coordinates.lng()
				},
				radius : radiusPoint
			});

			this._Map.fitBounds(circle.getBounds());

			if (coordinates != null) {
				document.getElementById('wkt').value = 'POINT('
						+ circle.getCenter().lng()
						+ ' '
						+ circle.getCenter().lat()
						+ ')';

				var radius = circle.getRadius() * 1600;
				if(origin == true){
					document.getElementById('radiusOrigin').value = (radius / 1000.0).toFixed(0);
				}else{
					document.getElementById('radiusDestination').value = (radius / 1000.0).toFixed(0);
				}
			}

			google.maps.event.addListener(circle,'dragend',function() {
				document.getElementById('wkt').value = 'POINT('+ circle.getCenter().lng()+ ' '+ circle.getCenter().lat()+ ')';
				document.getElementById('coordinate').value = circle.getCenter().lng()+ ','+ circle.getCenter().lat();

				var radius = circle.getRadius() * 1600;
				document.getElementById('radius').value = (radius / 1000.0).toFixed(0);
				if(origin == true){
					document.getElementById('radiusOrigin').value = (radius / 1000.0).toFixed(0);
				}else{
					document.getElementById('radiusDestination').value = (radius / 1000.0).toFixed(0);
				}
				
				jQuery('#cmdGeo').click();
			});
		}
	},

	// Ponto de controle
	addControlPoint : function(value, radius, name) {
		
		var wkt = this.getWkt(value);

		radius = this.getWkt(radius);
		if (radius != null) {
			radius = parseInt(radius);
		}

		var indexStart = wkt.indexOf("(") + 1;
		var indexEnd = wkt.indexOf(")");
		var longLat = wkt.substring(indexStart, indexEnd);
		
		longLat = longLat.split(" ");

		if (typeof name === 'undefined')
			name = "POC_" + Math.round((new Date()).getTime());

		var longitude;
		var latitude;
		if (longLat != null) {
			
			longitude = parseFloat(longLat[0]);
			latitude = parseFloat(longLat[1]);
		}

		// //******************* Setar as informações corretas

		var coordinates = new google.maps.LatLng(latitude, longitude);
		
		circle = new google.maps.Circle({
			strokeColor : '#FF0000',
			strokeOpacity : 0.8,
			strokeWeight : 2,
			fillColor : '#FF0000',
			fillOpacity : 0.35,
			draggable : true,
			editable : true,
			map : this._Map,
			center : {
				lat : coordinates.lat(),
				lng : coordinates.lng()
			},
			radius : radius
		});
		this._Map.fitBounds(circle.getBounds());

		circlePoc = circle;

		google.maps.event.addListener(circle, 'center_changed', function() {
			document.getElementById(value).value = 'POINT('
					+ circle.getCenter().lng() + ' ' + circle.getCenter().lat()
					+ ')';

			var radius_dragend = circle.getRadius();
			
			document.getElementById('radius').value = (radius_dragend).toFixed(0);
			
		});
		
		google.maps.event.addListener(circle, 'radius_changed', function() {
			var radius_change = circle.getRadius();
			document.getElementById('radius').value = (radius_change).toFixed(0);
			
	     });
	},

	drawControlPoint : function() {
		var geocoder;
		var drawingManager = new google.maps.drawing.DrawingManager({
			drawingMode : google.maps.drawing.OverlayType.MARKER,
			drawingControl : true,
			drawingControlOptions : {
				position : google.maps.ControlPosition.TOP_CENTER,
				drawingModes : [ 'circle' ]
			},
			circleOptions : {
				fillColor : '#ffff00',
				fillOpacity : 1,
				strokeWeight : 5,
				clickable : false,
				editable : true,
				zIndex : 1
			}
		});
		drawingManager.setMap(this._Map);
		drawingManager.addListener('overlaycomplete',
				this.overlayCompleteListener);
	},
	nextOverlayType : function() {
		var next = overlayTypes.shift();
		overlayTypes.push(next);
		return next;
	},
	overlayCompleteListener : function(event) {
		// drawingManager.setDrawingMode(null);
		currentOverlay = event.overlay;
		currentOverlay.addListener('click', this.overlayClickListener);
		currentOverlay.addListener('radius_changed', this.showData);
		currentOverlay.addListener('center_changed', this.showData);

		document.getElementById('radius').value = (currentOverlay.getRadius() / 1000.0)
				.toFixed(0);
		document.getElementById('wkt').value = 'POINT('
				+ currentOverlay.getCenter().lng() + ' '
				+ currentOverlay.getCenter().lat() + ')';

	},

	// remove the overlay
	overlayClickListener : function(event) {
		event.stop();
		if (typeof event.path === 'undefined') { // ignore clicks on polygon
			// paths
			drawingManager.setDrawingMode(nextOverlayType());
			currentOverlay.setMap(null);
			google.maps.event.clearInstanceListeners(currentOverlay);
			currentOverlay = null;
		}
	},

	drawPolygon : function(id) {
		if (document.getElementById(id).value != ""
				&& document.getElementById(id).value != null) {
			this.drawClear();
			this.addPolygon(id);
			return false;
		}
		var geocoder;
		var drawingManager = new google.maps.drawing.DrawingManager({
			drawingMode : google.maps.drawing.OverlayType.MARKER,
			drawingControl : true,
			drawingControlOptions : {
				position : google.maps.ControlPosition.TOP_CENTER,
				drawingModes : [ 'polygon' ]
			}
		});
		drawingManager.setMap(this._Map);

		var shapeID = 1;
		google.maps.event.addListener(drawingManager, 'polygoncomplete',
				function(polygon) {
			
					drawingManager.setDrawingMode(null);
					polygon.setOptions({
						id : shapeID,
						editable : true,
						draggable : true
					});

					var wkt = 'POLYGON((';
					var wktInit = ',';
					for (var i = 0; i < polygon.getPath().getLength(); i++) {
						if (i + 1 < (polygon.getPath().getLength())) {
							wkt += polygon.getPath().getAt(i).lng() + ' '
									+ polygon.getPath().getAt(i).lat() + ',';
							
						} else {
							wkt += polygon.getPath().getAt(i).lng() + ' '
									+ polygon.getPath().getAt(i).lat()+ ',';

							wkt += polygon.getPath().getAt(0).lng() + ' '
							+ polygon.getPath().getAt(0).lat() + '))';
						}
					}

					document.getElementById(id).value = wkt;
						
					google.maps.event.addListener(polygon, 'dragend',
							function() {
								document.getElementById(id).value = this
										.getPath().getArray().toString();
							});
					google.maps.event.addListener(polygon.getPath(),
							"insert_at", getPath);
					google.maps.event.addListener(polygon.getPath(),
							"remove_at", getPath);
					google.maps.event.addListener(polygon.getPath(), "set_at",
							getPath);

					function getPath() {
						var path = polygon.getPath();
						var len = path.getLength();
						var coordStr = 'id: ' + polygon.id + '\n';

						var wkt_resize = 'POLYGON((';
						var wktInit_resize = '';
						
						for (var i = 0; i < path.getLength(); i++) {
							if (i + 1 < (path.getLength())) {
								wkt_resize += path.getAt(i).lng() + ' '
										+ path.getAt(i).lat() + ',';

							} else {
								wkt_resize += path.getAt(i).lng() + ' '
										+ path.getAt(i).lat()+ ',';
								
								wkt += polygon.getPath().getAt(0).lng() + ' '
								+ polygon.getPath().getAt(0).lat() + '))';
							}
						}
						document.getElementById(id).value = wkt_resize;
					}
					shapeID++;
				});
	},

	addPolygon : function(value, name) {
		var wkt = this.getWkt(value);
		var coords = wkt.replace(/\ /g, ",").replace(/,+/g, ",");

		var indexStart = coords.indexOf("(") + 1;
		var indexEnd = coords.indexOf(")");
		var type = $.trim(coords.substring(0, indexStart)).replace(/\(|\)|,/g,
				"");

		coords = coords.substring(indexStart, indexEnd).replace(/\(|\)/g, "");

		var pointsAux = [];
		var latLng = coords.split(",");

		for (var i = 0; i < latLng.length; i++) {
			if (i == 0) {
				pointsAux[i] = {
					lng : "" + latLng[i] + "",
					lat : "" + latLng[++i] + ""
				};
			} else {
				pointsAux[i] = {
					lng : "" + latLng[i] + "",
					lat : "" + latLng[++i] + ""
				};
			}
		}

		var points = [];
		points = this.cleanArray(pointsAux);

		var polyPoints = [];

		var bound = new google.maps.LatLngBounds();

		for (var i = 0; i < points.length; ++i) {
			polyPoints
					.push(new google.maps.LatLng(points[i].lat, points[i].lng));
		}
		// Construct the polygon.
		polygon = new google.maps.Polygon({
			paths : polyPoints,
			strokeColor : '#FF0000',
			strokeOpacity : 0.8,
			strokeWeight : 2,
			fillColor : '#FF0000',
			fillOpacity : 0.35,
			geodesic : true,
			draggable : true,
			editable : true
		});

		polygon.setMap(this._Map);
		var bounds = new google.maps.LatLngBounds();
		for (var i = 0; i < polygon.getPath().length; i++) {
			var point = new google.maps.LatLng(polyPoints[i].lat(),
					polyPoints[i].lng());
			bounds.extend(point);
		}

		this._Map.fitBounds(bounds);
		// Add a listener for the click event.
		polygon.addListener('click', this.showArrays);
		google.maps.event.addListener(polygon.getPath(), "insert_at", getPath);
		google.maps.event.addListener(polygon.getPath(), "set_at", getPath);

		function getPath() {
			var wkt = 'POLYGON((';
			var path = polygon.getPath();
			var len = path.getLength();
			for (var i = 0; i < len; i++) {
				if (i + 1 < (path.getLength())) {
					wkt += path.getAt(i).lng() + ' ' + path.getAt(i).lat()
							+ ',';
				} else {
					wkt += path.getAt(i).lng() + ' ' + path.getAt(i).lat()
							+ '))';
				}

			}
			document.getElementById(value).value = wkt;
		}

	},

	/** @this {google.maps.Polygon} */
	// function showArrays(event) {
	showArrays : function(event) {
		// Since this polygon has only one path, we can call getPath() to return
		// the
		// MVCArray of LatLngs.
		var vertices = polygon.getPath();

		var contentString = '<b>Bermuda Triangle polygon</b><br>'
				+ 'Clicked location: <br>' + event.latLng.lat() + ','
				+ event.latLng.lng() + '<br>';

		// Iterate over the vertices.
		for (var i = 0; i < vertices.getLength(); i++) {
			var xy = vertices.getAt(i);
			contentString += '<br>' + 'Coordinate ' + i + ':<br>' + xy.lat()
					+ ',' + xy.lng();
		}
	},

	addInterestPoint : function() {
		var drawingManager = new google.maps.drawing.DrawingManager(
				{
					drawingMode : google.maps.drawing.OverlayType.MARKER,
					drawingControl : false,
					drawingControlOptions : {
						position : google.maps.ControlPosition.TOP_CENTER,
						drawingModes : [ 'marker', 'circle', 'polygon',
								'polyline', 'rectangle' ]
					},
					markerOptions : {
						icon : 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'
					},
					circleOptions : {
						fillColor : '#ffff00',
						fillOpacity : 1,
						strokeWeight : 5,
						clickable : false,
						draggable : true,
						editable : true,
						zIndex : 1
					}
				});
		drawingManager.setMap(this._Map);
		return this._Map
	},
	
	mousePositionRightclick : function() {
		google.maps.event.addListener(this._Map, 'rightclick', function(event) {
			displayCoordinatesEventClick(event.latLng);
			var lat;
			var lng;
			function displayCoordinatesEventClick(pnt) {
				lat = pnt.lat();
				lat = lat.toFixed(4);
				lng = pnt.lng();
				lng = lng.toFixed(4);				
				document.getElementById('main_map_form:mousePositionWkt').value = pnt;
			}
		});
	},
	
	mousePosition : function() {
		google.maps.event.addListener(this._Map, 'mousemove', function(event) {
			displayCoordinatesEvent(event.latLng);
			var lat;
			var lng;
			function displayCoordinatesEvent(pnt) {
				var coordsLabel = document.getElementById("tdCursor");
				lat = pnt.lat();
				lat = lat.toFixed(4);
				lng = pnt.lng();
				lng = lng.toFixed(4);
				document.getElementById('main_map_form:mousePositionWkt').value = pnt;
				
			}
		});
	},
	displayCoordinates : function(pnt) {
		var coordsLabel = document.getElementById("tdCursor");
		var lat = pnt.lat();
		lat = lat.toFixed(4);
		var lng = pnt.lng();
		lng = lng.toFixed(4);
		coordsLabel.innerHTML = "Latitude: " + lat + "  Longitude: " + lng;
	},

	addRoute : function() {
		var latitudeOrigin;
		var longitudeOrigin;
		var latitudeDestination;
		var longitudeDestination;
		var coordinatesOrigin;
		var coordinatesDestination;
		
		if (document.getElementById('coordinateOrigin').value != null && document.getElementById('coordinateOrigin').value !== undefined) {
			var res = document.getElementById('coordinateOrigin').value.split(",");
			latitudeOrigin = res[0];
			longitudeOrigin =	res[1];
			coordinatesOrigin = new google.maps.LatLng(latitudeOrigin, longitudeOrigin);
		}
		if (document.getElementById('coordinateDestination').value != null && document.getElementById('coordinateDestination').value !== undefined) {
				var res = document.getElementById('coordinateDestination').value.split(",");
				latitudeDestination = res[0];
				longitudeDestination =	res[1];
				coordinatesDestination = new google.maps.LatLng(latitudeDestination, longitudeDestination);
		}

		var pointA = new google.maps.LatLng(coordinatesOrigin.lat(),coordinatesOrigin.lng());
		var pointB = new google.maps.LatLng(coordinatesDestination.lat(),coordinatesDestination.lng());
		
		directionsService = new google.maps.DirectionsService,
				directionsDisplay = new google.maps.DirectionsRenderer({
					draggable: true,
					map : this._Map
				}), markerA = new google.maps.Marker({
					position : pointA,
					title : "Origen",
					label: {
					    text: document.getElementById('pocNameOrigin').value,
					    color: 'black',
					    fontSize: '14px',
					    fontWeight: 'bold',
					  },					
					map : this._Map
				}), markerB = new google.maps.Marker({
					position : pointB,
					title : "Destino",
					label: {
					    text: document.getElementById('pocNameDestination').value,
					    color: 'black',
					    fontSize: '14px',
					    fontWeight: 'bold',
					  },
					map : this._Map
				});

		directionsService.route({
			origin : pointA,
			destination : pointB,
			travelMode : google.maps.TravelMode.DRIVING
		}, function(response, status) {
			if (status == google.maps.DirectionsStatus.OK) {
				directionsDisplay.setDirections(response);
				pointsArray = response.routes[0].overview_path;
				var nPoints = response.routes[0].overview_path.length;
				var points_text = "";
				for (var i = 0; i < nPoints; i++) { 
					if(i < (nPoints-1)){
						points_text += response.routes[0].overview_path[i].lng() + ' ' + response.routes[0].overview_path[i].lat() + ',';
					}else{
						points_text += response.routes[0].overview_path[i].lng() + ' ' + response.routes[0].overview_path[i].lat();
					}
				}

				document.getElementById('wktPoints').value = points_text;
				
				google.maps.event.addListener(directionsDisplay, 'directions_changed',         
					    function() {
							var result = directionsDisplay.getDirections();
							resultPointsArray = result.routes[0].overview_path;
							var nResultPoints = result.routes[0].overview_path.length;
							var result_points_text = "";
							for (var i = 0; i < nResultPoints; i++) { 
								if(i < (nResultPoints-1)){
									result_points_text += result.routes[0].overview_path[i].lng() + ' ' + result.routes[0].overview_path[i].lat() + ',';
								}else{
									result_points_text += result.routes[0].overview_path[i].lng() + ' ' + result.routes[0].overview_path[i].lat();
								}
							}
							document.getElementById('wktPoints').value = result_points_text;
					    }
					);
			} else {
				window.alert('Directions request failed due to ' + status);
			}
		});
	},

	renderResponse : function(result) {
	    var renderer = new google.maps.DirectionsRenderer({
	        zoom: 4,
	        draggable: true,
	        map: map,
	        directions: result
	    });
	    printRouteInfo(result);

	    renderer.addListener('directions_changed', function (e) {
	        console.log('rendererGetDirections:'+renderer.getDirections());
	    });
	},
	
	drawRoute : function() {
		var pointA = new google.maps.LatLng(-25.7519, -49.2578);
		var pointB = new google.maps.LatLng(-25.8429, -49.3313);

		directionsService = new google.maps.DirectionsService,
				directionsDisplay = new google.maps.DirectionsRenderer({
					map : this._Map
				}), markerA = new google.maps.Marker({
					position : pointA,
					title : "point A",
					label : "A",
					map : this._Map
				}), markerB = new google.maps.Marker({
					position : pointB,
					title : "point B",
					label : "B",
					map : this._Map
				});

		directionsService.route({
			origin : pointA,
			destination : pointB,
			travelMode : google.maps.TravelMode.DRIVING
		}, function(response, status) {
			if (status == google.maps.DirectionsStatus.OK) {
				directionsDisplay.setDirections(response);
			} else {
				window.alert('Directions request failed due to ' + status);
			}
		});
	},

	drawPoint : function(id) {
		
		var drawingManager = new google.maps.drawing.DrawingManager({
			drawingMode : google.maps.drawing.OverlayType.MARKER,
			drawingControl : true,
			drawingControlOptions : {
				position : google.maps.ControlPosition.TOP_CENTER,
				drawingModes : [ 'marker' ]
			},
			markerOptions : {
				geodesic : true,
				draggable : true,
				editable : true
			}
		});
		drawingManager.setMap(this._Map);
		google.maps.event.addListener(drawingManager, 'markercomplete',
				function(marker) {
					var position = marker.getPosition().toUrlValue(2);
					if (position != null && position !== undefined) {
						var res = position.split(",");
						document.getElementById(id).value = 'POINT(' + res[1]
								+ ' ' + res[0] + ')';
					}
				});
	},

	addPoint : function(value, name) {
		
		var wkt = this.getWkt(value);
		var indexStart = wkt.indexOf("(") + 1;
		var indexEnd = wkt.indexOf(")");
		var longLat = wkt.substring(indexStart, indexEnd);
		longLat = longLat.split(" ");

		if (typeof name === 'undefined')
			name = "POINT_" + Math.round((new Date()).getTime());

		var latLng;
		if (longLat != null && longLat !== undefined) {
			latLng = new google.maps.LatLng(parseFloat(longLat[1]),
					parseFloat(longLat[0]))
		}

		this._Map.setZoom(14);
		this._Map.setCenter(latLng);
		var marker = new google.maps.Marker({
			position : latLng,
			map : this._Map,
			title : name
		});

	},

	drawLine : function(id) {
		if (document.getElementById(id).value != ""
				&& document.getElementById(id).value != null) {

			this.drawClear();
			this.addLine(id);
			return false;
		}

		if (typeof name === 'undefined')
			name = "LINE_" + Math.round((new Date()).getTime());

		var lineSymbol = {
				path : google.maps.SymbolPath.FORWARD_CLOSED_ARROW
			};

		var drawingManager = new google.maps.drawing.DrawingManager({

			drawingMode : google.maps.drawing.OverlayType.MARKER,
			drawingControl : true,
			drawingControlOptions : {
				position : google.maps.ControlPosition.TOP_CENTER,
				drawingModes : [ 'polyline' ]
			},

			polylineOptions : {
				strokeColor : '#0000FF',
				strokeOpacity : 0.5,
				strokeWeight : 5,
				clickable : false,
				draggable : true,
				editable : true,
				zIndex : 1,
				icons : [ {
					icon : lineSymbol,
					offset : '100%'
				} ]
			}

		});
		drawingManager.setMap(this._Map);
		google.maps.event
				.addListener(
						drawingManager,
						'polylinecomplete',
						function(polyline) {
							var wkt = 'LINESTRING(';
							for (var i = 0; i < polyline.getPath().getLength(); i++) {
								if (i + 1 < (polyline.getPath().getLength())) {
									wkt += polyline.getPath().getAt(i).lng()
											+ ' '
											+ polyline.getPath().getAt(i).lat()
											+ ',';
								} else {
									wkt += polyline.getPath().getAt(i).lng()
											+ ' '
											+ polyline.getPath().getAt(i).lat()
											+ ')';
								}
							}
							document.getElementById(id).value = wkt;

							google.maps.event.addListener(polyline.getPath(),
									"insert_at", getPath);
							google.maps.event.addListener(polyline.getPath(),
									"remove_at", getPath);
							google.maps.event.addListener(polyline.getPath(),
									"set_at", getPath);

							function getPath() {
								var path = polyline.getPath();
								var len = path.getLength();
								var wktResize = 'LINESTRING(';
								for (var i = 0; i < polyline.getPath()
										.getLength(); i++) {
									if (i + 1 < (polyline.getPath().getLength())) {
										wktResize += polyline.getPath()
												.getAt(i).lng()
												+ ' '
												+ polyline.getPath().getAt(i)
														.lat() + ',';
									} else {
										wktResize += polyline.getPath()
												.getAt(i).lng()
												+ ' '
												+ polyline.getPath().getAt(i)
														.lat() + ')';
									}
								}
								document.getElementById(id).value = wktResize;
							}
						});

	},

	addLine : function(value, name) {

		var wkt = this.getWkt(value);
		
		var coords = wkt.replace(/\ /g, ",").replace(/,+/g, ",");

		var indexStart = coords.indexOf("(") + 1;
		var indexEnd = coords.indexOf(")");
		var type = $.trim(coords.substring(0, indexStart)).replace(/\(|\)|,/g,
				"");

		coords = coords.substring(indexStart, indexEnd).replace(/\(|\)/g, "");

		var pointsAux = [];
		var latLng = coords.split(",");

		for (var i = 0; i < latLng.length; i++) {
			if (i == 0) {
				pointsAux[i] = {
					lng : "" + latLng[i] + "",
					lat : "" + latLng[++i] + ""
				};
			} else {
				pointsAux[i] = {
					lng : "" + latLng[i] + "",
					lat : "" + latLng[++i] + ""
				};
			}
		}

		var points = [];
		points = this.cleanArray(pointsAux);

		var polyPoints = [];

		for (var i = 0; i < points.length; ++i) {
			polyPoints
					.push(new google.maps.LatLng(points[i].lat, points[i].lng));
		}

		var lineSymbol = {
			path : google.maps.SymbolPath.FORWARD_CLOSED_ARROW
		};

		// Construct the polyline.
		polyline = new google.maps.Polyline({
			path : polyPoints,
			strokeColor : '#0000FF',
			strokeOpacity : 0.8,
			strokeWeight : 3.5,
			fillColor : '#FF0000',
			fillOpacity : 0.35,
			geodesic : false,
			draggable : false,
			editable : false,
			icons : [ {
				icon : lineSymbol,
				scale : 6,
				offset : '100%'
			} ]
		});

		polyline.setMap(this._Map);
		var bounds = new google.maps.LatLngBounds();
		for (var i = 0; i < polyline.getPath().length; i++) {
			var point = new google.maps.LatLng(polyPoints[i].lat(),
					polyPoints[i].lng());
			bounds.extend(point);
		}

		this._Map.fitBounds(bounds);
		// Add a listener for the click event.
		google.maps.event.addListener(polyline.getPath(), "insert_at", getPath);
		google.maps.event.addListener(polyline.getPath(), "set_at", getPath);

		function getPath() {
			var wkt = 'LINESTRING(';
			var path = polyline.getPath();
			var len = path.getLength();
			for (var i = 0; i < len; i++) {
				if (i + 1 < (path.getLength())) {
					wkt += path.getAt(i).lng() + ' ' + path.getAt(i).lat()
							+ ',';
				} else {
					wkt += path.getAt(i).lng() + ' ' + path.getAt(i).lat()
							+ ')';
				}
			}
			document.getElementById(value).value = wkt;
		}

	},

	drawDeactivate : function() {

		// var controls = this._Map
		// .getControlsByClass("OpenLayers.Control.DrawFeature");
		// controls = controls.concat(this._Map
		// .getControlsByClass("OpenLayers.Control.ModifyFeature"));
		// for ( var i in controls) {
		// controls[i].deactivate();
		// this._Map.removeControl(controls[i]);
		// }
	},

	addLineReport : function(value, name) {
		console.log('Value: ' + value);
		console.log('Name: ' + name);

	},

	geocodeRequest : function(type) {
		var geocoder = new google.maps.Geocoder();
		this.geocodeAddress(geocoder, this._Map, type);
	},

	geocodeAddress : function(geocoder, mapResult, type) {
		var address = document.getElementById('address').value;

		geocoder
				.geocode(
						{
							'address' : address
						},
						function(results, status) {
							if (status === 'OK') {
								mapResult
										.setCenter(results[0].geometry.location);
								mapResult.setZoom(14);

								document.getElementById("wkt").innerHTML = 'POINT'
										+ results[0].geometry.location;

								var longitude;
								var latitude;
								if (results[0].geometry.location != null) {
									longitude = parseFloat(results[0].geometry.location
											.lng());
									latitude = parseFloat(results[0].geometry.location
											.lat());
								}

								if (type == 'POC') {
									document.getElementById("radius").innerHTML = 200;
									name = "POC_"
											+ Math
													.round((new Date())
															.getTime());
									// //******************* Setar as
									// informações corretas
									var circle = new google.maps.Circle({
										strokeColor : '#FF0000',
										strokeOpacity : 0.8,
										strokeWeight : 2,
										fillColor : '#FF0000',
										fillOpacity : 0.35,
										draggable : true,
										editable : true,
										map : mapResult,
										center : {
											lat : latitude,
											lng : longitude
										},
										radius : 200
									});

									mapResult.fitBounds(circle.getBounds());

									if (results[0].geometry.location != null) {
										document.getElementById('wkt').value = 'POINT('
												+ circle.getCenter().lng()
												+ ' '
												+ circle.getCenter().lat()
												+ ')';

										var radius = circle.getRadius() * 1600;
										document.getElementById('radius').value = (radius / 1000.0)
												.toFixed(0);
									}

									google.maps.event
											.addListener(
													circle,
													'dragend',
													function() {
														document
																.getElementById(value).value = 'POINT('
																+ circle
																		.getCenter()
																		.lng()
																+ ' '
																+ circle
																		.getCenter()
																		.lat()
																+ ')';

														var radius = circle
																.getRadius() * 1600;
														document
																.getElementById(radius).value = (radius / 1000.0)
																.toFixed(0);

													});
								} else {
									name = "POI_"
											+ Math
													.round((new Date())
															.getTime());
									if (results[0].geometry.location != null
											&& results[0].geometry.location !== undefined) {
										document.getElementById('wkt').value = 'POINT('
												+ results[0].geometry.location
														.lng()
												+ ' '
												+ results[0].geometry.location
														.lat() + ')';
									}

									var latLng;
									if (results[0].geometry.location != null
											&& results[0].geometry.location !== undefined) {
										latLng = new google.maps.LatLng(
												parseFloat(results[0].geometry.location
														.lat()),
												parseFloat(results[0].geometry.location
														.lng()))
									}

									mapResult.setZoom(14);
									mapResult.setCenter(latLng);
									var marker = new google.maps.Marker(
											{
												position : results[0].geometry.location,
												map : mapResult,
												title : name
											});
								}
							} else {
								alert('Geocode was not successful for the following reason: '
										+ status);
							}
						});
	},

	getRequestAddress : function(type) {
		this.getAddress(this._Map, type);
	},

	getAddress : function(mapResult, type) {
		
		var latitude;
		var longitude;
		
		if (document.getElementById('coordinate').value != null && document.getElementById('coordinate').value !== undefined) {
			var res = document.getElementById('coordinate').value.split(",");
			latitude = res[1];
			longitude =	res[0];
		}

		var coordinates = new google.maps.LatLng(latitude, longitude);

		mapResult.setCenter(coordinates);
		
		mapResult.setZoom(14);
		
		document.getElementById("wkt").innerHTML = 'POINT' +coordinates;
		
		if (type == 'POC') {
			document.getElementById("radius").innerHTML = 1000;
			name = "POC_"+ Math.round((new Date()).getTime());
			
			var circle = new google.maps.Circle({
				strokeColor : '#FF0000',
				strokeOpacity : 0.8,
				strokeWeight : 2,
				fillColor : '#FF0000',
				fillOpacity : 0.35,
				draggable : true,
				editable : true,
				map : mapResult,
				center : {
					lat : coordinates.lat(),
					lng : coordinates.lng()
				},
				radius : 1000
			});

			mapResult.fitBounds(circle.getBounds());

			if (coordinates != null) {
				document.getElementById('wkt').value = 'POINT('
						+ circle.getCenter().lng()
						+ ' '
						+ circle.getCenter().lat()
						+ ')';

				var radius = circle.getRadius() * 1600;
				
				document.getElementById('radius').value = (radius / 1000.0).toFixed(0);
			}

			google.maps.event.addListener(circle,'dragend',function() {
				document.getElementById('wkt').value = 'POINT('+ circle.getCenter().lng()+ ' '+ circle.getCenter().lat()+ ')';
				document.getElementById('coordinate').value = circle.getCenter().lng()+ ','+ circle.getCenter().lat();

				var radius = circle.getRadius() * 1600;
				document.getElementById('radius').value = (radius / 1000.0).toFixed(0);
				
				jQuery('#cmdGeo').click();
			});
			
			
			google.maps.event.addListener(circle, 'radius_changed', function() {
				var radius_change = circle.getRadius();
				document.getElementById('radius').value = (radius_change).toFixed(0);
				
				jQuery('#cmdGeo').click();

		     });
		}
	},
	
	calculateRouteWithPoint : function (valueWp, type, change) {
		
		if (document.getElementById('checkPoints').value != null && document.getElementById('checkPoints').value !== undefined) {
			if(valueWp=='1'){
				this.calculateAndDisplayRouteWithWaypoints('waypoint_route');			
			}else{
				this.calculateAndDisplayRouteWithWaypoints('waypoint');			
			}
		} else{
			if(valueWp=='1'){
				this.addControlPointMultipleRoute(type, change);
			}else{
				this.addControlPointMultiple(type, change);
			}
		}	
	},
	
	calculateAndDisplayRoute : function () {
		var directionsService = new google.maps.DirectionsService;
	    var directionsDisplay = new google.maps.DirectionsRenderer;
	        
	    directionsDisplay.setMap(this._Map);
	    
        directionsService.route({
          origin: document.getElementById('data_form:addressStart').value,
          destination: document.getElementById('data_form:addressEnd').value,
          travelMode: 'DRIVING'
        }, function(response, status) {
          if (status === 'OK') {
            directionsDisplay.setDirections(response);
            var routes = response.routes;
            var listPoints = "LINESTRING(";
            
        	var points = routes[0].overview_path;
        	
        	for (var i = 0; i < points.length; i++) {
        		if(i==0){
        			listPoints += points[i].lng()+' '+points[i].lat()
        		}else{
        			listPoints += ','+points[i].lng()+' '+points[i].lat()
        		}
        	}
            listPoints += ")";
            document.getElementById('data_form:wkt').value = listPoints;
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        });
      },


	calculateAndDisplayRouteWithWaypoints : function (valueWp) {
		
		var directionsService = new google.maps.DirectionsService;
	    var directionsDisplay = new google.maps.DirectionsRenderer;
    	var waypoints = [];
		var addressStart = 'addressStart';
		var addressEnd = 'addressEnd';
		var wkt = 'wkt';
		
	    directionsDisplay.setMap(this._Map);
	    
		if(valueWp=='waypoint_route'){
			addressStart = 'frm:panel1:addressStart';
			addressEnd = 'frm:panel1:addressEnd';
			wkt = 'wkt_route';
		}
//		var first = new google.maps.LatLng(-25.08532, -50.16177);

		if (document.getElementById(valueWp).value != null && document.getElementById(valueWp).value !== undefined && document.getElementById(valueWp).value !== '') {
			var arrayPoint = document.getElementById(valueWp).value.split('|');

			for (var i = 0; i < arrayPoint.length; i++) {
				
				pointWaypoint = new google.maps.LatLng(arrayPoint[i]);
				
				waypoints.push({
					location: arrayPoint[i],
				    stopover: true,
		        })

        	}			

		}


        directionsService.route({
          origin: document.getElementById(addressStart).value,
          destination: document.getElementById(addressEnd).value,
		  waypoints: waypoints,	
	      optimizeWaypoints: true,
          travelMode: 'DRIVING'
        }, function(response, status) {
          if (status === 'OK') {
            directionsDisplay.setDirections(response);
            var routes = response.routes;
            var listPoints = "LINESTRING(";
            
        	var points = routes[0].overview_path;
        	
        	for (var i = 0; i < points.length; i++) {
        		if(i==0){
        			listPoints += points[i].lng()+' '+points[i].lat()
        		}else{
        			listPoints += ','+points[i].lng()+' '+points[i].lat()
        		}
        	}
            listPoints += ")";
            document.getElementById(wkt).value = listPoints;
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        });
      },


	removeDraw : function(id) {

		switch (id.split("_")[0]) {
		case "POINT":
			break;

		case "POC":
			break;

		case "POLYGON":
			break;

		case "LINE":
			break;
		}

	},
	wktFormater : function(position, type) {
		if (type == 'point') {
			if (position != null && position !== undefined) {
				var res = position.split(",");
				return 'POINT(' + res[1] + ' ' + res[0] + ')'
			}
		}
	}

};