import React from 'react';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';

import Join from './components/Join/Join';
import Chat from './components/Chat/Chat';

const App = () => (
    <BrowserRouter>
        <Router>
            <Route path='/' exact component={Join}></Route>
            <Route path='/chat' exact component={Chat}></Route>
        </Router>
    </BrowserRouter>

);


export default App;

