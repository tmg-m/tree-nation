<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function homePage(): Response
    {
        return Inertia::render('Home');
    }
}
