import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-grid-system';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import './navbar.css'
import logo from '../../../assets/bookcover/logo.png'
import { useState } from 'react';



const Navbar = () => {

    const [modalShow, setModalShow] = React.useState(false);
   
    function MyVerticallyCenteredModal(props) {

        const [email, setEmail] = useState();
        const [password, setPassword] = useState();
        const loginForm = () => {

        }
        return (
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Login
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input className='input' placeholder='Email' type='email' id='email' onChange={e => setEmail(e.target.value)}></input>
                    <input className='input' placeholder='Password' type='password' id='password' onChange={e => setPassword(e.target.value)}></input>
                    <Button className='btn-login' onClick={loginForm} type='button'>Login</Button>
                    <Button className='btn-cancel' onClick={props.onHide}>Cancel</Button>
                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
            </Modal>
        );
    }


    return (
        <Container fluid style={{ padding: 0 }} className="nav-container">
            <Row style={{ margin: 0 }}>
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
                        <Link className='nav-btn' variant="primary" onClick={() => setModalShow(true)}>SIGN IN</Link>
                    </div>
                </Col>

                <MyVerticallyCenteredModal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                />
            </Row>
        </Container>
    );
}

export default Navbar;