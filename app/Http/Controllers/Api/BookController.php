<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Book;
use App\Models\Category;

class BookController extends Controller
{
    public function index()
    {
        $books = new Book();
        
        $book_list = $books->getBooks();
        
        return $book_list;
    }

    public function show($id)
    {
        $book = new Book();
        
        $book_detail = $book->getBookById($id);
        
        return $book_detail;
    }

    public function sale()
    {
        $books = new Book();
        
        $books_sale = $books->getBookTopSale();
        
        return $books_sale;
    }

    public function sortPopular()
    {
        $books = new Book();
        
        $sortPopular = $books->sortPopular();
        
        return $sortPopular;
    }

    public function sortLowToHigh()
    {
        $books = new Book();
        
        $sortLowToHigh = $books->sortLowToHigh();
        
        return $sortLowToHigh;
    }

    public function sortHighToLow()
    {
        $books = new Book();
        
        $sortHighToLow = $books->sortHighToLow();
        
        return $sortHighToLow;
    }

    public function getByPopular()
    {
        $books = new Book();
        
        $getByPopular = $books->getByPopular();
        
        return $getByPopular;
    }

    public function getByRecommended()
    {
        $books = new Book();
        
        $getByRecommended = $books->getByRecommended();
        
        return $getByRecommended;
    }

}
