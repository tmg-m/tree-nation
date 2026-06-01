<?php

namespace App\Http\Controllers\Api;

use App\Actions\RecordVisit;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreVisitRequest;
use Illuminate\Http\JsonResponse;

class VisitController extends Controller
{
    public function store(StoreVisitRequest $request, RecordVisit $recordVisit): JsonResponse
    {
        $validated = $request->validated();

        $result = $recordVisit->handle(
            customerId: $validated['customer_id'],
            name: $validated['name'] ?? null,
            visitedAt: isset($validated['visited_at'])
                ? $request->date('visited_at')
                : null,
        );

        return response()->json([
            'message' => 'Visit recorded.',
            'data' => $result,
        ], 201);
    }
}
