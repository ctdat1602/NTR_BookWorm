import React from 'react';
import { Container, Row, Col } from 'react-grid-system';
import './footer.css'

const Footer = () => {
    return (
        <Container fluid style={{ padding: 0, bottom: 0, position: 'fixed', left: 0,}} className='container-footer'>
            <Row style={{ margin: 0 }} debug>
                <Col>

                    <p>Hello</p>

                </Col>


            </Row>
        </Container>
    );
};

export default Footer;