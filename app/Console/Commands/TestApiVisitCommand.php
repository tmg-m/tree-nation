<?php

namespace App\Console\Commands;

use App\Actions\RecordVisit;
use Illuminate\Console\Command;

# command to test : php artisan testapi demo-customer --name="Demo Customer" 

class TestApiVisitCommand extends Command
{
    protected $signature = 'testapi
                            {customer_id : The customer id (same as API customer_id)}
                            {--name= : Optional display name}';

    protected $description = 'Record a visit like POST /api/visits (for local testing without curl)';

    public function handle(RecordVisit $recordVisit): int
    {
        $result = $recordVisit->handle(
            customerId: $this->argument('customer_id'),
            name: $this->option('name') ?: null,
        );

        $this->info('Visit recorded (same logic as the API).');
        $this->table(
            ['Field', 'Value'],
            [
                ['Customer ID', $result['customerId']],
                ['Display name', $result['displayName']],
                ['Visit count', (string) $result['visitCount']],
                ['Trees planted', (string) $result['treesPlanted']],
                ['Last seen', $result['lastSeen']],
                ['Tree planted this visit', $result['treePlanted'] ? 'yes' : 'no'],
            ],
        );

        return self::SUCCESS;
    }
}
