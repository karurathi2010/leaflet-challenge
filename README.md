# leaflet-challenge
This challenge is to develope a way to visualize USGS earthquake data.

## Create the Earthquake Visualization
* To get the data,visited the USGS GeoJSON Feed web page and chosen the 'All Earthquakes from the Past 7 Days' data for visualization.
* Imported the data using 'd3'.
* created a function called 'createMap' and the following steps are defined in this function.
    * defined the tilelayer using 'L.tileLayer'
    * defined the basemap as 'myMap'.
    * Used L.geoJSON to parse the data into feature group and then defined the depth and circle markers using 'pointToLayer' function.
    * created the circle markers and set the color according to depth value and radius according to the magnitude.
    * defined the popup of each marker with place,magnitude depth and time of the earthquake using 'onEachfeature' function.
    * added the markers and popups to the baselayer 'myMap'
* created a legend, for that defined a variable 'legend' using 'L.control' and chosen the position as 'bottom right'.
* used 'onAdd' and with in the function created a new 'div' in the html page using 'L.DomUtil'.
* defined the style and label inside the div element.
* the legend style is added in the css.
* Finally added the legend to the basemap.