import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import BtnDots from './BtnDots';

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
            duration: 3,
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

const CreationPage = (props) => {
    // Back button will take coordinates to center back to MAP.js
    const [InputName, setInputName] = useState('');

    const createNewBoard = async () => {
        const response = await axios.post('/api/add/board', {
            lat: props.history.location.state.lat,
            lng: props.history.location.state.lng,
            name: InputName,
        });

        const { room_id } = response.data.response[0];
        props.history.push({
            pathname: `/board/${room_id}`,
        });
    };

    return (
        <motion.div
            variants={pageEnter}
            initial='hidden'
            animate='visible'
            className='flex flex-col justify-between min-h-screen bg-gradient-to-r from-purple-700 to-pink-700'
        >
            <div>
                <div className='flex items-center justify-between'>
                    <div className='w-12 h-12 m-4 '>
                        <Link
                            to={{
                                pathname: '/maps',
                                state: {
                                    lat: props.history.location.state.lat,
                                    lng: props.history.location.state.lng,
                                },
                            }}
                        >
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
                    <div className='flex items-center mr-3 space-x-2'>
                        <Link
                            className='px-2 py-2 text-xs tracking-wider text-white uppercase transition duration-500 ease-in-out bg-black border border-black rounded-lg shadow cursor-pointer hover:bg-purple-700 hover:text-black'
                            to={{
                                pathname: '/maps',
                                state: {
                                    lat: props.history.location.state.lat,
                                    lng: props.history.location.state.lng,
                                },
                            }}
                        >
                            BACK
                        </Link>
                        <BtnDots />
                    </div>
                </div>
                <div className='flex flex-col items-center mt-8 space-y-4'>
                    <div className='mb-16 text-4xl font-black leading-normal tracking-tight text-transparent bg-black bg-clip-text'>
                        GIVE YOUR DOT A NAME:
                    </div>

                    <input
                        className='text-center form'
                        onChange={(e) => setInputName(e.target.value)}
                        type='text'
                        placeholder='Name for dot'
                    />

                    <button
                        className='px-2 py-2 text-xs tracking-wider text-white uppercase transition duration-500 ease-in-out bg-black border border-black rounded-lg shadow cursor-pointer hover:bg-purple-700 hover:text-black'
                        onClick={createNewBoard}
                    >
                        CREATE DOT
                    </button>
                </div>
            </div>
            {/*  */}
            <div className='flex justify-around py-2 text-gray-400 uppercase bg-black font-extralight'>
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
};

export default CreationPage;
