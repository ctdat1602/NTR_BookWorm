<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Review;

class ReviewController extends Controller
{
    public function getReview($id)
    {
        $reviews = new Review();
        $reviews_list = $reviews->getReviewById($id);
        return $reviews_list;
    }

}
