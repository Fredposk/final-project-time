import React from 'react';
import { Link } from 'react-router-dom';

const BtnDots = () => {
    return (
        <Link
            to='/dots/main'
            className='px-2 py-2 text-xs tracking-wider text-black uppercase transition duration-500 ease-in-out bg-purple-700 border border-black rounded-md shadow cursor-pointer hover:text-white hover:border-black hover:bg-black'
        >
            DoTS
        </Link>
    );
};

export default BtnDots;
