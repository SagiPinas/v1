import React, { useEffect } from 'react'
import '../styles/geocoder.scss'
import mapboxgl from 'mapbox-gl'
import Directions from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';




mapboxgl.accessToken = 'pk.eyJ1IjoiYnJ5Y2UwNiIsImEiOiJjazNmbndybm4wMDk3M29wZ2dicjlmb29iIn0.NVknKG525ZpQVmIAbFiqfw';

const Map = (props) => {



  useEffect(() => {
    let currentLocation = JSON.parse(localStorage.currentLocation);
    let currentIncident = JSON.parse(localStorage.currentIncident)

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


    function mapTo() {
      let currentLocation = JSON.parse(localStorage.currentLocation);
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
      <div id="${currentIncident.uid}">
      <img src="https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png" class="map-marker">
      <span class="pulse"></span>
      <span class="pulse"></span>
      </div>
      `

      let mapMarker = new mapboxgl.Marker(el)
      mapMarker.setLngLat(geojson.features[0].geometry.coordinates)
      mapMarker.addTo(map);

      // let checkMarkerInstance = document.querySelector(`#${currentIncident.uid}`);
      // if (!document.contains(checkMarkerInstance)) {
      // mapMarker.addTo(map);
      // }

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

