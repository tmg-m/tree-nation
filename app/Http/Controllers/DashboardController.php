<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use App\Models\Visit;
use Carbon\CarbonImmutable;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function dashboardPage(): Response
    {
        $currentHour = CarbonImmutable::now()->startOfHour();
        $nextHour = $currentHour->addHour();

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
                    'lastSeenDate' => $lastConnectedAt?->format('M j, Y') ?? '—',
                    'lastSeenTime' => $lastConnectedAt?->format('H:i') ?? '—',
                ];
            })
            ->values()
            ->all();

        $hourlyVisits = Visit::query()
            ->selectRaw("strftime('%Y-%m-%d %H:00:00', visited_at) as hour_bucket")
            ->selectRaw('COUNT(*) as visits')
            ->groupBy('hour_bucket')
            ->orderByDesc('hour_bucket')
            ->get()
            ->map(function (Visit $visit): array {
                $hourBucket = CarbonImmutable::parse(
                    (string) $visit->getAttribute('hour_bucket'),
                );

                return [
                    'dateLabel' => $hourBucket->format('M j, Y'),
                    'hourLabel' => $hourBucket->format('H:i'),
                    'visits' => (int) $visit->getAttribute('visits'),
                ];
            })
            ->all();

        return Inertia::render('Dashboard', [
            'title' => 'Dashboard',
            'totalVisits' => Visit::query()->count(),
            'currentHourVisits' => Visit::query()
                ->where('visited_at', '>=', $currentHour)
                ->where('visited_at', '<', $nextHour)
                ->count(),
            'totalTreesPlanted' => (int) Customer::query()->sum('trees_planted'),
            'customers' => $customers,
            'hourlyVisits' => $hourlyVisits,
        ]);
    }
}
