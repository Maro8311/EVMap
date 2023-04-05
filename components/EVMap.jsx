import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from 'react-leaflet';

function ChangeView({ center, zoom }) {
    const map = useMap();
    map.setView(center, zoom);
    return null;
}

function EVMap({ stations, center, zoom }) {
    return (
        <div className="map">
            <MapContainer center={center} zoom={zoom} style={{ height: '500px' }}>
                <ChangeView center={center} zoom={zoom} />
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                {stations.map(station => (
                    <CircleMarker key={station.AddressInfo.ID} center={[station.AddressInfo?.Latitude || 0, station.AddressInfo?.Longitude || 0]} radius={5}>
                        <Popup>
                            <strong>{station.AddressInfo?.Title || 'Unknown'}</strong><br />
                            {station.AddressInfo?.AddressLine1 || ''}<br />
                            {station.AddressInfo?.Town || ''}, {station.AddressInfo?.StateOrProvince || ''}, {station.AddressInfo?.Postcode || ''}<br />
                            {station.AddressInfo?.Country?.Title || 'Unknown'}
                        </Popup>
                    </CircleMarker>
                ))}
            </MapContainer>
        </div >
    );
}

export default EVMap;
