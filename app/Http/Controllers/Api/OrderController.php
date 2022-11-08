<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Book;
use App\Models\Order;

class OrderController extends Controller
{
    public function addToCart($id) {
        $book = DB::table('book')
        ->where('book.id', $id)
        ->get();
        return $book;
    }
}
