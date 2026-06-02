<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class VisitApiTest extends TestCase
{
    use RefreshDatabase;

    // creates customer and first visit on first API call.
    public function test_first_visit_creates_customer(): void
    {
        $response = $this->postJson('/api/visits', [
            'customer_id' => 'customer-1',
            'name' => 'Alice',
        ]);

        $response->assertCreated()
            ->assertJsonPath('message', 'Visit recorded.')
            ->assertJsonPath('data.customerId', 'customer-1')
            ->assertJsonPath('data.displayName', 'Alice')
            ->assertJsonPath('data.visitCount', 1)
            ->assertJsonPath('data.treesPlanted', 0)
            ->assertJsonPath('data.treePlanted', false);

        $this->assertDatabaseHas('customers', [
            'external_id' => 'customer-1',
            'name' => 'Alice',
            'visit_count' => 1,
            'trees_planted' => 0,
        ]);

        $this->assertDatabaseCount('customers', 1);
        $this->assertDatabaseCount('visits', 1);
    }

    // increments counts when same customer visits again.
    public function test_second_visit_increments_count(): void
    {
        config()->set('tree_demo.visits_per_tree', 100);

        $payload = [
            'customer_id' => 'customer-2',
            'name' => 'Bob',
        ];

        $this->postJson('/api/visits', $payload)->assertCreated();
        $secondResponse = $this->postJson('/api/visits', $payload);

        $secondResponse->assertCreated()
            ->assertJsonPath('data.customerId', 'customer-2')
            ->assertJsonPath('data.visitCount', 2)
            ->assertJsonPath('data.treesPlanted', 0);

        $this->assertDatabaseCount('customers', 1);
        $this->assertDatabaseCount('visits', 2);
    }

    // Plants one tree when visit threshold is reached.
    public function test_plants_tree_at_threshold(): void
    {
        config()->set('tree_demo.visits_per_tree', 2);

        $payload = [
            'customer_id' => 'customer-3',
            'name' => 'Carla',
        ];

        $this->postJson('/api/visits', $payload)->assertCreated();
        $response = $this->postJson('/api/visits', $payload);

        $response->assertCreated()
            ->assertJsonPath('data.visitCount', 2)
            ->assertJsonPath('data.treesPlanted', 1)
            ->assertJsonPath('data.treePlanted', true);

        $this->assertDatabaseHas('customers', [
            'external_id' => 'customer-3',
            'visit_count' => 2,
            'trees_planted' => 1,
        ]);
    }

    // rejects requests without customer_id.
    public function test_requires_customer_id(): void
    {
        $response = $this->postJson('/api/visits', [
            'name' => 'Missing ID',
        ]);

        $response->assertUnprocessable()
            ->assertJsonValidationErrors(['customer_id']);

        $this->assertDatabaseCount('customers', 0);
        $this->assertDatabaseCount('visits', 0);
    }
}
