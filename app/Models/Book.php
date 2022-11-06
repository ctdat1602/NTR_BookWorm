<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Book extends Model
{
    use HasFactory;

    public $timestamps = false;
    protected $table = 'book';

    public function author()
    {
        return $this->belongsTo(Author::class, 'author_id', 'id');
    }

    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id', 'id');
    }

    public function discounts()
    {
        return $this->hasMany(Discount::class, 'book_id', 'id');
    }

    public function reviews()
    {
        return $this->hasMany(Review::class, 'book_id', 'id');
    }


    public function getBooks() {
        $book = DB::table('book')
        ->leftJoin('discount', 'book.id', '=', 'discount.book_id')
        ->join('author', 'author.id', '=', 'book.author_id')
        ->select('book.id', 'book_title', 'book_price', 'book_cover_photo', 'discount_price', 'author_name')
        ->orderByRaw('case when (discount_end_date is not null and((now()) <= discount_end_date and date(now()) >= discount_start_date)) then book_price - discount_price 
        when(discount_end_date is null and date(now()) >= discount_start_date) then book_price - discount_price
        else book_price
        end asc')
        ->get();
        return $book;
    }

    public function getBookTopSale() {
        $books = DB::table('book')
        ->select('book.id','book_title', 'book_price', 'book_cover_photo', 'discount_price', 'author_name')
        ->join('author', 'author.id', '=', 'book.author_id')
        ->join('discount', 'book.id', '=', 'discount.book_id')
        ->selectRaw('book.book_price - discount.discount_price as sale_price')
        ->orderBy('sale_price', 'desc')
        ->take(10)
        ->get();
        return $books;
    }

    public function getByPopular() {
        $books = DB::table('book')
        ->select(DB::raw('count(rating_start) as most'),'book.id', 'book_title', 'book_price', 'book_cover_photo', 'discount_price', 'author_name')
        ->leftJoin('author', 'author.id', '=', 'book.author_id')
        ->join('review', 'book.id', '=', 'review.book_id')
        ->join('discount', 'book.id', '=', 'discount.book_id')
        ->orderBy('most', 'desc')
        ->groupBy('book.id', 'discount.id', 'author.id')
        ->take(8)
        ->get();
        return $books;
    }

    public function getByRecommended() {
        $books = DB::table('book')
        ->select(DB::raw('avg(rating_start) as average'),'book.id', 'book_title', 'book_price', 'book_cover_photo', 'discount_price', 'author_name')
        ->leftJoin('author', 'author.id', '=', 'book.author_id')
        ->join('review', 'book.id', '=', 'review.book_id')
        ->join('discount', 'book.id', '=', 'discount.book_id')
        ->orderBy('average', 'desc')
        ->groupBy('book.id', 'discount.id', 'author.id')
        ->take(8)
        ->get();
        return $books;
    }

    public function getBookById($id) {
        $book = DB::table('book')
        ->where('book.id', $id)
        ->select(DB::raw('avg(rating_start) as average'), DB::raw('count(rating_start) as most'), 'book.id', 'book_title', 'book_price','book_cover_photo','book_summary', 'discount_price', 'author_name', 'category_name')
        ->leftJoin('discount', 'book.id', '=', 'discount.book_id')
        ->leftJoin('review', 'book.id', '=', 'review.book_id')
        ->join('author', 'author.id', '=', 'book.author_id')
        ->join('category', 'category.id', '=', 'book.category_id')
        ->groupBy('book.id', 'discount.id', 'author.id', 'category.id')
        ->first();
        return $book;
    }

    // Sort

    public function sortLowToHigh() {
        $books = DB::table('book')
        ->select('book.id','book_title', 'book_price', 'book_cover_photo', 'discount_price', 'author_name')
        ->leftJoin('author', 'author.id', '=', 'book.author_id')
        ->leftJoin('discount', 'book.id', '=', 'discount.book_id')
        ->orderByRaw('case when (discount_end_date is not null and(date(now()) >= discount_start_date and date(now()) <= discount_end_date)) then discount_price
        when (discount_end_date is null and date(now()) >= discount_start_date) then discount_price
        else book_price
        end asc')
        ->get();
        return $books;
    } 

    public function sortHighToLow() {
        $books = DB::table('book')
        ->select('book.id','book_title', 'book_price', 'book_cover_photo', 'discount_price', 'author_name')
        ->leftJoin('author', 'author.id', '=', 'book.author_id')
        ->leftJoin('discount', 'book.id', '=', 'discount.book_id')
        ->orderByRaw('case when (discount_end_date is not null and((now()) <= discount_end_date and date(now()) >= discount_start_date)) then  discount_price
        when(discount_end_date is null and date(now()) >= discount_start_date) then discount_price
        else book_price
        end desc')
        ->get();
        return $books;
    } 

    public function sortPopular() {
        $books = DB::table('book')
        ->select(DB::raw('count(rating_start) as most'),'book.id', 'book_title', 'book_price', 'book_cover_photo', 'discount_price', 'author_name')
        ->leftJoin('author', 'author.id', '=', 'book.author_id')
        ->join('review', 'book.id', '=', 'review.book_id')
        ->join('discount', 'book.id', '=', 'discount.book_id')
        ->orderBy('most', 'desc')
        ->groupBy('book.id', 'discount.id', 'author.id')
        ->get();
        return $books;
    }

}
