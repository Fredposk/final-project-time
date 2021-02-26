import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import { ReactQueryDevtools } from 'react-query-devtools';

import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

ReactDOM.render(
    <>
        <QueryClientProvider client={queryClient}>
            <App />
            {/* <ReactQueryDevtools initialIsOpen={false} /> */}
        </QueryClientProvider>
    </>,
    document.getElementById('root')
);

// If any instructor has worked with React-Query let me know please! I am comfortable with useQuery hook but need a little help with useMutate
