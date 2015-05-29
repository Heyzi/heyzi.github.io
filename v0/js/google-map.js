myLatlng = new google.maps.LatLng(56.32039899999999,44.002245000000016);
     centerLatlng = new google.maps.LatLng(56.32039899999999,44.002245000000016);

      //start of modal google map
      $("#myModal").modal({
          show: false
      }).on("shown", function()
      {
          var map_options = {
            zoom: 17,
            mapTypeControl: false,
            center:centerLatlng,
            panControl:false,
            rotateControl:false,
            streetViewControl: false,
            mapTypeId: google.maps.MapTypeId.ROADMAP
          };

        var map = new google.maps.Map(document.getElementById("mapcanvas"), map_options);

         var contentString = '<div id="mapInfo">'+
            '<p><strong>Нижегородский театр «Комедія»</strong><br>'+
            'г.Нижний Новгород, ул. Грузинская, д. 23</p>'+
            '<a href="http://comedia.nnov.ru/" target="_blank">Перейти на сайт</a>'+
            '</div>';

          var infowindow = new google.maps.InfoWindow({
            content: contentString
          });
          
          var marker = new google.maps.Marker({
            position: myLatlng,
            map: map,
            title:"Нижегородский театр «Комедія»",
                  maxWidth: 200,
                  maxHeight: 200
          });
          
          google.maps.event.addListener(marker, 'click', function() {
             infowindow.open(map,marker);
          });
          infowindow.open(map,marker);
      });
      //end of modal google map