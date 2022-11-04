<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Author;


class AuthorController extends Controller
{
    
    public function index()
    {
        $authors = new Author();
        $author_list = $authors->getAuthors();
        return $author_list;
    }

    public function show($id)
    {
        
        $authors = new Author();
        $author_list = $authors->getAuthorsById($id);
        return $author_list;
    }

}
