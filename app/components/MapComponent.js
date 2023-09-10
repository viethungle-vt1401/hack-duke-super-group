import React, { useState, useEffect } from 'react'
import { MapContainer, TileLayer, useMap, Marker, Popup, useMapEvents, Polyline, GeoJSON } from 'react-leaflet'
import L from 'leaflet';
import GeoPath from './map.geojson.js';
import { iconPerson, iconDestination, iconClicked } from './icon';

const pathJson = {
  "type": "FeatureCollection",
  "features": [
      //{"type":"FeatureCollection","features":[{"type":"Feature","properties":{},"geometry":{"coordinates":[-78.9410339434174,36.00158622799154],"type":"Point"}}]}
      {"type":"FeatureCollection","features":[{"type":"Feature","properties":{},"geometry":{"type":"LineString","coordinates":[[-78.936635,35.999031],[-78.936347,35.998879],[-78.936421,35.998775],[-78.935695,35.998345],[-78.93556,35.998265],[-78.935541,35.998184],[-78.93565,35.998039],[-78.935715,35.998],[-78.935762,35.997983],[-78.936631,35.997889],[-78.936734,35.997906],[-78.936865,35.997947],[-78.937009,35.998005],[-78.937126,35.99806],[-78.937231,35.998123],[-78.937245,35.998131],[-78.937327,35.998193],[-78.937484,35.998325],[-78.937381,35.998473],[-78.936929,35.999119],[-78.936977,35.999143]]}}]}
  ]
};

const baths = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "coordinates": [
          35.999879,
          -78.94084
        ],
        "type": "Point"
      }
    },
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "coordinates": [
          36.000404,
          -78.940729
        ],
        "type": "Point"
      }
    },
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "coordinates": [
          36.000433,
          -78.939969
        ],
        "type": "Point"
      }
    },
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "coordinates": [
          36.000349,
          -78.940488
        ],
        "type": "Point"
      }
    },
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "coordinates": [
          36.00037,
          -78.939577
        ],
        "type": "Point"
      }
    },
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "coordinates": [
          35.997918,
          -78.942512
        ],
        "type": "Point"
      }
    },
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "coordinates": [
          35.998123,
          -78.942415
        ],
        "type": "Point"
      }
    },
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "coordinates": [
          35.999336,
          -78.94136
        ],
        "type": "Point"
      }
    },
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "coordinates": [
          36.001493,
          -78.937661
        ],
        "type": "Point"
      }
    },
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "coordinates": [
          36.000731,
          -78.937111
        ],
        "type": "Point"
      }
    },
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "coordinates": [
          35.99828,
          -78.935441
        ],
        "type": "Point"
      }
    },
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "coordinates": [
          35.999045,
          -78.936769
        ],
        "type": "Point"
      }
    },
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "coordinates": [
          36.00139,
          -78.936726
        ],
        "type": "Point"
      }
    },
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "coordinates": [
          36.002506,
          -78.936381
        ],
        "type": "Point"
      }
    },
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "coordinates": [
          36.0027,
          -78.936787
        ],
        "type": "Point"
      }
    },
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "coordinates": [
          36.00424,
          -78.939112
        ],
        "type": "Point"
      }
    },
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "coordinates": [
          36.003627,
          -78.940539
        ],
        "type": "Point"
      }
    },
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "coordinates": [
          36.003154,
          -78.941309
        ],
        "type": "Point"
      }
    },
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "coordinates": [
          36.003143,
          -78.941541
        ],
        "type": "Point"
      }
    },
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "coordinates": [
          36.003596,
          -78.941527
        ],
        "type": "Point"
      }
    }
  ]
}

function createPathJson(path) {
  const pathJsonTemplate = {
    "type": "FeatureCollection",
    "features": [
      {
        "type": "FeatureCollection",
        "features": [
          {
            "type": "Feature",
            "properties": {},
            "geometry": {
              "type": "LineString",
              "coordinates": []  
            }
          }
        ]
      }
    ]
  };

  if (path && path.length > 0) {
    pathJsonTemplate.features[0].features[0].geometry.coordinates = path;
  }

  return pathJsonTemplate;
}

export default function MapComponent({userIsAdding, closeUserIsAdding, clickedPosition, setClickedPosition}) {
  const position = [36.0011902, -78.9392403];
  var result = []
  const [path, setPath] = useState(null); // here
  const [pathDistance, setPathDistance] = useState(null); // here
  const [pathJsonData, setPathJsonData] = useState(pathJson);

  function LocationMarker({ setClickedPosition }) {
    const [position, setPosition] = useState(null);

  
    async function sendDestToServer(data){
      console.log('sending dest to server');
      fetch("/mammamia/chimp/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data) // body data type must match "Content-Type" header
      })
          .then((res) => res.json())
          .then((data) => {
            setPathJsonData(createPathJson(result[0]))
            setPath(result[0]);
            setPathDistance(result[1]);
            console.log(pathJsonData)
          })
      // console.log(result);

      // setPathJsonData(pathJson);
      // console.log(pathJson)
    }

    // useEffect(() => {
    //   console.log(pathJsonData);
    // }, [pathJsonData]);
  
    const map = useMapEvents({
      click(e) {
        setClickedPosition(e.latlng);
        if(!userIsAdding){
          sendDestToServer({'lat': 36.0011902, 'lng': -78.9392403, 'lat2': e.latlng.lat,'lng2': e.latlng.lng});
        }
        else{
          console.log('POPUP');
        }
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
      <Marker position={position} icon={iconPerson} className='leaflet-marker'>
        <Popup>You are here</Popup>
      </Marker>
    );
  }

  /*const [geoPathOutput, setGeoPathOutput] = useState(null); // Add this line to define a new state variable

  function handleGeoPathOutput(stuff){
    console.log('pltay');
    console.log(stuff);
    setGeoPathOutput(stuff);
  }*/

  /*const polyline = [
    [35.999747, -78.940831],
    [36.001293, -78.939491],
    [36.001702, -78.941614],
  ]*/

  const fillBlueOptions = { fillColor: 'blue' }
  const blackOptions = { color: 'black' }
  const limeOptions = { color: 'lime' }
  const purpleOptions = { color: 'purple' }
  const redOptions = { color: 'red' }

  return (

    <div className='map-container'>

      <MapContainer center={position} zoom={14} scrollWheelZoom={true} style={{ height: "100%", backgroundColor: "white", marginTop: "0px", marginBottom: '0px' }}>
      <GeoJSON
        attribution="Paths"
        data={pathJsonData}
  /> 

      <GeoJSON
        attribution="baths"
        data={baths}
  /> 

        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* <Marker position={position} icon={}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker> */}
        
        <LocationMarker setClickedPosition={setClickedPosition} className='leaflet-marker'/>
        {clickedPosition && !userIsAdding &&
          <Marker position={clickedPosition} icon = {iconDestination} className='leaflet-marker dest-icon'>
          </Marker>
        }
        {clickedPosition && userIsAdding &&
          <Marker position={clickedPosition} icon = {iconClicked} className='leaflet-marker'>
          </Marker>
        }
        
      

      </MapContainer>
    </div>
  );

  console.log(JSON.stringify(userPosition))

}
