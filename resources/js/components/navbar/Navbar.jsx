import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-grid-system';
import { Form, Button, Modal } from 'react-bootstrap'
import swal from 'sweetalert';

import axios from 'axios';

import './navbar.css'
import logo from '../../../assets/bookcover/logo.png'
import { API } from '../api/Api';



const Navbar = () => {

    const [modalShow, setModalShow] = React.useState(false);

    function MyVerticallyCenteredModal(props) {

        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");


        const loginForm = (ev) => {

            ev.preventDefault();

            if (email.length > 0 && password.length > 0) {
                axios.get("/sanctum/csrf-cookie").then(() => {
                    axios
                        .post(`${API}/login`, {
                            email: email,
                            password: password,
                        })
                        .then((response) => {
                            localStorage.setItem('user', response.data);
                            localStorage.setItem('token', response.data.token);
                            swal("Good job!", "Login Succesfully", "success");
                            setModalShow(false);
                        })
                        .catch(function (error) {
                            console.error(error);
                        });
                });
            }
        };

        return (
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Form onSubmit={loginForm}>
                    <Modal.Header>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Login
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <input className='input' placeholder='Email' type='email' value={email} onChange={(ev) => {
                            setEmail(ev.target.value);
                        }}></input>
                        <input className='input' placeholder='Password' value={password} onChange={(ev) => {
                            setPassword(ev.target.value);
                        }}></input>
                        <Button className='btn-login' variant="primary" type='submit'>Login</Button>
                        <Button className='btn-cancel' onClick={props.onHide}>Cancel</Button>
                    </Modal.Body>
                    <Modal.Footer>
                    </Modal.Footer>
                </Form>
            </Modal>

        );

    }

    const logout = () => {
        axios.post(`${API}/logout`)
            .then(() => {
                localStorage.removeItem('user');
                localStorage.removeItem('token');
                window.location.reload();
            })
            .catch(function (error) {
                console.error(error);
            });
    }

    var checkToken = '';
    if (!localStorage.getItem('token')) {
        checkToken = (
            <Link className='nav-btn' variant="primary" onClick={() => setModalShow(true)}>SIGN IN</Link>
        )
    } else {
        checkToken = (
            <Link className='nav-btn' onClick={logout}>LOG OUT</Link>
        )
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
                        {checkToken}

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