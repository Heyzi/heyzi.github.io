    function initialize() {
        var mapOptions = {
            center: new google.maps.LatLng(59.575129, 30.121597),
            zoom: 8,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(document.getElementById("map_canvas1"),mapOptions);
        window.console.log("Position center: "+map.getCenter()+"\nZoom: "+map.getZoom());
        map.setZoom(12);
        map.setCenter(new google.maps.LatLng(0, 0));
        window.console.log("Position center: "+map.getCenter()+"\nZoom: "+map.getZoom());
    }

    google.maps.event.addDomListener(window, 'load', initialize);