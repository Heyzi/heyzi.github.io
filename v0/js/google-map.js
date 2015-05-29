$(function() {
  var $modal = $('#mymodal'),
    $map = $('#map_canvas');
  $modal.on('shown.bs.modal', function () {
    google.maps.event.trigger($map[0], 'resize');
  });
});
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

google.maps.event.addDomListener(window, 'load', initialize);