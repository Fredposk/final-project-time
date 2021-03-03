import React from 'react';
import { useQuery, useMutation } from 'react-query';
import axios from 'axios';

const Delete = ({ id, post }) => {
    const { data } = useQuery('delete', () => axios.get(`/api/delete`));
    // console.log(data?.data?.userID);
    const mutation = useMutation((post) => {
        axios.post('/api/delete/post', post);
    });

    return (
        <>
            {id === data?.data?.userID && (
                <svg
                    onClick={() => {
                        mutation.mutate({ post });
                        // console.log(post);
                    }}
                    className='absolute z-30 w-5 h-5 m-1 cursor-pointer fill-current '
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 20 20'
                >
                    <path d='M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zM11.4 10l2.83-2.83-1.41-1.41L10 8.59 7.17 5.76 5.76 7.17 8.59 10l-2.83 2.83 1.41 1.41L10 11.41l2.83 2.83 1.41-1.41L11.41 10z' />
                </svg>
            )}
        </>
    );
};

export default Delete;
