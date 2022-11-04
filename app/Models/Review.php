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

    public function getReviewById($id) {
        $book = Book::find($id);
        $reviews = Review::where('book_id', $id) 
        ->select('review.id', 'review_title', 'review_details', 'review_date', 'rating_start')
        ->get();
        return $reviews;
    }
}
