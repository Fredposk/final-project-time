import { useCallback, useState, useRef } from 'react';
import { confirmAlert } from 'react-confirm-alert'; // Import
import Footer from './Footer';
import BtnDots from './BtnDots';
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
import { motion } from 'framer-motion';

const libraries = ['places'];
const mapContainerStyle = {
    width: '99vw',
    height: '80vh',
};
const options = {
    styles: MapStyles,
    disableDefaultUI: true,
};

const pathVariants = {
    hidden: {
        opacity: 0,
        pathLength: 0,
        fill: 'rgba(109, 40, 217, 0)',
    },
    visible: {
        opacity: 1,
        pathLength: 1,
        fill: 'rgba(0, 0, 0, 1)',
        transition: {
            duration: 2,
        },
    },
};

const pageEnter = {
    hidden: { x: '100vw', opacity: 0 },
    visible: {
        x: 0,
        opacity: 1,
        transition: { type: 'spring', delay: 0.3, duration: 0.4 },
    },
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

    // const fetchMarkers = () => {
    //     return axios.get(`/api/markers/`);
    // };
    const { data, status } = useQuery('markers', () =>
        axios.get(`/api/markers/`)
    );
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
        <motion.div
            variants={pageEnter}
            initial='hidden'
            animate='visible'
            className='flex flex-col justify-between h-screen bg-gradient-to-r from-purple-700 to-pink-700'
        >
            <div className='flex items-center justify-between m-4'>
                <div className='w-10 h-10 '>
                    <Link to='/'>
                        <motion.svg
                            className='bg-transparent stroke-current '
                            xmlns='http://www.w3.org/2000/svg'
                            viewBox='0 0 20 20'
                        >
                            <motion.path
                                initial='hidden'
                                animate='visible'
                                variants={pathVariants}
                                d='M13 8V0L8.11 5.87 3 12h4v8L17 8h-4z'
                            />
                        </motion.svg>
                    </Link>
                </div>
                <BtnDots />
            </div>
            <div className='inline-flex justify-center mx-1 border-2 border-black shadow-lg '>
                <GoogleMap
                    mapContainerStyle={mapContainerStyle}
                    mapContainerClassName='relative'
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
                    <Locate panTo={panTo} />
                    <Search panTo={panTo} />
                </GoogleMap>
            </div>
            <Footer />
        </motion.div>
    );
    function Locate({ panTo }) {
        return (
            <button
                className='absolute right-0 m-3 text-purple-100 '
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
                <svg
                    className='fill-current w-9 h-9'
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 20 20'
                >
                    <path d='M0 0l20 8-8 4-2 8z' />
                </svg>
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
            <div className='absolute p-1 m-2 bg-black'>
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
