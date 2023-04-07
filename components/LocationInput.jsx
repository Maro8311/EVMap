import { useState } from 'react';

function LocationInput({location, setLocation, radius, setRadius, handleFormSubmit, handleReset}) {
  const [suggestions, setSuggestions] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleFormSubmit(e);
  };

  const handleLocationChange = async (event) => {
    setLocation(event.target.value);

    if (event.target.value) {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(event.target.value)}&countrycodes=de&format=json`
        );
        const data = await response.json();
        setSuggestions(data.map(result => result.display_name));
      } catch (error) {
        console.error(error);
      }
    } else {
      setSuggestions([]);
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
            {suggestions.map(suggestion => (
              <li key={suggestion} onClick={() => handleSuggestionClick(suggestion)}>
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
