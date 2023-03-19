import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import L from 'leaflet';

import 'leaflet/dist/leaflet.css';
import './styles/map.scss'

interface WeatherMapProps {
    city: string;
}

const WeatherMap = ({ city }: WeatherMapProps) => {
    const [coordinates, setCoordinates] = useState(null);
    const [mapInitialized, setMapInitialized] = useState(false);
    const [markers, setMarkers] = useState([]);

    const mapRef = useRef<L.Map>(null);

    useEffect(() => {
        const getCoordinates = async () => {
            try {
                const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${city}`);
                const data = await response.json();
                if (data.length > 0) {
                    const { lat, lon } = data[0];
                    setCoordinates([lat, lon]);
                }
            } catch (error) {
                console.error(error);
            }
        };
        getCoordinates();
    }, [city]);

    const onMapLoad = async () => {
        if (mapInitialized || coordinates.length === 0) return;

        const layer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: 'OpenStreetMap' });

        if (mapRef.current) {
            layer.addTo(mapRef.current);
        }

        const windyApiKey = 'VDnIPRDBhsqNRChLfmLAK6qHjR9ZstN8';
        const url = `https://api.windy.com/api/point-forecast/v2?lat=${coordinates[0]}&lon=${coordinates[1]}&key=${windyApiKey}`;

        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                const webcams = data.result.webcams;
                const webcamMarkers: L.Marker[] = [];
                webcams.forEach((webcam) => {
                    const { title, location } = webcam;
                    const marker = L.marker([location.latitude, location.longitude]).addTo(mapRef.current);
                    const popupContent = `<div><p>${title}</p><img src="${webcam.image.current.preview}" alt="${title}" /></div>`;
                    marker.bindPopup(popupContent);
                    webcamMarkers.push(marker);
                });
                setMarkers(webcamMarkers);
            });

        setMapInitialized(true);
    };

    const renderWeather = () => {
        if (coordinates === null) return;

        return <div className="map">
            <MapContainer center={coordinates} zoom={13} whenReady={() => onMapLoad()} className="map__container" ref={mapRef}>
                <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
                {markers.map((marker) => marker)}
            </MapContainer>
        </div>
    };

    return renderWeather();
};

export default WeatherMap;
