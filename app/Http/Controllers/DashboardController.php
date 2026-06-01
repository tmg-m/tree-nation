<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use App\Models\Visit;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function dashboardPage(): Response
    {
        $customers = Customer::query()
            ->orderByDesc('visit_count')
            ->get()
            ->map(function (Customer $customer) {
                $lastConnectedAt = $customer->last_connected_at;

                return [
                    'customerId' => $customer->external_id,
                    'displayName' => $customer->name ?? $customer->external_id,
                    'visitCount' => $customer->visit_count,
                    'treesPlanted' => $customer->trees_planted,
                    'lastSeen' => $lastConnectedAt === null
                        ? '—'
                        : $lastConnectedAt->format('M j, Y, g:i A'),
                ];
            })
            ->values()
            ->all();

        return Inertia::render('Dashboard', [
            'title' => 'Dashboard',
            'totalVisits' => Visit::query()->count(),
            'totalTreesPlanted' => (int) Customer::query()->sum('trees_planted'),
            'customers' => $customers,
        ]);
    }
}
