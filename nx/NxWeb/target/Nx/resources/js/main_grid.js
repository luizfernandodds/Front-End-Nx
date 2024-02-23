/**
 * Javascript Grid Controller Class
 */

var GridController = {};

GridController.handlePollPosition = function(xhr, status, args) {
	
	console.log('GridController.handlePollPosition');
	
  if (typeof args.positions === "undefined")
    return;

  var positions = eval('(' + args.positions + ')');

  if (typeof MapLayer !== "undefined") {
    if (MapLayer._MapInUse == false && positions.length > 0) {
      var multipoint = "MULTIPOINT (";
      for ( var i in positions) {
        multipoint += positions[i].longitude + " " + positions[i].latitude
            + ", ";
      }
      multipoint = multipoint.slice(0, -2) + ")";
      MapLayer.zoom(multipoint);
    }

    MapLayer.handlePollPosition(xhr, status, args);

  }
  GridController.updateGridSort();
  GridController.gridHighlight(positions);
};

GridController.gridHighlight = function(posObj) {
  for ( var i in posObj) {
    var gpsTimeOld = !$("body").data(posObj[i].deviceId + "_gpsTime") ? posObj[i].gpsTime
        : $("body").data(posObj[i].deviceId + "_gpsTime");
    $("body").data(posObj[i].deviceId + "_gpsTime", posObj[i].gpsTime);

    if (posObj[i].gpsTime
        && parseInt(posObj[i].gpsTime) != parseInt(gpsTimeOld)) {
      $("#target_row_" + posObj[i].deviceId).each(
          function() {
            $(this).effect("highlight", {}, 3000);
          });
    }
  }
};

GridController.persistenceGridSort = function(obj, property) {
  obj = obj.parentNode.parentNode.parentNode;
  var sortColumn = $(obj.parentNode).find(".ui-state-active");
  var sortOrder = "DESCENDING";
  if (sortColumn.length <= 0) {
    $(obj).addClass("ui-state-active");
    $(obj).find("a").addClass("ui-icon-triangle-1-s");
  } else {
    sortColumn.removeClass("ui-state-active");
    $(obj).addClass("ui-state-active");
    var link = $(obj).find("a");

    if (link.attr("class").indexOf("ui-icon-triangle-1-n") != -1) {
      $(obj.parentNode).find("a").removeClass(
          "ui-icon-triangle-1-s ui-icon-triangle-1-n");
      $(obj).removeClass("ui-state-active");
      sortOrder = null;
      property = null;
    } else if (link.attr("class").indexOf("ui-icon-triangle-1-s") != -1) {
      $(obj.parentNode).find("a").removeClass(
          "ui-icon-triangle-1-s ui-icon-triangle-1-n");
      link.addClass("ui-icon-triangle-1-n");
      sortOrder = "ASCENDING";
    } else {
      $(obj.parentNode).find("a").removeClass(
          "ui-icon-triangle-1-s ui-icon-triangle-1-n");
      link.addClass("ui-icon-triangle-1-s");
      sortOrder = "DESCENDING";
    }
  }

  $("body").data("sortPersistenceGridOrder", sortOrder);
  $("body").data("sortPersistenceGridColumn", $(obj).attr("id"));

  property = property === "status" || property === "tools" ? "panic" : property;

  $("#sortOrder").val(sortOrder);
  $("#sortProperty").val(property);
  $("#maingrid_refresh_position").click();
};

GridController.clearGridSort = function() {
  var selectedColumn = PF('dataGrid').jq.find(".ui-state-active");
  if (selectedColumn.length <= 0) {
    return;
  }
  selectedColumn.siblings().removeClass("ui-state-active");
  selectedColumn.siblings().find(".ui-sortable-column-icon").removeClass(
      "ui-icon-triangle-1-s ui-icon-triangle-1-n");
};

GridController.updateGridSort = function() {
  GridController.clearGridSort();
  if (!$("body").data("sortPersistenceGridOrder")
      || !$("body").data("sortPersistenceGridColumn"))
    return;

  var sortOrder = $("body").data("sortPersistenceGridOrder");
  var sortColumn = $("body").data("sortPersistenceGridColumn");

  $("#" + sortColumn.replace(/\:/g, "\\:")).addClass("ui-state-active");
  $("#" + sortColumn.replace(/\:/g, "\\:")).find(".ui-sortable-column-icon")
      .addClass(
          sortOrder === "ASCENDING" ? "ui-icon-triangle-1-n"
              : "ui-icon-triangle-1-s");
};
