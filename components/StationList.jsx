import React from 'react';

function StationList({ stations }) {
  return (
    <div>
      <h2>Stations:</h2>
      <table className="tbl">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Address Line 1</th>
            <th>Address Line 2</th>
            <th>Town</th>
            <th>State/Province</th>
            <th>Postcode</th>
            <th>Country</th>
            <th>Latitude</th>
            <th>Longitude</th>
            <th>Telephone 1</th>
            <th>Telephone 2</th>
            <th>Email</th>
            <th>Access Comments</th>
            <th>Related URL</th>
            <th>Distance</th>
            <th>Distance Unit</th>
          </tr>
        </thead>
        <tbody>
          {stations.map(station => (
            <tr key={station.AddressInfo.ID}>
              <td>{station.ID || "N/A"}</td>
              <td>{station.AddressInfo.Title || "N/A"}</td>
              <td>{station.AddressInfo.AddressLine1 || "N/A"}</td>
              <td>{station.AddressInfo.AddressLine2 || "N/A"}</td>
              <td>{station.AddressInfo.Town || "N/A"}</td>
              <td>{station.AddressInfo.StateOrProvince || "N/A"}</td>
              <td>{station.AddressInfo.Postcode || "N/A"}</td>
              <td>{station.AddressInfo.Country || "N/A"}</td>
              <td>{station.AddressInfo.Latitude || "N/A"}</td>
              <td>{station.AddressInfo.Longitude || "N/A"}</td>
              <td>{station.AddressInfo.ContactTelephone1 || "N/A"}</td>
              <td>{station.AddressInfo.ContactTelephone2 || "N/A"}</td>
              <td>{station.AddressInfo.ContactEmail || "N/A"}</td>
              <td>{station.AddressInfo.AccessComments || "N/A"}</td>
              <td>{station.AddressInfo.RelatedURL || "N/A"}</td>
              <td>{station.AddressInfo.Distance || "N/A"}</td>
              <td>{station.AddressInfo.DistanceUnit || "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StationList;
