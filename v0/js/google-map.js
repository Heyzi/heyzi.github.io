function initialize() {
  var myLatlng = new google.maps.LatLng(59.575129, 30.121597);
  var mapOptions = {
    zoom: 7,
    center: myLatlng
  }
  var map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);

  var marker = new google.maps.Marker({
      position: myLatlng,
      map: map,
      title: 'Hello World!'
  });
}
$('#mymodal').on('shown', function () {
  google.maps.event.trigger(map, 'resize');
  map.setCenter(new google.maps.LatLng(42.7369792, -84.48386540000001));
});
google.maps.event.addDomListener(window, 'load', initialize);