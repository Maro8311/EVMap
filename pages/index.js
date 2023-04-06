import { useState } from 'react';
import LocationInput from '../components/LocationInput';
import StationList from '../components/StationList';
import dynamic from 'next/dynamic';

const EVMap = dynamic(() => import('../components/EVMap'), {
    ssr: false
});

function App() {
    const [locationName, setLocationName] = useState('');
    const [radius, setRadius] = useState(10);
    const [stations, setStations] = useState([]);
    const [center, setCenter] = useState([52.520008, 13.404954]); // Berlin coordinates
    const [zoom, setZoom] = useState(12);

    async function fetchStations(latitude, longitude, radius) {
        const apiKey = '718423ab-87a1-465a-998d-c75c38de5fe4';
        const url = `https://api.openchargemap.io/v3/poi/?output=json&latitude=${latitude}&longitude=${longitude}&distance=${radius}&distanceunit=KM&maxresults=10&compact=true&key=${apiKey}`;
        console.log(url)
        try {
            const response = await fetch(url);
            const data = await response.json();
            setStations(data);
            if (data.length > 0) {
                setCenter([data[0].AddressInfo?.Latitude || 0, data[0].AddressInfo?.Longitude || 0]);
                setZoom(12);
            }
        } catch (error) {
            console.error(error);
            setStations([]);
        }
    }

    async function getCoordinates(locationName) {
        const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${locationName}&format=json`);
        const data = await response.json();
        if (data.length > 0) {
            const { lat, lon } = data[0];
            return { latitude: lat, longitude: lon };
        } else {
            throw new Error(`Could not find coordinates for location: ${locationName}`);
        }
    }

    async function handleFormSubmit(e) {
        e.preventDefault();
        if (locationName) {
            try {
                const { latitude, longitude } = await getCoordinates(locationName);
                fetchStations(latitude, longitude, radius);
            } catch (error) {
                console.error(error);
                setStations([]);
            }
        }
    }

    const handleReset = () => {
        setRadius(10);
        setLocationName('');
        setStations([]);
        setCenter([52.520008, 13.404954]); // Reset center to Berlin coordinates
    };

    return (
        <div className='App'>
            <div className='Headline'>
                <h1>EV Charging Stations Finder</h1>
            </div>
            <div className='InputControls'>
                <LocationInput location={locationName} setLocation={setLocationName} radius={radius} setRadius={setRadius} handleFormSubmit={handleFormSubmit} handleReset={handleReset} />
            </div>

            <EVMap stations={stations} center={center} zoom={zoom} />

            {/*<StationList stations={stations} />*/}
        </div>
    );
}

export default App;
