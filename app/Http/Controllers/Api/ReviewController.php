<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Review;

class ReviewController extends Controller
{
    public function getReviewByNewsest($id)
    {
        $reviews = new Review();
        $reviews_new = $reviews->getReviewByNewsest($id);
        return $reviews_new;
    }

    public function getReviewByOldset($id)
    {
        $reviews = new Review();
        $reviews_old = $reviews->getReviewByOldset($id);
        return $reviews_old;
    }


}
