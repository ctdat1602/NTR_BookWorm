<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Category extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $table = 'category';

    public function getCategories() {
        $categories = DB::table('category')
        ->select('category.id', 'category_name')
        ->get(); 
        return $categories;
    }

    public function getCategoriesById($id) {
            $categories = Category::find($id);
            $books = Book::where('category_id', $id)
            ->leftJoin('discount', 'book.id', '=', 'discount.book_id')
            ->join('author', 'author.id', '=', 'book.author_id')
            ->select('book.id', 'book_title', 'book_price', 'book_cover_photo', 'discount_price', 'author_name')
            ->get();
            return $books;
    }

}
