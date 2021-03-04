import { useQuery, useMutation, useQueryClient } from 'react-query';
import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { formatDistanceToNow } from 'date-fns';
import Footer from './Footer';
import BtnDots from './BtnDots';
import Delete from './Delete';

const Board = (props) => {
    const { data, status } = useQuery('threads', () =>
        axios.get(`/api/board/${props?.match?.params?.board}`)
    );

    const queryClient = useQueryClient();

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

    const [threadPic, setthreadPic] = useState('');
    const [topic, setTopic] = useState('');
    const [fpbp, setFpbp] = useState('');
    const [uploadOpen, setUploadOpen] = useState(false);
    const [spinner, setSpinner] = useState(false);

    const addThread = (thread) => {
        axios.post('/api/add/thread', thread.fd);
    };

    const mutation = useMutation(addThread);

    const upload = () => {
        const fd = new FormData();
        fd.append('file', threadPic);
        fd.append('fpbp', fpbp);
        fd.append('topic', topic);
        fd.append('room_id', props?.match?.params?.board);

        mutation.mutate({
            fd: fd,
        });
    };

    return (
        <motion.div
            variants={pageEnter}
            initial='hidden'
            animate='visible'
            className='flex flex-col justify-between min-h-screen bg-gradient-to-r from-purple-700 to-pink-700'
        >
            <div className='flex items-center justify-between'>
                <Link
                    className='m-4 w-9 h-9 '
                    to={{
                        pathname: '/maps',
                        state: {
                            lat:
                                status === 'success' &&
                                data?.data?.boardInfo?.[0]?.lat,
                            lng:
                                status === 'success' &&
                                data?.data?.boardInfo?.[0]?.lng,
                        },
                    }}
                >
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
                <div className='flex m-4 space-x-2'>
                    <div
                        onClick={() => setUploadOpen(!uploadOpen)}
                        className='px-2 py-2 text-xs tracking-wider text-white uppercase transition duration-500 ease-in-out bg-black border border-transparent rounded-lg shadow cursor-pointer hover:text-black hover:border-black hover:bg-purple-700'
                    >
                        POST NEW
                    </div>
                    <BtnDots />
                </div>
                {uploadOpen && (
                    <button
                        onClick={() => setUploadOpen(false)}
                        tabIndex='-1'
                        className='fixed inset-0 z-20 w-full bg-gray-900 cursor-default opacity-40'
                    ></button>
                )}
            </div>
            {status === 'success' && (
                <div className='text-4xl font-black leading-normal tracking-tight text-center text-transparent bg-black bg-clip-text'>
                    {data?.data?.boardInfo?.[0]?.name}
                </div>
            )}
            {uploadOpen && (
                <div className='absolute z-50 p-2 mt-1 bg-gray-100 border-2 border-purple-700 rounded-lg shadow-lg min-w-min left-2'>
                    <form className='flex flex-col items-start space-y-2'>
                        <input
                            className='mt-1 form'
                            required
                            type='text'
                            maxLength='65'
                            placeholder='Topic'
                            onChange={(e) => setTopic(e.target.value)}
                        />
                        <textarea
                            rows='3'
                            required='required'
                            style={{ resize: 'none' }}
                            className='form'
                            type='text'
                            maxLength='155'
                            onChange={(e) => setFpbp(e.target.value)}
                            placeholder='First post best post '
                        />
                        <input
                            className='form'
                            type='file'
                            name='file'
                            accept='image/*'
                            placeholder='file'
                            onChange={(e) => {
                                setthreadPic(e.target.files[0]);
                            }}
                        />
                        <div className='flex items-center'>
                            <button
                                className='submitBtn'
                                onClick={(e) => {
                                    e.preventDefault();
                                    upload(e);
                                }}
                            >
                                submit
                            </button>
                            {spinner && (
                                <svg
                                    className='w-4 h-4 ml-2 fill-current animate-spin'
                                    xmlns='http://www.w3.org/2000/svg'
                                    viewBox='0 0 20 20'
                                >
                                    <path d='M10 3v2a5 5 0 0 0-3.54 8.54l-1.41 1.41A7 7 0 0 1 10 3zm4.95 2.05A7 7 0 0 1 10 17v-2a5 5 0 0 0 3.54-8.54l1.41-1.41zM10 20l-4-4 4-4v8zm0-12V0l4 4-4 4z' />
                                </svg>
                            )}
                        </div>
                    </form>
                </div>
            )}
            {status === 'success' &&
                data.data.response.map((thread) => (
                    <div
                        className='inline-flex justify-center'
                        key={thread.thread_id}
                    >
                        <div
                            className='inline-flex flex-col items-center p-1 my-2 rounded-lg shadow-xl'
                            style={{ backgroundColor: `${thread.color}` }}
                        >
                            <div className='flex justify-between p-2 bg-gray-900 rounded-lg'>
                                <img
                                    className='relative object-cover w-20 rounded-lg shadow-xl h-36 '
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
                                            state: {
                                                lat:
                                                    data?.data?.boardInfo?.[0]
                                                        ?.lat,
                                                lng:
                                                    data?.data?.boardInfo?.[0]
                                                        ?.lng,
                                                room_id:
                                                    props?.match?.params?.board,
                                            },
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
                                    <div className='absolute top-0 block mt-1 text-xs font-thin text-gray-300 whitespace-nowrap right-3 '>
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
            <Footer />
        </motion.div>
    );
};

export default Board;
