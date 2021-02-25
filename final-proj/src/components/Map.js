import React, { useState, useEffect } from 'react';
import MapStyles from './MapStyles';
import {
    GoogleMap,
    useLoadScript,
    Marker,
    InforWindow,
} from '@react-google-maps/api';

const libraries = process.env.REACT_APP_PLACES;
const mapContainerStyle = {
    width: '100vw',
    height: '100vh',
};
const options = {
    styles: MapStyles,
    disableDefaultUI: true,
};
const center = {
    lat: 52.523225,
    lng: 13.383186,
};

const Map = () => {
    const [markers, setMarkers] = useState([]);
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries,
    });

    if (loadError) {
        return 'error loading Google Maps';
    }
    if (!isLoaded) {
        return 'Loading Map';
    }
    console.log(markers);

    return (
        <div>
            {' '}
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                zoom={12}
                center={center}
                options={options}
                onClick={(e) => {
                    setMarkers((current) => [
                        ...current,
                        {
                            lat: e.latLng.lat(),
                            lng: e.latLng.lng(),
                            time: new Date(),
                        },
                    ]);
                }}
            >
                {markers.map((marker) => (
                    <Marker
                        key={marker.time.toISOString()}
                        position={{ lat: marker.lat, lng: marker.lng }}
                    />
                ))}
            </GoogleMap>
        </div>
    );
};

export default Map;
