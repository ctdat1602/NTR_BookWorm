import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';

import Navbar from './components/navbar/Navbar';
import App from './App';
import '../css/app.css';

class Welcome extends Component {
    render() {
        return (
            <BrowserRouter>
                <Navbar></Navbar>
                <App></App>
            </BrowserRouter>
        );
    }
}

export default Welcome;
