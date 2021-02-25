import axios from 'axios';
import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Route, Switch, NavLink, Link } from 'react-router-dom';
import Map from './components/Map';

function App() {
    return (
        <div className='App'>
            <BrowserRouter>
                <Route exact path='/' render={() => <Map />} />
            </BrowserRouter>
        </div>
    );
}

export default App;
