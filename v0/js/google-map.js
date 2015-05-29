function showMap() {
        var mapOptions = {
            zoom: 12,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(document.getElementById("map_canvas"),
            mapOptions);
        $('#myModal').on('shown.bs.modal', function () {
              google.maps.event.trigger(map, 'resize');
              map.setCenter(new google.maps.LatLng(54, -2));
            });
        $('#myModal').modal("show");
}