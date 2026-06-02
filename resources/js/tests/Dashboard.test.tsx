import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import Dashboard from '@/pages/Dashboard';

describe('Dashboard page', () => {
    it('renders the page and loads dashboard sections', () => {
        render(
            <Dashboard
                title="Dashboard"
                totalVisits={12}
                currentHourVisits={3}
                totalTreesPlanted={4}
                customers={[
                    {
                        customerId: 'c-1',
                        displayName: 'Alice',
                        visitCount: 12,
                        treesPlanted: 4,
                        lastSeenDate: 'Jun 2, 2026',
                        lastSeenTime: '13:30',
                    },
                ]}
                hourlyVisits={[
                    {
                        dateLabel: 'Jun 2, 2026',
                        hourLabel: '13:00',
                        visits: 3,
                    },
                ]}
            />,
        );

        expect(screen.getByText('Dashboard')).toBeInTheDocument();
        expect(screen.getByText('Total visits')).toBeInTheDocument();
        expect(screen.getByText('Current hour visits')).toBeInTheDocument();
        expect(screen.getByText('Total trees planted')).toBeInTheDocument();
        expect(screen.getByText('Visits per hour')).toBeInTheDocument();
        expect(screen.getByText('Customers')).toBeInTheDocument();
        expect(screen.getByText('Simulate customer visits')).toBeInTheDocument();
    });
});
