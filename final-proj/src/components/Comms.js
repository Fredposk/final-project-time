import React from 'react';
import { motion } from 'framer-motion';
// import Delete from './Delete';

const Comms = () => {
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
            This the Comments
        </motion.div>
    );
};

export default Comms;
