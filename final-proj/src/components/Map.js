import { useCallback, useState, useRef } from 'react';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import axios from 'axios';
import { useQuery } from 'react-query';
import MapStyles from './MapStyles';
import { withRouter, Link } from 'react-router-dom';
import {
    GoogleMap,
    useLoadScript,
    Marker,
    InfoWindow,
} from '@react-google-maps/api';
import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
} from 'use-places-autocomplete';
import {
    Combobox,
    ComboboxInput,
    ComboboxPopover,
    ComboboxList,
    ComboboxOption,
} from '@reach/combobox';
import '@reach/combobox/styles.css';

const libraries = ['places'];
const mapContainerStyle = {
    width: '100vw',
    height: '80vh',
};
const options = {
    styles: MapStyles,
    disableDefaultUI: true,
};

export default withRouter(Map);

function Map(props) {
    const [selected, setSelected] = useState();

    const lng = props?.location?.state?.lng;
    const lat = props?.location?.state?.lat;

    const center = {
        lat: lat || 52.523225,
        lng: lng || 13.383186,
    };

    const fetchMarkers = () => {
        return axios.get(`/api/markers/`);
    };
    const { data, status } = useQuery(['markers'], fetchMarkers);
    // console.log(data?.data?.response);
    console.log(status);

    const mapRef = useRef();
    const onMapLoad = useCallback((map) => {
        mapRef.current = map;
    }, []);
    const panTo = useCallback(({ lat, lng }) => {
        mapRef.current.panTo({ lat, lng });
        mapRef.current.setZoom(16);
    }, []);

    const onMapClick = useCallback(
        (e) => {
            confirmAlert({
                title: 'Ready to open a new board?',
                // message: 'Are you sure to do this.',
                buttons: [
                    {
                        label: 'Yes',
                        onClick: () => {
                            props.history.push({
                                pathname: '/add/board',
                                state: {
                                    lat: e.latLng.lat(),
                                    lng: e.latLng.lng(),
                                },
                            });
                        },
                    },
                    {
                        label: 'No',
                        onClick: () => console.log('no'),
                    },
                ],
            });
        },
        [props.history]
    );

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries: libraries,
    });

    if (loadError) {
        return 'error loading Google Maps';
    }
    if (!isLoaded) {
        return 'Loading Map';
    }

    return (
        <div>
            <div className='inline-flex p-4 mt-4 bg-red-400'>
                <GoogleMap
                    mapContainerStyle={mapContainerStyle}
                    zoom={15}
                    center={center}
                    options={options}
                    onClick={onMapClick}
                    onLoad={onMapLoad}
                >
                    {status === 'success' &&
                        data.data.response.map((marker) => (
                            <Marker
                                key={marker.room_id}
                                position={{ lat: marker.lat, lng: marker.lng }}
                                icon={{
                                    url:
                                        'https://www.pinclipart.com/picdir/middle/491-4917893_chat-icon-svg-png-icon-free-download-chat.png',
                                    scaledSize: new window.google.maps.Size(
                                        30,
                                        30
                                    ),
                                    origin: new window.google.maps.Point(0, 0),
                                    anchor: new window.google.maps.Point(
                                        15,
                                        15
                                    ),
                                }}
                                onClick={() => {
                                    setSelected(marker);
                                }}
                            />
                        ))}
                    {selected ? (
                        <InfoWindow
                            position={{ lat: selected.lat, lng: selected.lng }}
                            onCloseClick={() => {
                                setSelected(null);
                            }}
                        >
                            <div>
                                <Link to={`/board/${selected.room_id}`}>
                                    click to see more
                                </Link>
                            </div>
                        </InfoWindow>
                    ) : null}
                </GoogleMap>
            </div>
            <Locate panTo={panTo} />
            <Search panTo={panTo} />
        </div>
    );
    function Locate({ panTo }) {
        return (
            <button
                className='bg-red-800'
                onClick={() => {
                    navigator.geolocation.getCurrentPosition(
                        (position) => {
                            panTo({
                                lat: position.coords.latitude,
                                lng: position.coords.longitude,
                            });
                        },
                        () => null
                    );
                }}
            >
                {' '}
                CLICK FOR YOUR LOCATION
                {/* <img src='/compass.svg' alt='compass' /> */}
            </button>
        );
    }

    function Search({ panTo }) {
        const {
            ready,
            value,
            suggestions: { status, data },
            setValue,
            clearSuggestions,
        } = usePlacesAutocomplete({
            requestOptions: {
                location: {
                    lat: () => lat || 52.523225,
                    lng: () => lng || 13.383186,
                },
                radius: 250,
            },
        });

        const handleInput = (e) => {
            setValue(e.target.value);
        };

        const handleSelect = async (address) => {
            setValue(address, false);
            clearSuggestions();

            try {
                const results = await getGeocode({ address });
                const { lat, lng } = await getLatLng(results[0]);
                panTo({ lat, lng });
            } catch (error) {
                // Add a modal to alert the user
                console.log('error getting the userlocation ', error);
            }
        };

        return (
            <div>
                <Combobox onSelect={handleSelect}>
                    <ComboboxInput
                        value={value}
                        onChange={handleInput}
                        disabled={!ready}
                        placeholder='Search for places'
                    />
                    <ComboboxPopover>
                        <ComboboxList>
                            {status === 'OK' &&
                                data.map(({ id, description }) => (
                                    <ComboboxOption
                                        key={id}
                                        value={description}
                                    />
                                ))}
                        </ComboboxList>
                    </ComboboxPopover>
                </Combobox>
            </div>
        );
    }
}
