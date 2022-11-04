<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Category;

class CategoryController extends Controller
{

    public function index()
    {
        $categories = new Category();
        $category_list = $categories->getCategories();
        return $category_list;
    }

    public function show($id)
    {
        $categories = new Category();
        $category_list = $categories->getCategoriesById($id);
        return $category_list;
    }

 
}
