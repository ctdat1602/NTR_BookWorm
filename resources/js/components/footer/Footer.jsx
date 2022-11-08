import React from 'react';
import { Container, Row, Col } from 'react-grid-system';
import './footer.css'
import logo from '../../../assets/bookcover/logo.png'

const Footer = () => {
    return (
        <Container fluid style={{ padding: 0, bottom: 0, position: 'relative', left: 0,}} className='container-footer'>
            <Row style={{ margin: 0}}>
                <Col style={{ paddingTop: 45, paddingLeft: 50, display: 'flex'}}>
                <img src={logo} style={{width: 70, height: 70, marginRight: 30}}></img>
                <div>
                    <p style={{margin: 0, fontSize: 20, fontWeight: 'bold'}}>BOOKWORM</p>
                    <p style={{margin: 0}}>Ho Chi Minh City</p>
                    <p style={{margin: 0}}>088.888.888</p>
                </div>
                </Col>
            </Row>
        </Container>
    );
};

export default Footer;