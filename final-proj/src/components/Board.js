import { useQuery, useMutation } from 'react-query';
import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Board = (props) => {
    const { data, status } = useQuery('threads', () =>
        axios.get(`/api/board/${props.match.params.board}`)
    );
    // console.log(data);
    // console.log(status);

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

    const mutation = useMutation((thread) => {
        // for (var key of thread.entries()) {
        //     console.log(key[0] + ', ' + key[1]);
        // }
        axios.post('/api/add/thread', thread);
    });

    const upload = () => {
        // const fd = new FormData();
        // fd.append('file', threadPic);
        // fd.append('fpbp', fpbp);
        // fd.append('topic', topic);
        // fd.append('room_id', props.match.params.board);

        mutation.mutate({
            fpbp: fpbp,
            room_id: props.match.params.board,
            topic: topic,
            threadPic: threadPic,
        });

        // axios.post('/api/add/thread', fd);
    };
    // console.log(mutation);

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
                            lat: data?.data?.boardInfo[0]?.lat,
                            lng: data?.data?.boardInfo[0]?.lng,
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
                        className='px-2 py-2 text-xs tracking-wider text-white uppercase transition duration-500 ease-in-out bg-purple-700 border border-transparent rounded-lg shadow cursor-pointer hover:text-white hover:border-black hover:bg-black'
                    >
                        POST NEW
                    </div>
                    <div className='px-2 py-2 text-xs tracking-wider text-white uppercase transition duration-500 ease-in-out bg-black border border-black rounded-lg shadow cursor-pointer'>
                        DOTS
                    </div>
                </div>
                {uploadOpen && (
                    <button
                        onClick={() => setUploadOpen(false)}
                        tabIndex='-1'
                        className='fixed inset-0 z-20 w-full bg-gray-900 cursor-default opacity-40'
                    ></button>
                )}
            </div>
            {uploadOpen && (
                <div className='absolute z-30 p-2 mt-1 bg-gray-100 border-2 border-purple-700 rounded-lg shadow-lg min-w-min left-2'>
                    <form className='flex flex-col items-start space-y-2'>
                        <input
                            className='mt-1 form'
                            type='text'
                            maxLength='65'
                            placeholder='Topic'
                            onChange={(e) => setTopic(e.target.value)}
                        />
                        <textarea
                            rows='3'
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
                            {mutation.isLoading && (
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
                            <Link
                                to={{
                                    pathname: `/thread/${thread.thread_id}`,
                                    state: {
                                        lat: data?.data?.boardInfo[0]?.lat,
                                        lng: data?.data?.boardInfo[0]?.lng,
                                        room_id: props.match.params.board,
                                    },
                                }}
                            >
                                <div className='flex justify-between p-2 bg-gray-900 rounded-lg'>
                                    <img
                                        className='object-cover h-32 rounded-lg shadow-xl w-18'
                                        src='https://picsum.photos/seed/picsum/200/300'
                                        alt={`${thread.topic}`}
                                    />
                                    <div className='flex flex-col'>
                                        <div className='w-56 text-center text-gray-200 text-wrap'>
                                            {' '}
                                            {thread.topic}
                                        </div>
                                        <div className='w-56 mt-6 text-center text-gray-200 text-wrap'>
                                            {' '}
                                            {thread.comment}
                                        </div>
                                    </div>
                                    <div className='flex flex-col items-center justify-between overflow-hidden w-min'>
                                        <div className='text-xs font-thin text-gray-300'>
                                            3 hours ago
                                        </div>
                                        <div className='px-2 py-1 mb-1 text-xs text-center text-gray-400 bg-gray-800 rounded-full'>
                                            {thread.author_id}
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                ))}
            <div className='flex justify-around py-1 text-gray-400 uppercase bg-black font-extralight'>
                <div className='cursor-pointer'>Privacy</div>
                <div className='cursor-pointer'>Legal</div>{' '}
                <button
                    onClick={() =>
                        window.open('https://github.com/Fredposk', '_blank')
                    }
                    rel='noopener noreferrer'
                >
                    <svg
                        className='w-5 h-5 ml-2 cursor-pointer'
                        role='img'
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 480 512'
                    >
                        <path
                            fill='currentColor'
                            d='M186.1 328.7c0 20.9-10.9 55.1-36.7 55.1s-36.7-34.2-36.7-55.1 10.9-55.1 36.7-55.1 36.7 34.2 36.7 55.1zM480 278.2c0 31.9-3.2 65.7-17.5 95-37.9 76.6-142.1 74.8-216.7 74.8-75.8 0-186.2 2.7-225.6-74.8-14.6-29-20.2-63.1-20.2-95 0-41.9 13.9-81.5 41.5-113.6-5.2-15.8-7.7-32.4-7.7-48.8 0-21.5 4.9-32.3 14.6-51.8 45.3 0 74.3 9 108.8 36 29-6.9 58.8-10 88.7-10 27 0 54.2 2.9 80.4 9.2 34-26.7 63-35.2 107.8-35.2 9.8 19.5 14.6 30.3 14.6 51.8 0 16.4-2.6 32.7-7.7 48.2 27.5 32.4 39 72.3 39 114.2zm-64.3 50.5c0-43.9-26.7-82.6-73.5-82.6-18.9 0-37 3.4-56 6-14.9 2.3-29.8 3.2-45.1 3.2-15.2 0-30.1-.9-45.1-3.2-18.7-2.6-37-6-56-6-46.8 0-73.5 38.7-73.5 82.6 0 87.8 80.4 101.3 150.4 101.3h48.2c70.3 0 150.6-13.4 150.6-101.3zm-82.6-55.1c-25.8 0-36.7 34.2-36.7 55.1s10.9 55.1 36.7 55.1 36.7-34.2 36.7-55.1-10.9-55.1-36.7-55.1z'
                        ></path>
                    </svg>
                </button>
            </div>
        </motion.div>
    );
};

export default Board;
