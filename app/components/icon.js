import L from 'leaflet';

const iconPerson = new L.Icon({
    iconUrl: 'images/location-sign.svg',
    iconRetinaUrl: 'images/location-sign.svg',
    iconAnchor: null,
    popupAnchor: null,
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: new L.Point(60, 75),
    className: 'leaflet-div-icon'
});

export { iconPerson };