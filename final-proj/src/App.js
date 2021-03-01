// import axios from 'axios';
// import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Route } from 'react-router-dom';
import Map from './components/Map';
import Home from './components/Home';
import CreationPage from './components/CreationPage';
import Board from './components/Board';
import Thread from './components/Thread';

function App() {
    return (
        <div className=''>
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
                        <CreationPage
                            history={props.history}
                            match={props.match}
                        />
                    )}
                />
                <Route
                    exact
                    path='/thread/:id'
                    render={(props) => (
                        <Thread history={props.history} match={props.match} />
                    )}
                />
            </BrowserRouter>
        </div>
    );
}

export default App;
