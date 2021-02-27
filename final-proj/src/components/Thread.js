import { Link } from 'react-router-dom';
import axios from 'axios';
import { useQuery, useMutation } from 'react-query';
import React, { useState, useEffect } from 'react';

const Thread = (props) => {
    const [writeComment, setWriteComment] = useState('');
    const fetchComments = () => {
        return axios.get(`/api/comments/${props.match.params.id}`);
    };
    const { data, status } = useQuery('comments', fetchComments);
    console.log(data);
    console.log(status);

    const mutation = useMutation((thread) => {
        axios.post('/api/comments/add/', thread);
    });

    return (
        <div>
            <div>here is the thread</div>

            <Link
                to={{
                    pathname: '/maps',
                    state: {
                        lat: props.history.location.state.lat,
                        lng: props.history.location.state.lng,
                    },
                }}
            >
                CLICK to MAP
            </Link>
            <Link to={`/board/${props.history.location.state.room_id}`}>
                click to go back to the boards
            </Link>

            <input
                className='w-1/3 py-1 pl-2 my-6 ml-12 text-sm text-gray-700 bg-gray-200 rounded-lg shadow-md focus:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-transparent'
                onChange={(e) => setWriteComment(e.target.value)}
                type='text'
                placeholder='Comment..'
            ></input>

            <button
                className='bg-blue-300'
                onClick={() => {
                    mutation.mutate({
                        comment: writeComment,
                        // image: 'image',
                        threadid: props.match.params.id,
                    });
                }}
            >
                Click to post new comment
            </button>
        </div>
    );
};

export default Thread;
