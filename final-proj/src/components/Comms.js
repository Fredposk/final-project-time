import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Delete from './Delete';
import { useQuery } from 'react-query';
import { formatDistanceToNow } from 'date-fns';
import axios from 'axios';

const Comms = () => {
    const { data, status } = useQuery('threads', () =>
        axios.get(`/api/user/comments`)
    );
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
        <motion.div variants={pageEnter} initial='hidden' animate='visible'>
            {status === 'success' &&
                data.data.response.map((thread) => (
                    <div
                        className='inline-flex justify-center'
                        key={thread.comment_id}
                    >
                        <div
                            className='inline-flex flex-col items-center p-1 my-2 rounded-lg shadow-xl'
                            style={{ backgroundColor: `${thread.color}` }}
                        >
                            <div className='flex justify-between p-2 bg-gray-900 rounded-lg'>
                                <div className='mr-2 text-gray-500'>
                                    <Delete
                                        id={thread.author_id}
                                        post={thread.comment_id}
                                    />
                                </div>
                                <Link
                                    to={{
                                        pathname: `/thread/${thread.thread_id}`,
                                    }}
                                >
                                    <div className='flex flex-col'>
                                        <div className='w-56 text-center text-gray-200 text-wrap'>
                                            {' '}
                                            {thread.comment}
                                        </div>
                                    </div>
                                </Link>
                                <div className='flex flex-col items-center justify-between space-y-4 overflow-hidden w-min'>
                                    <div className='text-xs font-thin text-gray-300'>
                                        {formatDistanceToNow(
                                            new Date(thread.created_at),
                                            { addSuffix: true }
                                        )}
                                    </div>
                                    <div className='px-2 py-1 mb-1 text-xs text-center text-gray-400 bg-gray-800 rounded-full'>
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

export default Comms;
