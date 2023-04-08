import { useState, useMemo } from 'react';

function LocationInput({ location, setLocation, radius, setRadius, handleFormSubmit, handleReset }) {
  const [suggestions, setSuggestions] = useState([]);
  const cache = useMemo(() => ({}), []);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleFormSubmit(e);
  }; 
  
  const handleLocationChange = async (event) => {
    setLocation(event.target.value);
    let tmpLocationName = event.target.value;
    const query = event.target.value.trim().toLowerCase();
  
    // Check if data is already cached
    const cachedData = localStorage.getItem(query);
    if (cachedData) {
      setSuggestions(JSON.parse(cachedData));
      console.log(`Get cached: ${tmpLocationName} - ${radius} km`);
      return;
    }
  
    // Don't query data if locationInput is empty
    if (!query) {
      setSuggestions([]);
      return;
    }
  
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&countrycodes=de&format=json`;
    
    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log(`Query: ${tmpLocationName} - ${radius} km`);
      const suggestions = data.map(result => result.display_name);
      setSuggestions(suggestions);
      // Store data in cache
      localStorage.setItem(query, JSON.stringify(suggestions));
    } catch (error) {
      console.error(error);
    }
  };
  


  const handleSuggestionClick = (suggestion) => {
    setLocation(suggestion);
    setSuggestions([]);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="inputLocation">Location:</label>
        <input
          id="inputLocation"
          type="text"
          value={location}
          onChange={handleLocationChange}
          autoComplete="off"
        />
        {suggestions.length > 0 && (
          <ul className='ui-autocomplete'>
            {suggestions.map((suggestion, index) => (
              <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>
      <br />
      <div className="form-group">
        <label htmlFor="inputRadius">Radius: {radius} km</label>
        <input
          id="inputRadius"
          type="range"
          min="1"
          max="100"
          value={radius}
          onChange={(event) => setRadius(event.target.value)}
        />
      </div>
      <br />
      <div className='Btns'>
        <button type="submit">Search</button>
        <button type="button" onClick={handleReset}>Reset</button>
      </div>
    </form>
  );
}

export default LocationInput;
