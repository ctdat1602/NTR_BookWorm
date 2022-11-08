import React, { useState, useEffect } from 'react';
import { Col, Container, Row } from 'react-grid-system';
import { Pagination, Collapse } from 'antd';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

import { API } from '../api/Api'

import 'bootstrap/dist/css/bootstrap.min.css';

import './shop.css'

import Images from '../../../assets/bookcover/images';
import book11 from '../../../assets/bookcover/book11.jpg';

const { Panel } = Collapse;

const Shop = () => {

    const [categories, setCategories] = useState([]);
    const [authors, setAuthors] = useState([]);
    const [category, setCategory] = useState({});

    const [books, setBooks] = useState([]);
    const [total, setTotal] = useState("");

    const [postPerPage, setPostPerPage] = useState(20);
    const [page, setPage] = useState(1);

    const lastPage = page * postPerPage;
    const firstPage = lastPage - postPerPage;
    const currentPost = books.slice(firstPage, lastPage);

    const onShowSizeChange = (current, size) => {
        setPostPerPage(size)
    }

    useEffect(() => {
        const fetchCategories = async () => {
            const res = await axios.get(`${API}/categories`);
            setCategories(res.data);
        }
        fetchCategories();
    }, []);

    useEffect(() => {
        const fetchAuthors = async () => {
            const res = await axios.get(`${API}/authors`);
            setAuthors(res.data);
        }
        fetchAuthors();
    }, []);

    useEffect(() => {
        const fetchBooks = async () => {
            const res = await axios.get(`${API}/books`);
            setBooks(res.data);
            setTotal(res.data.length);
        }
        fetchBooks();
    }, []);

    const filterCate = async (id) => {
        const fetchByCategories = async () => {
            const res = await axios.get(`${API}/categories/${id}`);
            setBooks(res.data);
            setTotal(res.data.length);
        }
        fetchByCategories();
    }

    const fillerAuthor = async (id) => {
        const fetchByAuthors = async () => {
            const res = await axios.get(`${API}/authors/${id}`);
            setBooks(res.data);
            setTotal(res.data.length);
        }
        fetchByAuthors();
    }

    const sortLow = async () => {
        const fetchLow = async () => {
            const res = await axios.get(`${API}/sortLowToHigh`);
            setBooks(res.data);
            setTotal(res.data.length);
        }
        fetchLow();
    }

    const sortHigh = async () => {
        const fetchHigh = async () => {
            const res = await axios.get(`${API}/sortHighToLow`);
            setBooks(res.data);
            setTotal(res.data.length);
        }
        fetchHigh();
    }

    const sortSale = async () => {
        const fetchSale = async () => {
            const res = await axios.get(`${API}/books`);
            setBooks(res.data);
            setTotal(res.data.length);
        }
        fetchSale();
    }

    const sortPopular = async () => {
        const fetchPopular = async () => {
            const res = await axios.get(`${API}/sortPopular`);
            setBooks(res.data);
            setTotal(res.data.length);
        }
        fetchPopular();
    }


    return (
        <Container fluid style={{ padding: 50 }}>
            <Row>
                <h1>Books</h1>
            </Row>
            <Row>
                <Col xl={2.2} style={{ padding: 0, marginRight: 10 }}>
                    <Row>
                        <Col style={{paddingTop: 15}}>
                            <span className='filter-title'>Filter</span>
                        </Col>
                    </Row>

                    <div className='shop-collapse'>
                        <Collapse className='box-collapse'>
                            <Panel header="Categories" key="1">
                                {categories.map(category => (
                                    <Link key={category.id} to={`?${category.category_name}`} onClick={() => filterCate(category.id)}>
                                        <div className="shop-filter-name">
                                            <p>{category.category_name}</p>
                                        </div>
                                    </Link>
                                ))}
                            </Panel>
                        </Collapse>

                        <Collapse className='box-collapse'>
                            <Panel header="Athours" key="2">
                                {authors.map(author => (
                                    <Link key={author.id} to={`?${author.author_name}`} onClick={() => fillerAuthor(author.id)}>
                                        <div className="shop-filter-name">
                                            <p>{author.author_name}</p>
                                        </div>
                                    </Link>
                                ))}
                            </Panel>
                        </Collapse>

                        <Collapse className='box-collapse'>
                            <Panel header="Rating Review" key="3">
                                <div>
                                    <p className="shop-filter-name">1 Start</p>
                                    <p className="shop-filter-name">2 Start</p>
                                    <p className="shop-filter-name">3 Start</p>
                                    <p className="shop-filter-name">4 Start</p>
                                    <p className="shop-filter-name">5 Start</p>
                                </div>
                            </Panel>
                        </Collapse>
                    </div>

                </Col>
                <Col style={{ padding: 0 }}>
                    <div className='magrin'>
                        <Row>
                            <Col className='box-total-title'>
                                <span className='total-title'>Showing {firstPage + 1}-{lastPage} of {total} books</span>
                                </Col>
                            <Col>
                                <DropdownButton id="dropdown-basic-button" title="Sort by sale" className='btn-drop-down'>
                                    <Dropdown.Item onClick={() => sortSale()}>Sort by sale</Dropdown.Item>
                                    <Dropdown.Item to={`?sort-by-popular`} onClick={() => sortPopular()}>Sort by popular</Dropdown.Item>
                                    <Dropdown.Item to={`?sort-by-low`} onClick={() => sortLow()}>Sort by price : Low to High</Dropdown.Item>
                                    <Dropdown.Item to={`?sort-by-high`} onClick={() => sortHigh()}>Sort by price : Hight to low</Dropdown.Item>
                                </DropdownButton>
                            </Col>
                        </Row>
                        <div className='shop-box-products'>
                            {currentPost.map(book => (
                                <Link to={`/detail/${book.id}`} key={book.id}>
                                    <div className='item-book'>
                                        <div>
                                            {book.book_cover_photo === null && <img src={book11} alt="" />}
                                            {book.book_cover_photo !== null && <img src={Images[book.book_cover_photo]}></img>}
                                        </div>
                                        <div style={{ padding: 20 }}>
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
                        </div>
                        <div className='paginate'>
                            <Pagination
                                onChange={(page) => setPage(page)}
                                pageSizeOptions={[5, 15, 20, 25]}
                                total={total}
                                current={page}
                                pageSize={postPerPage}
                                onShowSizeChange={onShowSizeChange}
                            />
                        </div>
                    </div>
                </Col>
            </Row>

        </Container>
    );
};

export default Shop;