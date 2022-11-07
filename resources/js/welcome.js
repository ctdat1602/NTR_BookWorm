import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';

import Navbar from './components/navbar/Navbar';
import App from './App';
import Footer from './components/footer/Footer';
import '../css/app.css';

class Welcome extends Component {
    render() {
        return (
            <BrowserRouter>
                <Navbar></Navbar>
                <App></App>
                <Footer></Footer>
            </BrowserRouter>
        );
    }
}

export default Welcome;
