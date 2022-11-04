<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;


class Author extends Model
{
    use HasFactory;

    public $timestamps = false;
    protected $table = 'author';

    public function getAuthors() {
        $authors = DB::table('author')
        ->select('author.id', 'author_name')
        ->get();
        return $authors;
    }

    public function getAuthorsById($id) {
        if(Author::find($id)) {
            $authors = Author::find($id);
            $books = Book::where('author_id', $id)
            ->leftJoin('discount', 'book.id', '=', 'discount.book_id')
            ->join('author', 'author.id', '=', 'book.author_id')
            ->select('book.id', 'book_title', 'book_price', 'book_cover_photo', 'discount_price', 'author_name')
            ->get();
            return $books;
        }
    }
}
