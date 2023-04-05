import React from 'react';

export default function RadiusInput({ value, onChange }) {
  return (
    <div className="radius-input">
      <label htmlFor="radius-input">Search radius (km):</label>
      <input
        id="radius-input"
        type="number"
        min="1"
        max="100"
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value))}
      />
    </div>
  );
}
