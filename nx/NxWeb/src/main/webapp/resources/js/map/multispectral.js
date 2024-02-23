/**
 * Multispectral Map Prototype class
 * 
 */

/**
 * Multispectral depends
 */
var load = function() {
  MapController.prototype.load();
};

MapController.prototype = {
  Provider : function() {
    return "MULTISPECTRAL";
  },

  /**
   * Funcao para carregar dependencias iniciais do Mapa
   */
  init : function() {
    return new multispectral(this._configure.centerLong,
        this._configure.centerLat, 0, this._configure.mapDiv,
        this._configure.mapKey, true, "MapLayer.callBack");

    // Autenticacao Invalida! - M�todo Mapini
    // null is not an object (evaluating 'group_geom.components') -
  },

  /**
   * Funcao para carregar dependencias do Mapa
   */
  load : function() {
    /* Add Buttons */
    this._Map.Client.allowSetPointRightClick(false, "MapLayer.callBack");
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

      this.addButton(MapController.prototype._configure.mapButtons[i].name,
          MapController.prototype._configure.mapButtons[i].imgOff,
          MapController.prototype._configure.mapButtons[i].imgOn,
          MapController.prototype._configure.mapButtons[i].cursor,
          MapController.prototype._configure.mapButtons[i].alt,
          MapController.prototype._configure.mapButtons[i].sizeX,
          MapController.prototype._configure.mapButtons[i].sizeY,
          MapController.prototype._configure.mapButtons[i].posX,
          MapController.prototype._configure.mapButtons[i].posY,
          MapController.prototype._configure.mapButtons[i].funcOn,
          MapController.prototype._configure.mapButtons[i].funcOff,
          MapController.prototype._configure.mapButtons[i].allign);
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

  reset : function() {
    this.drawClear();
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
      this._Map.Client.setZoom(zoom, "MapLayer.callBack");
    } else {
      var coords = zoom.replace(/\ /g, ",").replace(/,+/g, ",");
      var indexStart = coords.indexOf("(") + 1;
      var indexEnd = coords.indexOf(")");
      var type = $.trim(coords.substring(0, indexStart))
          .replace(/\(|\)|,/g, "");
      coords = coords.substring(indexStart, indexEnd).replace(/\(|\)/g, "");

      switch (type) {
      case "POINT":
      case "LINESTRING":
      case "MULTIPOINT":
        this._Map.Client.setZoom_Points(coords, "MapLayer.callBack");
        break;
      case "POLYGON":
        this._Map.Client.zoomPolygonCerc(coords, "MapLayer.callBack");
        break;
      default:
        console.log("ZOOM[" + type + "][" + zoom + "]: " + coords);
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
    this._Map.Client.setCenter(long, lat, "MapLayer.callBack");
  },

  /**
   * Redimensiona tamanho do mapa
   */
  resizeCanvas : function() {
  },

  /**
   * Retorna wkt posicao do mouse no mapa
   */
  mousePosition : function() {
    this.callBackExecute = function(args) {
      var lonLatMarker = args.split(";");
      this._callBackValue = "POINT (" + lonLatMarker[0] + " " + lonLatMarker[1]
          + ")";
    };
    this._Map.Client.mousePosition("MapLayer.callBack");
    return this._callBackValue;
  },

  /**
   * Adiciona um botao no mapa com as coordenadas, dimensoes e as definicoes
   * passadas por parametro.
   * 
   * @param nome
   *          nome que identifica o botao;
   * @param img_off
   *          caminho da imagem do botao, sendo local ou via web, utilizado
   *          quando nao estiver ativo.
   * @param img_on
   *          o caminho da imagem do botao, sendo local ou via web, utilizado
   *          quando estiver ativo.
   * @param cursor
   *          formato do cursor quando o botao estiver ativo, podendo utilizar
   *          tipos padronizados ou o caminho do novo cursor. Exemplos:
   *          �crosshair� -> forma de cruz; �move� -> forma de cruz, com setas
   *          em suas extremidades; �pointer� -> mao com dedo indicador
   *          apontando; �...cursor.cur� -> utiliza o endereco para a definiicao
   *          do novo cursor, caso o caminho nao indique um cursor valido, o
   *          mesmo assume um formato padrao (�default�);
   * @param alt
   *          mensagem exibida quando o mouse estiver sobre o botao;
   * @param sizeX
   *          largura do botao;
		<option value="getButtons">getButtons</opt
   * @param sizeY
   *          altura do botao;
   * @param posX
   *          a posiccao do botao, definida em pixels, a partir do canto
   *          superior;
   * @param posY
   *          a posiccao do botao, definida em pixels, a partir do canto lateral
   *          definido no allign (esquerdo ou direito);
   * @param funcOn
   *          parammetro referente a uma funcao que sera executada quando o
   *          botao for ativado, podendo deixa-lo vazio;
   * @param funcOff
   *          parammetro referente a uma funcao que sera executada quando o
   *          botao for desativado, podendo deixa-lo vazio;
   * @param allign
   *          alinhamento do ponto inicial para ajuste do botao inserido (right
   *          ou left);
   * @param callback
   *          resposta da funcao executado ao seu termino. Por padrao retorna um
   *          objeto com dois parametros: O primeiro parametro e a validacao da
   *          funcao, em que retorna um valor logico, sendo que �TRUE� significa
   *          que a funcao foi executada com sucesso e �FALSE� significa que a
   *          funcao esta com erro. O segundo parametro e da descricao da sua
   *          execucao. Quando o primeiro parametro e �FALSE�, vira uma
   *          descricao sobre o erro que ocasionou, caso seja �TRUE�, vira com
   *          valores ou o objeto JSON (dependendo da funcao) que podem ser
   *          tratados e/ou exibidos; Ex: Mapa.Client.addButton ("Botao01",
   *          "http://.../desativado.gif", "http://.../ativado.gif",
   *          "crosshair", "Ajuda: Quando ativo, o botao chama a funcao ZoomIn
   *          ()", 63, 25, 70, 70, "Mapa.Client.zoomIn ()", "left",
   *          "callbackClient")
   */
  addButton : function(name, imgOff, imgOn, cursor, alt, sizeX, sizeY, posX,
      posY, funcOn, funcOff, allign) {
    this._Map.Client.addButton(name, this._AppPath + imgOff, this._AppPath
        + imgOn, cursor, alt, sizeX, sizeY, posX, posY, funcOn, funcOff,
        allign, "MapLayer.callBack");
  },

  /**
   * Adicionar PIN no mapa
   * 
   * @param obj
   *          Position Object
   */
  addMarker : function(obj, config) {
    var iconWidth = config.icon != 20 ? 40 : 16;
    var iconHeigth = config.icon != 20 ? 67 : 40;
    iconWidth += obj.index ? 19 : 0;
    iconHeigth += obj.index ? 7 : 0;

    if (typeof obj.deviceId === "undefined") {
      return;
    }

    config.shift = -24;
    var balloon = this.getBalloon(obj, config);
    var id = new String(obj.deviceId + "" + obj.gpsTime);

    this._Map.Client.addMarkerHTMLBallon(obj.longitude, obj.latitude, 320, 320,
        balloon.icon, id, balloon.html, "grupo01", obj.tag, iconHeigth,
        iconWidth, false, "callbackClient", false, "", false);

    // this._Map.Client.addMarkerHTMLBallon(obj.longitude, obj.latitude, 320,
    // 320,
    // icon, id, html, "grupo01", obj.tag, iconHeigth, 31, false,
    // "callbackClient", false, parent.grid_tools_title
    // + ':=parentClick(\'link_grid_tools_' + obj.deviceId + '\');|'
    // + parent.grid_follow_new_window_title
    // + ':=parentClick(\'link_grid_follow_new_window_' + obj.deviceId
    // + '\');|' + parent.grid_follow_title
    // + ':=parentClick(\'link_grid_follow_' + obj.deviceId + '\');|'
    // + parent.grid_target_title + ':=parentClick(\'link_grid_target_'
    // + obj.deviceId + '\');', false);
  },

  removeMarker : function(obj) {
    if (typeof obj.deviceId === "undefined") {
      return;
    }
    var id = new String(obj.deviceId + "" + obj.gpsTime);
    this._Map.Client.removeMarker(id, "MapLayer.callBack");
  },

  removeDraw : function(id) {
    switch (id.split("_")[0]) {
    case "POINT":
      this._Map.Client.removePoints(id, "MapLayer.callBack");
      break;

    case "POC":
      this._Map.Client.removeSphere(id, "MapLayer.callBack");
      break;

    case "POLYGON":
      this._Map.Client.removePoly(id, "MapLayer.callBack");
      break;

    case "LINE":
      this._Map.Client.removeLines(id, "MapLayer.callBack");
      break;
    }

  },

  drawPoint : function(id) {
    if (document.getElementById(id).value != ""
        && document.getElementById(id).value != null) {
      this.drawClear();
      this.addPoint(id);
      return false;
    }
    this._Map.Client.pointDraw("MapLayer.callBack");

    this.callBackExecute = function(args) {
      if (args != "Procedimento solicitado executado com sucesso!") {
        document.getElementById(id).value = this.convertCoords2Wkt(args);

        // TODO: Verificar se precisa fazer zoom
        this.zoom(this.convertCoords2Wkt(args));
      }
    };
  },

  addPoint : function(wkt, name) {
    wkt = this.getWkt(wkt);
    var indexStart = wkt.indexOf("(") + 1;
    var indexEnd = wkt.indexOf(")");
    var longLat = wkt.substring(indexStart, indexEnd);
    longLat = longLat.split(" ");

    if (typeof name === 'undefined')
      name = "POINT_" + Math.round((new Date()).getTime());

    this._Map.Client.addSinglePoint(name, longLat[0], longLat[1], this._AppPath
        + "resources/images/map/dot_yellow.png", 22, 22, "MapLayer.callBack");
  },

  drawControlPoint : function(id1, id2) {
    if (document.getElementById(id1).value != ""
        && document.getElementById(id1).value != null) {
      this.drawClear();
      this.addControlPoint(id1, id2);
      return false;
    }
    this._Map.Client.pointDraw("MapLayer.callBack");

    this.callBackExecute = function(args) {
      if (args != "Procedimento solicitado executado com sucesso!") {
        document.getElementById(id1).value = this.convertCoords2Wkt(args);

        var radius = document.getElementById(id2).value;
        if (radius == null || radius == "")
          document.getElementById(id2).value = radius = 1000;

        var name = args.split(",");
        var longLat = name[1].split(";");
        name = name[0].split(":");
        name = name[1];

        this._Map.Client.removePoints(name);
        this._Map.Client.addSphere(name, 'Green', longLat[0], longLat[1],
            radius, 'MapLayer.callBack', true, poc_admin_move
                + ':=MapLayer.dragControlPoint(\'' + name + '\', \'' + id1
                + '\')|' + poc_admin_edit + ':=MapLayer.editControlPoint(\''
                + name + '\', \'' + id2 + '\')');

        this.zoom(this.getBoundsOffset(this.convertCoords2Wkt(args),
            parseInt(radius) + 1000));
      }
    };
  },

  addControlPoint : function(wkt, radius, name) {
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

    this._Map.Client.addSphere(name, 'Green', longLat[0], longLat[1], radius,
        'MapLayer.callBack', false,
        typeof poc_admin_move === 'undefined' ? "" : (poc_admin_move
            + ':=MapLayer.dragControlPoint(\'' + name + '\', \'' + id1 + '\')|'
            + poc_admin_edit + ':=MapLayer.editControlPoint(\'' + name
            + '\', \'' + id2 + '\')'));
  },

  dragControlPoint : function(name, id) {
    this._Map.Client.dragSphere(name, true, "MapLayer.callBack");

    this.callBackExecute = function(args) {
      if (args != "Procedimento solicitado executado com sucesso!") {
        document.getElementById(id).value = this.convertCoords2Wkt(args);
      }
    };
  },

  editControlPoint : function(name, id) {
    this._Map.Client.resizeSphere(name, true, true, "MapLayer.callBack");

    this.callBackExecute = function(args) {
      if (args != "Procedimento solicitado executado com sucesso!") {
        document.getElementById(id).value = args.match(/raioMetros:(.*?),/i)[1];
      }
    };
  },

  drawPolygon : function(id) {
    if (document.getElementById(id).value != ""
        && document.getElementById(id).value != null) {
      this.drawClear();
      this.addPolygon(id);
      return false;
    }
    this._Map.Client.polygonCercDraw("MapLayer.callBack", true);

    this.callBackExecute = function(args) {
      if (args != "Procedimento solicitado executado com sucesso!") {
        document.getElementById(id).value = this.convertCoords2Wkt(args);

        this.drawClear();
        this.addPolygon(this.convertCoords2Wkt(args));

        // TODO: Verificar se precisa fazer zoom
        // this.zoom(this.convertCoords2Wkt(args));
      }
    };
  },

  addPolygon : function(wkt, name) {
    var id = document.getElementById(wkt) ? wkt : null;
    wkt = this.getWkt(wkt);
    var coords = wkt.replace(/\ /g, ",").replace(/,+/g, ",");
    var indexStart = coords.indexOf("(") + 2;
    var indexEnd = coords.indexOf(")");
    coords = coords.substring(indexStart, indexEnd);

    if (typeof name === 'undefined')
      name = "POLYGON_" + Math.round((new Date()).getTime());

    this._Map.Client.addPolygonCerc(name, coords, "MapLayer.callBack", false,
        typeof fence_admin_move === 'undefined' ? "" : (fence_admin_move
            + ':=MapLayer.dragPolygon(\'' + name + '\', \'' + id + '\')|'
            + fence_admin_edit + ':=MapLayer.editPolygon(\'' + name + '\', \''
            + id + '\')'));
  },

  dragPolygon : function(name, id) {
    this._Map.Client.dragPolygon(name, true, "MapLayer.callBack");

    this.callBackExecute = function(args) {
      if (args != "Procedimento solicitado executado com sucesso!") {
        document.getElementById(id).value = this.convertCoords2Wkt(args);
      }
    };
  },

  editPolygon : function(name, id) {
    this._Map.Client.reshapePolygon(name, true, "MapLayer.callBack");

    this.callBackExecute = function(args) {
      if (args != "Procedimento solicitado executado com sucesso!") {
        document.getElementById(id).value = this.convertCoords2Wkt(args);
      }
    };
  },

  drawLine : function(id) {
    if (document.getElementById(id).value != ""
        && document.getElementById(id).value != null) {
      this.drawClear();
      this.addLine(id);
      return false;
    }
    this._Map.Client.lineDraw("MapLayer.callBack", true);

    this.callBackExecute = function(args) {
      if (args != "Procedimento solicitado executado com sucesso!") {
        document.getElementById(id).value = this.convertCoords2Wkt(args);
      }

      this.drawClear();
      this.addLine(this.convertCoords2Wkt(args));

      // TODO: Verificar se precisa fazer zoom
      // this.zoom(this.convertCoords2Wkt(args));
    };
  },

  addLine : function(wkt, name) {
    wkt = this.getWkt(wkt);

    var coords = wkt.replace(/\ /g, ",").replace(/,+/g, ",");
    var indexStart = coords.indexOf("(") + 1;
    var indexEnd = coords.indexOf(")");
    coords = coords.substring(indexStart, indexEnd);

    var geoStyle = {
      strokeColor : "#0865d7",
      fillColor : "#000000",
      strokeOpacity : 0.5,
      fillOpacity : 0.2,
      strokeWidth : 10,
      pointRadius : 3
    };

    if (typeof name === 'undefined')
      name = "LINE_" + Math.round((new Date()).getTime());

    this._Map.Client.addLine(name, geoStyle, coords, false,
        "MapLayer.callBack", typeof route_admin_move === 'undefined' ? ""
            : (route_admin_move + ':=MapLayer.dragLine(\'' + name + '\')|'
                + route_admin_edit + ':=MapLayer.editLine(\'' + name + '\')'));
 
  },

  dragLine : function(name) {
    this._Map.Client.dragLine(name, true, "MapLayer.callBack");
  },

  editLine : function(name) {
    this._Map.Client.resizeLine(name, true, true, "MapLayer.callBack");
  },

  drawRoute : function(id1, id2, id3, id4) {
    if (document.getElementById(id1).value != ""
        && document.getElementById(id1).value != null) {
      this.drawClear();
      this.addRoute(id1, id2, id3, id4);
      return false;
    }
    var lineString = "LINESTRING (";
    var multiPoints = "MULTIPOINT (";

    this._Map.Client.pointDraw("MapLayer.callBack");

    this.callBackExecute = function(args) {
      if (args != "Procedimento solicitado executado com sucesso!") {
        var wkt = this.convertCoords2Wkt(args);
        var indexStart = wkt.indexOf("(") + 1;
        var indexEnd = wkt.indexOf(")");
        var longLat = wkt.substring(indexStart, indexEnd);
        longLat = longLat.split(" ");

        lineString += longLat[0] + " " + longLat[1] + ",";
        multiPoints += longLat[0] + " " + longLat[1] + ",";

        this._Map.Client.addSinglePoint(longLat[0] + "," + longLat[1],
            longLat[0], longLat[1],
            "http://www.geoportal.com.br/Api_Js_v3/img/number1.png", 22, 22,
            "MapLayer.callBack");

        this._Map.Client.pointDraw("MapLayer.callBack");
        this.callBackExecute = function(args) {
          if (args != "Procedimento solicitado executado com sucesso!") {
            var wkt = this.convertCoords2Wkt(args);
            var indexStart = wkt.indexOf("(") + 1;
            var indexEnd = wkt.indexOf(")");
            var longLat = wkt.substring(indexStart, indexEnd);
            longLat = longLat.split(" ");

            lineString += longLat[0] + " " + longLat[1] + ")";
            multiPoints += longLat[0] + " " + longLat[1] + ")";

            this._Map.Client.addSinglePoint(longLat[0] + "," + longLat[1],
                longLat[0], longLat[1],
                "http://www.geoportal.com.br/Api_Js_v3/img/number2.png", 22,
                22, "MapLayer.callBack");

            document.getElementById(id1).value = lineString;
            document.getElementById(id2).value = multiPoints;
            this.drawClear();
            this.addRoute(id1, id2, id3, id4);
          }
        };
      }
    };
  },

  addRoute : function(value1, value2, value3, value4, name) {

    var radius = document.getElementById(value3).value;
    if (radius == null || radius == "")
      document.getElementById(value3).value = radius = 100;

    if (typeof name === 'undefined')
      name = "ROUTE_" + Math.round((new Date()).getTime());

    var wkt = this.getWkt(value2);
    if (wkt == null || wkt == "") {
      wkt = this.getWkt(value1);
      var indexStart = wkt.indexOf("(") + 1;
      var indexEnd = wkt.lastIndexOf(")");
      var multiPoints = wkt.substring(indexStart, indexEnd);
      multiPoints = multiPoints.split(",");
      var lonLatBeg = multiPoints[0].replace(/^ +/gm, "").split(" ");
      var lonLatEnd = multiPoints[multiPoints.length - 1].replace(/^ +/gm, "")
          .split(" ");
      wkt = "MULTIPOINT (" + lonLatBeg[0] + " " + lonLatBeg[1] + ","
          + lonLatEnd[0] + " " + lonLatEnd[1] + ")";
    }

    var indexStart = wkt.indexOf("(") + 1;
    var indexEnd = wkt.lastIndexOf(")");
    var multiPoints = wkt.substring(indexStart, indexEnd).replace(/\(/g, '')
        .replace(/\)/g, '');
    multiPoints = multiPoints.split(",");
    var tmpPoints;
    var routePoints = "";
    for ( var i in multiPoints) {
      tmpPoints = multiPoints[i].replace(/^ +/gm, "").split(" ");
      routePoints += tmpPoints[0] + "," + tmpPoints[1] + ",";
    }
    routePoints = routePoints.slice(0, -1);

    var showInMap = true;
    var driveByTime = true;
    var returnJson = true;
    var activeZoom = true;
    var urlStart = null;
    var urlEnd = null;

    this._Map.Client.routeGen2013(routePoints, showInMap, driveByTime,
        returnJson, activeZoom, urlStart, urlEnd, "MapLayer.callBack");
    this.callBackExecute = function(args) {
      var coorsMultiPoints = "Coordenadas:POINTS_01,";
      var coordsLiner = "Coordenadas:LINER_01,";
      routes = eval(args);

      if (typeof value4 !== "undefined") {
        $("#" + value4.replace(/\:/g, "\\:")).empty();
      }

      for ( var i in routes) {
        if (typeof value4 !== "undefined") {
          $("#" + value4.replace(/\:/g, "\\:")).append(
              routes[i].Route[0].CaminhoDetalhado.replace(/\./g, ".<br><br>"));
        }

        coordsLiner += routes[i].Route[1].Coordenadas + ",";
        var lonLat = routes[i].Route[1].Coordenadas.split(";");
        if (i == 0) {
          coorsMultiPoints += lonLat[0] + ";" + lonLat[1] + ";";
        }
        coorsMultiPoints += lonLat[lonLat.length - 2] + ";"
            + lonLat[lonLat.length - 1] + ";";
      }

      coordsLiner = coordsLiner.slice(0, -1);
      coorsMultiPoints = coorsMultiPoints.slice(0, -1);

      document.getElementById(value1).value = this
          .convertCoords2Wkt(coordsLiner);
      document.getElementById(value2).value = this
          .convertCoords2Wkt(coorsMultiPoints);
    };
  },

  mapClear : function() {
    this._Map.Client.mapClear();
  },

  drawDeactivate : function() {
    this.drawClear();
  },

  drawClear : function() {
    this._Map.Client.drawClear();
    if (typeof route_name !== 'undefined') {
      this._Map.Client.removeRouteGen2013();
    }
  },

  drawEraser : function(form) {
    this.drawClear();
    $("[id^=" + form + "\\:wkt]:input").each(function() {
      $(this).val(null);
    });
  },

  geocodeSearch : function(input) {
    // TODO: fazer geocodeSearch
    // geoCodeEnder (nome, rua, numero, bairro, cep, cidade, uf, retornaJSON,
    // callback)
    // apenas rua e cidade e numero
    // deve fazer a pesquisa separada por virgulas

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

    this.callBackExecute = function(args) {
      $("body").removeData("ADDRSOBJ");
      if (args != "Procedimento solicitado executado com sucesso!") {

        var data = new Array();
        var addrs = args.split("|");
        for ( var i in addrs) {
          data[i] = {};
          var addrArr = addrs[i].split("/");
          for ( var j in addrArr) {
            var keyVal = addrArr[j].split("=");
            data[i][keyVal[0]] = keyVal[1];
          }
        }

        var el = $("body").data("USEEL");
        if (typeof el != "undefined") {
          $("#autoSelect\\:" + el.id.replace(/\:/g, "\\:")).css("visibility",
              "visible");
          for ( var key in data) {
            $("#autoSelect\\:" + el.id.replace(/\:/g, "\\:")).append(
                "<span style=\"padding: 3px; display: inline-block;\">"
                    + "<a href=\"#\" onclick=\"" + "$('#"
                    + el.id.replace(/\:/g, "\\\\:")
                    + "').val('"
                    + data[key].Rua
                    + ", "
                    + data[key].Bairro
                    + ", "
                    + data[key].CEP
                    + ", "
                    + data[key].Cidade
                    + " - "
                    + data[key].UF
                    + "'); "
                    + "$('#autoSelect\\\\:"
                    + el.id.replace(/\:/g, "\\\\:")
                    + "').remove(); "
                    + "$('#autoWkt\\\\:"
                    + el.id.replace(/\:/g, "\\\\:")
                    + "').val('POINT ("
                    + data[key].X
                    + " "
                    + data[key].Y
                    + ")'); "
                    + "MapLayer.addPoint('POINT ("
                    + data[key].X
                    + " "
                    + data[key].Y
                    + ")', 'POINT_"
                    + el.id.replace(/\:/g, "_")
                    + "'); "
                    + "MapLayer.zoom('POINT ("
                    + data[key].X
                    + " "
                    + data[key].Y
                    + ")');\" >"
                    + data[key].Rua
                    + ", "
                    + data[key].Bairro
                    + ", "
                    + data[key].CEP
                    + ", "
                    + data[key].Cidade
                    + " - "
                    + data[key].UF
                    + "</a></span><br>");
          }
        } else {
          $("#autoSelect\\:" + input.replace(/\:/g, "\\:")).remove();
        }

      }
    };

    $("body").append(
        "<input id=\"autoWkt:" + input + "\" type=\"text\" "
            + "style=\"visibility: hidden;\"/>");

    $("#" + input.replace(/\:/g, "\\:")).keydown(
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

            var addrValues = el.value.toString().split(",");
            if (addrValues.length == 3) {
              MapLayer._Map.Client.geoCodeEnder("geocodeSearch", addrValues[0],
                  "", "", "", addrValues[1], addrValues[2], false,
                  "MapLayer.callBack");
            } else if (addrValues.length > 3) {
              MapLayer._Map.Client.geoCodeEnder("geocodeSearch", addrValues[0],
                  addrValues[1], "", "", addrValues[2], addrValues[3], false,
                  "MapLayer.callBack");
            }
            $("body").data("USEEL", el);
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
  },

  callBack : function(valid, args) {
    args = unescape(args);
    if (valid === "false" || valid === false) {
      if (typeof args === "string") {
      //  console.log(args);
      }
    } else {
      this.callBackExecute(args);
    }
  },

  convertCoords2Wkt : function(coords) {
    var wkt = coords.split(",");
    var type = ((wkt[0].split(":"))[1].split("_"))[0];

    switch (type) {
    case "POINT":
    case "PT":
      wkt = "POINT (" + wkt[1].replace(";", " ").replace(/[A-Za-z:$]/g, "")
          + ")";
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
  },
  

	  addPointGenerateRoute : function(xhr, status, args) {
		if (typeof args.addressLocationStart != "undefined") {
			
			var posObj = eval('(' + args.addressLocationStart + ')');
			
			this._Map.Client.setZoom_Points(posObj.lng, posObj.lat, "MapLayer.callBack");

		    this._Map.Client.addSinglePoint("RoutePoint1", posObj.lng, posObj.lat, this._AppPath
		            + "resources/images/map/pin_yellow.png", 25, 41, "MapLayer.callBack");
		}

		if (typeof args.deliverys != "undefined") {
			
			var posObjDelivery = eval('(' + args.deliverys + ')');
		    this._Map.Client.addSinglePoint("RoutePoint"+posObjDelivery.lng, posObjDelivery.lng, posObjDelivery.lat, this._AppPath
		            + "resources/images/map/pin_green.png", 25, 41, "MapLayer.callBack");
		}
		
		if (typeof args.addressLocationFinish != "undefined") {
			
			var posObjFinish = eval('(' + args.addressLocationFinish + ')');

			this._Map.Client.setZoom_Points(posObj.lng, posObj.lat, "MapLayer.callBack");

		    this._Map.Client.addSinglePoint("RoutePoint2", posObjFinish.lng, posObjFinish.lat, this._AppPath
		            + "resources/images/map/pin_red.png", 25, 41, "MapLayer.callBack");
		}
//		this._Map.Client.geoCodeEnder(company, street, numberStreet, district,
//				city, state, true, "MapLayer.callBack");
//		this.callBackExecute = function(args) {
//			console.log('Args callback: ' + args);
//		};
	},
	
	generateDataRoute :	function(xhr, status, args) {
		document.getElementById("totalKmGerado").innerHTML = document.getElementById("west_form:totalKm").value +' Km';
		document.getElementById("totalCostGerado").innerHTML = 'R$ '+document.getElementById("west_form:totalCost").value;
		document.getElementById("totalFuelUsedGerado").innerHTML = document.getElementById("west_form:totalFuelUsed").value +' L';
		document.getElementById("totalTollFeeCostGerado").innerHTML = 'R$ '+document.getElementById("west_form:totalTollFeeCost").value;
		document.getElementById("totalFuelCostGerado").innerHTML = 'R$ '+document.getElementById("west_form:totalFuelCost").value;
		
		document.getElementById("divInfo").innerHTML = document.getElementById("west_form:routeData").value;
		
		this.drawClear();
		//this.addLine(document.getElementById("west_form:wkt").value, 'Roterizacao');
		

		var wkt = this.getWkt(document.getElementById("west_form:wkt").value);

		var coords = wkt.replace(/\ /g, ",").replace(/,+/g, ",");
		var indexStart = coords.indexOf("(") + 1;
		var indexEnd = coords.indexOf(")");
		coords = coords.substring(indexStart, indexEnd);
		    
		this._Map.Client.setZoom_Points(coords, "MapLayer.callBack");
		
		this._Map.Client.routeGen2013(coords, true, 'distancia', true, true, undefined, undefined, 'MapLayer.RouteGenCallback', true, true, 0, false, false, true);

//		this._Map.Client.routeGen2013('-46.67012,-23.62621,-46.67314,-23.6238,-46.67257,-23.6256', true, 'distancia', true, true, undefined, undefined, 'MapLayer.RouteGenCallback', true, true, 0, false, false, true);
	},
  
	RouteGenCallback :	function(valid, args) {
		
        if (valid == "false" || valid == false) {
            if (typeof args == "string") {
                args = unescape(args);
                alert(args);
            }
        }
        else {
            if (args != "Procedimento solicitado executado com sucesso!") {
                if (typeof args == "object") {
                    var jsonString = JSON.stringify(args);
                    alert(jsonString);
                }
                else {
                    args = unescape(args);

                    //                    alert(args);
                }
            }
        }
    },
	
    geoCodeCity : function(query) {
		if(query.length > 5){
			console.log('value é maior que 5: ');
			this._Map.Client.geoCodeCity(query, 10, 'MapLayer.callBackExecuteCity');
		}
		
	    this.callBackExecuteCity = function(valid, args) {
	    	console.log('this.callBackExecuteCity: '+args);
	    	
            if (args != null) {
    	    	console.log('args diferente de null: ');
    			document.getElementById("west_form:queryAutoComplete").value = args ;
    			remoteChangeCommand();
            }
            

			
	    };
		
    },
	
    geoCodeAddress: function(query) {
		if(query.length > 19){
			console.log('QUERY: '+query);

			this._Map.Client.geoCodeAddress(query, 7, undefined, undefined, false, 'MapLayer.callBackExecuteGeoCodeAddress');
		}
		
	    this.callBackExecuteGeoCodeAddress = function(valid, args) {
            if (args != null) {
            	var res = args.split("|");
            	var result = [];
            	result.push();
            	
            	console.log('res: '+res);

            	for(y = 0; y < res.length; y++){
                	var resBar = res[y].split("/");
                	var str = "";
                	for(i = 0; i < resBar.length; i++){
               			var resSplit = resBar[i].split("=");
               			if(resSplit.length == 2){
							if(i > 1){
								str += resSplit[1];
								if(i >= 0){
									str += ", ";
								}
							}
               			}
                	}
                	str +="<br>";
                	console.log('String: '+str);
                	result.push(str);
            	}
            	console.log('Result: '+result);
            	
            	var teste = ["AV A, , 0, 0, , , PANAMA, -82.241582100, 9.334448350, PANAMA, 0, 0,",
            	             "R A, 39480000, 435, 531, , JANUARIA, MG, -44.397596300, -15.446193750, BRASIL, 40, 40,",
            	             "R A, 99999999, 209, 233, , JUIZ DE FORA, MG, -43.336536000, -21.788568850, BRASIL, 40, 40, ",
            	             "R A, 39650000, 0, 0, , MINAS NOVAS, MG, -42.564242350, -17.222441250, BRASIL, 90, 70, ",
            	             "R A, 39402399, 1, 111, JOAO ALVES, MONTES CLAROS, MG, -43.835302800, -16.732905100, BRASIL, 40, 40, ",
            	             "R A, 39402116, 167, 243, VILA ANALIA, MONTES CLAROS, MG, -43.827284550, -16.739329950, BRASIL, 40, 40,",
            	             "R A, 44670000, 0, 0, , ANGUERA, BA, -39.245247200, -12.151771450, BRASIL, 40, 40,"];

    			
	            var availableTags = [
	            "ActionScript",
	            "AppleScript",
	            "Asp",
	            "BASIC",
	            "C",
	            "C++",
	            "Clojure",
	            "COBOL",
	            "ColdFusion",
	            "Erlang",
	            "Fortran",
	            "Groovy",
	            "Haskell",
	            "Java",
	            "JavaScript",
	            "Lisp",
	            "Perl",
	            "PHP",
	            "Python",
	            "Ruby",
	            "Scala",
	            "Scheme"
	          ];
//            	geoportalRemoteStart([{name:'param1', value:args}]);
            	
                $("#west_form\\:tags").autocomplete({
                    source: result
                  });
            }
	    };
    },

    geoCodeAddressDelivery : function(query) {
		if(query.length > 19){
			console.log('QUERY: '+query);

			this._Map.Client.geoCodeAddress(query, 7, undefined, undefined, false, 'MapLayer.callBackExecuteGeoCodeAddressDelivery');
		}
		
	    this.callBackExecuteGeoCodeAddressDelivery = function(valid, args) {
            if (args != null) {
            	console.log('ARGS: '+args)
            	
            	geoportalRemoteDelivery([{name:'param1', value:args}]);
            }
	    };
    },

    geoCodeAddressFinish : function(query) {
		if(query.length > 19){
			console.log('QUERY: '+query);

			this._Map.Client.geoCodeAddress(query, 7, undefined, undefined, false, 'MapLayer.callBackExecuteGeoCodeAddressFinish');
		}
		
	    this.callBackExecuteGeoCodeAddressFinish = function(valid, args) {
            if (args != null) {
            	console.log('ARGS: '+args)
            	
            	geoportalRemoteFinish([{name:'param1', value:args}]);
            }
	    };
    }
};



