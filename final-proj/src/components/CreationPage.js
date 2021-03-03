import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import BtnDots from './BtnDots';
import Globe from '../icons/earth';
import Footer from './Footer';

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
                    <div className='mb-8 text-2xl font-black leading-normal tracking-tight text-transparent bg-black bg-clip-text'>
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
            <div className='flex justify-center my-6 '>
                <div className='w-60 h-60 '>
                    <Globe />
                </div>
            </div>
            {/*  */}
            <Footer />
        </motion.div>
    );
};

export default CreationPage;
