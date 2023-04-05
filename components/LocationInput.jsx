import { useState } from 'react';

function LocationInput({location, setLocation, radius, setRadius, handleFormSubmit, handleReset}) {
  
  const handleSubmit = (e) => {
    e.preventDefault();
	handleFormSubmit(e);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
	  <label htmlFor="inputLocation">
        Location:
      </label>
        <input id="inputLocation" type="text"
		  value={location}
          onChange={(event) => setLocation(event.target.value)}
        />
	  </div>
      <br />
      <div className="form-group">
	  <label htmlFor="inputRadius">
        Radius:
		{radius} km
      </label>
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
