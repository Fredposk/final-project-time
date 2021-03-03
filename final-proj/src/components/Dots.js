import React from 'react';
import Footer from './Footer';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Thres from './Thres';
import Comms from './Comms';
import { useState } from 'react';
import BluedotLogo from './BluedotLogo';

const Dots = (props) => {
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
    const [page, setPage] = useState('threads');
    return (
        <motion.div
            variants={pageEnter}
            initial='hidden'
            animate='visible'
            className='flex flex-col justify-between min-h-screen bg-gradient-to-r from-purple-700 to-pink-700'
        >
            <div className='flex items-center justify-between'>
                <div className='w-12 h-12 m-4 '>
                    <Link to='/maps'>
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
                <BluedotLogo />
                <Link
                    to='/about'
                    className='px-2 py-2 m-4 text-xs tracking-wider text-black uppercase transition duration-500 ease-in-out bg-purple-700 border border-black rounded-lg shadow cursor-pointer hover:text-white hover:border-black hover:bg-black'
                >
                    About
                </Link>
            </div>
            <div className='flex justify-center space-x-2 '>
                <button
                    onClick={() => setPage('threads')}
                    className='blkBtnColorHover'
                >
                    THREADS
                </button>
                <button
                    onClick={() => setPage('comms')}
                    className='blkBtnColorHover'
                >
                    Comments
                </button>
            </div>
            <div className='h-full text-center '>
                {page === 'threads' ? <Thres props={props.match} /> : <Comms />}
            </div>

            <Footer />
        </motion.div>
    );
};

export default Dots;
