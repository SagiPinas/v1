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

      // var geojson = {
      //   type: 'FeatureCollection',
      //   features: [{
      //     type: 'Incident Location',
      //     geometry: {
      //       type: 'Point',
      //       coordinates: [currentLocation.long, currentLocation.lat]
      //     },
      //     properties: {
      //       title: 'Report Location',
      //       description: 'something'
      //     }
      //   }]
      // }



      map.flyTo({
        center: [currentLocation.long, currentLocation.lat],
        zoom: map.getZoom() + 1,
        speed: 1.25,
        essential: true
      });


      mapDir.setOrigin(`${originLocation.long}, ${originLocation.lat}`)
      mapDir.setDestination(`${currentLocation.long}, ${currentLocation.lat}`)


      // var el = document.createElement('div');
      // el.className = 'marker-x';
      // el.innerHTML = `
      //   <div classNamemarker-${JSON.parse(localStorage.currentIncident).uid}">
      //   <img src="https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png" classNamemap-marker">
      //   <span classNamepulse"></span>
      //   <span classNamepulse"></span>
      //   </div>
      //   `

      // let mapMarker = new mapboxgl.Marker(el)
      // mapMarker.setLngLat(geojson.features[0].geometry.coordinates)
      // mapMarker.addTo(map);


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

