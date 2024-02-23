/**
 * INGA Map Prototype class
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
    var options = {
      projection : new OpenLayers.Projection("EPSG:900913"),
      displayProjection : new OpenLayers.Projection("EPSG:4326"),
      units : "m",

      tileOptions : {
        crossOriginKeyword : null
      },

      numZoomLevels : 20,
      controls : [ new OpenLayers.Control.Zoom(),
          new OpenLayers.Control.ScaleLine({
            bottomOutUnits : "",
            bottomInUnits : ""
          }), new OpenLayers.Control.MousePosition(),
          new OpenLayers.Control.Attribution(),
          new OpenLayers.Control.KeyboardDefaults() ]
    };

    MapController.prototype._Map = new OpenLayers.Map(this._configure.mapDiv,
        options);

    this._Map.addLayer(new OpenLayers.Layer.Vector("VectorLayer", {
      styleMap : this.styleMap()
    }));
    this._Map.addLayer(new OpenLayers.Layer.Markers("PositionMarker"));

    /* *********************** Style Controls ***************************** */
    var styleClass = ".olControlAttribution { bottom: 0px;} .olControlMousePosition { bottom: 12px !important; }";

    styleClass += ".olControlEditingToolbar { top: 60px !important; left: 5px !important; height : 100% !important; width: 27px !important; position: absolute !important; z-index: 905 !important;}";
    styleClass += ".olControlEditingToolbar div { float: left !important; }";

    styleClass += ".olControlSwitchLayerToolbar { top: 10px !important; right: 5px !important; height : 27px !important; width: 50% !important; position: absolute !important; }";
    styleClass += ".olControlSwitchLayerToolbar div { float: right !important; }";

    styleClass += ".SwitcherIkonnButtonClassItemActive { cursor: pointer; "
        + "background-image: url("
        + this._AppPath
        + " !important; background-size: 60px 20px !important; background-repeat: no-repeat; height : 20px !important; width: 65px !important; } ";
    styleClass += ".SwitcherIkonnButtonClassItemInactive { cursor: pointer; "
        + "background-image: url("
        + this._AppPath
        + "/resources/images/map/map_ikonn_deactivated.png) !important; background-size: 60px 20px !important; background-repeat: no-repeat; height : 20px !important; width: 65px !important; } ";
    styleClass += ".SwitcherGoogleButtonClassItemActive { cursor: pointer; "
        + "background-image: url("
        + this._AppPath
        + "/resources/images/map/map_google_activated.png) !important; background-size: 60px 20px !important; background-repeat: no-repeat; height : 20px !important; width: 65px !important; } ";
    styleClass += ".SwitcherGoogleButtonClassItemInactive { cursor: pointer; "
        + "background-image: url("
        + this._AppPath
        + "/resources/images/map/map_google_deactivated.png) !important; background-size: 60px 20px !important; background-repeat: no-repeat; height : 20px !important; width: 65px !important; } ";
    styleClass += ".SwitcherHybridButtonClassItemActive { cursor: pointer; "
        + "background-image: url("
        + this._AppPath
        + "/resources/images/map/map_hybrid_activated.png) !important; background-size: 60px 20px !important; background-repeat: no-repeat; height : 20px !important; width: 65px !important; } ";
    styleClass += ".SwitcherHybridButtonClassItemInactive { cursor: pointer; "
        + "background-image: url("
        + this._AppPath
        + "/resources/images/map/map_hybrid_deactivated.png) !important; background-size: 60px 20px !important; background-repeat: no-repeat; height : 20px !important; width: 65px !important; } ";

    styleClass += ".olPopupCloseBox { background-image: url(\"/javax.faces.resource/images/ui-icons_898989_256x240.png.jsf?ln=primefaces-aristo\") !important; background-position: -96px -130px !important; }";

    styleClass += ".olControlNavigationItemActive { background-image: url("
        + this._AppPath
        + "resources/images/map/tools/map_hand_activated.png) !important; background-repeat: no-repeat; background-size: 24px 22px !important; background-position: 0px 0px !important; }";
    styleClass += ".olControlNavigationItemInactive { background-image: url("
        + this._AppPath
        + "resources/images/map/tools/map_hand_deactivated.png) !important; background-repeat: no-repeat; background-size: 24px 22px !important; background-position: 0px 0px !important; }";

    styleClass += ".olControlZoomBoxItemActive { background-image: url("
        + this._AppPath
        + "resources/images/map/tools/map_zoom_activated.png) !important; background-repeat: no-repeat; background-size: 24px 22px !important; background-position: 0px 0px !important;}";
    styleClass += ".olControlZoomBoxItemInactive { background-image: url("
        + this._AppPath
        + "resources/images/map/tools/map_zoom_deactivated.png) !important; background-repeat: no-repeat; background-size: 24px 22px !important; background-position: 0px 0px !important; }";

    $("head").append("<style type=\"text/css\">" + styleClass + "</style>");
    /* **************************************************** */

    var panelControls = [ new OpenLayers.Control.Navigation(),
        new OpenLayers.Control.ZoomBox({
          alwaysZoom : true
        }) ];
    var panel = new OpenLayers.Control.Panel({
      displayClass : 'olControlEditingToolbar',
      defaultControl : panelControls[0]
    });
    panel.addControls(panelControls);
    this._Map.addControl(panel);

    var ikonnLayer = new OpenLayers.Layer.OSM("Monitoramento",
        "http://maps.paranagr.com.br/styles/osm-bright/${z}/${x}/${y}.png", {
          attribution : "&copy; Monitoramento ",
          layers : 'basic',
          events : {
            "loadend" : MapLayer.load()
          } 
        });

    // Google Free
    // * up to 25,000 map loads per day for each API up to 2,500 map loads per
    // * day that have been modified using the Styled Maps feature
    var googleMaps = new OpenLayers.Layer.Google("Google", {
      type : google.maps.MapTypeId.ROADMAP,
      numZoomLevels : 20
    });
    var googleHybrid = new OpenLayers.Layer.Google("Google Hibrido", {
      type : google.maps.MapTypeId.HYBRID,
      numZoomLevels : 20
    });
    this._Map.addLayers([ ikonnLayer, googleMaps, googleHybrid ]);

    /* *************** Layer Switcher Panel ***************** */
    var switcher =  new OpenLayers.Control.Button({
      displayClass : "SwitcherIkonnButtonClass",
      type : OpenLayers.Control.TYPE_TOOL,
      title : "Mapa Monitoramento",
      eventListeners : {
        activate : function() {
          MapController.prototype._Map.setBaseLayer(ikonnLayer);
          MapController.prototype._Map.updateSize();
        }
      }
    });
    
    panel = new OpenLayers.Control.Panel({
      displayClass : 'olControlSwitchLayerToolbar',
      defaultControl : switcher[2]
    });
    panel.addControls(switcher);
    this._Map.addControl(panel);
    /* *************** Layer Switcher Panel ***************** */

    this._Map.setCenter(new OpenLayers.LonLat(this._configure.centerLong,
        this._configure.centerLat).transform(new OpenLayers.Projection(
        "EPSG:4326"), this._Map.getProjectionObject()), 4);

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

      this.addButton(MapController.prototype._configure.mapButtons[i]);
    }

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

  /**
   * Limpa o mapa e volta os botoes ao estado inicial
   */
  reset : function() {
    this.drawClear();

    var controlsButtons = this._Map
        .getControlsByClass("OpenLayers.Control.Panel");
    for ( var i in controlsButtons) {
      if (controlsButtons[i].displayClass === "olControlSwitchLayerToolbar")
        continue;
      var currControls = controlsButtons[i].controls;
      for ( var j in currControls) {
        if (currControls[j].autoActivate == true) {
          currControls[j].activate();
        } else {
          currControls[j].deactivate();
        }
      }
    }
  },

  resetButton : function() {
    var controlsButtons = this._Map
        .getControlsByClass("OpenLayers.Control.Panel");
    for ( var i in controlsButtons) {
      if (controlsButtons[i].displayClass === "olControlSwitchLayerToolbar")
        continue;
      var currControls = controlsButtons[i].controls;
      for ( var j in currControls) {
        if (currControls[j].autoActivate == true) {
          currControls[j].activate();

        } else {
          currControls[j].deactivate();
        }
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

    if ($.type(zoom) == "number") {
      this._Map.zoomTo(zoom);
    } else {
      var indexStart = zoom.indexOf("(") + 1;
      var type = $.trim(zoom.substring(0, indexStart)).replace(/\ |\(|\)|,/g,
          "");

      switch (type) {
      case "POINT":
      case "LINESTRING":
      case "MULTIPOINT":
      case "POLYGON":
        this._Map.zoomToExtent((OpenLayers.Geometry.fromWKT(zoom).transform(
            new OpenLayers.Projection("EPSG:4326"), this._Map
                .getProjectionObject())).getBounds());
        break;
      default:
        console.log("ZOOM[" + type + "][" + zoom + "]");
      }
    }
  },

  /**
   * Define como o novo centro do mapa as coordenadas passadas por parametro no
   * zoom atual.
   * 
   * @param long
   *          longitude definida como centro do mapa;
   * @param lat
   *          latitude definida como centro do mapa;
   */
  center : function(long, lat) {
    this._Map.setCenter(new OpenLayers.LonLat(long, lat)
        .transform(new OpenLayers.Projection("EPSG:4326"), this._Map
            .getProjectionObject()));
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
    var lonlat = MapController.prototype._Map
        .getLonLatFromPixel(MapController.prototype._Map
            .getControlsByClass("OpenLayers.Control.MousePosition")[0].lastXy);
    var lonLatMarker = new OpenLayers.LonLat(lonlat.lon, lonlat.lat)
        .transform(this._Map.getProjectionObject(), new OpenLayers.Projection(
            "EPSG:4326"));
    return "POINT (" + lonLatMarker.lon + " " + lonLatMarker.lat + ")";
  },

  /**
   * Adiciona um botao no mapa com as coordenadas, dimensoes e as definicoes
   * passadas por parametro.
   * 
   * @param configuration
   *          Object
   */
  addButton : function(conf) {
    var styleClass = "." + conf.name
        + "_ButtonClassItemActive { cursor: pointer; "
        + "background-image: url(" + this._AppPath + conf.imgOn
        + ") !important; background-size: 24px 22px !important; } ";

    styleClass += "." + conf.name
        + "_ButtonClassItemInactive { cursor: pointer; "
        + "background-image: url(" + this._AppPath + conf.imgOff
        + ") !important; background-size: 24px 22px !important; } ";

    $("head").append("<style type=\"text/css\">" + styleClass + "</style>");

    var panel = this._Map.getControlsByClass("OpenLayers.Control.Panel")[0];

    var button = new OpenLayers.Control.Button({
      displayClass : conf.name + "_ButtonClass",
      // OpenLayers.Control.TYPE_TOGGLE
      // OpenLayers.Control.TYPE_TOOL
      type : !conf.type ? OpenLayers.Control.TYPE_TOOL
          : OpenLayers.Control["TYPE_" + conf.type],
      title : conf.alt,
      eventListeners : {
        activate : function() {
          eval(conf.funcOn);
        },
        deactivate : function() {
          eval(conf.funcOff);
        }
      }
    });
    panel.addControls([ button ]);
  },

  /**
   * Adicionar PIN no mapa
   * 
   * @param obj
   *          Position Object
   */
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

    var lonLatMarker = new OpenLayers.LonLat(obj.longitude, obj.latitude)
        .transform(new OpenLayers.Projection("EPSG:4326"), this._Map
            .getProjectionObject());

    var layerId = new String(obj.deviceId + "" + obj.gpsTime);
    var markersLayer = this._Map.getLayersByName("PositionMarker")[0];
    var size = new OpenLayers.Size(iconWidth, iconHeigth);
    var offset = new OpenLayers.Pixel(-(size.w / 2), -size.h
        + (config.icon == 20 ? iconHeigth / 2 : 0));
    var olicon = new OpenLayers.Icon(balloon.icon, size, offset);
    var marker = new OpenLayers.Marker(lonLatMarker, olicon);
    var feature = new OpenLayers.Feature(markersLayer, lonLatMarker);
    feature.closeBox = true;
    feature.data.popupContentHTML = balloon.html;
    feature.data.overflow = "hidden";
    feature.id = obj.deviceId;
    marker.feature = feature;
    marker.id = layerId;

    var markerClick = function(evt) {
      if (this.popup == null) {
        this.popup = MapController.prototype.popUpCreate(marker, null,
            iconHeigth);
        MapController.prototype._Map.addPopup(this.popup);
        this.popup.show();
      } else {
        MapController.prototype.popUpCreate(marker, this.popup, iconHeigth);
        this.popup.toggle();
      }
      OpenLayers.Event.stop(evt);
    };

    if (markersLayer!=null && markersLayer.markers!=null && markersLayer.markers.length == 0) {
      this._Map.events.register("zoomend", markersLayer, function(evt) {
        MapController.prototype.popUpCreate(null,
            MapController.prototype._Map.popups, iconHeigth);
      });
    }
    marker.events.register("mousedown", feature, markerClick);
    markersLayer.addMarker(marker);
  },

  removeMarker : function(obj) {
    if (typeof obj.deviceId === "undefined")
      return;

    var layerId = new String(obj.deviceId + "" + obj.gpsTime);
    var markersLayer = this._Map.getLayersByName("PositionMarker")[0];
    var markers = markersLayer.markers;
    for ( var i in markers) {
      if (markers[i].id.toString() == layerId) {
        markersLayer.removeMarker(markers[i]);
      }
    }
  },

  removeDraw : function(id) {
    var vectorLayers = this._Map.getLayersByName("VectorLayer");

    for ( var i in vectorLayers) {
      var features = vectorLayers[i].features;
      for ( var j in features) {
        if (features[j].id.toString() == id) {
          vectorLayers[i].removeFeatures(features[j]);
          return;
        }
      }
    }
  },

  drawPoint : function(id) {
			console.log('drawPoint');

    if (document.getElementById(id).value != ""
        && document.getElementById(id).value != null) {
      this.drawClear();
      this.addPoint(id);
      return false;
    }
    var vectorLayer = this._Map.getLayersByName("VectorLayer")[0];
    var control = new OpenLayers.Control.DrawFeature(vectorLayer,
        OpenLayers.Handler.Point);

    var wktFormat = this.wktFormater();

    this._Map.addControl(control);
    control.events.on({
      featureadded : function(args) {
        control.deactivate();
        MapController.prototype._Map.removeControl(control);
        control.destroy();
        document.getElementById(id).value = wktFormat.write(args.feature);
      }
    });
    control.activate();

    var editor = new OpenLayers.Control.ModifyFeature(vectorLayer);
    this._Map.addControl(editor);
    vectorLayer.events.on({
      afterfeaturemodified : function(args) {
        document.getElementById(id).value = wktFormat.write(args.feature);
      }
    });
    editor.activate();
  },

  addPoint : function(value, name) {
    var wkt = this.getWkt(value);
    var vectorLayer = this._Map.getLayersByName("VectorLayer")[0];

    var wktFormat = this.wktFormater();

    if (!this.isWkt(value)) {
      var editor = new OpenLayers.Control.ModifyFeature(vectorLayer);
      this._Map.addControl(editor);
      vectorLayer.events.on({
        afterfeaturemodified : function(args) {
          document.getElementById(value).value = wkt = wktFormat
              .write(args.feature);
        }
      });
      editor.activate();
    }

    if (typeof name === 'undefined')
      name = "POINT_" + Math.round((new Date()).getTime());
    var feature = wktFormat.read(wkt);
    feature.id = name;

    vectorLayer.addFeatures(feature);
  },

  drawControlPoint : function(id1, id2) {
	console.log('drawControlPoint');
    if (document.getElementById(id1).value != ""
        && document.getElementById(id1).value != null) {
      this.drawClear();
      this.addControlPoint(id1, id2);
      return false;
    }
    var vectorLayer = this._Map.getLayersByName("VectorLayer")[0];

    var control = new OpenLayers.Control.DrawFeature(vectorLayer,
        OpenLayers.Handler.Point);

    var wktFormat = this.wktFormater();
    var radius = document.getElementById(id2).value;
    if (radius == null || radius == "")
      document.getElementById(id2).value = radius = 100;

    this._Map.addControl(control);
    control.events.on({
      featureadded : function(args) {
        control.deactivate();
        MapController.prototype._Map.removeControl(control);
        control.destroy();
        document.getElementById(id1).value = wktFormat.write(args.feature);
        vectorLayer.removeFeatures(args.feature);
        var sphere = new OpenLayers.Geometry.Polygon.createRegularPolygon(
            args.feature.geometry, radius, 40, 0);
        vectorLayer.addFeatures([ new OpenLayers.Feature.Vector(sphere) ]);
      }
    });
    control.activate();

    var editor = new OpenLayers.Control.ModifyFeature(vectorLayer);
    this._Map.addControl(editor);
    vectorLayer.events.on({
      afterfeaturemodified : function(args) {
        document.getElementById(id1).value = wktFormat
            .extractGeometry(args.feature.geometry.getCentroid());
        document.getElementById(id2).value = parseInt(0.565352 * Math
            .sqrt(args.feature.geometry.getArea()));
      }
    });
    editor.activate();
    editor.mode = OpenLayers.Control.ModifyFeature.DRAG;
    editor.mode |= OpenLayers.Control.ModifyFeature.RESIZE;
  },

  addControlPoint : function(value, radius, name) {
    var wkt = this.getWkt(value);

    var vectorLayer = this._Map.getLayersByName("VectorLayer")[0];

    var wktFormat = this.wktFormater();

    if (!this.isWkt(value) && !this.isWkt(radius)) {

      var editor = new OpenLayers.Control.ModifyFeature(vectorLayer);
      this._Map.addControl(editor);
      vectorLayer.events
          .on({
            featuremodified : function(args) {
              document.getElementById(value).value = wktFormat
                  .extractGeometry(args.feature.geometry.getCentroid());

              document.getElementById(radius).value = wkt = parseInt(0.565352 * Math
                  .sqrt(args.feature.geometry.getArea()));

            }
          });

      editor.activate();
      editor.mode = OpenLayers.Control.ModifyFeature.DRAG;
      editor.mode |= OpenLayers.Control.ModifyFeature.RESIZE;

    }

    var sphere = new OpenLayers.Geometry.Polygon.createRegularPolygon(
        OpenLayers.Geometry.fromWKT(wkt).transform(
            new OpenLayers.Projection("EPSG:4326"),
            this._Map.getProjectionObject()), this.getWkt(radius), 40, 0);

    if (typeof name === 'undefined')
      name = "POC_" + Math.round((new Date()).getTime());
    var feature = new OpenLayers.Feature.Vector(sphere);
    feature.id = name;

		console.log('addControlPoint wkt depois 2: '+wkt);

    vectorLayer.addFeatures(feature);
  },

  drawPolygon : function(id) {
    if (document.getElementById(id).value != ""
        && document.getElementById(id).value != null) {
      this.drawClear();
      this.addPolygon(id);
      return false;
    }
    var vectorLayer = this._Map.getLayersByName("VectorLayer")[0];
    var control = new OpenLayers.Control.DrawFeature(vectorLayer,
        OpenLayers.Handler.Polygon);

    var wktFormat = this.wktFormater();

    this._Map.addControl(control);
    control.events.on({
      featureadded : function(args) {
        control.deactivate();
        MapController.prototype._Map.removeControl(control);
        control.destroy();
        document.getElementById(id).value = wktFormat.write(args.feature);
      }
    });
    control.activate();

    var editor = new OpenLayers.Control.ModifyFeature(vectorLayer);
    this._Map.addControl(editor);
    vectorLayer.events.on({
      afterfeaturemodified : function(args) {
        document.getElementById(id).value = wktFormat.write(args.feature);
      }
    });
    editor.activate();
    editor.mode = OpenLayers.Control.ModifyFeature.DRAG;
    editor.mode |= OpenLayers.Control.ModifyFeature.ROTATE;
    editor.mode |= OpenLayers.Control.ModifyFeature.RESHAPE;
  },

  addPolygon : function(value, name) {
    var wkt = this.getWkt(value);
    var vectorLayer = this._Map.getLayersByName("VectorLayer")[0];

    var wktFormat = this.wktFormater();

    if (!this.isWkt(value)) {
      var editor = new OpenLayers.Control.ModifyFeature(vectorLayer);
      this._Map.addControl(editor);
      vectorLayer.events.on({
        afterfeaturemodified : function(args) {
          document.getElementById(value).value = wkt = wktFormat
              .write(args.feature);
        }
      });
      editor.activate();
      editor.mode = OpenLayers.Control.ModifyFeature.DRAG;
      editor.mode |= OpenLayers.Control.ModifyFeature.ROTATE;
      editor.mode |= OpenLayers.Control.ModifyFeature.RESHAPE;
    }

    if (typeof name === 'undefined')
      name = "POLYGON_" + Math.round((new Date()).getTime());
    var feature = wktFormat.read(wkt);
    feature.id = name;

    vectorLayer.addFeatures(feature);
  },

  drawLine : function(id) {
    if (document.getElementById(id).value != ""
        && document.getElementById(id).value != null) {
      this.drawClear();
      this.addLine(id);
      return false;
    }
    var vectorLayer = this._Map.getLayersByName("VectorLayer")[0];
    var control = new OpenLayers.Control.DrawFeature(vectorLayer,
        OpenLayers.Handler.Path, {
          persist : true,
          handlerOptions : {
            layerOptions : {
              styleMap : vectorLayer.styleMap
            }
          }
        });
    var wktFormat = this.wktFormater();

    this._Map.addControl(control);
    control.events.on({
      featureadded : function(args) {
        control.deactivate();
        MapController.prototype._Map.removeControl(control);
        control.destroy();
        document.getElementById(id).value = wktFormat.write(args.feature);
      }
    });
    control.activate();

    var editor = new OpenLayers.Control.ModifyFeature(vectorLayer);
    this._Map.addControl(editor);
    vectorLayer.events.on({
      afterfeaturemodified : function(args) {
        document.getElementById(id).value = wktFormat.write(args.feature);
      }
    });
    editor.activate();
  },

  addLine : function(value, name) {
	
    var wkt = this.getWkt(value);

    var vectorLayer = this._Map.getLayersByName("VectorLayer")[0];
    var wktFormat = this.wktFormater();

    if (!this.isWkt(value)) {
      var editor = new OpenLayers.Control.ModifyFeature(vectorLayer);
      this._Map.addControl(editor);
      vectorLayer.events.on({
        afterfeaturemodified : function(args) {
          document.getElementById(value).value = wkt = wktFormat
              .write(args.feature);
        }
      });
      editor.activate();

      // vectorLayer.addFeatures(new OpenLayers.Feature.Vector(this.lineRadius(
      // wktFormat.read(wkt).geometry, radius)));
    }

    if (typeof name === 'undefined')
      name = "LINE_" + Math.round((new Date()).getTime());

	if(wkt != ''){
	    var feature = wktFormat.read(wkt);

	    feature.id = name;
	
	var lineStyle = OpenLayers.Util.applyDefaults(lineStyle, OpenLayers.Feature.Vector.style['default']);
	lineStyle.strokeColor = "#62BD69";
	lineStyle.strokeWidth = 5;
	feature.style = lineStyle;

	    vectorLayer.addFeatures(feature);
	}

  },

  //adiciona linha mas não permite alteração
  addLineSen : function(value, name) {
	
    var wkt = this.getWkt(value);

    var vectorLayer = this._Map.getLayersByName("VectorLayer")[0];
    var wktFormat = this.wktFormater();

    if (typeof name === 'undefined')
      name = "LINE_" + Math.round((new Date()).getTime());

	if(wkt != ''){
	    var feature = wktFormat.read(wkt);

	    feature.id = name;
	
	var lineStyle = OpenLayers.Util.applyDefaults(lineStyle, OpenLayers.Feature.Vector.style['default']);
	lineStyle.strokeColor = "#62BD69";
	lineStyle.strokeWidth = 5;
	feature.style = lineStyle;

	    vectorLayer.addFeatures(feature);
	}

  },

  drawRoute : function(id1, id2, id3, id4) {
	
    if (document.getElementById(id1).value != ""
        && document.getElementById(id1).value != null) {
      this.drawClear();
      this.addRoute(id1, id2, id3, id4);
      return false;
    }

    var vectorLayer = this._Map.getLayersByName("VectorLayer")[0];
    var control = new OpenLayers.Control.DrawFeature(vectorLayer,
        OpenLayers.Handler.Point);

    var multiPoints = new OpenLayers.Geometry.MultiPoint();
    var wktFormat = this.wktFormater();
    var multiPointRoute = new Array();

    this._Map.addControl(control);

    control.events.on({
      featureadded : function(args) {
	
        multiPointRoute.push(wktFormat.write(args.feature));
        multiPoints.addPoint(args.feature.geometry);

        if (multiPointRoute.length == 2) {
          control.destroy();
          vectorLayer.removeAllFeatures();
          MapController.prototype.osrmRoute(multiPointRoute,
              function(wktRoute, args) {
                if (wktRoute && args.status == 0) {
                  document.getElementById(id1).value = wktRoute;
                  document.getElementById(id1 + "Points").value = wktFormat
                      .write(new OpenLayers.Feature.Vector(multiPoints));
                } else {
                  document.getElementById(id1).value = wktFormat
                      .write(new OpenLayers.Feature.Vector(
                          new OpenLayers.Geometry.LineString(
                              multiPoints.components)));
                  document.getElementById(id1 + "Points").value = wktFormat
                      .write(new OpenLayers.Feature.Vector(multiPoints));
                }
                MapController.prototype.drawClear();
                MapController.prototype.addRoute(id1, id2, id3, id4);
              }, false);
        }
      }
    });
    control.activate();
  },

  addRoute : function(value1, value2, value3, value4, name) {
    var wkt = this.getWkt(value1);
    var vectorLayer = this._Map.getLayersByName("VectorLayer")[0];
    var wktFormat = this.wktFormater();

    // this.setNewStyleMap(vectorLayer, "default", [ {
    // form : "Line",
    // style : {
    // strokeWidth : 6,
    // strokeOpacity : 0.6,
    // strokeColor : "#2b54fc",
    // }
    // } ]);

    if (typeof name === 'undefined')
      name = "ROUTE_" + Math.round((new Date()).getTime());

    var radius = document.getElementById(value3).value;
    if (radius == null || radius == "")
      document.getElementById(value3).value = radius = 100;

    var osrmRouteCallbakWrite = function(wktRoute, args) {
      if (wktRoute && args.status == 0) {
        wkt = wktRoute;
        $("#" + value1.replace(/\:/g, "\\:")).val(wkt).change();
        // document.getElementById(value1).value = wkt = wktRoute;
        document.getElementById(value2).value = wktFormat
            .write(new OpenLayers.Feature.Vector(multiPoints));
        MapController.prototype.removeDraw(name);
        var feature = wktFormat.read(wktRoute);
        feature.id = name;
        vectorLayer.addFeatures(feature);
      } else {
        wkt = wktFormat.write(new OpenLayers.Feature.Vector(
            new OpenLayers.Geometry.LineString(multiPoints.components)));
        $("#" + value1.replace(/\:/g, "\\:")).val(wkt).change();
        // document.getElementById(value1).value = wkt = wktFormat.write(new
        // OpenLayers.Feature.Vector(new
        // OpenLayers.Geometry.LineString(multiPoints.components)));
        document.getElementById(value2).value = wktFormat
            .write(new OpenLayers.Feature.Vector(multiPoints));
        MapController.prototype.removeDraw(name);
        var feature = wktFormat.read(document.getElementById(value1).value);
        feature.id = name;
        vectorLayer.addFeatures(feature);
      }
      // ///////////////////
      var directions = new Array();
      directions["0"] = ""; // Unknown instruction
      directions["1"] = osrm_continue;
      directions["2"] = osrm_turn_slight_right;
      directions["3"] = osrm_turn_right;
      directions["4"] = osrm_turn_sharp_right;
      directions["5"] = osrm_u_turn;
      directions["6"] = osrm_turn_sharp_left;
      directions["7"] = osrm_turn_left;
      directions["8"] = osrm_turn_slight_left;
      directions["9"] = osrm_waypoint_trip;
      directions["10"] = osrm_go;
      directions["11-1"] = osrm_first_exit;
      directions["11-2"] = osrm_second_exit;
      directions["11-3"] = osrm_third_exit;
      directions["11-4"] = osrm_forth_exit;
      directions["11-5"] = osrm_fifth_exit;
      directions["11-6"] = osrm_sixth_exit;
      directions["11-7"] = osrm_seventh_exit;
      directions["11-8"] = osrm_eighth_exit;
      directions["11-9"] = osrm_nineth_exit;
      directions["15"] = osrm_reached_destination;

      var directionsImage = new Array();
      directionsImage["0"] = ""; // Unknown instruction
      directionsImage["1"] = "<img height=\"16\" width=\"16\" src=\""
          + MapController.prototype._AppPath
          + "resources/images/map/osrm/continue.png\" />"; // osrm_continue;
      directionsImage["2"] = "<img height=\"16\" width=\"16\" src=\""
          + MapController.prototype._AppPath
          + "resources/images/map/osrm/slight-right.png\" />"; // osrm_turn_slight_right;
      directionsImage["3"] = "<img height=\"16\" width=\"16\" src=\""
          + MapController.prototype._AppPath
          + "resources/images/map/osrm/turn-right.png\" />"; // osrm_turn_right;
      directionsImage["4"] = "<img height=\"16\" width=\"16\" src=\""
          + MapController.prototype._AppPath
          + "resources/images/map/osrm/sharp-right.png\" />"; // osrm_turn_sharp_right;
      directionsImage["5"] = "<img height=\"16\" width=\"16\" src=\""
          + MapController.prototype._AppPath
          + "resources/images/map/osrm/u-turn.png\" />"; // osrm_u_turn;
      directionsImage["6"] = "<img height=\"16\" width=\"16\" src=\""
          + MapController.prototype._AppPath
          + "resources/images/map/osrm/sharp-left.png\" />"; // osrm_turn_sharp_left;
      directionsImage["7"] = "<img height=\"16\" width=\"16\" src=\""
          + MapController.prototype._AppPath
          + "resources/images/map/osrm/turn-left.png\" />"; // osrm_turn_left;
      directionsImage["8"] = "<img height=\"16\" width=\"16\" src=\""
          + MapController.prototype._AppPath
          + "resources/images/map/osrm/slight-left.png\" />"; // osrm_turn_slight_left;
      directionsImage["9"] = "<img height=\"16\" width=\"16\" src=\""
          + MapController.prototype._AppPath
          + "resources/images/map/osrm/continue.png\" />"; // osrm_waypoint_trip;
      directionsImage["10"] = "<img height=\"16\" width=\"16\" src=\""
          + MapController.prototype._AppPath
          + "resources/images/map/osrm/target.png\" />"; // osrm_go;
      directionsImage["11-1"] = "<img height=\"16\" width=\"16\" src=\""
          + MapController.prototype._AppPath
          + "resources/images/map/osrm/round-about.png\" />"; // osrm_first_exit;
      directionsImage["11-2"] = "<img height=\"16\" width=\"16\" src=\""
          + MapController.prototype._AppPath
          + "resources/images/map/osrm/round-about.png\" />"; // osrm_second_exit;
      directionsImage["11-3"] = "<img height=\"16\" width=\"16\" src=\""
          + MapController.prototype._AppPath
          + "resources/images/map/osrm/round-about.png\" />"; // osrm_third_exit;
      directionsImage["11-4"] = "<img height=\"16\" width=\"16\" src=\""
          + MapController.prototype._AppPath
          + "resources/images/map/osrm/round-about.png\" />"; // osrm_forth_exit;
      directionsImage["11-5"] = "<img height=\"16\" width=\"16\" src=\""
          + MapController.prototype._AppPath
          + "resources/images/map/osrm/round-about.png\" />"; // osrm_fifth_exit;
      directionsImage["11-6"] = "<img height=\"16\" width=\"16\" src=\""
          + MapController.prototype._AppPath
          + "resources/images/map/osrm/round-about.png\" />"; // osrm_sixth_exit;
      directionsImage["11-7"] = "<img height=\"16\" width=\"16\" src=\""
          + MapController.prototype._AppPath
          + "resources/images/map/osrm/round-about.png\" />"; // osrm_seventh_exit;
      directionsImage["11-8"] = "<img height=\"16\" width=\"16\" src=\""
          + MapController.prototype._AppPath
          + "resources/images/map/osrm/round-about.png\" />"; // osrm_eighth_exit;
      directionsImage["11-9"] = "<img height=\"16\" width=\"16\" src=\""
          + MapController.prototype._AppPath
          + "resources/images/map/osrm/round-about.png\" />"; // osrm_nineth_exit;
      directionsImage["15"] = "<img height=\"16\" width=\"16\" src=\""
          + MapController.prototype._AppPath
          + "resources/images/map/osrm/target.png\" />"; // osrm_reached_destination;

      if (typeof value4 !== "undefined") {
        $("#" + value4.replace(/\:/g, "\\:")).empty();
        var convertTime = function formatTime(secs) {
          var times = new Array(3600, 60, 1);
          var time = '';
          var tmp;
          for ( var i = 0; i < times.length; i++) {
            tmp = Math.floor(secs / times[i]);
            if (tmp < 1) {
              tmp = '00';
            } else if (tmp < 10) {
              tmp = '0' + tmp;
            }
            time += tmp;
            if (i < 2) {
              time += ':';
            }
            secs = secs % times[i];
          }
          return time;
        };

        if (args.route_summary.total_distance > 0) {
          $("#" + value4.replace(/\:/g, "\\:"))
              .append(
                  "<table cellspacing=\"0\" cellpadding=\"0\" style=\"width: 100%;\">");
          $("#" + value4.replace(/\:/g, "\\:")).append(
              "<tr><td colspan=\"3\"><b>" + args.route_summary.start_point
                  + " / " + args.route_summary.end_point + "</b></td></tr>");
          $("#" + value4.replace(/\:/g, "\\:")).append(
              "<tr><td colspan=\"3\"><b>" + osrm_distance + ": "
                  + (args.route_summary.total_distance / 1000).toFixed(2)
                  + " km, " + osrm_time + ": "
                  + convertTime(args.route_summary.total_time)
                  + "</b></td></tr>");

          for ( var key in args.route_instructions) {
            $("#" + value4.replace(/\:/g, "\\:"))
                .append(
                    "<tr><td><div style=\"float:left;\">"
                        + directionsImage[args.route_instructions[key][0]]
                        + "</div></td><td>"
                        + directions[args.route_instructions[key][0]]
                        + " "
                        + args.route_instructions[key][1]
                        + "</td><td> "
                        + (args.route_instructions[key][2] > 0 ? ("<div style=\"float:right;\"><b>"
                            + (args.route_instructions[key][2] / 1000)
                                .toFixed(2) + "km</b></div>")
                            : "") + "</td></tr>");
          }

          $("#" + value4.replace(/\:/g, "\\:")).append("</table>");
        }
      }
      // ///////////////////
    };

    if (!this.isWkt(value1) && !this.isWkt(value2)) {
      var vectorLayer2 = new OpenLayers.Layer.Vector("VectorLayer", {
        styleMap : this.styleMap()
      });
      this._Map.addLayer(vectorLayer2);

      var multiPoints = new OpenLayers.Geometry.MultiPoint();
      if (document.getElementById(value2).value === null
          || document.getElementById(value2).value === "") {
        var linePoints = wktFormat.read(wkt).geometry.components;
        multiPoints.addPoint(linePoints[0]);
        multiPoints.addPoint(linePoints[linePoints.length - 1]);
        // for ( var i in linePoints) {
        // multiPoints.addPoint(linePoints[i]);
        // }
        var newVerticesRoute = new Array();
        for ( var i in multiPoints.components) {
          newVerticesRoute.push(wktFormat.write(new OpenLayers.Feature.Vector(
              multiPoints.components[i])));
        }
        MapController.prototype.osrmRoute(newVerticesRoute,
            osrmRouteCallbakWrite, value4 === undefined ? false : true);
      } else {
        multiPoints = wktFormat.read(this.getWkt(value2)).geometry;
      }

      var editor2 = new OpenLayers.Control.SelectFeature(
          [ vectorLayer, vectorLayer2 ],
          {
            toggle : false,
            callbacks : {
              click : function(args) {
                if (args.layer.id === vectorLayer.id) {
                  var lonlat = MapController.prototype._Map
                      .getLonLatFromPixel(MapController.prototype._Map
                          .getControlsByClass("OpenLayers.Control.MousePosition")[0].lastXy);
                  var thisPoint = new OpenLayers.Feature.Vector(
                      new OpenLayers.Geometry.Point(lonlat.lon, lonlat.lat));

                  thisPoint.style = {
                    externalGraphic : MapController.prototype._AppPath
                        + "resources/images/map/pin_yellow.png",
                    graphicWidth : 20,
                    graphicHeight : 32,
                    graphicYOffset : -30
                  };

                  vectorLayer2.addFeatures(thisPoint);

                  var lineStringMultiPoints = new OpenLayers.Geometry.LineString(
                      multiPoints.getVertices());
                  var closest = lineStringMultiPoints.distanceTo(
                      thisPoint.geometry, {
                        details : true
                      });
                  var closestPoint = new OpenLayers.Geometry.Point(closest.x0,
                      closest.y0);

                  var verticeIndex = 0;
                  var vertices = multiPoints.getVertices();
                  for ( var i = 0; i < vertices.length - 1; ++i) {
                    var lineStringSegment = new OpenLayers.Geometry.LineString(
                        [ vertices[i], vertices[i + 1] ]);
                    if (lineStringSegment.distanceTo(closestPoint) <= 2) {
                      verticeIndex = parseInt(i) + 1;
                      break;
                    }
                  }
                  multiPoints.addPoint(thisPoint.geometry, verticeIndex);
                } else {
                  var vertices = multiPoints.getVertices();
                  if (vertices[0] != args.geometry
                      && vertices[vertices.length - 1] != args.geometry) {
                    args.style = {};
                    vectorLayer2.removeFeatures(args);
                    multiPoints.removePoint(args.geometry);

                    var verticesRoute = new Array();
                    for ( var i in multiPoints.components) {
                      verticesRoute.push(wktFormat
                          .write(new OpenLayers.Feature.Vector(
                              multiPoints.components[i])));
                    }
                    MapController.prototype.osrmRoute(verticesRoute,
                        osrmRouteCallbakWrite, value4 === undefined ? false
                            : true);
                  }
                }
              },
            // over : function(args) {
            // if (args.layer.id === vectorLayer.id) {
            // console.log("over");
            // }
            // }
            }
          });
      this._Map.addControl(editor2);
      editor2.activate();

      var verticeEdit = 0;
      var verticesRoute = new Array();
      var editor = new OpenLayers.Control.ModifyFeature(vectorLayer2);
      this._Map.addControl(editor);
      vectorLayer2.events.on({
        beforefeaturemodified : function(args) {
          // console.log("beforefeaturemodified");
          verticesRoute = new Array();
          for ( var i in multiPoints.components) {
            verticesRoute.push(wktFormat.write(new OpenLayers.Feature.Vector(
                multiPoints.components[i])));
            if (multiPoints.components[i].id === args.feature.geometry.id) {
              verticeEdit = i;
            }
          }
        },
        // afterfeaturemodified : function(args) {
        // console.log("afterfeaturemodified : " + radius);
        // vectorLayer.removeAllFeatures();
        // vectorLayer.addFeatures(new OpenLayers.Feature.Vector(
        // MapController.prototype.lineRadius(wktFormat.read(wkt).geometry,
        // radius)));
        // vectorLayer.addFeatures(wktFormat.read(wkt));
        // },
        vertexmodified : function(args) {
          // console.log("vertexmodified");
          verticesRoute[verticeEdit] = wktFormat.write(args.feature);
          multiPoints.removePoint(multiPoints.components[verticeEdit]);
          multiPoints.addPoint(args.feature.geometry, verticeEdit);

          MapController.prototype.osrmRoute(verticesRoute,
              osrmRouteCallbakWrite, value4 === undefined ? false : true);
        }
      });
      editor.activate();

      var pinGreen = new OpenLayers.Feature.Vector(multiPoints.components[0]);
      pinGreen.style = {
        externalGraphic : this._AppPath + "resources/images/map/pin_green.png",
        graphicWidth : 20,
        graphicHeight : 32,
        graphicYOffset : -30
      };
      vectorLayer2.addFeatures(pinGreen);

      var pinRed = new OpenLayers.Feature.Vector(
          multiPoints.components[multiPoints.components.length - 1]);
      pinRed.style = {
        externalGraphic : this._AppPath + "resources/images/map/pin_red.png",
        graphicWidth : 20,
        graphicHeight : 32,
        graphicYOffset : -30
      };
      vectorLayer2.addFeatures(pinRed);

      for ( var i = 1; i < multiPoints.components.length - 1; ++i) {
        var pinYellow = new OpenLayers.Feature.Vector(multiPoints.components[i]);
        pinYellow.style = {
          externalGraphic : this._AppPath
              + "resources/images/map/pin_yellow.png",
          graphicWidth : 20,
          graphicHeight : 32,
          graphicYOffset : -30
        };
        vectorLayer2.addFeatures(pinYellow);
      }

      // vectorLayer.addFeatures(new OpenLayers.Feature.Vector(this.lineRadius(
      // wktFormat.read(wkt).geometry, radius)));
    }

    var feature = wktFormat.read(wkt);
    feature.id = name;

    vectorLayer.addFeatures(feature);
  },

  drawDeactivate : function() {
    var controls = this._Map
        .getControlsByClass("OpenLayers.Control.DrawFeature");
    controls = controls.concat(this._Map
        .getControlsByClass("OpenLayers.Control.ModifyFeature"));

    for ( var i in controls) {
      controls[i].deactivate();
      this._Map.removeControl(controls[i]);
    }
  },

  resetMapPosition : function(obj) {
//	deviceid=16;
    this.drawClear();
    var markersLayer = this._Map.getLayersByName("PositionMarker")[0];

    var markers = markersLayer.markers;
    for ( var i in markers) {
        markersLayer.removeMarker(markers[i]);
    }

//    this.drawDeactivate();
//    var vectorLayers = this._Map.getLayersByName("VectorLayer");
//    for ( var i in vectorLayers) {
//      //vectorLayers[i].removeAllFeatures();
//      this._Map.removeLayer(vectorLayers[i]);
//    }
//    var vectorLayers = this._Map.getLayersByName("PositionMarker");
//    for ( var i in vectorLayers) {
//	console.log('vectorLayers'+vectorLayers[i]);
//	OpenLayers_Layer_Vector_19_root
//    }

//console.log('vectorLayers: '+vectorLayers[0]);
//    for ( var i in vectorLayers) {
//      var features = vectorLayers[i].features;
//      for ( var j in features) {
//        if (features[j].id.toString() == id) {
//          vectorLayers[i].removeFeatures(features[j]);
//          return;
//        }
//      }
 //   }

// MapLayer.removeDraw("GHOST");
// MapLayer.removeDraw("MULTIPLE");


  },

  drawClear : function() {
    this.drawDeactivate();
    var vectorLayers = this._Map.getLayersByName("VectorLayer");
    for ( var i in vectorLayers) {
      vectorLayers[i].removeAllFeatures();
      this._Map.removeLayer(vectorLayers[i]);
    }
    this._Map.addLayer(new OpenLayers.Layer.Vector("VectorLayer", {
      styleMap : this.styleMap()
    }));
  },

  drawEraser : function(form) {
    this.drawClear();
    $("[id^=" + form + "\\:wkt]:input").each(function() {
      $(this).val(null);
    });
  },

  mapShift : function(lonLat) {
    this._Map.panTo(lonLat);
  },

  popUpCreate : function(marker, popUp, offset) {
    var pixel = marker ? this._Map.getViewPortPxFromLonLat(
        marker.feature.lonlat).add(0, -offset) : null;

    if (!popUp) {
      popUp = new OpenLayers.Popup.FramedCloud("PopUpIkonn_" + marker.id,
          this._Map.getLonLatFromPixel(pixel), null,
          marker.feature.data.popupContentHTML, null, true);
      popUp.calculateRelativePosition = function() {
        return "tr";
      };
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

  lineRadius : function(lineGeometry, radius) {
    var polygonPointsDown = new Array();
    var polygonPoints = new Array();
    var polygonsDown = new Array();
    var polygonsUp = new Array();
    var linePoints = lineGeometry.components;
    for ( var i = 0; i <= linePoints.length; ++i) {
      if (i < linePoints.length - 1) {
        var dx = linePoints[i + 1].x - linePoints[i].x;
        var dy = linePoints[i + 1].y - linePoints[i].y;
        var angle = Math.atan2(dx, dy);
        var degrees = 360 - (angle * 180 / Math.PI) - 90;
        while (degrees > 360)
          degrees -= 360;

        if (i == 0) {
          for ( var j = 18; j >= 0; --j) {
            var curve = new OpenLayers.Geometry.Polygon.createRegularPolygon(
                linePoints[i], radius, 2, degrees - 90 + (j * 10));
            polygonPoints.push(curve.components[0].components[0]);
          }
        }

        var line1 = new OpenLayers.Geometry.Polygon.createRegularPolygon(
            linePoints[i], radius, 2, degrees + 90);
        var line2 = new OpenLayers.Geometry.Polygon.createRegularPolygon(
            linePoints[i + 1], radius, 2, degrees + 90);

        var linearRingUp = new OpenLayers.Geometry.LinearRing([
            line2.components[0].components[1],
            line1.components[0].components[1] ]);
        polygonsUp.push(new OpenLayers.Geometry.Polygon([ linearRingUp ]));
        var linearRingDown = new OpenLayers.Geometry.LinearRing([
            line1.components[0].components[0],
            line2.components[0].components[0] ]);
        polygonsDown.push(new OpenLayers.Geometry.Polygon([ linearRingDown ]));

        if (i > 0) {
          var intersect2 = polygonsUp[i - 1].distanceTo(polygonsUp[i], {
            details : true
          });
          if (intersect2.distance == 0) {
            var line1 = new OpenLayers.Geometry.LinearRing([
                polygonsUp[i - 1].components[0].components[1],
                new OpenLayers.Geometry.Point(intersect2.x0, intersect2.y0) ]);
            var line2 = new OpenLayers.Geometry.LinearRing([
                polygonsUp[i].components[0].components[0],
                new OpenLayers.Geometry.Point(intersect2.x0, intersect2.y0) ]);
            polygonsUp[i - 1].components[0] = line1;
            polygonsUp[i].components[0] = line2;
            polygonPoints.push(new OpenLayers.Geometry.Point(intersect2.x0,
                intersect2.y0));
          } else {
            var dx2 = linePoints[i].x - linePoints[i - 1].x;
            var dy2 = linePoints[i].y - linePoints[i - 1].y;
            var angle2 = Math.atan2(dx2, dy2);
            var degrees2 = 360 - (angle2 * 180 / Math.PI) - 90;
            while (degrees2 > 360)
              degrees2 -= 360;
            for ( var j = degrees2 - 90; j >= degrees - 90; j -= 10) {
              var curve1 = new OpenLayers.Geometry.Polygon.createRegularPolygon(
                  linePoints[i], radius, 2, j);
              polygonPoints.push(curve1.components[0].components[0]);
            }
          }

          var intersect1 = polygonsDown[i - 1].distanceTo(polygonsDown[i], {
            details : true
          });
          if (intersect1.distance == 0) {
            var line1 = new OpenLayers.Geometry.LinearRing([
                polygonsDown[i - 1].components[0].components[0],
                new OpenLayers.Geometry.Point(intersect1.x0, intersect1.y0) ]);
            var line2 = new OpenLayers.Geometry.LinearRing([
                new OpenLayers.Geometry.Point(intersect1.x0, intersect1.y0),
                polygonsDown[i].components[0].components[1] ]);
            polygonsDown[i - 1].components[0] = line1;
            polygonsDown[i].components[0] = line2;
            polygonPointsDown.push(new OpenLayers.Geometry.Point(intersect1.x0,
                intersect1.y0));
          } else {
            var dx2 = linePoints[i].x - linePoints[i - 1].x;
            var dy2 = linePoints[i].y - linePoints[i - 1].y;
            var angle2 = Math.atan2(dx2, dy2);
            var degrees2 = 360 - (angle2 * 180 / Math.PI) - 90;
            while (degrees2 > 360)
              degrees2 -= 360;
            for ( var j = degrees2 - 90; j <= degrees - 90; j += 10) {
              var curve1 = new OpenLayers.Geometry.Polygon.createRegularPolygon(
                  linePoints[i], radius, 2, j);
              polygonPointsDown.push(curve1.components[0].components[1]);
            }
          }
        }
      } else if (i == linePoints.length) {
        var dx2 = linePoints[i - 1].x - linePoints[i - 2].x;
        var dy2 = linePoints[i - 1].y - linePoints[i - 2].y;
        var angle2 = Math.atan2(dx2, dy2);
        var degrees2 = 360 - (angle2 * 180 / Math.PI) - 90;
        while (degrees2 > 360)
          degrees2 -= 360;
        var line1 = new OpenLayers.Geometry.Polygon.createRegularPolygon(
            linePoints[i - 1], radius, 2, degrees2 + 90);
        polygonPoints.push(line1.components[0].components[1]);

        for ( var j = 18; j >= 0; --j) {
          var curve = new OpenLayers.Geometry.Polygon.createRegularPolygon(
              linePoints[i - 1], radius, 2, degrees2 + 90 + (j * 10));
          polygonPoints.push(curve.components[0].components[0]);
        }
      }
    }

    for ( var i = polygonPointsDown.length - 1; i >= 0; --i) {
      polygonPoints.push(polygonPointsDown[i]);
    }

    return new OpenLayers.Geometry.Polygon(
        [ new OpenLayers.Geometry.LinearRing(polygonPoints) ]);
  },

  /**
   * 
   * @param layer
   *          layer object to be set
   * @param type
   *          default, delete, select, temporary
   * @param geos
   *          geos.form Point Line Polygon
   */
  setNewStyleMap : function(layer, type, geos) {
    var sketch = geos.constructor();
    for ( var i in geos) {
      sketch[geos[i].form] = geos[i].style;
    }
    var style = new OpenLayers.Style();
    style.addRules([ new OpenLayers.Rule({
      symbolizer : sketch
    }) ]);

    layer.styleMap[type] = style;
    layer.styleMap.styles[type] = style;
  },

  styleMap : function() {
    var sketchDefault = {
      Point : {
      // pointRadius : 4,
      // graphicName : "square",
      // fillColor : "white",
      // fillOpacity : 1,
      // strokeWidth : 1,
      // strokeOpacity : 1,
      // strokeColor : "#333333"
      },
      Line : {
        strokeWidth : 4,
        strokeOpacity : 0.6,
        strokeColor : "#2b54fc"
      // strokeDashstyle : "dash"
      },
      Polygon : {
      // strokeWidth : 2,
      // strokeOpacity : 1,
      // strokeColor : "#666666",
      // fillColor : "white",
      // fillOpacity : 0.3
      }
    };

    var sketchSelect = {
      Point : {
        pointRadius : 6,
        fillColor : "blue",
        fillOpacity : 0.4,
        strokeWidth : 2,
        strokeOpacity : 1,
        strokeColor : "blue"
      },
      Line : {
        strokeWidth : 4,
        strokeOpacity : 0.6,
        strokeColor : "#2b54fc"
      },
      Polygon : {
        strokeWidth : 2,
        strokeOpacity : 1,
        strokeColor : "#666666",
        fillColor : "white",
        fillOpacity : 0.3
      }
    };
    var styleDefault = new OpenLayers.Style();
    styleDefault.addRules([ new OpenLayers.Rule({
      symbolizer : sketchDefault
    }) ]);
    var styleSelect = new OpenLayers.Style();
    styleSelect.addRules([ new OpenLayers.Rule({
      symbolizer : sketchSelect
    }) ]);
    return new OpenLayers.StyleMap({
      "default" : styleDefault,
      "select" : styleSelect,
    // "temporary" : styleSelect,
    });
  },

  osrmRoute : function(wkt, callback, instructions) {
    var url = "http://maps.paranagr.com.br:5001/viaroute?jsonp=function&alt=false&instructions="
        + instructions;

    if ($.type(wkt) == "array") {
      for ( var i in wkt) {
        var longLat = wkt[i].substring((wkt[i].indexOf("(") + 1), wkt[i]
            .indexOf(")"));
        while (longLat.charAt(0) === " ")
          longLat = longLat.substr(1);
        longLat = longLat.split(" ");
        url += "&loc=" + parseFloat(longLat[1]) + "," + parseFloat(longLat[0]);
      }
    } else {
      var longLat = wkt.substring((wkt.indexOf("(") + 1), wkt.indexOf(")"))
          .split(",");
      for ( var i in longLat) {
        longLat[i] = longLat[i].split(" ");
        url += "&loc=" + parseFloat(longLat[i][1]) + ","
            + parseFloat(longLat[i][0]);
      }
    }

    $.ajax(url, {
      dataType : "jsonp",
      jsonp : "jsonp",
      cache : true,
      async : false,
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
  },

  get_JSON : function() {


  let request = new XMLHttpRequest();

  request.open('POST', "https://api.openrouteservice.org/v2/directions/driving-car/json");

  request.setRequestHeader('Accept', 'application/json, application/geo+json, application/gpx+xml, img/png; charset=utf-8');
  request.setRequestHeader('Content-Type', 'application/json');
  request.setRequestHeader('Authorization', 'api_key');
  request.onreadystatechange = function () {
    if (this.readyState === 4) {
      var data_json= JSON.parse(this.responseText);
      utils.createRoute(data_json.routes[0].geometry);
    }
  };
  const body = '{"coordinates":[['+coor1+'],['+coor2+']],"radiuses":120000}';
  request.send(body);
},

  geocodeSearch : function(input) {
    var delay = (function() {
      var timer = 0;
      return function(callback, ms, args) {
        clearTimeout(timer);
        timer = setTimeout(callback, ms, args);
      };
    })();

    var elWkt = "";
    var elTags = input.split(":");
    for ( var i = 0; i < elTags.length - 1; ++i) {
      elWkt += elTags[i] + ":";
    }

    $("body").append(
        "<input id=\"autoWkt:" + input + "\" type=\"text\" "
            + "style=\"visibility: hidden;\"/>");

    $("#" + input.replace(/\:/g, "\\:")).keyup(
        function() {
          if (this.value.length <= 4)
            return;

          delay(function(el) {
            $("#autoWkt\\:" + input.replace(/\:/g, "\\:")).val("");

            $("#autoSelect\\:" + input.replace(/\:/g, "\\:")).remove();
            $(el).after(
                "<div id=\"autoSelect:" + input + "\" " + "style=\""
                    + "position: fixed; " + "background-color: white; "
                    + "border: 1px solid;" + "z-index: 10000; "
                    + "visibility: hidden;\"/>");

            $.ajax({
              url : "http://maps.paranagr.com.br:8080/search",
              data : {
                format : "json",
                q : el.value.toString(),
              },
              success : function(data) {
                if (data.length > 0) {
                  $("#autoSelect\\:" + el.id.replace(/\:/g, "\\:")).css(
                      "visibility", "visible");
                  // console.log(data);
                  for ( var key in data) {
                    // console.log(data[key]);
                    // console.log(data[key].display_name);
                    // console.log(data[key].lat);
                    // console.log(data[key].lon);
                    $("#autoSelect\\:" + el.id.replace(/\:/g, "\\:")).append(
                        "<span style=\"padding: 3px; display: inline-block;\">"
                            + "<a href=\"#\" onclick=\"" + "$('#"
                            + el.id.replace(/\:/g, "\\\\:")
                            + "').val('"
                            + data[key].display_name
                            + "'); "
                            + "$('#autoSelect\\\\:"
                            + el.id.replace(/\:/g, "\\\\:")
                            + "').remove(); "
                            + "$('#autoWkt\\\\:"
                            + el.id.replace(/\:/g, "\\\\:")
                            + "').val('POINT ("
                            + data[key].lon
                            + " "
                            + data[key].lat
                            + ")'); "
                            + "MapLayer.addPoint('POINT ("
                            + data[key].lon
                            + " "
                            + data[key].lat
                            + ")', 'POINT_"
                            + el.id.replace(/\:/g, "_")
                            + "'); "
                            + "MapLayer.zoom('POINT ("
                            + data[key].lon
                            + " "
                            + data[key].lat
                            + ")');\" >"
                            + data[key].display_name + "</a></span><br>");
                  }
                }
              }
            });

          }, 100, this);
        });

    $("#" + input.replace(/\:/g, "\\:")).blur(
        function() {
          delay(function(el) {
            if ($("#autoWkt\\:" + el.id.replace(/\:/g, "\\:")).val() === "") {
              el.value = "";
              $("#autoSelect\\:" + input.replace(/\:/g, "\\:")).remove();
            }

            var lineString = "LINESTRING (";
            var inputRoute = 0;
            var pointNames = new Array();
            $('input[id^="autoWkt\\:"]')
                .each(
                    function() {
                      if (this.value != "") {
                        inputRoute++;
                        var lonlat = (this.value.substring((this.value
                            .indexOf("(") + 1), this.value.indexOf(")")))
                            .split(" ");

                        lineString += lonlat[0] + " " + lonlat[1] + ",";

                        pointNames.push('POINT_'
                            + (this.id.replace("autoWkt:", "")).replace(/\:/g,
                                "_"));
                      }
                    });
            lineString = lineString.substring(0, lineString.length - 1) + ")";
            if (inputRoute >= 2) {
              $("#" + (elWkt + "wkt").replace(/\:/g, "\\:")).val(lineString);
              $("#" + (elWkt + "wktPoints").replace(/\:/g, "\\:")).val("");
              try {
                MapLayer._Map.removeLayer(MapLayer._Map
                    .getLayersByName("VectorLayer")[1]);
              } catch (e) {
              }
              MapLayer.removeDraw("GEOROUTE");
              MapLayer.removeDraw("LINEGEOROUTE");
              for ( var key in pointNames) {
                MapLayer.removeDraw(pointNames[key]);
              }

              MapLayer.addRoute(elWkt + "wkt", elWkt + "wktPoints", elWkt
                  + "radius", elWkt + "instruction", "GEOROUTE");
              delay(function(el) {
                MapLayer.zoom(elWkt + "wkt");
              }, 200, this);
            }

          }, 100, this);
        });
    // $("#" + (elWkt + "wkt").replace(/\:/g, "\\:")).change(function() {
    // console.log("Handler for .change() called.");
    // $("#" + input.replace(/\:/g, "\\:")).val("");
    // });
  },

  osrmGeometry2Wkt : function(encoded) {
    precision = Math.pow(10, -5); // -5 = precision
    var len = encoded.length, index = 0, lat = 0, lng = 0;
    var wkt = len > 1 ? "LINESTRING (" : "POINT (";
    while (index < len) {
      var b, shift = 0, result = 0;
      do {
        b = encoded.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      var dlat = ((result & 1) ? ~(result >> 1) : (result >> 1));
      lat += dlat;
      shift = 0;
      result = 0;
      do {
        b = encoded.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      var dlng = ((result & 1) ? ~(result >> 1) : (result >> 1));
      lng += dlng;
      wkt += lng * precision + " " + lat * precision + ",";
    }
    wkt = wkt.slice(0, -1) + ")";
    return wkt;
  },

	mountGeometry : function(field) {
		console.log('FIELD: '+field)
		if (document.getElementById(field).value != null && document.getElementById(field).value !== undefined) {

			eval('var obj=' + document.getElementById(field).value);
			
			if(obj.ORIGIN_LATITUDE != null && obj.ORIGIN_LATITUDE !== undefined && obj.ORIGIN_LONGITUDE != null && obj.ORIGIN_LONGITUDE !== undefined){
				document.getElementById('form:wkt').value = "POINT("+obj.ORIGIN_LONGITUDE+" "+obj.ORIGIN_LATITUDE+")";
				document.getElementById('form:radius').value = obj.RADIUS;
				var wkt = "POINT("+obj.ORIGIN_LONGITUDE+" "+obj.ORIGIN_LATITUDE+")";
				this.addControlPointSen(wkt, obj.RADIUS,'POINT_INIT');	
			}
			if(obj.DESTINY_LATITUDE != null && obj.DESTINY_LATITUDE !== undefined && obj.DESTINY_LONGITUDE != null && obj.DESTINY_LONGITUDE !== undefined){
				document.getElementById('form:wkt').value = "POINT("+obj.DESTINY_LONGITUDE+" "+obj.DESTINY_LATITUDE+")";
				document.getElementById('form:radius').value = obj.RADIUS;
				var wkt = "POINT("+obj.DESTINY_LONGITUDE+" "+obj.DESTINY_LATITUDE+")";
				this.addControlPointSen(wkt, obj.RADIUS,'POINT_END');
			}
			
			if(obj.EVENT_LATITUDE != null && obj.EVENT_LATITUDE !== undefined && obj.EVENT_LONGITUDE != null && obj.EVENT_LONGITUDE !== undefined){
				document.getElementById('form:wkt').value = "POINT("+obj.EVENT_LONGITUDE+" "+obj.EVENT_LATITUDE+")";
				document.getElementById('form:radius').value = obj.RADIUS;
				var wkt = "POINT("+obj.EVENT_LONGITUDE+","+obj.EVENT_LATITUDE+")";
				
				var config = {icon : obj.icon, balloonType : "point" };
				var config = {icon : 1, balloonType : "point" };
				
				this.addMarkerSen(obj,config);			
			}
			
			if(obj.ROUTE !=null && obj.ROUTE !== undefined){
				document.getElementById('form:wkt').value = obj.ROUTE;
				this.addLineSen('form:wkt', 'teste');
			}
			this.zoom(obj.ZOOM_WKT);

			//this.addLineString();
//			var coords = "[-50.160140000000006,-25.089350000000003],[-50.161440000000006,-25.08876],[-47.647760000000005,-22.735830000000004],[-47.64779,-22.735660000000003],[-47.64781000000001,-22.735590000000002],[-47.648010000000006,-22.734730000000003],[-47.64802,-22.73469],[-47.648030000000006,-22.73466],[-47.648030000000006,-22.734650000000002],[-47.648030000000006,-22.734630000000003],[-47.647650000000006,-22.736430000000002]";
			//this.createRoute(coords, stylePoint);
			//this.addLineString(coords, stylePoint);
//			this.route(this._Map, obj.ROUTE);
		}
		
	},
	
	addMarkerSen : function(obj, config) {

	    var iconWidth = config.icon != 20 ? 40 : 16;
	    var iconHeigth = config.icon != 20 ? 40 : 16;
	    iconWidth += obj.index ? 19 : 0;
	    iconHeigth += obj.index ? 7 : 0;
	
	    if (typeof obj.deviceId === "undefined") {
	      return;
	    }

	    config.shift = 0;
	    var balloon = this.getBalloon(obj, config);

	    var lonLatMarker = new OpenLayers.LonLat(obj.EVENT_LONGITUDE, obj.EVENT_LATITUDE)
	        .transform(new OpenLayers.Projection("EPSG:4326"), this._Map
	            .getProjectionObject());

	    var layerId = new String(obj.deviceId + "" + obj.gpsTime);

	    var markersLayer = this._Map.getLayersByName("PositionMarker")[0];
	    var size = new OpenLayers.Size(iconWidth, iconHeigth);
	    var offset = new OpenLayers.Pixel(-(size.w / 2), -size.h
	        + (config.icon == 20 ? iconHeigth / 2 : 0));
	    var olicon = new OpenLayers.Icon(balloon.icon, size, offset);
	    var marker = new OpenLayers.Marker(lonLatMarker, olicon);
	    var feature = new OpenLayers.Feature(markersLayer, lonLatMarker);
	    feature.closeBox = true;
	    feature.data.popupContentHTML = balloon.html;
	    feature.data.overflow = "hidden";
	    feature.id = obj.deviceId;
	    marker.feature = feature;
	    marker.id = layerId;
	
	    var markerClick = function(evt) {
	      if (this.popup == null) {
	        this.popup = MapController.prototype.popUpCreate(marker, null,
	            iconHeigth);
	        MapController.prototype._Map.addPopup(this.popup);
	        this.popup.show();
	      } else {
	        MapController.prototype.popUpCreate(marker, this.popup, iconHeigth);
	        this.popup.toggle();
	      }
	      OpenLayers.Event.stop(evt);
	    };
	
	    if (markersLayer!=null && markersLayer.markers!=null && markersLayer.markers.length == 0) {
	      this._Map.events.register("zoomend", markersLayer, function(evt) {
	        MapController.prototype.popUpCreate(null,
	            MapController.prototype._Map.popups, iconHeigth);
	      });
	    }
	    marker.events.register("mousedown", feature, markerClick);
	    markersLayer.addMarker(marker);
	  },

  addControlPointSen : function(value, radius, name) {
    var wkt = value;

    var vectorLayer = this._Map.getLayersByName("VectorLayer")[0];

    var wktFormat = this.wktFormater();

    if (!this.isWkt(value) && !this.isWkt(radius)) {
      var editor = new OpenLayers.Control.ModifyFeature(vectorLayer);
      this._Map.addControl(editor);
      vectorLayer.events
          .on({
            afterfeaturemodified : function(args) {
              wkt = wktFormat
                  .extractGeometry(args.feature.geometry.getCentroid());
              radius = wkt = parseInt(0.565352 * Math.sqrt(args.feature.geometry.getArea()));
            }
          });
      editor.activate();
      editor.mode = OpenLayers.Control.ModifyFeature.DRAG;
      editor.mode |= OpenLayers.Control.ModifyFeature.RESIZE;
    }

    var sphere = new OpenLayers.Geometry.Polygon.createRegularPolygon(
        OpenLayers.Geometry.fromWKT(wkt).transform(
            new OpenLayers.Projection("EPSG:4326"),
            this._Map.getProjectionObject()), radius, 40, 0);

    if (typeof name === 'undefined')
      name = "POC_" + Math.round((new Date()).getTime());
    var feature = new OpenLayers.Feature.Vector(sphere);
    feature.id = name;

	var pocStyle = OpenLayers.Util.applyDefaults(pocStyle, OpenLayers.Feature.Vector.style['default']);
	pocStyle.fillColor = "#62BD69";
	feature.style = pocStyle;

    vectorLayer.addFeatures(feature);
  },

  addMarkerSen_ant : function(obj, config) {

    var icon=1;
    var device=16;

    var iconWidth = icon != 20 ? 40 : 16;
    var iconHeigth = icon != 20 ? 40 : 16;
    iconWidth += obj.index ? 19 : 0;
    iconHeigth += obj.index ? 7 : 0;

    if (typeof device === "undefined") {
      return;
    }

//    config.shift = 0;
    var balloon = this.getBalloon(obj, config);

    var lonLatMarker = new OpenLayers.LonLat(obj.longitude, obj.latitude)
        .transform(new OpenLayers.Projection("EPSG:4326"), this._Map
            .getProjectionObject());

    var layerId = new String(16 + "" + 1658108383000);
//    var layerId = new String(obj.deviceId + "" + obj.gpsTime);
    var markersLayer = this._Map.getLayersByName("PositionMarker")[0];
    var size = new OpenLayers.Size(iconWidth, iconHeigth);
    var offset = new OpenLayers.Pixel(-(size.w / 2), -size.h
        + (icon == 20 ? iconHeigth / 2 : 0));
    var olicon = new OpenLayers.Icon(balloon.icon, size, offset);
    var marker = new OpenLayers.Marker(lonLatMarker, olicon);
    var feature = new OpenLayers.Feature(markersLayer, lonLatMarker);
    feature.closeBox = true;
    feature.data.popupContentHTML = balloon.html;
    feature.data.overflow = "hidden";
    feature.id = obj.deviceId;
    marker.feature = feature;
    marker.id = layerId;

    var markerClick = function(evt) {
      if (this.popup == null) {
        this.popup = MapController.prototype.popUpCreate(marker, null,
            iconHeigth);
        MapController.prototype._Map.addPopup(this.popup);
        this.popup.show();
      } else {
        MapController.prototype.popUpCreate(marker, this.popup, iconHeigth);
        this.popup.toggle();
      }
      OpenLayers.Event.stop(evt);
    };

    if (markersLayer.markers.length == 0) {
      this._Map.events.register("zoomend", markersLayer, function(evt) {
        MapController.prototype.popUpCreate(null,
            MapController.prototype._Map.popups, iconHeigth);
      });
    }
    marker.events.register("mousedown", feature, markerClick);
    markersLayer.addMarker(marker);
  },

  wktFormater : function() {
    return new OpenLayers.Format.WKT({
      internalProjection : this._Map.baseLayer.projection,
      externalProjection : new OpenLayers.Projection("EPSG:4326")
    });
  }
};
