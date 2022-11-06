import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Container, Row, Col } from 'react-grid-system'
import { useParams, Link } from 'react-router-dom';
import { API } from '../api/Api';
import './detail.css'

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

  useEffect(() => {
    const fetchBook = async () => {
      const res = await axios.get(`${API}/books/${id}`);
      setBookDetail(res.data);
    }
    fetchBook();
  }, []);

  useEffect(() => {
    const fetchReviews = async () => {
      const res = await axios.get(`${API}/reviews/${id}`)
      setReviews(res.data);
    }
    fetchReviews();
  }, [])

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(count => count - 1);
    }
  }

  const handleIncrement = () => {
    setQuantity(count => count + 1);
  }

  return (
    <Container style={{padding : 100, paddingTop : 0}} fluid>
      <Row className='title'  style={{padding : 0}}>
        <Col><h1>{bookDetail.category_name}</h1></Col>
      </Row>
      <Row>
        <Col xl={9}>
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

          <div className='item-review'>

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
        <div>
          {reviews.map(review => (
            <div  key={review.id}>
              <p>{review.review_title}</p>
            </div>
          ))}
        </div>
      </Row>
    </Container>
  )
}

export default Detail