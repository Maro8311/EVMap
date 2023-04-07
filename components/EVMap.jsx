import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

function EVMap({ stations, center, zoom, radius }) {
  const mapContainer = useRef(null);
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    const mapInstance = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [center[1], center[0]],
      zoom,
    });

    mapInstance.on('load', () => {
      setMap(mapInstance);
      const navControl = new mapboxgl.NavigationControl();
      mapInstance.addControl(navControl, 'top-right');
    });

    return () => {
      mapInstance.remove();
    };
  }, []);

  useEffect(() => {
    if (map) {
      if (stations.length > 0) {
        const firstStation = stations[0];
        const firstStationCoordinates = [
          firstStation.AddressInfo?.Longitude || 0,
          firstStation.AddressInfo?.Latitude || 0,
        ];
        map.flyTo({ center: firstStationCoordinates, zoom });
      } else {
        map.flyTo({ center: [center[1], center[0]], zoom });
      }
    }
  }, [map, center, zoom, stations]);

  useEffect(() => {
    if (map) {
      // Remove existing markers
      markers.forEach((marker) => {
        marker.remove();
      });

      // Create new markers and popups
      const newMarkers = stations.map((station) => {
        const markerElement = document.createElement('div');
        markerElement.className = 'marker';
        markerElement.style.background = 'red';
        markerElement.style.width = '15px';
        markerElement.style.height = '15px';
        markerElement.style.borderRadius = '50%';

        const marker = new mapboxgl.Marker(markerElement)
          .setLngLat([
            station.AddressInfo?.Longitude || 0,
            station.AddressInfo?.Latitude || 0,
          ])
          .addTo(map);

        const popup = new mapboxgl.Popup({ offset: 25 })
          .setHTML(
            `
            <strong>${station.AddressInfo?.Title || 'Unknown'}</strong><br />
            ${station.AddressInfo?.AddressLine1 || ''}<br />
            ${station.AddressInfo?.Town || ''}, ${station.AddressInfo?.StateOrProvince || ''}, ${station.AddressInfo?.Postcode || ''}<br />
            ${station.AddressInfo?.Country?.Title || 'Unknown'}
            `
          )
          .setMaxWidth('300px');

        marker.setPopup(popup);

        return marker;
      });

      setMarkers(newMarkers);
    }
  }, [map, stations]);

  return (
    <div
      ref={mapContainer}
      style={{ width: '100%', height: '500px', position: 'relative' }}
    ></div>
  );
}

export default EVMap;
