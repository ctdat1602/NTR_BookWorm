<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Review extends Model
{
    use HasFactory;

    public $timestamps = false;
    protected $table = 'review';
    
    public function Book()
    {
        return $this->belongsTo(Book::class);
    }

    public function getReviewByNewsest($id) {
        $book = Book::find($id);
        $reviews = Review::where('book_id', $id) 
        ->select('review.id', 'review_title', 'review_details', 'review_date', 'rating_start')
        ->orderBy('review_date', 'desc')
        ->get();
        return $reviews;
    }

    public function getReviewByOldset($id) {
        $book = Book::find($id);
        $reviews = Review::where('book_id', $id) 
        ->select('review.id', 'review_title', 'review_details', 'review_date', 'rating_start')
        ->orderBy('review_date', 'asc')
        ->get();
        return $reviews;
    }
}
