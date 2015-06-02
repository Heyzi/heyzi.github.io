			var var_map;
    		var var_location = new google.maps.LatLng(59.574180, 30.128653);
	
     function map_init() {		 	
			
            var var_mapoptions = {
              center: var_location,
              zoom: 8,
              mapTypeId: google.maps.MapTypeId.ROADMAP,
              mapTypeControl: false,
              panControl:false,
              rotateControl:false,
              streetViewControl: false,
            };
			
				var_map = new google.maps.Map(document.getElementById("map-container"),
						var_mapoptions);
	 
				  var marker = new google.maps.Marker({
					position: new google.maps.LatLng(59.566108, 30.120255),
					map: var_map
					});
		  
      }	  
				google.maps.event.addDomListener(window, 'load', map_init);
      
      //start of modal google map
      $('#mapmodals').on('shown.bs.modal', function () {
          google.maps.event.trigger(var_map, "resize");
          var_map.setCenter(var_location);
      });