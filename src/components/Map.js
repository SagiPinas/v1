import React, { useEffect } from 'react'
import mapboxgl from 'mapbox-gl'

mapboxgl.accessToken = 'pk.eyJ1IjoiYnJ5Y2UwNiIsImEiOiJjazNmbndybm4wMDk3M29wZ2dicjlmb29iIn0.NVknKG525ZpQVmIAbFiqfw';

const Map = (props) => {



  useEffect(() => {
    let currentLocation = JSON.parse(localStorage.currentLocation);
    const map = new mapboxgl.Map({
      container: document.getElementById("map"),
      style: 'mapbox://styles/bryce06/ck5w2nl700lyp1ip79hnktdrr',
      center: [currentLocation.long, currentLocation.lat],
      zoom: 16
    })

    function mapTo() {

      var geojson = {
        type: 'FeatureCollection',
        features: [{
          type: 'Incident Location',
          geometry: {
            type: 'Point',
            coordinates: [currentLocation.long, currentLocation.lat]
          },
          properties: {
            title: 'Report Location',
            description: 'something'
          }
        }]
      }



      map.flyTo({
        center: [currentLocation.long, currentLocation.lat],
        zoom: map.getZoom() + 1,
        speed: 1.25,
        curve: 1.1,
        essential: true
      });


      var el = document.createElement('div');
      el.className = 'marker-x';
      el.innerHTML = `
      <div>
      <img src="https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png" class="map-marker">
      <span class="pulse"></span>
      <span class="pulse"></span>
      </div>
      `

      new mapboxgl.Marker(el)
        .setLngLat(geojson.features[0].geometry.coordinates)
        .addTo(map);
    }

    document.getElementById('mapJump').onclick = () => { mapTo() }
  })

  return (
    <div>
      <div id="map" className="absolute top right left bottom" />
    </div>
  );
}


export default Map;

