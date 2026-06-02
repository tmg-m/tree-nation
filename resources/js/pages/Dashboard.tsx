import { router } from '@inertiajs/react';
import { useEffect } from 'react';

import CustomersSection from '@/components/dashboard/CustomersSection';
import HourlyVisitsSection from '@/components/dashboard/HourlyVisitsSection';
import SimulateVisitsSection from '@/components/dashboard/SimulateVisitsSection';
import { refreshListeners } from '@/lib/listeners';
import StatCard from '@/components/dashboard/StatCard';
import type { DashboardProps } from '@/types/dashboard';

const DASHBOARD_DATA_KEYS = [
    'customers',
    'currentHourVisits',
    'hourlyVisits',
    'totalVisits',
    'totalTreesPlanted',
] as const;

function refreshDashboardData(): void {
    router.reload({ only: [...DASHBOARD_DATA_KEYS] });
}

export default function Dashboard({
    title,
    totalVisits,
    currentHourVisits,
    totalTreesPlanted,
    customers,
    hourlyVisits,
}: DashboardProps) {
    useEffect(() => {
        return refreshListeners(refreshDashboardData);
    }, []);

    return (
        <div className="space-y-10">
            <h1 className="text-2xl font-semibold tracking-tight text-stone-800">
                {title}
            </h1>
            <section className="grid gap-4 sm:grid-cols-3">
                <StatCard
                    label="Total visits"
                    value={totalVisits}
                    valueClassName="text-stone-800"
                />
                <StatCard
                    label="Current hour visits"
                    value={currentHourVisits}
                    valueClassName="text-sky-700"
                />
                <StatCard
                    label="Total trees planted"
                    value={totalTreesPlanted}
                    valueClassName="text-emerald-700"
                />
            </section>
            <section className="grid gap-6 xl:grid-cols-2">
                <HourlyVisitsSection points={hourlyVisits} />
                <CustomersSection customers={customers} />
            </section>
            <SimulateVisitsSection />
        </div>
    );
}
