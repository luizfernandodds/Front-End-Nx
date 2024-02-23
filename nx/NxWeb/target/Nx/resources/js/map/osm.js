/**
 * Map Prototype class
 * 
 */
var container = document.getElementById('popup');
var content = document.getElementById('popup-content');
var closer = document.getElementById('popup-closer');
var popup;

var overlay = new ol.Overlay({
	element: container,
	autoPan: true,
	autoPanAnimation: {
		duration: 250,
	},
});


MapController.prototype = {

	Provider: function() {
		return "OSM";
	},


	init: function() {

		var options = {
			projection: new ol.proj.Projection("EPSG:900913"),
			displayProjection: new ol.proj.Projection("EPSG:4326"),
			units: "m",

			tileOptions: {
				crossOriginKeyword: null
			},

			numZoomLevels: 20,
			controls: [new ol.control.Zoom(),
			new ol.control.ScaleLine({
				bottomOutUnits: "",
				bottomInUnits: ""
			}), new ol.control.MousePosition(),
			new ol.control.Attribution()]

		};

		MapController.prototype._Map = new ol.Map(
			this._configure.mapDiv,
			options
		);

		// Layers
		var layers = [
			new ol.layer.Tile({
				title: 'terrain-background',
				source: new ol.source.OSM({
					attributions: [
						ol.source.OSM.ATTRIBUTION
					],
					url: 'http://119.8.80.198:8080/styles/klokantech-basic/{z}/{x}/{y}.png',
					crossOrigin: null
				})
			})
		];

		popup = new ol.Overlay.Popup({
			popupClass: "default", //"tooltips", "warning" "black" "default", "tips", "shadow",
			closeBox: true,
			onshow: function() { console.log("You opened the box"); },
			onclose: function() { console.log("You close the box"); },
			positioning: 'auto',
			autoPan: true,
			autoPanAnimation: { duration: 250 },
			minibar: true
		});



		this._Map = new ol.Map({
			target: 'map_canvas',
			loadTilesWhileInteracting: true,
			layers: layers,
			overlays: [overlay, popup],
			controls: ol.control.defaults({ attribution: false }),
			view: new ol.View({
				center: ol.proj.fromLonLat([-49.888, -17.151]),
				zoom: 4
			}),
			events: {
				"loadend": MapLayer.load()
			},
		});

		console.log('INIT');

		return this._Map;
	},

	load: function() {

		console.log('load');

		for (var i in MapController.prototype._configure.mapButtons) {

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
	zoom: function(zoom) {
		zoom = this.getWkt(zoom);

		console.log('zoom getWkt: ' + zoom);

		if ($.type(zoom) == "number") {
			this._Map.zoomTo(zoom);
		} else {
			var indexStart = zoom.indexOf("(") + 1;
			var type = $.trim(zoom.substring(0, indexStart)).replace(/\ |\(|\)|,/g, "");

			console.log('zoom type: ' + type);
			var wkt = zoom.replace(type, "").replace('(', '[').replace(')', ']');
			console.log('wkt: ' + wkt);

			console.log('DEPOIS DO TESTE');

			var format = new ol.format.WKT();

			var feature = format.readFeature(zoom, {
			});

			var coordinate = feature.getGeometry().getCoordinates();
			console.log('coordinate: ' + coordinate[0]);

			var teste = ol.proj.fromLonLat([coordinate])
			console.log('teste.latitude: ' + teste[0]);

			switch (type) {
				case "POINT":
					this._Map.getView().animate({ center: ol.proj.fromLonLat([coordinate[0], coordinate[1]]) }, { zoom: 13 });
					break;
				case "LINESTRING":
				case "MULTIPOINT":
				case "POLYGON":
					this._Map.getView().animate({ center: ol.proj.fromLonLat([-49.276021, -18.105094]) }, { zoom: 4 });
					break;
				default:
					console.log("ZOOM[" + type + "][" + zoom + "]");
			}
		}
	},

	/**
	 * Adicionar PIN no mapa
	 * 
	 * @param obj
	 *          Position Object
	 */
	addMarker: function(obj, config) {
		console.log('addMarker');

		closer.onclick = function() {
			overlay.setPosition(undefined);
			closer.blur();
			return false;
		};

		var iconWidth = config.icon != 20 ? 40 : 16;
		var iconHeigth = config.icon != 20 ? 40 : 16;
		iconWidth += obj.index ? 19 : 0;
		iconHeigth += obj.index ? 7 : 0;

		if (typeof obj.deviceId === "undefined") {
			return;
		}


		config.shift = 0;
		var balloon = this.getBalloon(obj, config);

		balloon.name = obj.deviceId;

		console.log('obj.longitude: ' + obj.longitude);
		console.log('obj.latitude: ' + obj.latitude);

		var layer = new ol.layer.Vector({
			source: new ol.source.Vector({
				projection: 'EPSG:3857',
				features: [
					new ol.Feature({
						geometry: new ol.geom.Point(ol.proj.fromLonLat([obj.longitude, obj.latitude])),
						name: obj.deviceId,
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

		var iconFeature = new ol.Feature({
			geometry: new ol.geom.Point(ol.proj.fromLonLat([obj.longitude, obj.latitude])),
			name: obj.deviceId,
			type: 'click',
		});

		var size = [iconWidth, iconHeigth];
		var offset = [0, 0]

		var iconStyle = new ol.style.Style({
			image: new ol.style.Icon({
				anchor: [0.5, 6],
				anchorXUnits: 'fraction',
				anchorYUnits: 'pixels',
				src: balloon.icon,
				offset: offset,
				size: size
			}),
		});

		iconFeature.setStyle(iconStyle);

		var vectorSource = new ol.source.Vector({
			features: [iconFeature],
		});

		var vectorLayer = new ol.layer.Vector({
			id: obj.deviceId,
			source: vectorSource,
		});


		this._Map.addLayer(vectorLayer);

		var lonLatMarker = new ol.geom.Point(ol.proj.fromLonLat([obj.longitude, obj.latitude]));
		var layerId = new String(obj.deviceId + "" + obj.gpsTime);

		var feature = new ol.Feature(vectorLayer, lonLatMarker);
		feature.closeBox = true;
		feature.id = obj.deviceId;



		//this._Map.getView().fit(vectorSource.getExtent(), this._Map.getSize());

		this._Map.on('click', function(evt) {
			console.log('Click');
			this.forEachFeatureAtPixel(evt.pixel, function(feature, layer) {
				let clickedCoordinate = evt.coordinate;
				let clickedFeatureName = feature.get('name');

				if (balloon.name == clickedFeatureName) {
					popup.show(feature.getGeometry().getFirstCoordinate(), balloon.html);
				}

			})
		})
	},


	reset: function() {
		//		this._Map.setLayerGroup(new ol.layer.Group());
		console.log('reset');
		for (i in this._Map._layers) {

			console.log('this._Map._layers[i]._path: ' + this._Map._layers[i]._path);
			if (this._Map._layers[i]._path != undefined) {
				console.log('Vai limpar');
				try { this._Map.removeLayer(map._layers[i]) } catch (e) { }
			}
		}

	},

	addControlPoint: function(value, radius, name) {
		console.log('addControlPoint');
		var wkt = this.getWkt(value);

		console.log('value--: ' + value);
		console.log('wkt: ' + wkt);

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

		var vectorSource = new ol.source.Vector({
		});

//		var vectorLayer = new ol.layer.Vector({
//			source: vectorSource,
//		});

		var vectorLayer = new ol.layer.Vector({
			source: vectorSource,
			style: new ol.style.Style({
				fill: new ol.style.Fill({
					color: 'rgba(255, 255, 255, 0.2)',
				}),
				stroke: new ol.style.Stroke({
					color: '#ffcc33',
					width: 2,
				}),
				image: new ol.style.Circle({
					radius: 7,
					fill: new ol.style.Fill({
						color: '#ffcc33',
					}),
				}),
			}),
		});


		this._Map.addLayer(vectorLayer);
		
		var modify = new ol.interaction.Modify({ source: vectorSource });
		this._Map.addInteraction(modify);
		var typeSelect = document.getElementById('type');

		console.log('typeSelect: ' + typeSelect);

		var draw, snap; // global so we can remove them later
		draw = new ol.interaction.Draw({
			source: vectorSource,
			type: typeSelect.value,
		});
		this._Map.addInteraction(draw);
		snap = new ol.interaction.Snap({ source: vectorSource });
		this._Map.addInteraction(snap);		
		
		/**
		* Handle change event.
		*/
		typeSelect.onchange = function () {
		  this._Map.removeInteraction(draw);
		  this._Map.removeInteraction(snap);
		}
		

	},
};

