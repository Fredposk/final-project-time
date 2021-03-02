import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Delete from './Delete';
import { useQuery, useMutation } from 'react-query';
import axios from 'axios';

const Thres = () => {
    const { data, status } = useQuery('threads', () =>
        axios.get(`/api/user/threads`)
    );

    console.log(data);

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
