<?php

namespace Database\Seeders;

use App\Models\Customer;
use App\Models\Visit;
use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;

class DemoDataSeeder extends Seeder
{
    /**
     * @var list<array{customer_id: string, name: string, visit_offsets: list<string>}>
     */
    private const DEMO_CUSTOMERS = [
        [
            'customer_id' => 'demo-customer',
            'name' => 'Demo Customer',
            'visit_offsets' => [
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
        ],
        [
            'customer_id' => 'alice-visitor',
            'name' => 'Alice Visitor',
            'visit_offsets' => [
                '-30 minutes',
                '-3 hours',
                '-3 hours -15 minutes',
                '-6 hours',
                '-12 hours',
            ],
        ],
        [
            'customer_id' => 'bob-regular',
            'name' => 'Bob Regular',
            'visit_offsets' => [
                '-10 minutes',
                '-1 hour -10 minutes',
                '-2 hours -40 minutes',
                '-7 hours',
                '-7 hours -25 minutes',
                '-18 hours',
                '-20 hours',
            ],
        ],
    ];

    public function run(): void
    {
        $visitsPerTree = config('tree_demo.visits_per_tree');

        foreach (self::DEMO_CUSTOMERS as $demoCustomer) {
            $customer = Customer::query()->create([
                'external_id' => $demoCustomer['customer_id'],
                'name' => $demoCustomer['name'],
                'visit_count' => 0,
                'trees_planted' => 0,
                'last_connected_at' => null,
            ]);

            foreach ($demoCustomer['visit_offsets'] as $offset) {
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
