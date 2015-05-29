function initialize() {
  var myLatlng = new google.maps.LatLng(59.575129, 30.121597);
  var mapOptions = {
    zoom: 7,
    center: myLatlng
  }
  var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

  var marker = new google.maps.Marker({
      position: myLatlng,
      map: map,
      title: 'Hello World!'
  });
}

google.maps.event.addDomListener(window, 'load', initialize);