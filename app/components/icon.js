import L from 'leaflet';

const iconPerson = new L.Icon({
    iconUrl: 'images/red_marker.png',
    iconRetinaUrl: 'images/red_marker.png',
    iconAnchor: null,
    popupAnchor: null,
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: new L.Point(60, 75),
    className: 'leaflet-div-icon'
});

export { iconPerson };