import React from 'react';
import { motion } from 'framer-motion';

const Thres = () => {
    const pageEnter = {
        hidden: { y: '-100vw', opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { type: 'spring', duration: 0.4 },
        },
    };
    return (
        <motion.div variants={pageEnter} initial='hidden' animate='visible'>
            This the threads
        </motion.div>
    );
};

export default Thres;
