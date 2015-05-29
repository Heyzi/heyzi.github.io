 function initializeMap() {
        var mapOptions = {
            center: new google.maps.LatLng(51.219987, 4.396237),
            zoom: 12,
            mapTypeId: google.maps.MapTypeId.HYBRID
        };
        var map = new google.maps.Map(document.getElementById("map_canvas"),
          mapOptions);
        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(51.219987, 4.396237)
        });
        marker.setMap(map);
    }

    //show map on modal
    $('#myModal').on('shown.bs.modal', function () {
        initializeMap();
    });
