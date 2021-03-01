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
import { motion } from 'framer-motion';

const libraries = ['places'];
const mapContainerStyle = {
    width: '100vw',
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
            <div className='flex items-center justify-between'>
                <div className='w-10 h-10 m-2 '>
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
                <div className='px-2 py-2 m-2 text-xs tracking-wider text-black uppercase transition duration-500 ease-in-out bg-purple-700 border border-black rounded-lg shadow cursor-pointer hover:text-white hover:border-black hover:bg-black'>
                    DOTS
                </div>
            </div>
            <div className='inline-flex border-2 border-black shadow-md'>
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
            <div className='flex items-center justify-around py-1 text-gray-400 uppercase bg-black font-extralight'>
                <div className='cursor-pointer'>Privacy</div>
                <div className='cursor-pointer'>Legal</div>{' '}
                <button
                    onClick={() =>
                        window.open('https://github.com/Fredposk', '_blank')
                    }
                    rel='noopener noreferrer'
                >
                    <svg
                        className='w-5 h-5 ml-2 cursor-pointer'
                        role='img'
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 480 512'
                    >
                        <path
                            fill='currentColor'
                            d='M186.1 328.7c0 20.9-10.9 55.1-36.7 55.1s-36.7-34.2-36.7-55.1 10.9-55.1 36.7-55.1 36.7 34.2 36.7 55.1zM480 278.2c0 31.9-3.2 65.7-17.5 95-37.9 76.6-142.1 74.8-216.7 74.8-75.8 0-186.2 2.7-225.6-74.8-14.6-29-20.2-63.1-20.2-95 0-41.9 13.9-81.5 41.5-113.6-5.2-15.8-7.7-32.4-7.7-48.8 0-21.5 4.9-32.3 14.6-51.8 45.3 0 74.3 9 108.8 36 29-6.9 58.8-10 88.7-10 27 0 54.2 2.9 80.4 9.2 34-26.7 63-35.2 107.8-35.2 9.8 19.5 14.6 30.3 14.6 51.8 0 16.4-2.6 32.7-7.7 48.2 27.5 32.4 39 72.3 39 114.2zm-64.3 50.5c0-43.9-26.7-82.6-73.5-82.6-18.9 0-37 3.4-56 6-14.9 2.3-29.8 3.2-45.1 3.2-15.2 0-30.1-.9-45.1-3.2-18.7-2.6-37-6-56-6-46.8 0-73.5 38.7-73.5 82.6 0 87.8 80.4 101.3 150.4 101.3h48.2c70.3 0 150.6-13.4 150.6-101.3zm-82.6-55.1c-25.8 0-36.7 34.2-36.7 55.1s10.9 55.1 36.7 55.1 36.7-34.2 36.7-55.1-10.9-55.1-36.7-55.1z'
                        ></path>
                    </svg>
                </button>
            </div>
        </motion.div>
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
