import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Footer from './Footer';

const Home = () => {
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

    const pathVariants = {
        hidden: {
            opacity: 0,
            pathLength: 0,
            fill: 'rgba(109, 40, 217, 0)',
        },
        visible: {
            opacity: 1,
            pathLength: 1,
            fill: 'rgba(109, 40, 217, 1)',
            transition: {
                duration: 3,
                repeat: Infinity,
                repeatType: 'mirror',
                repeatDelay: 1.5,
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
        <div
            className='flex flex-col justify-between h-screen bg-gradient-to-r from-purple-700 to-pink-700'
            variants={pageEnter}
            initial='hidden'
            animate='visible'
        >
            <div className='flex items-center justify-between'>
                <div className='w-12 h-12 m-4 '>
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
                </div>
                <Link
                    to='/about'
                    className='px-2 py-2 m-4 text-xs tracking-wider text-black uppercase transition duration-500 ease-in-out bg-purple-700 border border-black rounded-lg shadow cursor-pointer hover:text-white hover:border-black hover:bg-black'
                >
                    About
                </Link>
            </div>
            <motion.div
                className='flex flex-col items-center font-black leading-normal tracking-tight -mt-36 text-8xl'
                variants={container}
                animate={'visible'}
            >
                <div className='flex'>
                    <motion.div
                        variants={container}
                        className='text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-600'
                    >
                        blue
                    </motion.div>
                    <motion.div
                        variants={container}
                        className='text-transparent bg-black bg-clip-text'
                    >
                        dot.
                    </motion.div>
                </div>
            </motion.div>
            <div className='flex flex-col items-center '>
                <Link to='/maps' className='blkBtnColorHover'>
                    Find your dot
                </Link>
            </div>
            <Footer />
        </div>
    );
};

export default Home;
