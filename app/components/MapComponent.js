import React, { useState, useEffect } from 'react'
import { MapContainer, TileLayer, useMap, Marker, Popup, useMapEvents, Polyline, GeoJSON } from 'react-leaflet'
import L from 'leaflet';
import { iconPerson } from './icon';
import geojsonData from "./map.geojson.js";

function LocationMarker({ setClickedPosition }) {
  const [position, setPosition] = useState(null);

  function saveDataToServer(data){

    fetch("/api/gorilla/", {
      method: "POST",
      // mode: "cors", // no-cors, *cors, same-origin
      // cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      // credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    })
        .then((res) => res.json())
        .then((data) =>
         {
            console.log(data)
        })
  }

  function sendDestToServer(data){

    fetch("/api/chimp/", {
      method: "POST",
      // mode: "cors", // no-cors, *cors, same-origin
      // cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      // credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    })
        .then((res) => res.json())
        .then((data) =>
         {
            console.log(data)
        })
  }

  const map = useMapEvents({
    click(e) {
      setClickedPosition(e.latlng);
      sendDestToServer({'start': 36.0011902, 'end': -78.9392403, 'lat': e.latlng.lat,'lng': e.latlng.lng});
      //saveDataToServer({'lat': e.latlng.lat,'lng': e.latlng.lng,'type': 'elevator'})
    }, // getting location when click

    locationfound(e) {
      setPosition(e.latlng);
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
    [35.999747, -78.940831],
    [36.001293, -78.939491],
    [36.001702, -78.941614],
  ]

  const fillBlueOptions = { fillColor: 'blue' }
  const blackOptions = { color: 'black' }
  const limeOptions = { color: 'lime' }
  const purpleOptions = { color: 'purple' }
  const redOptions = { color: 'red' }

  //useEffect({
  //  fetch("/api/dog/");
  //},[])

  return (
    <div className='map-container'>

      <MapContainer center={position} zoom={14} scrollWheelZoom={true} style={{ height: "100%", backgroundColor: "white", marginTop: "0px", marginBottom: '0px' }}>
      <GeoJSON
        attribution="Paths"
        data={geojsonData}
      />

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
        {clickedPosition && 
          <Marker position={clickedPosition}>
            <Popup>A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
        <div className='france'>ABCD</div>
          </Marker>
        }
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <Polyline pathOptions={redOptions} positions={polyline} />

      </MapContainer>
      
    </div>
  );

  console.log(JSON.stringify(userPosition))

}
