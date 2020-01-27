import React, { useEffect } from 'react'
import mapboxgl from 'mapbox-gl'

mapboxgl.accessToken = 'pk.eyJ1IjoiYnJ5Y2UwNiIsImEiOiJjazNmbndybm4wMDk3M29wZ2dicjlmb29iIn0.NVknKG525ZpQVmIAbFiqfw';

const Map = (props) => {


  useEffect(() => {
    const map = new mapboxgl.Map({
      container: document.getElementById("map"),
      style: 'mapbox://styles/bryce06/ck5w2nl700lyp1ip79hnktdrr',
      center: [5, 34],
      zoom: 5.5
    })

    setTimeout(
      () => {
        map.flyTo({
          center: [
            -74.5 + (Math.random() - 0.5) * 10,
            40 + (Math.random() - 0.5) * 10
          ],
          essential: true
        });
      }, 2000
    )
  })


  return (
    <div>
      <div className="inline-block  mt12 ml12 bg-darken75 color-white z1 py6 px12 round-full txt-s txt-bold">
        <div>{`Longitude: ${5} Latitude: ${34} Zoom: ${5.5}`}</div>
      </div>
      <div id="map" className="absolute top right left bottom" />
    </div>
  );
}


export default Map;

