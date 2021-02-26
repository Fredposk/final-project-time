import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div>
            <div className='text-center'>
                Hello This is the home page for the app.. cool aint it Give your
                location an lets find places near you
            </div>{' '}
            <Link to='/maps' className='p-4 bg-blue-500'>
                CLICK to continue
            </Link>
        </div>
    );
};

export default Home;
