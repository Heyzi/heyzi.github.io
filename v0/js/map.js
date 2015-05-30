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
	
			var mappin = "Pin-icon.png"
			var var_marker = new google.maps.Marker({
				map: var_map,
				draggable: false,
				icon: mappin,
				position: var_location,
				title: "Click on this Pin to re-open Infobox",
				maxWidth: 200,
				maxHeight: 200,
				visible: true
			});
			 
			var var_infobox_props = {
				 content: "<strong>Peggy Guggenheim Collection</strong><br><br>Dorsoduro, 701-704<br>30123<br>Venezia<br>P: (+39) 041 240 5411<br><br><a href='http://www.guggenheim.org/venice' target='_blank' style='color:darkblue'>Plan your visit</a>"
				,disableAutoPan: false
				,maxWidth: 0
				,pixelOffset: new google.maps.Size(-10, 0)
				,zIndex: null
				,boxClass: "myInfobox"
				,closeBoxMargin: "2px"
				,closeBoxURL: "close_sm.png"
				,infoBoxClearance: new google.maps.Size(1, 1)
				,visible: true
				,pane: "floatPane"
				,enableEventPropagation: false
			};
 
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