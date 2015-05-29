var map;
function initialize() {
var mapOptions = {
zoom: 8,
center: new google.maps.LatLng(59.575129, 30.121597)
};
	map = new google.maps.Map(document.getElementById('map-canvas'),
	mapOptions);
}

google.maps.event.addDomListener(window, 'load', initialize);
