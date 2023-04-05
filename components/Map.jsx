import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

export default function Map() {
  const mapContainer = useRef(null);
  const [map, setMap] = useState(null);

  useEffect(() => {
	mapboxgl.accessToken = 'pk.eyJ1IjoibWFybzgzMTEiLCJhIjoiY2tvMXV3aTE1MGM3bTJvbHlhenlmZHVicyJ9.3LOnmAGvTHBWXkeQxneeAg';
    const mapboxMap = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-73.985664, 40.748817], // default center
      zoom: 11,
    });

    setMap(mapboxMap);

    return () => mapboxMap.remove();
  }, []);

  return (
    <div className='map-container' ref={mapContainer} />
  );
}
