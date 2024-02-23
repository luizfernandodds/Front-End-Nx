 var layers = [
    new ol.layer.Tile({
      title:'terrain-background',
      source: new ol.source.Stamen({ layer: 'terrain' })
    })
  ];

  // Popup overlay
  var popup = new ol.Overlay.Popup ({
    popupClass: "default", //"tooltips", "warning" "black" "default", "tips", "shadow",
    closeBox: true,
    onshow: function(){ console.log("You opened the box"); },
    onclose: function(){ console.log("You close the box"); },
    positioning: 'auto',
    autoPan: true,
    autoPanAnimation: { duration: 250 }
  });
    
  // The map
  var map = new ol.Map ({
    target: 'map',
    view: new ol.View({
      zoom: 5,
      center: [166326, 5992663]
    }),
    layers: layers,
    overlays: [popup]
  });

  // GeoJSON layer
  var vectorSource = new ol.source.Vector({
    url: '../data/fond_guerre.geojson',
    projection: 'EPSG:3857',
    format: new ol.format.GeoJSON(),
    attributions: [ "&copy; <a href='https://data.culture.gouv.fr/explore/dataset/fonds-de-la-guerre-14-18-extrait-de-la-base-memoire'>data.culture.gouv.fr</a>" ],
    logo:"https://www.data.gouv.fr/s/avatars/37/e56718abd4465985ddde68b33be1ef.jpg" 
  });

  map.addLayer(new ol.layer.Vector({
    name: 'Fonds de guerre 14-18',
    source: vectorSource,
    style: new ol.style.Style({ image: new ol.style.Icon({ src:"../data/camera.png", scale: 0.8 }) })
  }));

  // Control Select 
  var select = new ol.interaction.Select({});
  map.addInteraction(select);

  // On selected => show/hide popup
  select.getFeatures().on(['add'], function(e) {
    var feature = e.element;
    var content = "";
    content += "<img src='"+feature.get("img")+"'/>";
    content += feature.get("text");
    popup.show(feature.getGeometry().getFirstCoordinate(), content); 
  });
  select.getFeatures().on(['remove'], function(e) {
    popup.hide(); 
  })