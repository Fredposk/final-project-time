import React from 'react';
import Footer from './Footer';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import BtnDots from './BtnDots';
import Globe from '../icons/earth';

// import { useState } from 'react';

const Dots = () => {
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

    return (
        <motion.div
            variants={pageEnter}
            initial='hidden'
            animate='visible'
            className='flex flex-col justify-between min-h-screen bg-gradient-to-r from-purple-700 to-pink-700'
        >
            <div className='flex items-center justify-between'>
                <div className='w-12 h-12 m-4 '>
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
                </div>{' '}
                <div className='mr-4'>
                    <BtnDots />
                </div>
            </div>
            <div className='flex justify-center -mt-24 font-black leading-normal tracking-tight text-8xl'>
                <motion.div className='text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-600'>
                    blue
                </motion.div>
                <motion.div className='text-transparent bg-black bg-clip-text'>
                    dot.
                </motion.div>
            </div>
            <div className='flex flex-col items-center justify-center -mt-24'>
                <div className='text-xl text-gray-900 '>
                    A Spiced 2021 React Project
                </div>
                <div>
                    <div className=''>
                        <div className='mb-4 text-lg text-center text-gray-300 underline '>
                            {' '}
                            Tech Stack:{' '}
                        </div>
                        <ul className='inline-block text-left text-black list-disc list-inside text-md'>
                            <li>React</li>
                            <li>React-Query</li>
                            <li>Tailwind CSS</li>
                            <li>framer-motion</li>
                            <li>@react-google-maps/api</li>
                        </ul>
                    </div>
                </div>

                <div className='flex justify-center'>
                    <div className='mt-12 w-36 h-36'>
                        <Globe />
                    </div>
                </div>
            </div>

            <Footer />
        </motion.div>
    );
};

export default Dots;
