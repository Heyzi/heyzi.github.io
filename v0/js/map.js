			var var_map;
    		var var_location = new google.maps.LatLng(45.430817,12.331516);
	
     function map_init() {		 	
			
            var var_mapoptions = {
              center: var_location,
              zoom: 18,
              mapTypeId: google.maps.MapTypeId.ROADMAP,
              mapTypeControl: false,
              panControl:false,
              rotateControl:false,
              streetViewControl: false,
            };
			
				var_map = new google.maps.Map(document.getElementById("map-container"),
						var_mapoptions);
	 
				  google.maps.event.addListener(var_marker, 'click', function(e) {
					 var_infobox.open(var_map, this);
				  });
		  
			var var_infobox = new InfoBox(var_infobox_props);
	
				var_infobox.open(var_map, var_marker);
			
      }
		  
				google.maps.event.addDomListener(window, 'load', map_init);
      
      //start of modal google map
      $('#mapmodals').on('shown.bs.modal', function () {
          google.maps.event.trigger(var_map, "resize");
          var_map.setCenter(var_location);
      });