var map; //объявляем глобальную (внешнюю) переменную
    // Создает обработчик события window.onLoad
    YMaps.jQuery(function () {
        // Создает экземпляр карты и привязывает его к созданному контейнеру
        map = new YMaps.Map(YMaps.jQuery("#YMapsID")[0]);
        // Устанавливает начальные параметры отображения карты: центр карты и коэффициент масштабирования
        map.setCenter(new YMaps.GeoPoint(30.343561,60.050282), 14);
        //map.addControl(new YMaps.TypeControl());
        map.addControl(new YMaps.ToolBar());
        map.addControl(new YMaps.Zoom());
        //map.addControl(new YMaps.MiniMap());
        //map.addControl(new YMaps.ScaleLine());
        //включить масштабирование колесиком мыши
        map.enableScrollZoom();
        // Создает метку и добавляет ее на карту
        // Создает метку с маленьким значком красного цвета
        var placemark = new YMaps.Placemark(new YMaps.GeoPoint(30.343561, 60.050282),{style: "default#cafeIcon"});
        placemark.name = "Пивной ресторан Флинт";
        placemark.description = "проспект Просвещения д.33";
        map.addOverlay(placemark);
        // Открывает балун
        //placemark.openBalloon();
    })