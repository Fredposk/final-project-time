// import axios from 'axios';
// import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Route } from 'react-router-dom';
import Map from './components/Map';
import Home from './components/Home';
import CreationPage from './components/CreationPage';
import Board from './components/Board';

function App() {
    return (
        <div>
            <BrowserRouter>
                <Route
                    exact
                    path='/maps'
                    render={(props) => <Map history={props.history} />}
                />
                <Route exact path='/' render={() => <Home />} />
                <Route
                    exact
                    path='/board/:board'
                    render={(props) => <Board match={props.match} />}
                />
                <Route
                    exact
                    path='/add/board'
                    render={(props) => (
                        <CreationPage history={props.history} match={props} />
                    )}
                />
            </BrowserRouter>
        </div>
    );
}

export default App;
