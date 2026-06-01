<?php

namespace App\Actions;

use App\Models\Customer;
use App\Models\Visit;
use Carbon\CarbonInterface;
use Illuminate\Support\Facades\DB;

class RecordVisit
{
    /**
     * @return array{
     *     customerId: string,
     *     displayName: string,
     *     visitCount: int,
     *     treesPlanted: int,
     *     lastSeen: string,
     *     treePlanted: bool,
     * }
     */
    public function handle(
        string $customerId,
        ?string $name = null,
        ?CarbonInterface $visitedAt = null,
    ): array {
        $visitedAt ??= now();
        $visitsPerTree = config('tree_demo.visits_per_tree');
        $treePlanted = false;

        $customer = DB::transaction(function () use (
            $customerId,
            $name,
            $visitedAt,
            $visitsPerTree,
            &$treePlanted,
        ) {
            $customer = Customer::query()->firstOrCreate(
                ['external_id' => $customerId],
                [
                    'name' => $name,
                    'visit_count' => 0,
                    'trees_planted' => 0,
                    'last_connected_at' => null,
                ],
            );

            if ($name !== null) {
                $customer->update(['name' => $name]);
            }

            Visit::query()->create([
                'customer_id' => $customer->id,
                'visited_at' => $visitedAt,
            ]);

            $customer->increment('visit_count');
            $customer->update(['last_connected_at' => $visitedAt]);
            $customer->refresh();

            if ($customer->visit_count % $visitsPerTree === 0) {
                $customer->increment('trees_planted');
                $treePlanted = true;
            }

            return $customer->fresh();
        });

        return [
            'customerId' => $customer->external_id,
            'displayName' => $customer->name ?? $customer->external_id,
            'visitCount' => $customer->visit_count,
            'treesPlanted' => $customer->trees_planted,
            'lastSeen' => $customer->last_connected_at?->format('M j, Y, g:i A') ?? '—',
            'treePlanted' => $treePlanted,
        ];
    }
}
