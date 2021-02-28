import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SimpleGlobe from '../icons/Simple_Globe.svg';

const Home = () => {
    // Here will be a list of all the threads inside the board/ marker

    const container = {
        // hidden: { opacity: 0 },
        // visible: {
        //     color: '#000000',
        //     transition: {
        //         repeat: Infinity,
        //         repeatType: 'mirror',
        //         staggerChildren: 1,
        //         duration: 3,
        //         repeatDelay: 1,
        //     },
        // },
    };

    const icon = {
        hidden: {
            pathLength: 0,
            fill: 'rgba(255, 255, 255, 0)',
        },
        visible: {
            pathLength: 1,
            fill: 'rgba(255, 255, 255, 1)',
        },
    };

    return (
        <div className='flex flex-col justify-between h-screen bg-gradient-to-r from-purple-700 to-pink-700'>
            <div className='flex items-center justify-between'>
                <div className='w-12 h-12 m-4'>
                    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'>
                        <path d='M13 8V0L8.11 5.87 3 12h4v8L17 8h-4z' />
                    </svg>
                </div>
                <div className='px-2 py-2 m-4 text-xs tracking-wider text-black uppercase transition duration-500 ease-in-out border border-black rounded-lg shadow cursor-pointer bg-gradient-to-r from-purple-700 to-pink-600 hover:text-white hover:border-white'>
                    ABOUT
                </div>
            </div>
            <motion.div
                className='flex flex-col items-center mt-12 text-6xl font-black leading-normal tracking-tight'
                variants={container}
                animate={'visible'}
            >
                <motion.div
                    variants={container}
                    className='text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 via-pink-500 to-indigo-600'
                >
                    PALE
                </motion.div>
                <motion.div
                    variants={container}
                    className='text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-600 to-indigo-600'
                >
                    BLUE
                </motion.div>
                <motion.div
                    variants={container}
                    className='text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 via-yellow-300 to-yellow-400'
                >
                    DOT.
                </motion.div>
            </motion.div>
            <div className='flex flex-col items-center mt-24'>
                <Link to='/maps' className='blkBtnColorHover'>
                    Find your dot
                </Link>
            </div>
            <div className='flex justify-around py-2 text-gray-400 uppercase bg-black font-extralight'>
                <div className='cursor-pointer'>Privacy</div>
                <div className='cursor-pointer'>Legal</div>{' '}
                <svg
                    onClick={() => {
                        window.location.replace('https://github.com/Fredposk');
                    }}
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
            </div>
        </div>
    );
};

export default Home;
