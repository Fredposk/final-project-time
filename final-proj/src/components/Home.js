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

    return (
        <div className='flex flex-col h-screen bg-gray-100'>
            <div className='flex justify-between '>
                <div className='w-12 h-12 m-3'>
                    <img
                        className='fill-current'
                        src={SimpleGlobe}
                        alt='globe'
                    />
                </div>
                <div className='p-3 m-4 font-sans text-xs tracking-widest text-blue-100 bg-blue-700 border border-blue-800 rounded-lg shadow-lg cursor-pointer hover:shadow-xl '>
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
                <Link
                    to='/maps'
                    className='px-5 py-3 text-sm tracking-wider text-white uppercase transition duration-500 ease-in-out bg-black border border-transparent rounded shadow cursor-pointer hover:bg-white hover:text-black hover:border-black '
                >
                    CLICK to continue
                </Link>
            </div>
        </div>
    );
};

export default Home;
