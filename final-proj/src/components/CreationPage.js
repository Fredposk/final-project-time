import React, { useState } from 'react';
import axios from 'axios';

const CreationPage = (props) => {
    // Back button will take coordinates to center back to MAP.js
    const [InputName, setInputName] = useState('');

    const createNewBoard = async () => {
        const response = await axios.post('/api/add/board', {
            lat: props.match.location.state.lat,
            lng: props.match.location.state.lng,
            name: InputName,
        });

        const { room_id } = response.data.response[0];
        props.history.push({
            pathname: `/board/${room_id}`,
        });
    };

    return (
        <div>
            {' '}
            <div>Give your board a name</div>
            <input
                className='w-1/3 py-1 pl-2 my-6 ml-12 text-sm text-gray-700 bg-gray-200 rounded-lg shadow-md focus:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-transparent'
                onChange={(e) => setInputName(e.target.value)}
                type='text'
                placeholder='Name for board'
            />
            <button onClick={createNewBoard}>GO!</button>
        </div>
    );
};

export default CreationPage;
