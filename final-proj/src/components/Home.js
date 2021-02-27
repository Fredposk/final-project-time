import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    // Here will be a list of all the threads inside the board/ marker

    return (
        <div>
            <div className='text-center'>
                Hello This is the home page for the app.. cool aint it Give your
                location an lets find places near you bro
            </div>{' '}
            <Link to='/maps' className='p-4 bg-blue-500'>
                CLICK to continue
            </Link>
        </div>
    );
};

export default Home;
