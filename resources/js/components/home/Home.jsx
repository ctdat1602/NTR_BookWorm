import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-grid-system';
import { NavLink, Link } from 'react-router-dom';

import Slider from "react-slick";
import axios from 'axios';

import { API } from '../api/Api'

import './home.css';

import book1 from '../../../../resources/assets/bookcover/book1.jpg';
import book2 from '../../../../resources/assets/bookcover/book2.jpg';
import book3 from '../../../../resources/assets/bookcover/book3.jpg';
import book4 from '../../../../resources/assets/bookcover/book4.jpg';
import book5 from '../../../../resources/assets/bookcover/book5.jpg';
import book6 from '../../../../resources/assets/bookcover/book6.jpg';
import book7 from '../../../../resources/assets/bookcover/book7.jpg';
import book8 from '../../../../resources/assets/bookcover/book8.jpg';
import book9 from '../../../../resources/assets/bookcover/book9.jpg';
import book10 from '../../../../resources/assets/bookcover/book10.jpg';
import book11 from '../../../../resources/assets/bookcover/book11.jpg';

function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{
                ...style,
                backgroundColor: "#1890ff"
            }}
            onClick={onClick}
        />
    );
}

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{
                ...style,

                backgroundColor: "#1890ff"
            }}
            onClick={onClick}
        />
    );
}

const Home = () => {
    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        nextArrow: <SampleNextArrow></SampleNextArrow>,
        prevArrow: <SamplePrevArrow></SamplePrevArrow>,
        responsive: [
            {
                breakpoint: 1600,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                }
            },
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    const [books, setBooks] = useState([]);
    const [featured, setFeatured] = useState([]);

    const filterPopular = async () => {
        const fetchPopular = async () => {
            const res = await axios.get(`${API}/getByPopular`);
            setFeatured(res.data);
        }
        fetchPopular();
    }

    const filterRecommended = async () => {
        const fetchRecommended = async () => {
            const res = await axios.get(`${API}/getByRecommended`);
            setFeatured(res.data);
        }
        fetchRecommended();
    }

    useEffect(() => {
        const fetchBooks = async () => {
            const res = await axios.get(`${API}/sales`);
            setBooks(res.data);
        }
        fetchBooks();
    }, []);

    useEffect(() => {
        const fetchRecommended = async () => {
            const res = await axios.get(`${API}/getByRecommended`);
            setFeatured(res.data);
        }
        fetchRecommended();
    }, []);

    return (
        <div>
            <Container style={{ padding: 50 }}>
                <Row style={{ margin: 0 }}>
                    <Col style={{ padding: 0 }}>
                        <h1 className='home-title-sale'>Top Sale</h1>
                    </Col>
                    <Col style={{ padding: 0 }}>
                        <Link to={'/shop'} className='btn-view-all'>View All</Link>
                    </Col>
                </Row>
                <Row style={{ margin: 0 }}>
                    <Col className='home-box-sale'>
                        <Slider {...settings}>
                            {books.map(book => (
                                <Link to={`/detail/${book.id}`} key={book.id} className='link'>
                                    <div className='item-book'>
                                        <div>
                                            {book.book_cover_photo === 'book1' && <img src={book1} alt="" />}
                                            {book.book_cover_photo === 'book2' && <img src={book2} alt="" />}
                                            {book.book_cover_photo === 'book3' && <img src={book3} alt="" />}
                                            {book.book_cover_photo === 'book4' && <img src={book4} alt="" />}
                                            {book.book_cover_photo === 'book5' && <img src={book5} alt="" />}
                                            {book.book_cover_photo === 'book6' && <img src={book6} alt="" />}
                                            {book.book_cover_photo === 'book7' && <img src={book7} alt="" />}
                                            {book.book_cover_photo === 'book8' && <img src={book8} alt="" />}
                                            {book.book_cover_photo === 'book9' && <img src={book9} alt="" />}
                                            {book.book_cover_photo === 'book10' && <img src={book10} alt="" />}
                                            {book.book_cover_photo === null && <img src={book11} alt="" />}
                                        </div>
                                        <div className='box-infor'>
                                            <div className='title-book'><span>{book.book_title}</span></div>
                                            <div className='name-author'><span>{book.author_name}</span></div>
                                            <div className='box-price-book'>
                                                {book.discount_price == null && <span className='book-price'>$ {book.book_price}</span>}
                                                {book.discount_price != null && <span className="line-price">$ {book.book_price}</span>}
                                                {book.discount_price != null && <span className='book-price'>$ {book.discount_price}</span>}
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </Slider>
                    </Col>
                </Row>

                <Row style={{ marginTop: 50 }}>
                    <Col><h1 className='title-featured'>Featured Books</h1></Col>
                </Row>

                <Row style={{ margin: 0 }}>
                    <Col style={{ padding: 0, marginRight: 10 }}><Link className='btn-featured-left' to={'?recommended'} onClick={() => filterRecommended()}>Recommended</Link></Col>
                    <Col style={{ padding: 0, marginLeft: 10 }}><Link className='btn-featured-right' to={'?popular'} onClick={() => filterPopular()}>Popular</Link></Col>
                </Row>

                <Row>
                    <Col className='home-box-featured' style={{ padding: 35 }}>
                        {featured.map(book => (
                            <Link to={`/detail/${book.id}`} key={book.id} className='link'>
                                <div className='item-book'>
                                    <div>
                                        {book.book_cover_photo === 'book1' && <img src={book1} alt="" />}
                                        {book.book_cover_photo === 'book2' && <img src={book2} alt="" />}
                                        {book.book_cover_photo === 'book3' && <img src={book3} alt="" />}
                                        {book.book_cover_photo === 'book4' && <img src={book4} alt="" />}
                                        {book.book_cover_photo === 'book5' && <img src={book5} alt="" />}
                                        {book.book_cover_photo === 'book6' && <img src={book6} alt="" />}
                                        {book.book_cover_photo === 'book7' && <img src={book7} alt="" />}
                                        {book.book_cover_photo === 'book8' && <img src={book8} alt="" />}
                                        {book.book_cover_photo === 'book9' && <img src={book9} alt="" />}
                                        {book.book_cover_photo === 'book10' && <img src={book10} alt="" />}
                                        {book.book_cover_photo === null && <img src={book11} alt="" />}
                                    </div>
                                    <div className='title-book'><span>{book.book_title}</span></div>
                                    <div className='name-author'><span>{book.author_name}</span></div>
                                    <div>
                                        {book.discount_price == null && <span className='book-price'>$ {book.book_price}</span>}
                                        {book.discount_price != null && <span className="line-price">$ {book.book_price}</span>}
                                        {book.discount_price != null && <span className='book-price'>$ {book.discount_price}</span>}
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </Col>
                   
                </Row>
            </Container>
        </div>
    );

}

export default Home;