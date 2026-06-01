<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function dashboardPage(): Response
    {
        return Inertia::render('Dashboard', [
            'title' => 'Dashboard',
        ]);
    }
}
