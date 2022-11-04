import React, { Component } from 'react';
import { Routes, Route } from 'react-router-dom';
import Shop from './components/Shop/Shop';
import Detail from './components/Detail/Detail';
import Home from './components/Home/Home';
import Cart from './components/Cart/Cart';
import About from './components/About/About';

import './App.css';

function App () {

        return (
            <Routes>
                <Route path="/home" element={<Home />}></Route>
                <Route path="/shop" element={<Shop />}></Route>
                <Route path="/detail/:id" element={<Detail />}></Route>
                <Route path="/cart" element={<Cart />}></Route>
                <Route path='/about' element={<About />}></Route>
            </Routes>
        );
    
}

export default App;