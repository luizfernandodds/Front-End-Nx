/**
 * Maplink Map Prototype class
 * 
 */
var load = function() {
	MapController.prototype.load();
};

MapController.prototype = {
	Provider : function() {
		return "MAPLINK";
	},

	/**
	 * Funcao para carregar dependencias iniciais do Mapa
	 */
	init : function() {
		MapController.prototype._Map = new MMap2(this._configure.mapDiv);

		var point = new MPoint(this._configure.centerLong,
				this._configure.centerLat);
		var zoomLevel = 8;
		this._Map.setCenter(point, zoomLevel);

		var largeMapControl = new GLargeMapControl();
		this._Map.addControl(largeMapControl);

		// adicionando transito
		 var trafficLayer = createTrafficLayer();
		 this._Map.addLayer(trafficLayer);

		// adicionando ciclovia
		// var bycicleBaseLayer = createBaseLayer(LBS_BICYCLE_MAP);
		// this._Map.changeBaseLayer(bycicleBaseLayer);

		MapLayer.load();

		return this._Map;
	},

	/**
	 * Funcao para carregar dependencias do Mapa
	 */
	load : function() {
		/* Execute load functions */
		if ($.type(MapController.prototype._configure.loadExecute) == "function") {
			try {
				MapController.prototype._configure.loadExecute();
			} catch (e) {
				console.log("Error while execute on loadExecute: " + e);
				// console.log(MapController.prototype._configure.loadExecute);
			}
		}
	},

	reset : function() {
		this.drawClear();

	},

	// resizeMap : function() {
	// console.log('resizeMap maplink');
	// var point2 = new
	// MPoint(-48.635208,-26.99107,-48.635208,-26.99107,-53.4478,-33.679008,-53.381088,-33.5839,-67.801086,-9.97371,-46.72192887339858,-23.63325038751202,-48.63688999999999,-26.99226,-53.345921,-33.531422);
	// console.log('resizeMap maplink depois point2');
	//
	// var zoomLevel2 = 10;
	// console.log('resizeMap maplink depois zoomLevel2: '+zoomLevel2);
	//
	// this._Map.setCenter(point2, zoomLevel2);
	// console.log('resizeMap maplink depois setCenter getCenter(): '+
	// this.map.getCenter());
	//    
	// LBS.Event.addListener(this.map, "zoomend", function (e) {
	// alert("Nível de zoom alterado!");
	// });
	// },
	//  

	/**
	 * Exibe o mapa no nivel de zoom apropriado a visualizar as coordenadas
	 * passadas por parametros.
	 * 
	 * @param zoom
	 *            Nivel de zoom (INT or WKT)
	 */
	zoom : function(zoom) {
		zoom = this.getWkt(zoom);
		if ($.type(zoom) == "number") {
			// este é para o mapLink
			// this._Map.setZoom(zoom, "MapLayer.callBack");
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

			var polyPoints = [];
			for (var i = 0; i < points.length; ++i) {
				polyPoints.push(new MPoint(points[i].lng, points[i].lat));
			}

			var bounds = LBS.Bounds.fromArray(polyPoints);
			var zommPoints = this._Map.getZoomForPoints(polyPoints);

			this._Map.setCenter(bounds.getCenter());
			this._Map.setZoom(zommPoints);

			switch (type) {
			case "POINT":
			case "LINESTRING":
			case "MULTIPOINT":
				this._Map.zoomToExtent(bounds);
			case "POLYGON":
				this._Map.zoomToExtent(bounds);
				break;
			default:
				console.log("ZOOM[" + type + "][" + zoom + "]");
			}
		}
	},

	zoomAnterior : function(zoom) {

		zoom = this.getWkt(zoom);
		if ($.type(zoom) == "number") {
			// este é para o mapLink
			// this._Map.setZoom(zoom, "MapLayer.callBack");
		} else {
			var coords = zoom.replace(/\ /g, ",").replace(/,+/g, ",");

			var indexStart = coords.indexOf("(") + 1;
			var indexEnd = coords.indexOf(")");
			var type = $.trim(coords.substring(0, indexStart)).replace(
					/\(|\)|,/g, "");

			coords = coords.substring(indexStart, indexEnd).replace(/\(|\)/g,
					"");

			// this._Map = new MMap2(this._configure.mapDiv);

			var largeMapControl = new GLargeMapControl();
			this._Map.addControl(largeMapControl);

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
				polyPoints.push(new MPoint(points[i].lng, points[i].lat));
			}

			var icon = new MIcon();
			icon.image = this._AppPath + "resources/images/map/pin_yellow.png";
			icon.iconSize = new MSize(20, 32);
			icon.infoWindowAnchor = new MPoint(20, 32);

			for (var index = 0; index < polyPoints.length; index++) {
				this._Map.addMarker(new MMarker(polyPoints[index]));
				// this._Map.addMarker(new MMarker(polyPoints[index], icon));
			}

			var bounds = LBS.Bounds.fromArray(polyPoints);

			var zommPoints = this._Map.getZoomForPoints(polyPoints);

			this._Map.setCenter(bounds.getCenter());
			this._Map.setZoom(zommPoints);

			switch (type) {
			case "POINT":
			case "LINESTRING":
			case "MULTIPOINT":
				this._Map.zoomToExtent(bounds);
				break;
			case "POLYGON":
			default:
				console.log("ZOOM[" + type + "][" + zoom + "]: " + coords);
			}
		}
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

	/**
	 * Define como o novo centro do mapa as coordenadas passadas por parametro
	 * no zoom atual.
	 * 
	 * @param long
	 *            longitude definida como centro do mapa;
	 * @param lat
	 *            latitude definida como centro do mapa;
	 */
	center : function(long, lat) {
		this._Map.Client.setCenter(long, lat, "MapLayer.callBack");
	},

	/**
	 * Cria uma nova rota
	 */
	drawRoute : function() {

		var addressOrigin = new MAddress();
		addressOrigin.street = "Avenida Paulista";
		addressOrigin.houseNumber = 1000;

		var cityOrigin = new MCity();
		cityOrigin.name = 'São Paulo';
		cityOrigin.state = 'SP';

		addressOrigin.city = cityOrigin;

		this.getLatLng(addressOrigin, 1);

		var addressDestination = new MAddress();
		addressDestination.street = "Rua Alberico Flores Bueno";
		addressDestination.houseNumber = 2336;

		var cityDestination = new MCity();
		cityDestination.name = 'Curitiba';
		cityDestination.state = 'PR';

		addressDestination.city = cityDestination;

		this.getLatLng(addressDestination, 2);

	},

	addRoutexxxxx : function(addressOrigin, addressDestination, latLngOrigin,
			latLngDestination) {
		this._Map = new MMap2(this._configure.mapDiv);
		var point = new MPoint(this._configure.centerLong,
				this._configure.centerLat);
		var zoomLevel = 8;

		this._Map.setCenter(point, zoomLevel);

		var originStop = new MRouteStop();
		originStop.description = addressOrigin.street + ", "
				+ addressOrigin.houseNumber + ", " + addressOrigin.city.name
				+ "," + addressOrigin.city.state;
		originStop.point = new MPoint(latLngOrigin);

		var destinationStop = new MRouteStop();
		destinationStop.description = addressDestination.street + ", "
				+ addressDestination.houseNumber + ", "
				+ addressDestination.city.name + ","
				+ addressDestination.city.state;
		destinationStop.point = new MPoint(latLngDestination);

		if (typeof name === 'undefined')
			name = "LINE_" + Math.round((new Date()).getTime());

		var routeStops = new Array;

		var routePointAux;
		routePointAux = new MRoutePoint();
		routePointAux.routeStop = originStop;
		routeStops.push(routePointAux);

		routePointAux = new MRoutePoint();
		routePointAux.routeStop = destinationStop;
		routeStops.push(routePointAux);

		var routeOptions = new MRouteOptions();

		var routeDetails = new MRouteDetails();
		routeDetails.optimizeRoute = true;
		routeDetails.descriptionType = 0;
		routeDetails.routeType = 1;

		var vehicle = new MVehicle();
		vehicle.tankCapacity = 20;
		vehicle.averageConsumption = 9;
		vehicle.fuelPrice = 3;
		vehicle.averageSpeed = 60;
		vehicle.tollFeeCat = 2;

		routeOptions.language = "portugues";
		routeOptions.routeDetails = routeDetails;
		routeOptions.vehicle = vehicle;

		var routeManager = new MRouteMannager(this._Map);
		routeManager.createRoute(routeStops, routeOptions);

		var destroy = function() {
			routeManager.destroy();
		}

		var recreate = function() {
			routeManager.createRoute(routeStops, routeOptions, null, callback);
		}
	},

	/**
	 * Pega a distâncias entre pontos
	 * 
	 * @param points
	 *            array de pontos;
	 */
	getDistancePoints : function() {

		this._Map = new MMap2(document.getElementById(divIdName), {
			draggableCursor : "auto",
			draggingCursor : "move"
		});
		this._Map.setCenter(new MPoint(this._configure.centerLong,
				this._configure.centerLat), zoomLevel);
		this._Map.addControl(new GLargeMapControl());

		LBS.Event.addListener(map, "click", leftClick);

		function drawOverlay() {
			if (poly) {
				this._Map.removeOverlay(poly);
			}

			points.length = 0;

			for (i = 0; i < markers.length; i++) {
				points.push(markers[i].getLatLng());

				poly = new MPolyline(points, lineColor, lineWeight, lineOpacity);
				var length = poly.getLength() / 1000;
				var unit = " km";

				document.getElementById("divInfo").innerHTML = "Total line length:<br> "
						+ length.toFixed(3) + unit;
			}

			this._Map.addOverlay(poly);
		}
	},

	/**
	 * Traça linha entre pontos
	 */
	getLinePoints : function(points) {
		for (var i = 0; i < points.length; i++) {
			markers[i] = new MMarker(new MPoint(points[i].lng, points[i].lat));
			this._Map.addMarker(markers[i]);
		}

		var lineColor = "#003355";
		var lineOpacity = 0.5;
		var lineWeight = 4;

		for (i = 0; i < markers.length; i++) {
			polyPoints.push(markers[i].getLatLng());
			poly = new MPolyline(polyPoints, lineColor, lineWeight, lineOpacity);
		}

		this._Map.addOverlay(poly);

		var bounds = LBS.Bounds.fromArray(polyPoints);
		var zomm = this._Map.getZoomForPoints(polyPoints);

		this._Map.setCenter(bounds.getCenter());
		this._Map.setZoom(zomm);
	},

	/**
	 * Criar polígono ao definir pontos
	 */
	createPolygon : function() {
		var poly;
		var count = 0;
		var points = new Array();
		var markers = new Array();
		var lineColor = "#0000af";
		var fillColor = "#335599";
		var lineWeight = 3;
		var lineOpacity = .8;
		var fillOpacity = .2;

		var divInfoName = "divInfo";

		var zoomLevel = 14;

		map = this._Map;
		LBS.Event.addListener(map, "click", leftClick);

		function leftClick(e, point) {
			var point = map.getLatLngFromPixel(e.xy);

			if (!point)
				return;

			count++;

			var marker = new MMarker(point, {
				icon : G_DEFAULT_ICON,
				draggable : true,
				bouncy : false,
				dragCrossMove : true
			});

			marker.content = count;
			markers.push(marker);
			marker.tooltip = "Point " + count;

			LBS.Event.addListener(marker, "mouseover", function() {
			});
			LBS.Event.addListener(marker, "mouseout", function() {
			});

			// Drag listener
			LBS.Event.addListener(marker, "drag", function(e) {
				drawOverlay();
			});

			LBS.Event.addListener(marker, "click", function(e) {
			});

			// Second click listener
			LBS.Event.addListener(marker, "click", function(e) {

				// Find out which marker to remove
				for (var n = 0; n < markers.length; n++) {
					if (markers[n] == marker) {
						map.removeOverlay(markers[n]);
						break;
					}
				}

				// Shorten array of markers and adjust counter
				markers.splice(n, 1);
				if (markers.length == 0) {
					count = 0;
				} else {
					count = markers[markers.length - 1].content;
					drawOverlay();
				}

			});

			map.addOverlay(marker);
			drawOverlay();
		}

		function clearMap() {
			map.clearOverlays();
			points.length = 0;
			markers.length = 0;
			count = 0;
			document.getElementById("desc").innerHTML = "&nbsp;";
		}

		function drawOverlay() {
			if (poly) {
				map.removeOverlay(poly);
			}
			points.length = 0;
			var coordinates = "POLYGON (("
			for (i = 0; i < markers.length; i++) {
				points.push(markers[i].getLatLng());

				if (markers[i].getLatLng() != null) {

				}
				if (i == 0) {
					coordinates += markers[i].getLatLng().lng() + ' '
							+ markers[i].getLatLng().lat();
				} else {
					coordinates += ',' + markers[i].getLatLng().lng() + ' '
							+ markers[i].getLatLng().lat();
				}

				poly = new GPolygon(points, lineColor, lineWeight, lineOpacity,
						"#AAA", 0.5);
			}
			map.addOverlay(poly);
			coordinates += "))";
			document.getElementById("wkt").value = coordinates;

		}

		function toggleMode() {
			if (markers.length > 1)
				drawOverlay();
		}

		console.log('Markers createPolygon: ' + markers);
	},

	toggleMode : function() {
		if (markers.length > 1)
			drawOverlay();
	},

	drawOverlay : function() {
		if (poly) {
			this._Map.removeOverlay(poly);
		}
		points.length = 0;

		for (i = 0; i < markers.length; i++) {
			points.push(markers[i].getLatLng());

			poly = new GPolygon(points, lineColor, lineWeight, lineOpacity,
					"#AAA", 0.5);
		}
		this._Map.addOverlay(poly);
	},

	clearMap : function() {
		this._Map.clearOverlays();
		points.length = 0;
		markers.length = 0;
		count = 0;
		document.getElementById("status").innerHTML = "&nbsp;";
	},

	getPoligonPoints : function(points) {
		var zoomLevel = 14;

		var points = [];
		var polygon;

		var lineColor = "#0000af";
		var lineWeight = 3;
		var lineOpacity = .8;

		this._Map = new MMap2(document.getElementById(this._configure.mapDiv));
		this._Map.setCenter(new MPoint(this._configure.centerLong,
				this._configure.centerLat), zoomLevel);

		drawOverlay();

		LBS.Event.addListener(this._Map, "click", leftClick);

		function drawOverlay() {
			for (var i = 0; i < points.length; i++) {
				polygon = new GPolygon(points, lineColor, lineWeight,
						lineOpacity, "#AAA", 0.5);
			}
			map.addOverlay(polygon);
		}

		function leftClick(e, point) {
			var point = this._Map.getLatLngFromPixel(e.xy);

			var getPoints = function(points) {
				var pointsLatLngs = "";
				for (var i = 0; i < points.length; i++) {
					pointsLatLngs += "X=" + polygon.latlngs[i].x;
					pointsLatLngs += ",Y=" + polygon.latlngs[i].y;
					pointsLatLngs += "<br>";
				}
				return pointsLatLngs;
			}

			var isWithinPolygon = function(polygon, point) {
				return polygon.atPoint(point);
			}

			var openInfoWindow = function(map, content) {
				map.closeInfoWindow();
				map.infoWindow = new LBS.InfoWindow(map.getCenter(), content);
				map.infoWindow.map = map;
				var infoDiv = map.infoWindow.draw();
				if (infoDiv) {
					infoDiv.style.zIndex = map.Z_INDEX_BASE['InfoWindow'];
					map.layerContainerDiv.appendChild(infoDiv);
				}
			}

			if (isWithinPolygon(polygon, point)) {
				var points = getPoints(polygon.latlngs);
				openInfoWindow(this._Map, points);
			}
		}
	},

	drawPoint : function(id) {
		if (document.getElementById(id).value != ""
				&& document.getElementById(id).value != null) {
			this.drawClear();
			this.addPoint(id);
			return false;
		}
		this._Map = new MMap2(this._configure.mapDiv);
		var point = new MPoint(this._configure.centerLong,
				this._configure.centerLat);
		var zoomLevel = 14;
		this._Map.setCenter(point, zoomLevel);

		var radiusInMeters = 500 // 500 meters

		var lineProperties = new MPolylineProperties();
		lineProperties.color = "#FF0000";
		lineProperties.weight = 2;
		lineProperties.opacity = 0.5;

		var circle = new MCircle(point, radiusInMeters, lineProperties);
		this._Map.addOverlay(circle);
	},

	/**
	 * Adiciona Rota traçada
	 * 
	 * @param points
	 *            array de pontos;
	 * 
	 */
	addLine : function(points) {
		this._Map = new MMap2(this._configure.mapDiv);
		var point = new MPoint(this._configure.centerLong,
				this._configure.centerLat);
		var zoomLevel = 8;

		this._Map.setCenter(point, zoomLevel);

		var originStop = new MRouteStop();
		originStop.description = "Rua Alberico Flores Bueno, 2336, Curitiba";
		originStop.point = new MPoint(-49.2746114, -25.4165519);

		var destinationStop = new MRouteStop();
		destinationStop.description = "Av Marechal Floriano peixoto, 150, Curitiba";
		destinationStop.point = new MPoint(-49.2072011, -25.399591);

		if (typeof name === 'undefined')
			name = "LINE_" + Math.round((new Date()).getTime());

		var routeStops = new Array;

		var routePointAux;
		routePointAux = new MRoutePoint();
		routePointAux.routeStop = originStop;
		routeStops.push(routePointAux);

		routePointAux = new MRoutePoint();
		routePointAux.routeStop = destinationStop;
		routeStops.push(routePointAux);

		var routeOptions = new MRouteOptions();

		var routeDetails = new MRouteDetails();
		routeDetails.optimizeRoute = true;
		routeDetails.descriptionType = 0;
		routeDetails.routeType = 1;

		var vehicle = new MVehicle();
		vehicle.tankCapacity = 20;
		vehicle.averageConsumption = 9;
		vehicle.fuelPrice = 3;
		vehicle.averageSpeed = 60;
		vehicle.tollFeeCat = 2;

		routeOptions.language = "portugues";
		routeOptions.routeDetails = routeDetails;
		routeOptions.vehicle = vehicle;

		var routeManager = new MRouteMannager(this._Map);
		routeManager.createRoute(routeStops, routeOptions);

		var destroy = function() {
			routeManager.destroy();
		}

		var recreate = function() {
			routeManager.createRoute(routeStops, routeOptions, null, callback);
		}
	},

	addPointRoute : function(xhr, status, args) {
		if (typeof args.addressLocationStart != "undefined") {
			var posObj = eval('(' + args.addressLocationStart + ')');

			var originStop = new MRouteStop();
			originStop.description = posObj.address.street + ', '
					+ posObj.address.houseNumber + ', '
					+ posObj.address.city.name + ', '
					+ posObj.address.city.state;
			originStop.point = new MPoint(posObj.point.x, posObj.point.y);

			routePoint = new MRoutePoint();
			routePoint.routeStop = originStop;
			routeStops.push(routePoint);
		}
	},

	addPointGenerateRoute : function(xhr, status, args) {
		if (typeof args.addressLocationStart != "undefined") {
			var posObj = eval('(' + args.addressLocationStart + ')');

			var point = new MPoint(posObj.point.x, posObj.point.y);
			var zoomLevel = 8;
			this._Map.setCenter(point, zoomLevel);

			var firstMarkerPoint = new MMarker(new MPoint(posObj.point.x,
					posObj.point.y));
			this._Map.addMarker(firstMarkerPoint);
		}

		if (typeof args.deliverys != "undefined") {
			var posObj = eval('(' + args.deliverys + ')');
			if (Object.prototype.toString.call(posObj) === "[object Array]") {

				for (var i = 0; i < posObj.length; i++) {

					var point = new MPoint(posObj[i].x, posObj[i].y);
					var zoomLevel = 8;
					this._Map.setCenter(point, zoomLevel);

					var markerPoint = new MMarker(new MPoint(posObj[i].x,
							posObj[i].y));
					this._Map.addMarker(markerPoint);
				}
			}
		}

		if (typeof args.addressLocationFinish != "undefined") {
			var posObj = eval('(' + args.addressLocationFinish + ')');

			var point = new MPoint(posObj.point.x, posObj.point.y);
			var zoomLevel = 8;
			this._Map.setCenter(point, zoomLevel);

			var finishMarkerPoint = new MMarker(new MPoint(posObj.point.x,
					posObj.point.y));
			this._Map.addMarker(finishMarkerPoint);
		}
	},

	generateDataRoute : function(xhr, status, args) {
		var routeStops = new Array;
		var routePoint;

		if (typeof args.addressLocationStart != "undefined") {
			var posObj = eval('(' + args.addressLocationStart + ')');

			var originStop = new MRouteStop();
			originStop.description = posObj.address.street + ', '
					+ posObj.address.houseNumber + ', '
					+ posObj.address.city.name + ', '
					+ posObj.address.city.state;
			originStop.point = new MPoint(posObj.point.x, posObj.point.y);

			routePoint = new MRoutePoint();
			routePoint.routeStop = originStop;
			routeStops.push(routePoint);
		}

		if (typeof args.deliverys != "undefined") {

			var posObj = eval('(' + args.deliverys + ')');
			if (Object.prototype.toString.call(posObj) === "[object Array]") {

				for (var i = 0; i < posObj.length; i++) {
					var stopPoint = new MRouteStop();
					stopPoint.description = posObj[i].address_number + ', '
							+ posObj[i].city_state;
					stopPoint.point = new MPoint(posObj[i].x, posObj[i].y);

					var routePoint = new MRoutePoint();
					routePoint.routeStop = stopPoint;
					routeStops.push(routePoint);
				}
			}
		}

		if (typeof args.addressLocationFinish != "undefined") {
			var posObj = eval('(' + args.addressLocationFinish + ')');

			var destinationStop = new MRouteStop();
			destinationStop.description = posObj.address.street + ', '
					+ posObj.address.houseNumber + ', '
					+ posObj.address.city.name + ', '
					+ posObj.address.city.state;
			destinationStop.point = new MPoint(posObj.point.x, posObj.point.y);

			routePoint = new MRoutePoint();
			routePoint.routeStop = destinationStop;
			routeStops.push(routePoint);

		}
		this.addRouteWithPoints(routeStops);
	},

	/**
	 * Adiciona Rota com pontos de parada
	 * 
	 * @param points
	 *            array dos pontos da rota;
	 * @param points
	 *            array de pontos;
	 * 
	 */
	addRouteWithPoints : function(routeStops) {
		var routeOptions = new MRouteOptions();

		var routeDetails = new MRouteDetails();
		routeDetails.optimizeRoute = true;
		routeDetails.descriptionType = 0;
		routeDetails.routeType = 1;
		
		if(document.getElementById("west_form:basic:0").checked == true){
			routeDetails.routeType = 10;
		}
		if(document.getElementById("west_form:basic:2").checked == true){
			routeDetails.routeType = 6;
		}
		if(document.getElementById("west_form:basic:2").checked == true){
			routeDetails.routeType = 7;
		}

		var vehicle = new MVehicle();

		if (document.getElementById("west_form:j_idt2393:capacidade").value != null && document.getElementById("west_form:j_idt2393:capacidade").value != "") {
			vehicle.tankCapacity = document.getElementById("west_form:j_idt2393:capacidade").value
		}else{
			vehicle.tankCapacity = 45;
		}
		if (document.getElementById("west_form:j_idt2393:consumo").value != null && document.getElementById("west_form:j_idt2393:consumo").value != "") {
			vehicle.averageConsumption = document.getElementById("west_form:j_idt2393:consumo").value
		}else{
			vehicle.averageConsumption = 9;
		}
		if (document.getElementById("west_form:j_idt2393:combustivel").value != null && document.getElementById("west_form:j_idt2393:combustivel").value != "") {
			vehicle.fuelPrice = document.getElementById("west_form:j_idt2393:combustivel").value
		}else{
			vehicle.averageConsumption = 9;
		}

		vehicle.averageSpeed = 60;
		vehicle.tollFeeCat = 2;
		// vehicle.tollFeeCat = document.getElementById("eixos").value;

		routeOptions.language = "portugues";
		routeOptions.routeDetails = routeDetails;
		routeOptions.vehicle = vehicle;

		var map = this._Map;
		map.removeAllMarkers();
		var routeManager = new MRouteMannager(map);

		var callback = {
			onSuccess : function(response) {
				var totalDistance = 0;	
				var totalCost = 0;
				var totalfuelCost = 0;
				var totalFuelUsed = 0;
				var totaltollFeeCost = 0;
				
				function getRouteTotals(routeTotalsResponse) {
					var routeTotals = "[RouteTotals]";
					routeTotals += "<br/>";
					routeTotals += "totalDistance: "
							+ routeTotalsResponse.totalDistance;
					routeTotals += ", totalTime: "
							+ routeTotalsResponse.totalTime;
					routeTotals += ", totalFuelUsed: "
							+ routeTotalsResponse.totalFuelUsed;
					routeTotals += ", totaltollFeeCost: "
							+ routeTotalsResponse.totaltollFeeCost;
					routeTotals += ", totalFuelCost: "
							+ routeTotalsResponse.totalFuelCost;
					routeTotals += ", totalCost: "
							+ routeTotalsResponse.totalCost;
					routeTotals += ", taxiFare1: "
							+ routeTotalsResponse.taxiFare1;
					routeTotals += ", taxiFare2: "
							+ routeTotalsResponse.taxiFare2;
					routeTotals += "<br/><br/>";

					totalDistance = routeTotalsResponse.totalDistance;
					totalCost = routeTotalsResponse.totalCost;
					totalfuelCost = routeTotalsResponse.totalfuelCost;
					totalFuelUsed = routeTotalsResponse.totalFuelUsed;
					totaltollFeeCost = routeTotalsResponse.totaltollFeeCost;
					
					return routeTotals;
				}

				function getMapInfo(mapInfoResponse) {
					var mapInfo = "[MapInfo]";

					mapInfo += "<br/>";
					mapInfo += "url: " + mapInfoResponse.url;
					mapInfo += ", extent - xMax: "
							+ mapInfoResponse.extent.XMax;
					mapInfo += ", extent - yMax: "
							+ mapInfoResponse.extent.YMax;
					mapInfo += ", extent - xMin: "
							+ mapInfoResponse.extent.XMin;
					mapInfo += ", extent - yMin: "
							+ mapInfoResponse.extent.YMin;

					mapInfo += "<br/><br/>";
					return mapInfo;
				}

				function getSegDescription(segDescriptionResponse) {
					var segDescription = "[SegmentDescription]";

					for (var i = 0; i < segDescriptionResponse.length; i++) {
						segDescription += "<br/>";
						segDescription += "city - name: "
								+ segDescriptionResponse[i].city.name;
						segDescription += ", city - state: "
								+ segDescriptionResponse[i].city.state;
						segDescription += ", command: "
								+ segDescriptionResponse[i].command;
						segDescription += ", cumulativeDistance: "
								+ segDescriptionResponse[i].cumulativeDistance;
						segDescription += ", description: "
								+ segDescriptionResponse[i].description;
						segDescription += ", distance: "
								+ segDescriptionResponse[i].distance;
						segDescription += ", poiRoute: "
								+ segDescriptionResponse[i].poiRoute;
						segDescription += ", poiRouteDetails: "
								+ segDescriptionResponse[i].poiRouteDetails;
						segDescription += ", point - x: "
								+ segDescriptionResponse[i].point.x;
						segDescription += ", point - y: "
								+ segDescriptionResponse[i].point.y;
						segDescription += ", roadType: "
								+ segDescriptionResponse[i].roadType;
						segDescription += ", tollFee: "
								+ segDescriptionResponse[i].tollFee;
						segDescription += ", tollFeeDetails - name: "
								+ segDescriptionResponse[i].tollFeeDetails.name;
						segDescription += ", tollFeeDetails - direction: "
								+ segDescriptionResponse[i].tollFeeDetails.direction;
						segDescription += ", tollFeeDetails - address: "
								+ segDescriptionResponse[i].tollFeeDetails.address;
						segDescription += ", tollFeeDetails - concession: "
								+ segDescriptionResponse[i].tollFeeDetails.concession;
						segDescription += ", tollFeeDetails - phone: "
								+ segDescriptionResponse[i].tollFeeDetails.phone;
						segDescription += "<br/>";
					}

					segDescription += "<br/>";
					return segDescription;
				}

				function getRouteSummary(routeSummaryResponse) {
					var routeSummary = "[RouteSummary]";

					for (var i = 0; i < routeSummaryResponse.length; i++) {
						routeSummary += "<br/>";
						routeSummary += "description: "
								+ routeSummaryResponse[i].description;
						var table = new MTable(600);
						table
								.setLineStyle('background-color:#CCCCCC;font-family:verdana;font-size:10px');
						table
								.setLineAlterStyle('font-family:verdana;font-size:10px');
						routeSummary += ", distance: "
								+ routeSummaryResponse[i].distance;
						routeSummary += ", point - x: "
								+ routeSummaryResponse[i].point.x;
						routeSummary += ", point - y: "
								+ routeSummaryResponse[i].point.y;
					}
					routeSummary += "<br/><br/>";
					return routeSummary;
				}

				var responseData = "";
				responseData += getMapInfo(response.MapInfo);
				responseData += getSegDescription(response.segDescription);
				responseData += getRouteTotals(response.routeTotals);
				responseData += getRouteSummary(response.routeSummary);

				document.getElementById("west_form:totalKm").value = totalDistance;
				document.getElementById("totalKmGerado").innerHTML = totalDistance+' Km';

				document.getElementById("west_form:totalCost").value = totalCost;
				document.getElementById("totalCostGerado").innerHTML = 'R$ '+totalCost;

				document.getElementById("west_form:totalFuelCost").value = totalfuelCost;
				document.getElementById("totalFuelCostGerado").innerHTML = 'R$ '+totalfuelCost;

				document.getElementById("west_form:totalFuelUsed").value = totalFuelUsed;
				document.getElementById("totalFuelUsedGerado").innerHTML = totalFuelUsed+' L';

				document.getElementById("west_form:totalTollFeeCost").value = totaltollFeeCost;
				document.getElementById("totalTollFeeCostGerado").innerHTML = 'R$ '+totaltollFeeCost;
				
				document.getElementById("divInfo").innerHTML = responseData;
			},
			onError : function(errorMessage) {
				document.getElementById("divInfo").innerHTML = "error message: "
						+ errorMessage;
			}
		}


		var table = new MTable(600);
		table.setLineStyle('background-color:#CCCCCC;font-family:verdana;font-size:10px');
		table.setLineAlterStyle('font-family:verdana;font-size:10px');
		var routeDescriptionOptions = new MRouteDescriptionOptions('divInfo',table);
		routeManager.createRoute(routeStops, routeOptions,routeDescriptionOptions, callback);
		

	},

	/**
	 * Redimensiona tamanho do mapa
	 */
	resizeCanvas : function() {
		this._Map.updateSize();
	},

	/**
	 * Retorna wkt posicao do mouse no mapa
	 */
	mousePosition : function() {
		this.callBackExecute = function(args) {
			var lonLatMarker = args.split(";");
			this._callBackValue = "POINT (" + lonLatMarker[0] + " "
					+ lonLatMarker[1] + ")";
		};
		this._Map.Client.mousePosition("MapLayer.callBack");
		return this._callBackValue;
	},

	/**
	 * Adiciona um botao no mapa com as coordenadas, dimensoes e as definicoes
	 * passadas por parametro.
	 * 
	 * @param nome
	 *            nome que identifica o botao;
	 * @param img_off
	 *            caminho da imagem do botao, sendo local ou via web, utilizado
	 *            quando nao estiver ativo.
	 * @param img_on
	 *            o caminho da imagem do botao, sendo local ou via web,
	 *            utilizado quando estiver ativo.
	 * @param cursor
	 *            formato do cursor quando o botao estiver ativo, podendo
	 *            utilizar tipos padronizados ou o caminho do novo cursor.
	 *            Exemplos: �crosshair� -> forma de cruz; �move� -> forma de
	 *            cruz, com setas em suas extremidades; �pointer� -> mao com
	 *            dedo indicador apontando; �...cursor.cur� -> utiliza o
	 *            endereco para a definiicao do novo cursor, caso o caminho nao
	 *            indique um cursor valido, o mesmo assume um formato padrao
	 *            (�default�);
	 * @param alt
	 *            mensagem exibida quando o mouse estiver sobre o botao;
	 * @param sizeX
	 *            largura do botao;
	 * @param sizeY
	 *            altura do botao;
	 * @param posX
	 *            a posiccao do botao, definida em pixels, a partir do canto
	 *            superior;
	 * @param posY
	 *            a posiccao do botao, definida em pixels, a partir do canto
	 *            lateral definido no allign (esquerdo ou direito);
	 * @param funcOn
	 *            parammetro referente a uma funcao que sera executada quando o
	 *            botao for ativado, podendo deixa-lo vazio;
	 * @param funcOff
	 *            parammetro referente a uma funcao que sera executada quando o
	 *            botao for desativado, podendo deixa-lo vazio;
	 * @param allign
	 *            alinhamento do ponto inicial para ajuste do botao inserido
	 *            (right ou left);
	 * @param callback
	 *            resposta da funcao executado ao seu termino. Por padrao
	 *            retorna um objeto com dois parametros: O primeiro parametro e
	 *            a validacao da funcao, em que retorna um valor logico, sendo
	 *            que �TRUE� significa que a funcao foi executada com sucesso e
	 *            �FALSE� significa que a funcao esta com erro. O segundo
	 *            parametro e da descricao da sua execucao. Quando o primeiro
	 *            parametro e �FALSE�, vira uma descricao sobre o erro que
	 *            ocasionou, caso seja �TRUE�, vira com valores ou o objeto JSON
	 *            (dependendo da funcao) que podem ser tratados e/ou exibidos;
	 *            Ex: Mapa.Client.addButton ("Botao01",
	 *            "http://.../desativado.gif", "http://.../ativado.gif",
	 *            "crosshair", "Ajuda: Quando ativo, o botao chama a funcao
	 *            ZoomIn ()", 63, 25, 70, 70, "Mapa.Client.zoomIn ()", "left",
	 *            "callbackClient")
	 */
	addButton : function(name, imgOff, imgOn, cursor, alt, sizeX, sizeY, posX,
			posY, funcOn, funcOff, allign) {
		this._Map.Client.addButton(name, this._AppPath + imgOff, this._AppPath
				+ imgOn, cursor, alt, sizeX, sizeY, posX, posY, funcOn,
				funcOff, allign, "MapLayer.callBack");
	},

	/**
	 * Adicionar PIN no mapa
	 * 
	 * @param obj
	 *            Position Object
	 */
	addMarker : function(obj, config) {
		var iconWidth = config.icon != 20 ? 40 : 16;
		var iconHeigth = config.icon != 20 ? 67 : 40;
		iconWidth += obj.index ? 19 : 0;
		iconHeigth += obj.index ? 7 : 0;

		if (typeof obj.deviceId === "undefined") {
			return;
		}

		config.shift = 0;
		var balloon = this.getBalloon(obj, config);

		var layerId = new String(obj.deviceId + "" + obj.gpsTime);

		var point = new MPoint('-46.639794', '-23.582160');
		var zoomLevel = 16;

		// var markersLayer = this._Map.getLayersByName("PositionMarker")[0];
		// var size = new OpenLayers.Size(iconWidth, iconHeigth);
		// var offset = new OpenLayers.Pixel(-(size.w / 2), -size.h
		// + (config.icon == 20 ? iconHeigth / 2 : 0));
		// var olicon = new OpenLayers.Icon(balloon.icon, size, offset);
		// var marker = new OpenLayers.Marker(lonLatMarker, olicon);
		// var feature = new OpenLayers.Feature(markersLayer, lonLatMarker);
		// feature.closeBox = true;
		// feature.data.popupContentHTML = balloon.html;
		// feature.data.overflow = "hidden";
		// feature.id = obj.deviceId;
		// marker.feature = feature;
		// marker.id = layerId;

		var toolTipWindow;

		showMouseOver = function(marker, toolTipText, map) {
			toolTipWindow.innerHTML = '<div style="background: #FFFFFF;border:1px solid">'
					+ toolTipText + '</div>';

			var layerPx = map.getLayerPxFromLatLng(marker.getPoint());
			var anchor = marker.icon.iconAnchor;
			var width = marker.icon.iconSize.width;
			var height = toolTipWindow.clientHeight;

			// position calculation to marker label
			toolTipWindow.style.left = (layerPx.x - anchor.x + width) + 'px';
			toolTipWindow.style.top = (layerPx.y - anchor.y - height) + 'px';

			toolTipWindow.style.visibility = 'visible';
		}

		showMouseOut = function() {
			toolTipWindow.innerHTML = "";
			toolTipWindow.style.visibility = "hidden";
		}

		addMarker = function(marker, map) {
			LBS.Event.addListener(marker, "mouseover", function(e) {
				showMouseOver(marker, balloon.html, map);
			});

			LBS.Event.addListener(marker, "mouseout", function(e) {
				showMouseOut();
			});

			map.addMarker(marker);
		}

		var icon = new MIcon();
		icon.image = balloon.icon;
		icon.iconAnchor = new MPoint(20, 40)
		icon.iconSize = new MSize(40, 40);

		var markerPoint = new MMarker(new MPoint(obj.longitude, obj.latitude),
				icon);
		addMarker(markerPoint, this._Map);

		toolTipWindow = document.createElement('divToolTipMarker');
		toolTipWindow.style.visibility = 'hidden';
		toolTipWindow.style.position = 'absolute';

		this._Map.getPane(G_MAP_FLOAT_PANE).appendChild(toolTipWindow);

	},

	removeMarker : function(obj) {
		if (typeof obj.deviceId === "undefined") {
			return;
		}
		var id = new String(obj.deviceId + "" + obj.gpsTime);
		this._Map.removeMarker(id, "MapLayer.callBack");
	},

	removeDraw : function(id) {

		switch (id.split("_")[0]) {
		case "POINT":
			this._Map.removePoints(id, "MapLayer.callBack");
			break;

		case "POC":
			this._Map.removeSphere(id, "MapLayer.callBack");
			break;

		case "POLYGON":
			this._Map.removePoly(id, "MapLayer.callBack");
			break;

		case "LINE":
			this._Map.removeLines(id, "MapLayer.callBack");
			break;
		}

	},

	addControlPoint : function(wkt, radius, name) {
		// this._Map = new MMap2(this._configure.mapDiv);

		var id1 = document.getElementById(wkt) ? wkt : null;
		var id2 = document.getElementById(radius) ? radius : null;
		wkt = this.getWkt(wkt);
		radius = this.getWkt(radius);
		var indexStart = wkt.indexOf("(") + 1;
		var indexEnd = wkt.indexOf(")");
		var longLat = wkt.substring(indexStart, indexEnd);
		longLat = longLat.split(" ");

		if (typeof name === 'undefined')
			name = "POC_" + Math.round((new Date()).getTime());

		var point = new MPoint(longLat[0], longLat[1]);
		var zoomLevel = 15;
		this._Map.setCenter(point, zoomLevel);

		var lineProperties = new MPolylineProperties();
		lineProperties.color = "#FF0000";
		lineProperties.weight = 2;
		lineProperties.opacity = 0.5;

		var circle = new MCircle(point, radius, lineProperties);
		this._Map.addOverlay(circle);
	},

	drawClear : function() {
		// ***************** retirar o comentário quando for o maplink estiver
		// funcionando
		this._Map.removeAllMarkers();

		// if (typeof route_name !== 'undefined') {
		// this._Map.Client.removeRouteGen2013();
		// }

		// this.drawRoute();

	},

	getCity : function() {
		console.log('getCity' + document.getElementById("destination").value);

	},

	getCoordinate : function() {

		var originStateCity = document.getElementById("name").value.split(",");

		var originAddress = document.getElementById("radius").value.split(",");

		var addressOrigin = new MAddress();
		addressOrigin.street = originAddress[0];
		addressOrigin.houseNumber = originAddress[1];

		var cityOrigin = new MCity();
		cityOrigin.name = originStateCity[0];
		cityOrigin.state = originStateCity[1];

		addressOrigin.city = cityOrigin;

		this.getLatLng(addressOrigin, 1);

		var destinationStateCity = document.getElementById("desc").value
				.split(",");
		var destinationAddress = document.getElementById("adressDestination").value
				.split(",");

		var addressDestination = new MAddress();
		addressDestination.street = destinationAddress[0];
		addressDestination.houseNumber = destinationAddress[1];

		var cityDestination = new MCity();
		cityDestination.name = destinationStateCity[0];
		cityDestination.state = destinationStateCity[1];

		addressDestination.city = cityDestination;

		this.getLatLng(addressDestination, 2);
	},

	getLatLng : function(address, type) {
		var serviceAddressFinder = new MWsAddressFinder();

		var addressOptions = new MAddressOptions();
		addressOptions.matchType = 1;
		addressOptions.searchType = 2;
		addressOptions.usePhonetic = true;

		var resultRange = new MResultRange();
		resultRange.pageIndex = 1;
		resultRange.recordsPerPage = 10;

		addressOptions.resultRange = resultRange;
		var resultAddress;

		serviceAddressFinder
				.findAddress(
						address,
						addressOptions,
						function(findAddressResponse) {
							var result;

							result = "Page Count: "
									+ findAddressResponse.pageCount;
							result += ", Record Count: "
									+ findAddressResponse.recordCount
									+ "<br/><br/>";

							var addressLocation = findAddressResponse.addressLocation;

							for (var i = 0; i < addressLocation.length; i++) {

								result += "Key: "
										+ addressLocation[i].key
										+ "<br/>"
										+ "Street name: "
										+ addressLocation[i].address.street
										+ "<br/>"
										+ "Street number: "
										+ addressLocation[i].address.houseNumber
										+ "<br/>" + "Zip code: "
										+ addressLocation[i].address.zip
										+ "<br/>" + "District: "
										+ addressLocation[i].address.district
										+ "<br/>" + "City: "
										+ addressLocation[i].address.city.name
										+ "<br/>" + "State: "
										+ addressLocation[i].address.city.state
										+ "<br/>" + "Data Source: "
										+ addressLocation[i].dataSource
										+ "<br/>" + "Right zip code: "
										+ addressLocation[i].zipR + "<br/>"
										+ "Left zip code: "
										+ addressLocation[i].zipL + "<br/>"
										+ "Car access: "
										+ addressLocation[i].carAccess
										+ "<br/>" + "Latitude: "
										+ addressLocation[i].point.y + "<br/>"
										+ "Longitude: "
										+ addressLocation[i].point.x
										+ "<br/><br/>";
							}

							if (type == 1) {
								document.getElementById("origin").value = addressLocation[0].point.x
										+ "," + addressLocation[0].point.y;
							} else {
								document.getElementById("destination").value = addressLocation[0].point.x
										+ "," + addressLocation[0].point.y;
							}
						});
	},

	/**
	 * Cria uma nova rota
	 */
	newRoute : function() {

		// this._Map = new MMap2(this._configure.mapDiv);
		// var zoomLevel = 8;

		// var map = new MMap2(this._configure.mapDiv);
		var point = new MPoint(document.getElementById("origin").value);
		var zoomLevel = 8;

		this._Map.setCenter(point, zoomLevel);

		longLatOrigin = document.getElementById("origin").value.split(",");
		longLatDestination = document.getElementById("destination").value
				.split(",");

		var originStop = new MRouteStop();
		// mudar os document.getElementById para os corretos qdo o formulário
		// ficar pronto
		originStop.description = document.getElementById("radius").value + ","
				+ document.getElementById("name").value;
		originStop.point = new MPoint(longLatOrigin[0], longLatOrigin[1]);

		var destinationStop = new MRouteStop();
		destinationStop.description = document
				.getElementById("adressDestination").value
				+ "," + document.getElementById("desc").value;
		destinationStop.point = new MPoint(longLatDestination[0],
				longLatDestination[1]);

		var routeStops = new Array;

		var routePointAux;
		routePointAux = new MRoutePoint();
		routePointAux.routeStop = originStop;
		routeStops.push(routePointAux);

		routePointAux = new MRoutePoint();
		routePointAux.routeStop = destinationStop;
		routeStops.push(routePointAux);

		var routeOptions = new MRouteOptions();

		var routeDetails = new MRouteDetails();
		routeDetails.optimizeRoute = true;
		routeDetails.descriptionType = 0;
		routeDetails.routeType = 1;

		var vehicle = new MVehicle();
		vehicle.tankCapacity = 20;
		vehicle.averageConsumption = 9;
		vehicle.fuelPrice = 3;
		vehicle.averageSpeed = 60;
		vehicle.tollFeeCat = 2;

		routeOptions.language = "portugues";
		routeOptions.routeDetails = routeDetails;
		routeOptions.vehicle = vehicle;

		var callback = {
			onSuccess : function(response) {
				function getRouteTotals(routeTotalsResponse) {
					var routeTotals = "[RouteTotals]";
					// aqui preenche os document.getElementById
					routeTotals += "<br/>";
					routeTotals += "totalDistance: "
							+ routeTotalsResponse.totalDistance;
					routeTotals += ", totalTime: "
							+ routeTotalsResponse.totalTime;
					routeTotals += ", totalFuelUsed: "
							+ routeTotalsResponse.totalFuelUsed;
					routeTotals += ", totaltollFeeCost: "
							+ routeTotalsResponse.totaltollFeeCost;
					routeTotals += ", totalFuelUsed: "
							+ routeTotalsResponse.totalFuelUsed;
					routeTotals += ", totalCost: "
							+ routeTotalsResponse.totalCost;
					routeTotals += ", taxiFare1: "
							+ routeTotalsResponse.taxiFare1;
					routeTotals += ", taxiFare2: "
							+ routeTotalsResponse.taxiFare2;
					routeTotals += "<br/><br/>";

					document.getElementById("desc").value = routeTotalsResponse.totalDistance;

					return routeTotals;
				}

				function getMapInfo(mapInfoResponse) {
					var mapInfo = "[MapInfo]";

					mapInfo += "<br/>";
					mapInfo += "url: " + mapInfoResponse.url;
					mapInfo += ", extent - xMax: "
							+ mapInfoResponse.extent.XMax;
					mapInfo += ", extent - yMax: "
							+ mapInfoResponse.extent.YMax;
					mapInfo += ", extent - xMin: "
							+ mapInfoResponse.extent.XMin;
					mapInfo += ", extent - yMin: "
							+ mapInfoResponse.extent.YMin;

					mapInfo += "<br/><br/>";
					return mapInfo;
				}

				function getSegDescription(segDescriptionResponse) {
					var segDescription = "[SegmentDescription]";

					for (var i = 0; i < segDescriptionResponse.length; i++) {
						segDescription += "<br/>";
						segDescription += "city - name: "
								+ segDescriptionResponse[i].city.name;
						segDescription += ", city - state: "
								+ segDescriptionResponse[i].city.state;
						segDescription += ", command: "
								+ segDescriptionResponse[i].command;
						segDescription += ", cumulativeDistance: "
								+ segDescriptionResponse[i].cumulativeDistance;
						segDescription += ", description: "
								+ segDescriptionResponse[i].description;
						segDescription += ", distance: "
								+ segDescriptionResponse[i].distance;
						segDescription += ", poiRoute: "
								+ segDescriptionResponse[i].poiRoute;
						segDescription += ", poiRouteDetails: "
								+ segDescriptionResponse[i].poiRouteDetails;
						segDescription += ", point - x: "
								+ segDescriptionResponse[i].point.x;
						segDescription += ", point - y: "
								+ segDescriptionResponse[i].point.y;
						segDescription += ", roadType: "
								+ segDescriptionResponse[i].roadType;
						segDescription += ", tollFee: "
								+ segDescriptionResponse[i].tollFee;
						segDescription += ", tollFeeDetails - name: "
								+ segDescriptionResponse[i].tollFeeDetails.name;
						segDescription += ", tollFeeDetails - direction: "
								+ segDescriptionResponse[i].tollFeeDetails.direction;
						segDescription += ", tollFeeDetails - address: "
								+ segDescriptionResponse[i].tollFeeDetails.address;
						segDescription += ", tollFeeDetails - concession: "
								+ segDescriptionResponse[i].tollFeeDetails.concession;
						segDescription += ", tollFeeDetails - phone: "
								+ segDescriptionResponse[i].tollFeeDetails.phone;
						segDescription += "<br/>";
					}

					segDescription += "<br/>";

					return segDescription;
				}

				function getRouteSummary(routeSummaryResponse) {
					var routeSummary = "[RouteSummary]";

					for (var i = 0; i < routeSummaryResponse.length; i++) {
						routeSummary += "<br/>";
						routeSummary += "description: "
								+ routeSummaryResponse[i].description;
						routeSummary += ", distance: "
								+ routeSummaryResponse[i].distance;
						routeSummary += ", point - x: "
								+ routeSummaryResponse[i].point.x;
						routeSummary += ", point - y: "
								+ routeSummaryResponse[i].point.y;
					}
					routeSummary += "<br/><br/>";

					return routeSummary;
				}

				var responseData = "";
				// responseData += getMapInfo(response.MapInfo);
				// responseData += getSegDescription(response.segDescription);
				responseData += getRouteTotals(response.routeTotals);
				// responseData += getRouteSummary(response.routeSummary);

				document.getElementById("divInfo").innerHTML = responseData;

			},
			onError : function(errorMessage) {
				document.getElementById("divInfo").innerHTML = "error message: "
						+ errorMessage;
			}
		}

		var routeManager = new MRouteMannager(this._Map);
		routeManager.createRoute(routeStops, routeOptions, null, callback);

	},

	addPoint : function(value, name) {

		var wkt = this.getWkt(value);
		var indexStart = wkt.indexOf("(") + 1;
		var indexEnd = wkt.indexOf(")");
		var longLat = wkt.substring(indexStart, indexEnd);
		longLat = longLat.split(" ");

		if (typeof name === 'undefined')
			name = "POINT_" + Math.round((new Date()).getTime());

		var point = new MPoint(longLat[0], longLat[1]);
		var zoomLevel = 14;
		this._Map.setCenter(point, zoomLevel);

		var firstMarkerPoint = new MMarker(new MPoint(longLat[0], longLat[1]));
		this._Map.addMarker(firstMarkerPoint);
	},

	addPolygon : function(wkt) {
		var zoomLevel = 14;

		var map;
		var points = [];
		var polyPoints = [];
		var polygon;

		var lineColor = "#0000af";
		var lineWeight = 3;
		var lineOpacity = .8;

		map = this._Map;

		var wkt = this.getWkt(wkt);

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

		polyPoints = this.cleanArray(pointsAux);

		fillPoints();
		drawOverlay();

		LBS.Event.addListener(map, "click", leftClick);

		map.setCenter(new MPoint(polyPoints[0].lng, polyPoints[0].lat),
				zoomLevel);

		function fillPoints() {
			for (var i = 0; i < polyPoints.length; ++i) {
				console.log('polyPoints[i].lng: ' + polyPoints[i].lng
						+ ' polyPoints[i].lat: ' + polyPoints[i].lat);
				points.push(new MPoint(polyPoints[i].lng, polyPoints[i].lat));
			}
		}

		function drawOverlay() {
			console.log('points.lenth: ' + points.length);
			for (var i = 0; i < points.length; i++) {
				polygon = new GPolygon(points, lineColor, lineWeight,
						lineOpacity, "#AAA", 0.5);
			}
			map.addOverlay(polygon);
		}

		function leftClick(e, point) {
			var point = map.getLatLngFromPixel(e.xy);

			var getPoints = function(points) {
				var pointsLatLngs = "";
				for (var i = 0; i < points.length; i++) {
					pointsLatLngs += "X=" + polygon.latlngs[i].x;
					pointsLatLngs += ",Y=" + polygon.latlngs[i].y;
					pointsLatLngs += "<br>";
				}
				return pointsLatLngs;
			}

			var isWithinPolygon = function(polygon, point) {
				return polygon.atPoint(point);
			}

			var openInfoWindow = function(map, content) {
				map.closeInfoWindow();
				map.infoWindow = new LBS.InfoWindow(map.getCenter(), content);
				map.infoWindow.map = map;
				var infoDiv = map.infoWindow.draw();
				if (infoDiv) {
					infoDiv.style.zIndex = map.Z_INDEX_BASE['InfoWindow'];
					map.layerContainerDiv.appendChild(infoDiv);
				}
			}

			if (isWithinPolygon(polygon, point)) {
				var points = getPoints(polygon.latlngs);
				openInfoWindow(map, points);
			}
		}
	},

	addPolygonxxx : function(wkt) {
		var polygon;

		var lineColor = "#0000af";
		var lineWeight = 3;
		var lineOpacity = .8;

		var wkt = this.getWkt(wkt);

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
			polyPoints.push(new MPoint(points[i].lng, points[i].lat));
		}

		if (typeof name === 'undefined')
			name = "POLYGON_" + Math.round((new Date()).getTime());

		this._Map.setCenter(new MPoint(-46.6520066, -23.5650127), 14);

		drawOverlay();
		LBS.Event.addListener(this._Map, "click", leftClick);

		function drawOverlay() {
			for (var i = 0; i < polyPoints.length; i++) {
				polygon = new GPolygon(polyPoints, lineColor, lineWeight,
						lineOpacity, "#AAA", 0.5);
			}
			this._Map.addOverlay(polygon);
		}

		function leftClick(e, point) {
			var point = this._Map.getLatLngFromPixel(e.xy);

			var getPoints = function(points) {
				var pointsLatLngs = "";
				for (var i = 0; i < points.length; i++) {
					pointsLatLngs += "X=" + polygon.latlngs[i].x;
					pointsLatLngs += ",Y=" + polygon.latlngs[i].y;
					pointsLatLngs += "<br>";
				}
				return pointsLatLngs;
			}

			var isWithinPolygon = function(polygon, point) {
				return polygon.atPoint(point);
			}

			var openInfoWindow = function(map, content) {
				map.closeInfoWindow();
				map.infoWindow = new LBS.InfoWindow(map.getCenter(), content);
				map.infoWindow.map = map;
				var infoDiv = map.infoWindow.draw();
				if (infoDiv) {
					infoDiv.style.zIndex = map.Z_INDEX_BASE['InfoWindow'];
					map.layerContainerDiv.appendChild(infoDiv);
				}
			}

			if (isWithinPolygon(polygon, point)) {
				var pts = getPoints(polygon.latlngs);
				openInfoWindow(this._Map, pts);
			}
		}
	},

	convertCoords2Wkt : function(coords) {
		var wkt = coords.split(",");
		var type = ((wkt[0].split(":"))[1].split("_"))[0];

		switch (type) {
		case "POINT":
		case "PT":
			wkt = "POINT ("
					+ wkt[1].replace(";", " ").replace(/[A-Za-z:$]/g, "") + ")";
			break;

		case "LINER":
			wkt = wkt[1].replace(" ", "");
			var points = "";
			var index = wkt.indexOf(";");
			var i = 0;
			while (index > 0) {
				points += wkt.substring(0, index) + (++i % 2 ? " " : ", ");
				wkt = wkt.substring(index + 1, wkt.length);
				index = wkt.indexOf(";");
			}
			wkt = "LINESTRING (" + points + wkt + ")";
			break;

		case "POINTS":
			wkt = wkt[1].replace(" ", "");
			var points = "";
			var index = wkt.indexOf(";");
			var i = 0;
			while (index > 0) {
				points += wkt.substring(0, index) + (++i % 2 ? " " : ", ");
				wkt = wkt.substring(index + 1, wkt.length);
				index = wkt.indexOf(";");
			}
			wkt = "MULTIPOINT (" + points + wkt + ")";
			break;

		case "POLYGON":
			wkt = wkt[1].replace(" ", "");
			var points = "";
			var index = wkt.indexOf(";");
			var i = 0;
			while (index > 0) {
				points += wkt.substring(0, index) + (++i % 2 ? " " : ", ");
				wkt = wkt.substring(index + 1, wkt.length);
				index = wkt.indexOf(";");
			}
			wkt = "POLYGON ((" + points + wkt + "))";
			break;
		}

		return wkt.replace(/( )(?=\1)/gi, "");
	}
};