import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Delete from './Delete';
import { useQuery } from 'react-query';
import { formatDistanceToNow } from 'date-fns';
import axios from 'axios';

const Recent = (props) => {
    const { data, status } = useQuery('thread', () =>
        axios.get(`/api/all/threads`)
    );
    console.log(props);
    // console.log(data);

    const pageEnter = {
        hidden: { y: '-100vw', opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { type: 'spring', duration: 0.4 },
        },
    };

    return (
        <motion.div
            className='inline-flex flex-col justify-center'
            variants={pageEnter}
            initial='hidden'
            animate='visible'
        >
            {status === 'success' &&
                data.data.response.map((thread) => (
                    <div
                        variants={pageEnter}
                        initial='hidden'
                        animate='visible'
                        key={thread.thread_id}
                    >
                        <div
                            className='inline-flex flex-col items-center p-1 my-2 rounded-lg shadow-xl'
                            style={{ backgroundColor: `${thread.color}` }}
                        >
                            <div className='flex justify-between p-2 bg-gray-900 rounded-lg'>
                                <img
                                    className='relative object-cover w-20 h-32 rounded-lg shadow-xl'
                                    src={`${thread.thread_foto}`}
                                    alt={`${thread.topic}`}
                                />
                                <Delete
                                    id={thread.author_id}
                                    post={thread.thread_id}
                                />
                                <div className='flex flex-col'>
                                    <Link
                                        to={{
                                            pathname: `/thread/${thread.thread_id}`,
                                            state: {},
                                        }}
                                    >
                                        <div className='w-56 mt-4 ml-3 space-y-3 text-left text-gray-200 text-wrap'>
                                            <div className=''>
                                                {' '}
                                                {thread.topic}
                                            </div>
                                            <div className=''>
                                                {' '}
                                                {thread.comment}
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                                <div className='relative w-min'>
                                    <div className='absolute top-0 right-0 block mt-1 text-xs font-thin text-gray-300 whitespace-nowrap '>
                                        {formatDistanceToNow(
                                            new Date(thread.created_at),
                                            { addSuffix: true }
                                        )}
                                    </div>
                                    <div className='absolute bottom-0 right-0 px-2 py-1 mb-1 text-xs text-center text-gray-400 bg-gray-800 rounded-full'>
                                        {thread.author_id}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
        </motion.div>
    );
};

export default Recent;
