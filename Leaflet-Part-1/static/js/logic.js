const url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"; //defining the source data url as constant

d3.json(url).then(function(data) {   //Extract the data
    createMap(data.features);        //passing features to the createMap function
});
//var depth=[];
function createMap(earthquakeData) {
    let street = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.{ext}', {        //define tilelayer
        minZoom: 0,
        maxZoom: 5,
        attribution: '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        ext: 'png'
    });

    let myMap = L.map("map", {              //create base map
        center: [40.0356, -115.6681],
        zoom: 6,
        layers: [street]
    });

    let earthquakes = L.geoJSON(earthquakeData, {               //parsing data into feature group
        pointToLayer: function(geoJsonPoint, latlng) {          //getting the latitude and longitude of each feature group
          var depth = geoJsonPoint.geometry.coordinates[2];     //assign the tird coordinate as the depth 
            var circleMarker = L.circle(latlng, {               //create circle markers
                radius: geoJsonPoint['properties']['mag'] * 15000,//assigning the magnitude as the radius of the markers.
                fillColor: getColor(depth), //calling the getColor function for assigning colors to the markers according to depth value.
                color: 'black',
                fillOpacity: 0.5,
                weight: 0.5
            });
            return circleMarker;
        },
        onEachFeature: function(feature, layer) {           //setting the popup of each marker with place,magnitude depth and time of the earthquake.
            layer.bindPopup(`<h3>Location: ${feature.properties.place}</h3><br>Magnitude: ${(feature.properties.mag)}<br>Depth: ${(feature.geometry.coordinates[2])}<br>Time: ${new Date(feature.properties.time)}`);
            
        },
    });

    earthquakes.addTo(myMap); //adding to basemap

    function getColor(depth) {    //declare a function for choosing colors according to depth values
      return depth > 90 ? '#cc0000':
             depth > 70 ? '#e06666':
             depth > 50 ? '#ea9999':
             depth > 30 ? '#f6b26b':
             depth > 10 ? '#fcff99':
             depth > -10 ?'#38e542':
             '#b20204';
  }

    var legend = L.control({ position: 'bottomright' }); //define legend position

    legend.onAdd = function(myMap) {
        var div = L.DomUtil.create('div', 'info legend'); // create new div in the html page.
        div.innerHTML += "<h4>Depth</h4>";
        div.innerHTML += '<i style="background: #38e542"></i><span>-10-10</span><br>'; //specifying the style and label for each legend.
        div.innerHTML += '<i style="background: #fcff99"></i><span>10-30</span><br>';
        div.innerHTML += '<i style="background: #f6b26b"></i><span>30-50</span><br>';
        div.innerHTML += '<i style="background: #ea9999"></i><span>50-70</span><br>';
        div.innerHTML += '<i style="background: #e06666"></i><span>70-90</span><br>';
        div.innerHTML += '<i style="background: #cc0000"></i><span>90+</span><br>';
         
  

  return div;
};

legend.addTo(myMap);    //Adding legend to the base map.
    }
   