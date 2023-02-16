"use strict"

require([
  'esri/Map',
  'esri/views/MapView',
  'dijit/form/ToggleButton',
  'dijit/form/Button',
  'esri/layers/FeatureLayer',
  'esri/widgets/BasemapGallery',
  'esri/widgets/Expand',
  'esri/widgets/Legend',
  "esri/widgets/LayerList",
  "esri/widgets/DistanceMeasurement2D",
  "esri/widgets/AreaMeasurement2D",
  "esri/widgets/Search",
  "esri/layers/TileLayer"
], (Map, MapView, ToggleButton, Button, FeatureLayer, BasemapGallery, Expand, Legend, LayerList, DistanceMeasurement2D, AreaMeasurement2D, Search, TileLayer) => {

  const template = {
    title: "{wydarzenie}",
    actions: [
      {
        id: "wiecej",
        image: "http://royalgymmechelen.be/wp-content/uploads/2020/03/informatie-icoon-1-300x288.jpg",
        title: "Więcej informacji"
      }
    ],
    content: [
      {
        type: "fields",
        fieldInfos: [
          {
            fieldName: "miejsce",
            label: "Miejscowość: "
          },
          {
            fieldName: "rok",
            label: "Rok:"
          },
        ]
      }
    ]
  };

  const template2 = {
    title: "{nazwa}",
    content: [
      {
        type: "fields",
        fieldInfos: [
          {
            fieldName: "Strona_www",
            label: "Strona WWW"
          }
        ]
      }
    ]
  };

  const fl = new FeatureLayer({
      url: "https://services9.arcgis.com/XzFo5ArWiIwKyBgo/arcgis/rest/services/Wydarzenia_z_lat_okupacji/FeatureServer" ,
      popupTemplate: template
  });

  const fl2 = new FeatureLayer({
    url: "https://services9.arcgis.com/XzFo5ArWiIwKyBgo/arcgis/rest/services/Atrakcje_turystyczne/FeatureServer" ,
    popupTemplate: template2
  }); 

  const lg = new TileLayer({
    url: "https://tiles.arcgis.com/tiles/XzFo5ArWiIwKyBgo/arcgis/rest/services/Kazimierz_und_Kur%C3%B3w_1914/MapServer" ,
    title: "Kazimierz und Kurów 1914",
  });

  const pg = new TileLayer({
    url: "https://tiles.arcgis.com/tiles/XzFo5ArWiIwKyBgo/arcgis/rest/services/Lublin_und_Lubart%C3%B3w_1915/MapServer" ,
    title: "Lublin und Lubartów 1915",
  });

  const ld = new TileLayer({
    url: "https://tiles.arcgis.com/tiles/XzFo5ArWiIwKyBgo/arcgis/rest/services/Opole_1914/MapServer" ,
    title: "Opole 1914",
  });

  const pd = new TileLayer({
    url: "https://tiles.arcgis.com/tiles/XzFo5ArWiIwKyBgo/arcgis/rest/services/Czerniej%C3%B3w_1912/MapServer" ,
    title: "Czerniejów 1912",
  });

  const map1 = new Map({
      basemap: "topo-vector",
      layers: [lg, pg, ld, pd, fl, fl2]
  });

  const view = new MapView({
      map: map1,
      container: "map",
      zoom: 13,
      center: [22.25, 51.2275]
  });

  const basemap = "hybrid";

  const simpleRenderer ={
    type: 'simple',
    symbol: {
        type: 'simple-marker',
        color: [255, 0, 0],
        size: 10
    }
  }

  fl.renderer = simpleRenderer;

  const simpleRenderer2 ={
    type: 'simple',
    symbol: {
        type: 'simple-marker',
        color: [0, 0, 255],
        size: 10
    }
  }

  fl2.renderer = simpleRenderer2;

  const btn = new ToggleButton({
      showLabel: true,
      onClick: function(){
          map1.basemap = basemap
      }
  }, "basemapToggle").startup();

  const zoomIn = new Button({
      showLabel: true,
      onClick: function(){
          view.zoom += 1;
      }
  }, "zoomIn");

  const zoomOut = new Button({
      showLabel: true,
      onClick: function(){
          view.zoom -= 1;
      }
  }, "zoomOut");
  
  const basemapGalleryWg = new BasemapGallery({
      view: view
  });

  const expWg = new Expand({
      view: view,
      content: basemapGalleryWg
  });

  view.ui.add(expWg, {position: "top-right"});

  const legend = new Legend({
      view: view,
      layerInfos: [
        {
          layer: fl,
          title: "Wydarzenia z lat okupacji"
        },
        {
          layer: fl2,
          title: "Atrakcje turystyczne"
        }
      ]
      
  });

  view.ui.add(legend, {position: "bottom-right"});

  const layerlist = new LayerList({
    view: view,
  });

  view.ui.add(layerlist, "bottom-left")


  const searchWg = new Search({
    view: view
  });

  view.ui.add(searchWg, {position: "top-left"});
  
  const areaWg = new AreaMeasurement2D({
    view: view
  });
  const distanceWg = new DistanceMeasurement2D({
      view: view
  });

  const expArea = new Expand({
    view: view,
    content: areaWg
  });

  const expDistance = new Expand({
    view: view,
    content: distanceWg
  });
  
  view.ui.add(expArea, {position: "top-right"});
  view.ui.add(expDistance, {position: "top-right"});
  
  let btnZoom1 = document.getElementById('btn1');
  let btnZoom2 = document.getElementById('btn2');
  let btnZoom3 = document.getElementById('btn3');
  let btnZoom4 = document.getElementById('btn4');
  let btnZoom5 = document.getElementById('btn5');

  btnZoom1.addEventListener('click', function(){

    let opts = {
      duration: 2000
  };

  view.goTo({
      target: [22.242994, 51.236474], 
      zoom: 17.5
    }, opts);
  
  });

  btnZoom2.addEventListener('click', function(){

    let opts = {
      duration: 2000
  };

  view.goTo({
      target: [22.247060, 51.232066],
      zoom: 17.5
    }, opts);
  
  });

  btnZoom3.addEventListener('click', function(){

    let opts = {
      duration: 2000
  };

  view.goTo({
      target: [22.246441, 51.235299],
      zoom: 17.5
    }, opts);
  
  });

  btnZoom4.addEventListener('click', function(){

    let opts = {
      duration: 2000
  };

  view.goTo({
      target: [22.241551, 51.227029],
      zoom: 17.5
    }, opts);
  
  });

  btnZoom5.addEventListener('click', function(){

    let opts = {
      duration: 2000
  };

  view.goTo({
      target: [22.227246, 51.261733],
      zoom: 17.5
    }, opts);
  
  });

  let btn_pokaz1 = document.getElementById('btn_szczuczki');
  let btn_pokaz2 = document.getElementById('btn_wojciechow');
  let btn_pokaz3 = document.getElementById('btn_palikije');
  let btn_pokaz4 = document.getElementById('btn_wojciechow_kol');
  let btn_pokaz5 = document.getElementById('btn_tygrys');
  let btn_pokaz6 = document.getElementById('btn_posterunek');
  let btn_pokaz7 = document.getElementById('btn_rekwizycja');

  btn_pokaz1.addEventListener('click', function(){

  let opts = {
      duration: 2000
  };

  view.goTo({
      target: [22.178027, 51.215420],
      zoom: 17.5
    }, opts);

    window.scrollTo({
      top: 960,
      left: 0,
      behavior: 'smooth'
    });
  
  });

  btn_pokaz2.addEventListener('click', function(){

    let opts = {
        duration: 2000
    };
  
    view.goTo({
        target: [22.242430, 51.239055],
        zoom: 17.5
      }, opts);
  
      window.scrollTo({
        top: 960,
        left: 0,
        behavior: 'smooth'
      });
    
    });

  btn_pokaz3.addEventListener('click', function(){

    let opts = {
        duration: 2000
    };
  
    view.goTo({
        target: [22.288644, 51.236141],
        zoom: 17.5
      }, opts);
  
      window.scrollTo({
        top: 960,
        left: 0,
        behavior: 'smooth'
      });
    
    });

  btn_pokaz4.addEventListener('click', function(){

    let opts = {
        duration: 2000
    };
  
    view.goTo({
        target: [22.232752, 51.242223],
        zoom: 17.5
      }, opts);
  
      window.scrollTo({
        top: 960,
        left: 0,
        behavior: 'smooth'
      });
    
    });

  btn_pokaz5.addEventListener('click', function(){

    let opts = {
        duration: 2000
    };
  
    view.goTo({
        target: [22.246844, 51.215858],
        zoom: 17.5
      }, opts);
  
      window.scrollTo({
        top: 960,
        left: 0,
        behavior: 'smooth'
      });
    
    });

  btn_pokaz6.addEventListener('click', function(){

    let opts = {
        duration: 2000
    };
  
    view.goTo({
        target: [22.242430, 51.239055],
        zoom: 17.5
      }, opts);
  
      window.scrollTo({
        top: 960,
        left: 0,
        behavior: 'smooth'
      });
    
    });

  btn_pokaz7.addEventListener('click', function(){

    let opts = {
        duration: 2000
    };
  
    view.goTo({
        target: [22.246496, 51.235149],
        zoom: 17.5
      }, opts);
  
      window.scrollTo({
        top: 960,
        left: 0,
        behavior: 'smooth'
      });
    
    });

  let btn_wieza = document.getElementById('btn_wieza');
  let btn_kosciol = document.getElementById('btn_kosciol');
  let btn_kuznia = document.getElementById('btn_kuznia');
  let btn_zoo = document.getElementById('btn_zoo');
  let btn_mlyn = document.getElementById('btn_mlyn');

  btn_wieza.addEventListener('click', function(){

    let opts = {
      duration: 2000
  };

  view.goTo({
      target: [22.242994, 51.236474], 
      zoom: 17.5
    }, opts);

    window.scrollTo({
      top: 960,
      left: 0,
      behavior: 'smooth'
    });
  
  });

  btn_kosciol.addEventListener('click', function(){

    let opts = {
      duration: 2000
  };

  view.goTo({
      target: [22.247060, 51.232066],
      zoom: 17.5
    }, opts);

    window.scrollTo({
      top: 960,
      left: 0,
      behavior: 'smooth'
    });
  
  });

  btn_kuznia.addEventListener('click', function(){

    let opts = {
      duration: 2000
  };

  view.goTo({
      target: [22.246441, 51.235299],
      zoom: 17.5
    }, opts);

    window.scrollTo({
      top: 960,
      left: 0,
      behavior: 'smooth'
    });
  
  });

  btn_zoo.addEventListener('click', function(){

    let opts = {
      duration: 2000
  };

  view.goTo({
      target: [22.241551, 51.227029],
      zoom: 17.5
    }, opts);
  
    window.scrollTo({
      top: 960,
      left: 0,
      behavior: 'smooth'
    });

  });

  btn_mlyn.addEventListener('click', function(){

    let opts = {
      duration: 2000
  };

  view.goTo({
      target: [22.227246, 51.261733],
      zoom: 17.5
    }, opts);

    window.scrollTo({
      top: 960,
      left: 0,
      behavior: 'smooth'
    });
  
  });

  view.when(() => {
    view.popup.watch("selectedFeature", (graphic) => {
      if (graphic) {
        const graphicTemplate = graphic.getEffectivePopupTemplate();
      }
    });

    const popup = view.popup;
    popup.viewModel.on("trigger-action", (event) => {
      if (event.action.id === "wiecej") {
        window.scrollTo(0,8000)
      }
    });
  });

});

function openCity(evt, wyd_okupacji) {
  let i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(wyd_okupacji).style.display = "block";
  evt.currentTarget.className += " active";
}

function openCity2(evt, atrakcja) {
  let j, tabcontent2, tablinks2;
  tabcontent2 = document.getElementsByClassName("tabcontent2");
  for (j = 0; j < tabcontent2.length; j++) {
    tabcontent2[j].style.display = "none";
  }
  tablinks2 = document.getElementsByClassName("tablinks2");
  for (j = 0; j < tablinks2.length; j++) {
    tablinks2[j].className = tablinks2[j].className.replace(" active", "");
  }
  document.getElementById(atrakcja).style.display = "block";
  evt.currentTarget.className += " active";
}

let strzalka_btn = document.getElementById("strzalka")

strzalka_btn.addEventListener('click', function(){
  window.scrollTo({
    top: 960,
    left: 0,
    behavior: 'smooth'
  });
});