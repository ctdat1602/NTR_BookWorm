import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Container, Row, Col } from 'react-grid-system';

import './navbar.css'
import logo from '../../../assets/bookcover/logo.png'

class Navbar extends Component {
    render() {
        return (
            <Container fluid style={{padding : 0}} className="nav-container">
                <Row style={{margin: 0}}>
                    <Col>
                        <div className='navbar-left'>
                            <img className='nav-img' src={logo} alt="" />
                            <div className='nav-title'>
                                <span className='book-text'>Book</span>
                                <span className='worm-text'>Worm</span>
                                <br />
                                <span className='online-text'>Book store online</span>
                            </div>
                        </div>

                        <div className='navbar-right'>
                            <NavLink className='nav-btn' to={'/home'}>HOME</NavLink>
                            <NavLink className='nav-btn' to={'/shop'}>SHOP</NavLink>
                            <NavLink className='nav-btn' to={'/cart'}>CART</NavLink>
                            <NavLink className='nav-btn' to={'/about'}>ABOUT</NavLink>
                            <NavLink className='nav-btn' to={'/home'}>SIGN IN</NavLink>
                        </div>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Navbar;