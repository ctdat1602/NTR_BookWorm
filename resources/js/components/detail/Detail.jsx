import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Container, Row, Col } from 'react-grid-system'
import { useParams, Link } from 'react-router-dom';
import { API } from '../api/Api';
import './detail.css'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { Pagination } from 'antd';

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

const Detail = () => {

  const [bookDetail, setBookDetail] = useState({});
  const [reviews, setReviews] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams();

  const [total, setTotal] = useState("");

  const [postPerPage, setPostPerPage] = useState(5);
  const [page, setPage] = useState(1);

  const lastPage = page * postPerPage;
  const firstPage = lastPage - postPerPage;
  const currentPost = reviews.slice(firstPage, lastPage);

  const onShowSizeChange = (current, size) => {
    setPostPerPage(size)
  }

  useEffect(() => {
    const fetchBook = async () => {
      const res = await axios.get(`${API}/books/${id}`);
      setBookDetail(res.data);
      console.log(res.data);
    }
    fetchBook();
  }, []);

  useEffect(() => {
    const fetchReviews = async () => {
      const res = await axios.get(`${API}/getByNew/${id}`)
      setReviews(res.data);
      setTotal(res.data.length);
    }
    fetchReviews();
  }, [])

  const filterNews = async () => {
    const fetchNews = async () => {
      const res = await axios.get(`${API}/getByNew/${id}`);
      setReviews(res.data);
      setTotal(res.data.length);
    }
    fetchNews();
  }

  const filterOlds = async () => {
    const fetchOlds = async () => {
      const res = await axios.get(`${API}/getByOld/${id}`);
      setReviews(res.data);
      setTotal(res.data.length);
    }
    fetchOlds();
  }

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(count => count - 1);
    }
  }

  const handleIncrement = () => {
    setQuantity(count => count + 1);
  }

  return (
    <Container style={{ padding: 50, paddingTop: 0 }} fluid>
      <Row className='title' style={{ padding: 0 }}>
        <Col style={{ padding: 0 }}><h1>{bookDetail.category_name}</h1></Col>
      </Row>
      <Row>
        <Col xl={9} style={{ padding: 0 }}>
          <div className='item-card'>
            <div>
              {bookDetail.book_cover_photo === 'book1' && <img src={book1} alt="" />}
              {bookDetail.book_cover_photo === 'book2' && <img src={book2} alt="" />}
              {bookDetail.book_cover_photo === 'book3' && <img src={book3} alt="" />}
              {bookDetail.book_cover_photo === 'book4' && <img src={book4} alt="" />}
              {bookDetail.book_cover_photo === 'book5' && <img src={book5} alt="" />}
              {bookDetail.book_cover_photo === 'book6' && <img src={book6} alt="" />}
              {bookDetail.book_cover_photo === 'book7' && <img src={book7} alt="" />}
              {bookDetail.book_cover_photo === 'book8' && <img src={book8} alt="" />}
              {bookDetail.book_cover_photo === 'book9' && <img src={book9} alt="" />}
              {bookDetail.book_cover_photo === 'book10' && <img src={book10} alt="" />}
              {bookDetail.book_cover_photo === null && <img src={book11} alt="" />}
              <div className='book-author'><span>Author: {bookDetail.author_name}</span></div>
            </div>
            <div className='infor-card'>
              <div className='book-name'><span>{bookDetail.book_title}</span></div>
              <div className='book-summary'>
                <div><span>Books Description:</span></div>
                <span>{bookDetail.book_summary}</span></div>
            </div>
          </div>
        </Col>
        <Col className='item-card-controller'>
          <div className='box-price'>
            {bookDetail.discount_price == null && <span className='book-price'>$ {bookDetail.book_price}</span>}
            {bookDetail.discount_price != null && <span className="sale">$ {bookDetail.book_price}</span>}
            {bookDetail.discount_price != null && <span className='discount-price'>$ {bookDetail.discount_price}</span>}
          </div>

          <div className='box-quantity'>
            <button onClick={handleDecrement} className='btn-decrement'>-</button>
            <div className='quantity-number'>{quantity}</div>
            <button onClick={handleIncrement} className='btn-increment'>+</button>
          </div>

          <div>
            <Link>
              <p className='add-to-cart'>ADD TO CART</p>
            </Link>
          </div>
        </Col>
      </Row>

      <Row>
        <Col xl={9} style={{ padding: 0 }}>
          <div className='item-review'>
            <div>
              <span className='review-title'>Customer Reviews</span>
            </div>
            <div>
              <span className='start-title'>{Math.round(bookDetail.average * 10) / 10} Start</span>
            </div>
            <div>
              <Link className='start-total'>{bookDetail.most}</Link>
              <Link className='start-total'>5 Start ()</Link>
              <Link className='start-total'>4 Start ()</Link>
              <Link className='start-total'>3 Start ()</Link>
              <Link className='start-total'>2 Start ()</Link>
              <Link className='start-total'>1 Start ()</Link></div>
            <div>
              <Row>
                <Col style={{ marginTop: 10, }}><span className='showing'>Showing {firstPage + 1}-{lastPage} of {total} reviews</span>
                </Col>
                <Col>
                  <DropdownButton id="dropdown-basic-button" title='Sort By Date' className='btn-drop-down'>
                    <Dropdown.Item to={``} onClick={() => filterNews()}>Sort by date: newsest to oldest</Dropdown.Item>
                    <Dropdown.Item to={``} onClick={() => filterOlds()}>Sort by date: oldest to newest</Dropdown.Item>
                  </DropdownButton>
                </Col>
              </Row>
              <div>

                <hr />
                {currentPost.map(review => (
                  <div key={review.id} className='box-reviews'>
                    <div>
                      <span className='review_title'>{review.review_title}</span>
                      <span>| {review.rating_start} Start</span>
                    </div>
                    <div style={{ marginBottom: 20, marginTop: 20 }}><span>{review.review_details}</span></div>
                    <div><span className='review_date'>{review.review_date}</span></div>
                    <hr />
                  </div>
                ))}
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
          </div>
        </Col>


        <Col style={{ padding: 0 }}>
          <div className='item-form'>
            <div>
              <span className='review-title'>Write a Reviews</span>
            </div>
            <div style={{marginTop: 20}}>
              <span className='title-write-review'>Add a tittle</span>
              <input className='input'></input>
            </div>

            <div style={{marginTop: 20}}>
              <span className='title-write-review'>Details please! Your review helps other shoppers.</span>
              <textarea className='text-area'></textarea>
            </div>

            <div style={{marginTop: 20}}>
              <span className='title-write-review'>Select a rating start</span>
              <input className='input' type='number' min={1} max={5}></input>
            </div>

            <div style={{marginTop: 20}}>
              <Link>
                <p className='up-review'>SUBMIT REVIEW</p>
              </Link>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default Detail