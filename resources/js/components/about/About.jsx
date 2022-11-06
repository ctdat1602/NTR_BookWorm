import React from 'react';
import { Container, Row, Col } from 'react-grid-system';
import './about.css'

const About = () => {
    return (
        <Container>
            <Row style={{ marginTop: 30, paddingLeft: 20 }}>
                <Col>
                    <h1>About Us</h1>
                </Col>
            </Row>

            <Row className='row'>
                <Col className='col-welcome'>
                    <span className='text-welcome'>Welcome to BookWorm</span>
                </Col>
            </Row>

            <Row className='row'>
                <Col className='col-welcome-des'>
                    <span>Bookworm is an independent New York bookstore and language School with locations in Manhattan and Brooklyn. We specialize in travel books and language classes."</span>
                </Col>
            </Row>

            <Row className='row'>

                <Col className='col-our'> 

                    <span>Our Story</span>

                    <div className='detail'>
                        <span>The name Bookworm was taken from the original name for New York International Airport. which was renamed JFK in December 1963</span> <br />
                        <span>Our Manhanttan store has just moved to the West Village. Our new location is 170 7th Avenue South, at the corner of Perry Street.</span> <br />
                        <span>From March 2008 through May 2016, the store was located in the Flatiron District.</span>
                    </div>

                </Col>

                <Col className='col-our'>
                    <span>Our Vision</span>
                    <div className='detail'>
                        <span>One of the last travel bookstores in the country, our Manhanttan store carries a ranger of guidebooks (all 10% off) to suit the needs and tates of every trveler and budget</span> <br />
                        <span>We believe that a novel or travelogue can be just as valuable a key to a place as any guidebook, and our well-read, well-traveled staff is happy to make reading recommendations for any traveler, book lover, or gift giver.</span>
                    </div>
                </Col>

            </Row>
        </Container>
    );
};

export default About;