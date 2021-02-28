import { useQuery, useMutation } from 'react-query';
import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Board = (props) => {
    const fetchThreads = async () => {
        return axios.get(`/api/board/${props.match.params.board}`);
    };

    // Here will be a list of all the threads inside the board/ marker
    const { data, status } = useQuery('threads', fetchThreads);
    // console.log(data);
    // console.log(status);

    const [threadPic, setthreadPic] = useState('');
    const [topic, setTopic] = useState('');
    const [fpbp, setFpbp] = useState('');

    const mutation = useMutation((thread) => {
        axios.post('/api/add/thread', thread);
    });
    // console.log(mutation);

    return (
        <div>
            <div>This is the board</div>
            <textarea
                rows='1'
                style={{ resize: 'none' }}
                className='py-1 pl-2 text-sm text-gray-700 bg-gray-200 rounded-lg shadow-md focus:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-transparent'
                onChange={(e) => setTopic(e.target.value)}
                type='text'
                placeholder='TOPIC'
            />
            <textarea
                rows='3'
                style={{ resize: 'none' }}
                className='py-1 pl-2 text-sm text-gray-700 bg-gray-200 rounded-lg shadow-md focus:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-transparent'
                onChange={(e) => setFpbp(e.target.value)}
                type='text'
                placeholder='First post best post '
            />
            <textarea
                rows='1'
                style={{ resize: 'none' }}
                className='py-1 pl-2 text-sm text-gray-700 bg-gray-200 rounded-lg shadow-md focus:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-transparent'
                onChange={(e) => setthreadPic(e.target.value)}
                type='text'
                placeholder='Here will be a image uploader '
            />
            <button
                onClick={() => {
                    mutation.mutate({
                        fpbp: fpbp,
                        room_id: props.match.params.board,
                        topic: topic,
                        threadPic: threadPic,
                    });
                }}
            >
                Post new thread!
            </button>
            <Link
                className='bg-red-200'
                to={{
                    pathname: '/maps',
                    state: {
                        lat: data?.data?.boardInfo[0]?.lat,
                        lng: data?.data?.boardInfo[0]?.lng,
                    },
                }}
            >
                CLICK TO GO BACK
            </Link>

            {status === 'success' &&
                data.data.response.map((thread) => (
                    <div
                        style={{ backgroundColor: `${thread.color}` }}
                        key={thread.thread_id}
                    >
                        {thread.topic}

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
                            click to see comments
                        </Link>
                    </div>
                ))}
        </div>
    );
};

export default Board;
