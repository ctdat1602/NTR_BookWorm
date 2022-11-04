import React, { useState, useEffect } from 'react';
import { Col, Container, Row } from 'react-grid-system';
import { Pagination, Collapse } from 'antd';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

import { API } from '../api/Api'

import './shop.css'

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

const { Panel } = Collapse;


const Shop = () => {

    const [categories, setCategories] = useState([]);
    const [authors, setAuthors] = useState([]);
    const [category, setCategory] = useState({});

    const [books, setBooks] = useState([]);
    const [total, setTotal] = useState("");

    const [postPerPage, setPostPerPage] = useState(5);
    const [page, setPage] = useState(1);

    const lastPage = page + postPerPage;
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


    return (
        <Container fluid style={{ padding: 50 }}>
            <Row>
                <h1>Books</h1>
            </Row>
            <Row>
                <Col xl={2.2} style={{ padding: 0, marginRight: 10 }}>
                    <p>Filter</p>

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
                                <div className="shop-filter-name">
                                    <p>1 Start</p>
                                    <p>2 Start</p>
                                    <p>3 Start</p>
                                    <p>4 Start</p>
                                    <p>5 Start</p>
                                </div>
                            </Panel>
                        </Collapse>
                    </div>

                </Col>
                <Col style={{ padding: 0 }}>
                    <div className='magrin'>
                        <Row>
                            <Col debug><div><span>Showing {firstPage}-{lastPage} of {total} books</span></div></Col>
                            <Col debug>
                                <DropdownButton id="dropdown-basic-button" title="Dropdown button" className='btn-drop-down'>
                                    <Dropdown.Item onClick={() => sortSale()}>Sort by sale</Dropdown.Item>
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
                                onChange={(current) => setPage(current)}
                                total={total}
                                pageSizeOptions={[5, 15, 20, 25]}
                                pageSize={postPerPage}
                                onShowSizeChange={onShowSizeChange}
                                current={page}
                            />
                        </div>
                    </div>
                </Col>
            </Row>

        </Container>
    );
};

export default Shop;