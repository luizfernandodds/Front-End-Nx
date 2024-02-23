/**
 * map.js
 * 
 * Depends jQuery
 */

/**
 * Globas Variables
 */
var MapLayer;

/**
 * Map Contructor
 */
var MapController = function() {
  MapController.prototype._AppPath = window.location.protocol + "//"
      + window.location.href.split('//')[1].split('/')[0] + "/";
  MapController.prototype._MapInUse = false;
  /**
   * Startup Remote Map Classes from Provider
   */
  this.startup = function() {
	console.log('Startup');
    MapController.prototype._Map = this.init();
    window.onresize = function(event) {
      MapController.prototype.resizeCanvas();

      /* Execute onResize functions */
      if ($.type(MapController.prototype._configure.onResize) == "function") {
        try {
          MapController.prototype._configure.onResize();
        } catch (e) {
          console.log("Error while execute on onResize: " + e);
          // console.log(MapController.prototype._configure.loadExecute);
        }
      }
    };
  };

  /**
   * Configure Map Parameters
   * 
   * @TODO: Verify if the objects needed are fully populated.
   * 
   * @param obj
   *          Configuration Object
   */
  this.configure = function(obj) {
	
    if (MapController.prototype._configure == undefined)
      MapController.prototype._configure = obj.constructor();
    for ( var key in obj) {

      MapController.prototype._configure[key] = obj[key];
    }
  };

  /**
   * Zoom no mapa
   * 
   * @param xhr
   *          JAVA
   * @param status
   *          JAVA
   * @param args
   *          wkt string
   */
  this.handleZoom = function(xhr, status, args) {
    if (typeof args.wkt === "undefined")
      return;
    this.zoom(args.wkt);
  };

  /**
   * Atualiza lista de posicoes no Mapa
   * 
   * @param xhr
   *          JAVA
   * @param status
   *          JAVA
   * @param args
   *          lista de objeto de posicoes
   */
  this.handlePollPosition = function(xhr, status, args) {
	  console.log('handlePollPosition');

    if (typeof args.positions === "undefined")
      return;

    MapController.prototype._MapInUse = true;

    var posObj = eval('(' + args.positions + ')');
    if (Object.prototype.toString.call(posObj) === "[object Array]") {
      for ( var key in posObj) {
        this.addPosition(posObj[key]);
      }
    } else {
      this.addPosition(posObj);
    }
  };

  /**
   * Atualiza lista de Points no Mapa
   * 
   * @param xhr
   *          JAVA
   * @param status
   *          JAVA
   * @param args
   *          lista de objeto de posicoes
   */
  this.handlePoint = function(xhr, status, args) {
    if (typeof args.pois === "undefined")
      return;

    var obj = eval('(' + args.pois + ')');
    if (Object.prototype.toString.call(obj) === "[object Array]") {
      for ( var key in obj) {
        this.addPoint(obj[key].wkt, "POINT_" + obj[key].id);
      }
    } else {
      this.addPoint(obj.wkt, "POINT_" + obj.id);
    }
  };

  /**
   * Atualiza lista de Points no Mapa
   * 
   * @param xhr
   *          JAVA
   * @param status
   *          JAVA
   * @param args
   *          lista de objeto de posicoes
   */
  this.handlePointBalloon = function(xhr, status, args) {
    if (typeof args.pois === "undefined")
      return;

    var obj = eval('(' + args.pois + ')');
    if (Object.prototype.toString.call(obj) === "[object Array]") {
      for ( var key in obj) {
        this.addMarker(obj[key], {
          icon : obj[key].icon,
          balloonType : "point"
        });
      }
    } else {
      this.addMarker(obj, {
        icon : obj.icon,
        balloonType : "point"
      });
    }
  };

  /**
   * Atualiza lista de Control Points no Mapa
   * 
   * @param xhr
   *          JAVA
   * @param status
   *          JAVA
   * @param args
   *          lista de objeto de posicoes
   */
  this.handleControlPoint = function(xhr, status, args) {
    if (typeof args.pocs === "undefined")
      return;

    var obj = eval('(' + args.pocs + ')');
    if (Object.prototype.toString.call(obj) === "[object Array]") {
      for ( var key in obj) {
        this.addControlPoint(obj[key].wkt, obj[key].radius, "POC_"
            + obj[key].id);
      }
    } else {
      this.addControlPoint(obj.wkt, obj.radius, "POC_" + obj.id);
    }
  };

  /**
   * Atualiza lista de Poligonos no Mapa
   * 
   * @param xhr
   *          JAVA
   * @param status
   *          JAVA
   * @param args
   *          lista de objeto de posicoes
   */
  this.handlePolygon = function(xhr, status, args) {
    if (typeof args.fences === "undefined")
      return;

    var obj = eval('(' + args.fences + ')');
    if (Object.prototype.toString.call(obj) === "[object Array]") {
      for ( var key in obj) {
        this.addPolygon(obj[key].wkt, "POLYGON_" + obj[key].id);
      }
    } else {
      this.addPolygon(obj.wkt, "POLYGON_" + obj.id);
    }
  };

  /**
   * Atualiza lista de Linhas no Mapa
   * 
   * @param xhr
   *          JAVA
   * @param status
   *          JAVA
   * @param args
   *          lista de objeto de posicoes
   */
  this.handleLine = function(xhr, status, args) {
    if (typeof args.routes === "undefined")
      return;

    var obj = eval('(' + args.routes + ')');
    if (Object.prototype.toString.call(obj) === "[object Array]") {
      for ( var key in obj) {
        this.addLine(obj[key].wkt, "LINE_" + obj[key].id);
      }
    } else {
      this.addLine(obj.wkt, "LINE_" + obj.id);
    }
  };

  /**
   * Adiciona marcadores das posicoes no Mapa
   * 
   * @param posObj
   *          objeto com os dados do pacote de posicao
   */
  this.addPosition = function(posObj) {
    if (posObj.center == posObj.deviceId)
      this.center(posObj.longitude, posObj.latitude);


    posObj.deviceId = posObj.deviceId.toString();
    if (!$("body").data(posObj.deviceId)) {
      $("body").data(posObj.deviceId, posObj);
      this.addMarker(posObj, {
        icon : posObj.icon,
        balloonType : "position"
      });

      if (posObj.shadow != "" && posObj.center == posObj.deviceId) {
        this.zoom("POINT (" + posObj.longitude + " " + posObj.latitude + ")");
      }
    } else {
      var fromData = $("body").data(posObj.deviceId);
      if (fromData.gpsTime != posObj.gpsTime) {
        $("body").data(posObj.deviceId, posObj);

        this.removeMarker(fromData);
        this.addMarker(posObj, {
          icon : posObj.icon,
          balloonType : "position"
        });

        if (posObj.shadow == "GHOST" || posObj.shadow == "ROUTE") {
          // var lineName = "LINE_" + (new Date()).getTime();
          var lineName = "LINE_"
              + new String(posObj.deviceId + "" + posObj.gpsTime);

          if (typeof grid_shadow_limit === "undefined")
            grid_shadow_limit = 0;

          if (grid_shadow_limit > 0) {
            if (!$("body").data(posObj.deviceId + ":GHOST"))
              $("body").data(posObj.deviceId + ":GHOST", []);
            var ghostArray = $("body").data(posObj.deviceId + ":GHOST");
            while (ghostArray.length >= grid_shadow_limit) {
              this.removeDraw(ghostArray[0]);
              ghostArray.shift();
            }
            ghostArray.push(lineName);
            $("body").data(posObj.deviceId + ":GHOST", ghostArray);
          }

          this.addLine("LINESTRING (" + fromData.longitude + " "
              + fromData.latitude + ", " + posObj.longitude + " "
              + posObj.latitude + ")", lineName);
          if (posObj.shadow == "GHOST")
            this.addMarker(fromData, {
              icon : 20,
              balloonType : "position"
            });
        } else if (posObj.shadow == "MULTIPLE") {
          this.addMarker(fromData, {
            icon : posObj.icon,
            balloonType : "position"
          });
        }
      }
    }
  };

      /**
       * getBalloon
       * 
       * @param obj
       *          Position Object
       * @param config
       *          Balloon Configuration
       * 
       * @return Object Balloon
       */
      MapController.prototype.getBalloon = function(obj, config) {
        switch (config.balloonType) {
        case "point":
          return this.getPointBalloon(obj, config);
        case "position":
          return this.getPositionBalloon(obj, config);
        default:
          return this.getPositionBalloon(obj, config);
        }
      },

      MapController.prototype.getPositionBalloon = function(obj, config) {
        var balloon = new Object;

        balloon.icon = this.iconPath(config, obj);

        var imgIgn = "<img src=\""
            + this._AppPath
            + "map_icons?p=1001&s="
            + (obj.ignition == true ? '1' : '0')
            + "\" title=\""
            + (obj.ignition == true ? map_ballon_ignition_on
                : map_ballon_ignition_off) + "\" />";
        var imgMem = " <img src=\""
            + this._AppPath
            + "map_icons?p=1003&s="
            + (obj.memory == true ? '0' : '1')
            + "\" title=\""
            + (obj.memory == true ? map_ballon_pos_memory
                : map_ballon_pos_online) + "\"/>";
        var imgSvn = obj.gpsSvn != null ? " <img src=\"" + this._AppPath
            + "map_icons?p=1011&s=" + obj.gpsSvn + "\" title=\""
            + map_ballon_gps_svn + " " + (obj.gpsSvn > 15 ? 15 : obj.gpsSvn)
            + "\" />" : "";
        var imgPanic = (obj.panic != null && obj.panic == true) ? " <img src=\""
            + this._AppPath
            + "map_icons?p=1009"
            + "\" title=\""
            + map_ballon_panic + "\" />"
            : "";
        var imgBlock = (obj.block != null && obj.block == true) ? " <img src=\""
            + this._AppPath
            + "map_icons?p=1002"
            + "\" title=\""
            + map_ballon_block + "\" />"
            : "";
        var imgBat = obj.battery != null ? " <img src=\"" + this._AppPath
            + "map_icons?p=1012&s=" + obj.battery + "\" title=\""
            + map_ballon_battery + " " + obj.battery + "%\" />" : "";

        balloon.html = "<table><tr><td>" + map_ballon_tag + ": </td><td><b>"
            + obj.tag + "</b></td></tr><tr><td>" + map_ballon_latitude
            + ": </td><td> " + obj.formatLatitude + " </td></tr><tr><td>"
            + map_ballon_longitude + ": </td><td> " + obj.formatLongitude
            + " </td></tr>";

        if (obj.ignition != null)
          balloon.html += "<tr><td>" + map_ballon_status + ": </td><td>"
              + imgIgn + "" + imgMem + "" + imgSvn + "" + imgPanic + ""
              + imgBlock + "" + imgBat + "</td></tr>";

        if (obj.speed != null && obj.speed > 0)
          balloon.html += "<tr><td>" + map_ballon_speed + ": </td><td>"
              + obj.speed + " Km/h</td></tr>";

        balloon.html += "<tr><td>" + map_ballon_date_gps + ": </td><td>"
            + obj.formatGps + "</td></tr>";

        if (obj.info != null) {
          if (Object.prototype.toString.call(obj.info) === "[object Object]") {
            balloon.html += "<tr><td colspan=\"3\"><br></td></tr>";
            for ( var key in obj.info) {
              balloon.html += "<tr><td><b>" + key + "</b></td><td>"
                  + obj.info[key] + "</td></tr>";
            }
          } else {
            balloon.html += "<tr><td colspan=\"2\"><br>" + obj.info
                + "</td></tr>";
          }
        }

        balloon.html += "</table>";

        if (obj.action === true) {
          balloon.html += "<br>";
          balloon.html += "<hr width=\"100%\" />";

          balloon.html += "<table><tr>";
          // Zoom
          balloon.html += "<td style=\"cursor:pointer;\"><a onclick=\"$('.link_grid_target_"
              + obj.deviceId + "').trigger('click'); return false;\">";
          balloon.html += "<img src=\"/map_icons?p=1004&amp;s="
              + (obj.center ? '1' : '0')
              + "\" width=\"16\" height=\"16\" title=\"" + grid_target_title
              + "\" />";
          balloon.html += "</a></td>";
          // Follow
          balloon.html += "<td style=\"cursor:pointer;\"><a onclick=\"$('.link_grid_follow_"
              + obj.deviceId + "').trigger('click'); return false;\">";
          balloon.html += "<img src=\"/map_icons?p=1005&s="
              + (obj.shadow == "GHOST" || obj.shadow == "ROUTE" ? '1' : '0')
              + "\" width=\"16\" height=\"16\" title=\"" + grid_follow_title
              + "\" />";
          balloon.html += "</a></td>";
          // Follow New Window
          balloon.html += "<td style=\"cursor:pointer;\"><a onclick=\"$('.link_grid_follow_new_window_"
              + obj.deviceId + "').trigger('click'); return false;\">";
          balloon.html += "<img src=\"/map_icons?p=1008&\" width=\"16\" height=\"16\" title=\""
              + grid_follow_new_window_title + "\" />";
          balloon.html += "</a></td>";
          // Tools
          balloon.html += "<td style=\"cursor:pointer;\"><a onclick=\"$('.link_grid_tools_"
              + obj.deviceId + "').trigger('click'); return false;\">";
          balloon.html += "<img src=\"/map_icons?p=1006&s=0\" width=\"16\" height=\"16\" title=\""
              + grid_tools_title + "\" />";
          balloon.html += "</a></td>";

          // Street View
          //if (typeof load === "undefined") {
            balloon.html += "<td style=\"cursor:pointer;\"><a onclick=\"{ var win=window.open('http://maps.gstatic.com/m/streetview/?q=&layer=c&cbp=12,20.09,,0,5&cbll="
                + obj.latitude
                + ","
                + obj.longitude
                + "&ll="
                + obj.latitude
                + "," + obj.longitude + "', '_blank'); win.focus(); }\">";
            balloon.html += "<img src=\""
                + this._AppPath
                + "resources/images/grid/streetview.png\" height=\"16\" title=\"Street View\" />";
            balloon.html += "</a></td>";
         // }

          balloon.html += "</tr></table>";
        }

        return balloon;
      },

      /**
       * Point Balloon
       */
      MapController.prototype.getPointBalloon = function(obj, config) {
        var balloon = new Object;

        balloon.icon = this._AppPath + "map_icons?p=" + config.icon
            + "&s=4&&x=" + config.shift + (obj.index ? "&i=" + obj.index : "");

        balloon.html = "<table><tr><td>" + map_ballon_tag + ": </td><td><b>"
            + obj.tag + "</b></td></tr><tr><td>" + map_ballon_latitude
            + ": </td><td> " + obj.formatLatitude + " </td></tr><tr><td>"
            + map_ballon_longitude + ": </td><td> " + obj.formatLongitude
            + " </td></tr>";

        if (obj.info != null) {
          if (Object.prototype.toString.call(obj.info) === "[object Object]") {
            balloon.html += "<tr><td colspan=\"3\"><br></td></tr>";
            for ( var key in obj.info) {
              balloon.html += "<tr><td><b>" + key + "</b></td><td>"
                  + obj.info[key] + "</td></tr>";
            }
          } else {
            balloon.html += "<tr><td colspan=\"2\"><br>" + obj.info
                + "</td></tr>";
          }
        }

        balloon.html += "</table>";

        if (obj.action === true) {
          balloon.html += "<br>";
          balloon.html += "<hr width=\"100%\" />";

          balloon.html += "<table><tr>";
          // Zoom
          balloon.html += "<td style=\"cursor:pointer;\"><a onclick=\"$('.link_grid_target_"
              + obj.deviceId + "').trigger('click'); return false;\">";
          balloon.html += "<img src=\"/map_icons?p=1004&amp;s="
              + (obj.center ? '1' : '0')
              + "\" width=\"16\" height=\"16\" title=\"" + grid_target_title
              + "\" />";
          balloon.html += "</a></td>";
          // Follow
          balloon.html += "<td style=\"cursor:pointer;\"><a onclick=\"$('.link_grid_follow_"
              + obj.deviceId + "').trigger('click'); return false;\">";
          balloon.html += "<img src=\"/map_icons?p=1005&s="
              + (obj.shadow == "GHOST" || obj.shadow == "ROUTE" ? '1' : '0')
              + "\" width=\"16\" height=\"16\" title=\"" + grid_follow_title
              + "\" />";
          balloon.html += "</a></td>";
          // Follow New Window
          balloon.html += "<td style=\"cursor:pointer;\"><a onclick=\"$('.link_grid_follow_new_window_"
              + obj.deviceId + "').trigger('click'); return false;\">";
          balloon.html += "<img src=\"/map_icons?p=1008&\" width=\"16\" height=\"16\" title=\""
              + grid_follow_new_window_title + "\" />";
          balloon.html += "</a></td>";
          // Tools
          balloon.html += "<td style=\"cursor:pointer;\"><a onclick=\"$('.link_grid_tools_"
              + obj.deviceId + "').trigger('click'); return false;\">";
          balloon.html += "<img src=\"/map_icons?p=1006&s=0\" width=\"16\" height=\"16\" title=\""
              + grid_tools_title + "\" />";
          balloon.html += "</a></td>";

          // Street View
          if (typeof load === "undefined") {
            balloon.html += "<td style=\"cursor:pointer;\"><a onclick=\"{ var win=window.open('http://maps.google.com/?q=&layer=c&cbp=12,20.09,,0,5&cbll="
                + obj.latitude
                + ","
                + obj.longitude
                + "&ll="
                + obj.latitude
                + "," + obj.longitude + "', '_blank'); win.focus(); }\">";
            balloon.html += "<img src=\""
                + this._AppPath
                + "resources/images/grid/streetview.png\" height=\"16\" title=\"Street View\" />";
            balloon.html += "</a></td>";
          }

          balloon.html += "</tr></table>";
        }

        return balloon;
      },

      /**
       * Map icons
       * 
       * @param config
       *          object icon config
       * 
       * @param pos
       *          object position
       * 
       * @param index
       *          if icon have a index
       * 
       * @returns String Retorna path do icone
       */
      MapController.prototype.iconPath = function(config, pos) {
        var color = 4; // Preto
        if (pos.panic != null && pos.panic == true) {
          color = 2; // Vermelho
        } else if (pos.ignition != null && pos.ignition == true) {
          if (pos.speed != null && pos.speed == 0) {
            color = 1; // Amarelo
          } else {
            color = 0; // Verde
          }
        }
        return this._AppPath + "map_icons?p=" + config.icon + "&s=" + color
            + "&x=" + config.shift + (pos.index ? "&i=" + pos.index : "");
      },

      /**
       * getBoundsOffset
       * 
       * @param point
       *          WKT off point
       * @param offset
       *          offset in meters
       * 
       * @returns WKT MULTIPOINT with offset
       */
      MapController.prototype.getBoundsOffset = function(point, offsetEl,
          offsetValue) {
        point = this.getWkt(point);
        var offset = typeof offsetValue === "undefined" ? parseInt(this
            .getWkt(offsetEl)) : offsetValue;

        var longLat = point.substring((point.indexOf("(") + 1),
            point.indexOf(")")).split(" ");
        var long = parseFloat(longLat[0]);
        var lat = parseFloat(longLat[1]);

        var pLat = lat + (offset / 6378137) * 180 / Math.PI;
        var pLong = long
            + (offset / (6378137 * Math.cos(Math.PI * long / 180))) * 180
            / Math.PI;
        var lLat = lat + ((offset * -1) / 6378137) * 180 / Math.PI;
        var lLong = long
            + ((offset * -1) / (6378137 * Math.cos(Math.PI * long / 180)))
            * 180 / Math.PI;

        // return "LINESTRING (" + pLong + " " + pLat + ", " + lLong + " " +
        // lLat
        // + ")";

        return "MULTIPOINT (" + pLong + " " + pLat + ", " + lLong + " " + pLat
            + ", " + lLong + " " + lLat + ", " + pLong + " " + lLat + ")";
      };

  /**
   * Get WKT
   * 
   * @param value
   *          to test and get WKT
   * 
   * @returns WKT value of parameter
   */
  MapController.prototype.getWkt = function(value) {
    return this.isWkt(value) ? value : document.getElementById(value).value;
  };

  /**
   * Check if is WKT
   * 
   * @param value
   *          to test
   * 
   * @returns true if is WKT
   */
  MapController.prototype.isWkt = function(value) {
    return ($.type(value) == "string" && (value.indexOf("(") <= 0 && value
        .indexOf(")") <= 0)) ? false : true;
  };

  /**
   * Save positions on page body
   * 
   * @param xhr
   *          JAVA
   * @param status
   *          JAVA
   * @param args
   *          lista de objeto de posicoes
   */
  MapController.prototype.handleSavePositions = function(xhr, status, args) {
    if (typeof args.positions === "undefined")
      return;

    var posObj = eval('(' + args.positions + ')');
    if (Object.prototype.toString.call(posObj) === "[object Array]") {
      for ( var key in posObj) {
        if (!$("body").data(posObj[key].deviceId + ":POSITIONS"))
          $("body").data(posObj[key].deviceId + ":POSITIONS", []);
        var ghostArray = $("body").data(posObj[key].deviceId + ":POSITIONS");
        ghostArray.push(posObj[key]);
        $("body").data(posObj[key].deviceId + ":POSITIONS", ghostArray);
      }
      this.dataMarker(posObj[posObj.length - 1]);
    } else {
      if (!$("body").data(posObj.deviceId + ":POSITIONS"))
        $("body").data(posObj.deviceId + ":POSITIONS", []);
      var ghostArray = $("body").data(posObj.deviceId + ":POSITIONS");
      ghostArray.push(posObj);
      $("body").data(posObj.deviceId + ":POSITIONS", ghostArray);
      this.dataMarker(posObj);
    }
  };

  /**
   * Backward position
   * 
   * @param device
   *          id
   * @param if
   *          is automatic
   */
  MapController.prototype.backwardMarkers = function(device, auto) {
    if (auto === false)
      MapController.prototype.pauseMarkers();

    if (!$("body").data(device + ":POSITIONS_TEMP"))
      $("body").data(device + ":POSITIONS_TEMP", []);
    var tempMarker = $("body").data(device + ":POSITIONS_TEMP");
    var savedMarker = $("body").data(device + ":POSITIONS");
    if (savedMarker && savedMarker.length > 1) {
      MapController.prototype.removeMarker(savedMarker[savedMarker.length - 1]);
      MapController.prototype.removeMarker(savedMarker[savedMarker.length - 2]);
      MapController.prototype.addMarker(savedMarker[savedMarker.length - 2], {
        icon : savedMarker[savedMarker.length - 2].icon,
        balloonType : "position"
      });
      if (savedMarker[savedMarker.length - 1].shadow == "GHOST"
          || savedMarker[savedMarker.length - 1].shadow == "ROUTE") {
        var ghostLine = "LINE_"
            + new String(savedMarker[savedMarker.length - 1].deviceId + ""
                + savedMarker[savedMarker.length - 1].gpsTime);
        MapController.prototype.removeDraw(ghostLine);
      }
      tempMarker.push(savedMarker[savedMarker.length - 1]);
      this.dataMarker(savedMarker[savedMarker.length - 2]);
      savedMarker.pop();
      $("body").data(device + ":POSITIONS", savedMarker);
      $("body").data(device + ":POSITIONS_TEMP", tempMarker);
    }
  };

  /**
   * Forward position
   * 
   * @param device
   *          id
   * @param if
   *          is automatic
   */
  MapController.prototype.forwardMarkers = function(device, auto) {
    if (auto === false)
      MapController.prototype.pauseMarkers();

    if (!$("body").data(device + ":POSITIONS_TEMP"))
      return;
    var tempMarker = $("body").data(device + ":POSITIONS_TEMP");
    var savedMarker = $("body").data(device + ":POSITIONS");
    if (savedMarker && savedMarker.length > 0 && tempMarker
        && tempMarker.length > 0) {
      MapController.prototype.removeMarker(savedMarker[savedMarker.length - 1]);
      MapController.prototype.addMarker(savedMarker[savedMarker.length - 1], {
        icon : 20,
        balloonType : "position"
      });
      MapController.prototype.addMarker(tempMarker[tempMarker.length - 1], {
        icon : tempMarker[tempMarker.length - 1].icon,
        balloonType : "position"
      });
      if (tempMarker[tempMarker.length - 1].shadow == "GHOST"
          || tempMarker[tempMarker.length - 1].shadow == "ROUTE") {
        var ghostLine = "LINE_"
            + new String(tempMarker[tempMarker.length - 1].deviceId + ""
                + tempMarker[tempMarker.length - 1].gpsTime);
        MapController.prototype.addLine("LINESTRING ("
            + savedMarker[savedMarker.length - 1].longitude + " "
            + savedMarker[savedMarker.length - 1].latitude + ", "
            + tempMarker[tempMarker.length - 1].longitude + " "
            + tempMarker[tempMarker.length - 1].latitude + ")", ghostLine);
      }
      savedMarker.push(tempMarker[tempMarker.length - 1]);
      this.dataMarker(tempMarker[tempMarker.length - 1]);
      tempMarker.pop();
      $("body").data(device + ":POSITIONS", savedMarker);
      $("body").data(device + ":POSITIONS_TEMP", tempMarker);
    }
  };

  /**
   * Play positions
   * 
   * @param interval
   *          time
   */
  MapController.prototype.playMarkers = function(device, time) {
    var tempMarker = $("body").data(device + ":POSITIONS_TEMP");
    if (tempMarker && tempMarker.length > 0) {
      MapController.prototype._playingMarkers = true;
      for ( var i = 0; i < tempMarker.length; i++) {
        $("body").delay(time).queue(function() {
          if (MapLayer._playingMarkers === false) {
            $(this).clearQueue();
            return;
          }
          MapLayer.forwardMarkers(device, true);
          $(this).dequeue();
        });
      }
    }
  };

  /**
   * Pause automatic positions
   */
  MapController.prototype.pauseMarkers = function() {
    MapController.prototype._playingMarkers = false;
  };

  /**
   * Stop and clean positions
   * 
   * @param device
   *          id
   */
  MapController.prototype.stopMarkers = function(device) {
    MapController.prototype._playingMarkers = false;
    var savedMarker = $("body").data(device + ":POSITIONS");
    if (!savedMarker || savedMarker.length <= 1)
      return;
    if (!$("body").data(device + ":POSITIONS_TEMP"))
      $("body").data(device + ":POSITIONS_TEMP", []);
    var tempMarker = $("body").data(device + ":POSITIONS_TEMP");
    for ( var i = savedMarker.length - 1; i >= 0; i--) {
      MapController.prototype.removeMarker(savedMarker[i]);
      if (savedMarker[i].shadow == "GHOST" || savedMarker[i].shadow == "ROUTE") {
        var ghostLine = "LINE_"
            + new String(savedMarker[i].deviceId + "" + savedMarker[i].gpsTime);
        MapController.prototype.removeDraw(ghostLine);
      }

      tempMarker.push(savedMarker[i]);
      savedMarker.pop();
    }
    MapController.prototype.addMarker(tempMarker[tempMarker.length - 1], {
      icon : tempMarker[tempMarker.length - 1].icon,
      balloonType : "position"
    });
    savedMarker.push(tempMarker[tempMarker.length - 1]);
    this.dataMarker(tempMarker[tempMarker.length - 1]);
    tempMarker.pop();
    $("body").data(device + ":POSITIONS", savedMarker);
    $("body").data(device + ":POSITIONS_TEMP", tempMarker);
  };

  MapController.prototype.dataMarker = function(obj) {
    $(MapController.prototype._dataMarkerDiv).html('');

    var imgIgn = "<img src=\""
        + this._AppPath
        + "map_icons?p=1001&s="
        + (obj.ignition == true ? '1' : '0')
        + "\" title=\""
        + (obj.ignition == true ? map_ballon_ignition_on
            : map_ballon_ignition_off) + "\" />";
    var imgMem = " <img src=\"" + this._AppPath + "map_icons?p=1003&s="
        + (obj.memory == true ? '0' : '1') + "\" title=\""
        + (obj.memory == true ? map_ballon_pos_memory : map_ballon_pos_online)
        + "\"/>";
    var imgSvn = obj.gpsSvn != null ? " <img src=\"" + this._AppPath
        + "map_icons?p=1011&s=" + obj.gpsSvn + "\" title=\""
        + map_ballon_gps_svn + " " + (obj.gpsSvn > 15 ? 15 : obj.gpsSvn)
        + "\" />" : "";
    var imgPanic = (obj.panic != null && obj.panic == true) ? " <img src=\""
        + this._AppPath + "map_icons?p=1009" + "\" title=\"" + map_ballon_panic
        + "\" />" : "";
    var imgBlock = (obj.block != null && obj.block == true) ? " <img src=\""
        + this._AppPath + "map_icons?p=1002" + "\" title=\"" + map_ballon_block
        + "\" />" : "";
    var imgBat = obj.battery != null ? " <img src=\"" + this._AppPath
        + "map_icons?p=1012&s=" + obj.battery + "\" title=\""
        + map_ballon_battery + " " + obj.battery + "%\" />" : "";

    var html = "<table style=\"text-align: left;\"><tr><td>"
        + map_ballon_tag
        + ": </td><td><b>"
        + obj.tag
        + "</b></td></tr>"
        + (obj.index != null ? "<tr><td>" + map_ballon_index + ": </td><td>"
            + obj.index + "</td></tr>" : "") + "<tr><td>" + map_ballon_latitude
        + ": </td><td> " + obj.formatLatitude + " </td></tr><tr><td>"
        + map_ballon_longitude + ": </td><td> " + obj.formatLongitude
        + " </td></tr>";

    if (obj.ignition != null)
      html += "<tr><td>" + map_ballon_status + ": </td><td>" + imgIgn + ""
          + imgMem + "" + imgSvn + "" + imgPanic + "" + imgBlock + "" + imgBat
          + "</td></tr>";

    if (obj.speed != null && obj.speed > 0)
      html += "<tr><td>" + map_ballon_speed + ": </td><td>" + obj.speed
          + " Km/h</td></tr>";

    html += "<tr><td>" + map_ballon_date_gps + ": </td><td>" + obj.formatGps
        + "</td></tr>";

    html += "<tr><td colspan=\"2\"><br/></td></tr>";

    html += "<tr><td>" + map_ballon_country + ": </td><td>" + obj.country
        + "</td></tr>";
    html += "<tr><td>" + map_ballon_state + ": </td><td>" + obj.state
        + "</td></tr>";
    html += "<tr><td>" + map_ballon_city + ": </td><td>" + obj.city
        + "</td></tr>";
    html += "<tr><td>" + map_ballon_address + ": </td><td>" + obj.address
        + "</td></tr>";

    html += "</table>";

    $(MapController.prototype._dataMarkerDiv).append(html);
  };

  MapController.prototype.setDataMarkerDiv = function(div) {
    MapController.prototype._dataMarkerDiv = div;
  };
};