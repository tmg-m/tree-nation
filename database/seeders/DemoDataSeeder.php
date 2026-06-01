<?php

namespace Database\Seeders;

use App\Models\Customer;
use App\Models\Visit;
use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;

class DemoDataSeeder extends Seeder
{
    /**
     * Demo customers and visit times (relative to now) for charts and tree logic.
     *
     * @var array<string, list<string>>
     */
    private const DEMO_CUSTOMERS = [
        'demo-customer' => [
            '-15 minutes',
            '-45 minutes',
            '-1 hour',
            '-2 hours',
            '-2 hours -20 minutes',
            '-4 hours',
            '-5 hours',
            '-5 hours -30 minutes',
            '-8 hours',
            '-23 hours',
        ],
        'alice-visitor' => [
            '-30 minutes',
            '-3 hours',
            '-3 hours -15 minutes',
            '-6 hours',
            '-12 hours',
        ],
        'bob-regular' => [
            '-10 minutes',
            '-1 hour -10 minutes',
            '-2 hours -40 minutes',
            '-7 hours',
            '-7 hours -25 minutes',
            '-18 hours',
            '-20 hours',
        ],
    ];

    public function run(): void
    {
        $visitsPerTree = config('tree_demo.visits_per_tree');

        foreach (self::DEMO_CUSTOMERS as $externalId => $offsets) {
            $customer = Customer::query()->create([
                'external_id' => $externalId,
                'visit_count' => 0,
                'trees_planted' => 0,
                'last_connected_at' => null,
            ]);

            foreach ($offsets as $offset) {
                Visit::query()->create([
                    'customer_id' => $customer->id,
                    'visited_at' => Carbon::parse($offset),
                ]);
            }

            $visitCount = $customer->visits()->count();

            $customer->update([
                'visit_count' => $visitCount,
                'trees_planted' => intdiv($visitCount, $visitsPerTree),
                'last_connected_at' => $customer->visits()->max('visited_at'),
            ]);
        }
    }
}
