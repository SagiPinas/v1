import React, { useEffect } from 'react'
import '../styles/geocoder.scss'
import mapboxgl from 'mapbox-gl'
import Directions from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import { mapbox_key } from '../components/Utilities'



mapboxgl.accessToken = mapbox_key;

const Map = (props) => {


  useEffect(() => {

    if (!localStorage.originLocation) {
      localStorage.originLocation = JSON.stringify({ long: 121.001433, lat: 14.507936 })
    }

    if (!localStorage.currentLocation) {
      localStorage.currentLocation = JSON.stringify({ long: 121.001433, lat: 14.507936 })
    }

    if (!localStorage.currentIncident) {
      localStorage.currentIncident = JSON.stringify({ uid: 0 })
    }

    let currentLocation = JSON.parse(localStorage.currentLocation);

    const map = new mapboxgl.Map({
      container: document.getElementById("map"),
      style: 'mapbox://styles/bryce06/ck6ui8pey276f1imq6n2cc54s',
      center: [currentLocation.long, currentLocation.lat],
      zoom: 16
    })




    map.addControl(
      new Directions({
        accessToken: mapboxgl.accessToken
      }),
      'bottom-right'
    );

    let originLocation = JSON.parse(localStorage.originLocation);



    const mapDir = new Directions({
      accessToken: mapboxgl.accessToken,
      proximity: [originLocation.long, originLocation.lat]
    })

    const resetRoutes = () => {
      mapDir.removeRoutes();
    }



    function mapTo() {
      let currentLocation = JSON.parse(localStorage.currentLocation);
      let originLocation = JSON.parse(localStorage.originLocation);

      map.addSource('points', {
        'type': 'geojson',
        'data': {
          'type': 'FeatureCollection',
          'features': [
            {
              // feature of origin
              'type': 'Feature',
              'geometry': {
                'type': 'Point',
                'coordinates': [
                  originLocation.long,
                  originLocation.lat
                ]
              },
              'properties': {
                'title': 'Your location',
                'icon': 'monument'
              }
            },
            {
              // point of destinations
              'type': 'Feature',
              'geometry': {
                'type': 'Point',
                'coordinates': [currentLocation.long, currentLocation.lat]
              },
              'properties': {
                'title': 'Incident report location',
                'icon': 'harbor'
              }
            }
          ]
        }
      })


      var size = 200;

      // implementation of CustomLayerInterface to draw a pulsing dot icon on the map
      // see https://docs.mapbox.com/mapbox-gl-js/api/#customlayerinterface for more info
      var pulsingDot = {
        width: size,
        height: size,
        data: new Uint8Array(size * size * 4),

        // get rendering context for the map canvas when layer is added to the map
        onAdd: function () {
          var canvas = document.createElement('canvas');
          canvas.width = this.width;
          canvas.height = this.height;
          this.context = canvas.getContext('2d');
        },

        // called once before every frame where the icon will be used
        render: function () {
          var duration = 1000;
          var t = (performance.now() % duration) / duration;

          var radius = (size / 2) * 0.3;
          var outerRadius = (size / 2) * 0.7 * t + radius;
          var context = this.context;

          // draw outer circle
          context.clearRect(0, 0, this.width, this.height);
          context.beginPath();
          context.arc(
            this.width / 2,
            this.height / 2,
            outerRadius,
            0,
            Math.PI * 2
          );
          context.fillStyle = 'rgba(255, 200, 200,' + (1 - t) + ')';
          context.fill();

          // draw inner circle
          context.beginPath();
          context.arc(
            this.width / 2,
            this.height / 2,
            radius,
            0,
            Math.PI * 2
          );
          context.fillStyle = 'rgba(255, 100, 100, 1)';
          context.strokeStyle = 'white';
          context.lineWidth = 2 + 4 * (1 - t);
          context.fill();
          context.stroke();

          // update this image's data with data from the canvas
          this.data = context.getImageData(
            0,
            0,
            this.width,
            this.height
          ).data;

          // continuously repaint the map, resulting in the smooth animation of the dot
          map.triggerRepaint();

          // return `true` to let the map know that the image was updated
          return true;
        }
      };


      map.loadImage("https://i.stack.imgur.com/1QkEM.gif", function (error, image) {
        if (error) throw error;
        map.addImage("custom-marker", image);
      })

      // add pulsing dot image
      map.addImage('pulsing-dot', pulsingDot, { pixelRatio: 2 });

      // try to add map layer
      map.addLayer({
        'id': 'points',
        'type': 'symbol',
        'source': 'points',
        'layout': {
          // get the icon name from the source's "icon" property
          // concatenate the name to get an icon from the style's sprite sheet
          'icon-image': "pulsing-dot",
          // get the title name from the source's "title" property
          'text-field': ['get', 'title'],
          'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
          'text-offset': [0, 0.6],
          'text-anchor': 'top'
        },
        paint: {
          "text-color": "#ffffff"
        }
      });





      map.flyTo({
        center: [currentLocation.long, currentLocation.lat],
        zoom: map.getZoom() + 1,
        speed: 1.25,
        essential: true
      });


      mapDir.setOrigin(`${originLocation.long}, ${originLocation.lat}`)
      mapDir.setDestination(`${currentLocation.long}, ${currentLocation.lat}`)




    }

    document.getElementById('mapJump').onclick = () => { mapTo() }
    document.getElementById('removeRoutes').onclick = () => { resetRoutes() }



  })

  return (
    <div>
      <div id="map" className="absolute top right left bottom" />
    </div>
  );
}


export default Map;

