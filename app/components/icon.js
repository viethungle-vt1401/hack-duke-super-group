import L from 'leaflet';

const iconPerson = new L.Icon({
    iconUrl: 'images/ellipse-3.png',
    iconRetinaUrl: 'images/ellipse-3.png',
    iconAnchor: null,
    popupAnchor: null,
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: new L.Point(35, 35),
    className: 'leaflet-div-icon'
});

const iconDestination = new L.Icon({
    iconUrl: 'images/red-marker-bright.png',
    iconRetinaUrl: 'images/red-marker-bright.png',
    iconAnchor: null,
    popupAnchor: null,
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: new L.Point(25, 40),
    className: 'leaflet-div-icon'
});

const iconClicked = new L.Icon({
    iconUrl: 'images/red-ellipse.png',
    iconRetinaUrl: 'images/red-ellipse.png',
    iconAnchor: null,
    popupAnchor: null,
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: new L.Point(45, 45),
    className: 'leaflet-div-icon'
});

export { iconPerson, iconDestination, iconClicked };