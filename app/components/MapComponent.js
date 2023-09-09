import React, { useState, useEffect } from 'react'
import { MapContainer, TileLayer, useMap, Marker, Popup, useMapEvents, Polyline } from 'react-leaflet'
import L from 'leaflet';
import { iconPerson } from './icon';

function LocationMarker({ setClickedPosition }) {
  const [position, setPosition] = useState(null);
  const [dummy, setDummy] = useState(null);

  // async function saveDataToServer() {
    // Default options are marked with *
  useEffect(() => {
    fetch("/api/header/")
        .then((res) => res.json())
        .then((data) =>
         {
            console.log(data)
        })
  }, [])

      // method: "POST", // *GET, POST, PUT, DELETE, etc.
      // mode: "cors", // no-cors, *cors, same-origin
      // cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      // credentials: "same-origin", // include, *same-origin, omit
      // headers: {
      //   "Content-Type": "application/json",
      //   // 'Content-Type': 'application/x-www-form-urlencoded',
    //   },
    //   redirect: "follow", // manual, *follow, error
    //   referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    //   body: JSON.stringify(data), // body data type must match "Content-Type" header
    // });
    // console.log(response.json());
    // return response.json(); // parses JSON response into native JavaScript object

  // postData("https://example.com/answer", { answer: 42 }).then((data) => {
  //   console.log(data); // JSON data parsed by `data.json()` call
  // });

  const map = useMapEvents({
    click(e) {
      setClickedPosition(e.latlng);
      //[e.latlng.lat,e.latlng.lng]
      saveDataToServer()
      //map.locate();
    }, // getting location when click

    locationfound(e) {
      setPosition(e.latlng);
      //map.flyTo(e.latlng, map.getZoom()); // -> this keeps moving you to your location, not good
    },
  });

  useEffect(() => {
    map.locate();
    const locationInterval = setInterval(() => {
      map.locate();
    }, 1000); // 5000 milliseconds or 5 seconds

    return () => {
      clearInterval(locationInterval);
    };
  }, [map]);

  return position === null ? null : (
    <Marker position={position} icon={iconPerson}>
      <Popup>You are here</Popup>
    </Marker>
  );
}



export default function MapComponent() {
  const position = [36.0011902, -78.9392403];

  const [clickedPosition, setClickedPosition] = useState(null);

  const polyline = [
    [51.505, -0.09],
    [51.51, -0.1],
    [51.51, -0.12],
  ]

  const fillBlueOptions = { fillColor: 'blue' }
  const blackOptions = { color: 'black' }
  const limeOptions = { color: 'lime' }
  const purpleOptions = { color: 'purple' }
  const redOptions = { color: 'red' }

  return (
    <div className='map-container'>

      <MapContainer center={position} zoom={14} scrollWheelZoom={true} style={{ height: "100%", backgroundColor: "white", marginTop: "0px", marginBottom: '0px' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={position}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
        <LocationMarker setClickedPosition={setClickedPosition} />
        {clickedPosition && (
          <Marker position={clickedPosition}>
            <Popup>Clicked Location</Popup>
          </Marker>
        )}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <Polyline pathOptions={limeOptions} positions={polyline} />

      </MapContainer>
      
      {/* Here is your clicked position: */}
      {clickedPosition && <div>Clicked position: {JSON.stringify(clickedPosition)}</div>}
    </div>
  );

  console.log(JSON.stringify(userPosition))

}
