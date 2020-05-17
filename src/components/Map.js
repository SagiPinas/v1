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
      zoom: 13
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
      map.getSource('points').setData({
        'type': 'FeatureCollection',
        'features': []
      })
    }






    map.on('load', () => {
      map.addSource('points', {
        'type': 'geojson',
        'data': {
          'type': 'FeatureCollection',
          'features': [

          ]
        }
      })
    })


    function mapTo() {
      let currentLocation = JSON.parse(localStorage.currentLocation);
      let originLocation = JSON.parse(localStorage.originLocation);
      let currentIncident = JSON.parse(localStorage.currentIncident)



      let incidentLayerData =

      {
        'type': 'FeatureCollection',
        'features': [
          {
            'type': 'Feature',
            'geometry': {
              'type': 'Point',
              'coordinates': [currentLocation.long, currentLocation.lat]
            },
            'properties': {
              'title': `[${currentIncident.type.toUpperCase()}]: Incident report location`,
              'icon': 'alert-dot'
            }
          },
          {
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
              'icon': 'green-dot'
            }
          }
        ]
      }


      if (map.getSource('points')) {
        map.getSource('points').setData(incidentLayerData)
      }


      var size = 200;

      var alertDot = {
        width: size,
        height: size,
        data: new Uint8Array(size * size * 4),

        onAdd: function () {
          var canvas = document.createElement('canvas');
          canvas.width = this.width;
          canvas.height = this.height;
          this.context = canvas.getContext('2d');
        },

        render: function () {
          var duration = 1000;
          var t = (performance.now() % duration) / duration;

          var radius = (size / 2) * 0.3;
          var outerRadius = (size / 2) * 0.7 * t + radius;
          var context = this.context;
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
          this.data = context.getImageData(
            0,
            0,
            this.width,
            this.height
          ).data;

          map.triggerRepaint();
          return true;
        }
      };


      var greenDot = {
        width: size,
        height: size,
        data: new Uint8Array(size * size * 4),

        onAdd: function () {
          var canvas = document.createElement('canvas');
          canvas.width = this.width;
          canvas.height = this.height;
          this.context = canvas.getContext('2d');
        },

        render: function () {
          var duration = 1000;
          var t = (performance.now() % duration) / duration;

          var radius = (size / 2) * 0.3;
          var outerRadius = (size / 2) * 0.7 * t + radius;
          var context = this.context;
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
          context.beginPath();
          context.arc(
            this.width / 2,
            this.height / 2,
            radius,
            0,
            Math.PI * 2
          );
          context.fillStyle = '#5CD5A7';
          context.strokeStyle = 'white';
          context.lineWidth = 2 + 4 * (1 - t);
          context.fill();
          context.stroke();
          this.data = context.getImageData(
            0,
            0,
            this.width,
            this.height
          ).data;

          map.triggerRepaint();
          return true;
        }
      };


      map.addImage('green-dot', greenDot, { pixelRatio: 3.5 });
      map.addImage('alert-dot', alertDot, { pixelRatio: 2 });



      // try to add map layer
      map.addLayer({
        'id': 'points',
        'type': 'symbol',
        'source': 'points',
        'layout': {
          'icon-image': ['get', 'icon'],
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
        zoom: map.getZoom() - 1,
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

