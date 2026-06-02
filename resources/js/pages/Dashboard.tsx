import { router } from '@inertiajs/react';
import { useEffect } from 'react';

import CustomersSection from '@/components/dashboard/CustomersSection';
import SimulateVisitsSection from '@/components/dashboard/SimulateVisitsSection';
import { registerDashboardRefreshListeners } from '@/lib/dashboardRefreshListeners';
import StatCard from '@/components/dashboard/StatCard';
import type { DashboardProps } from '@/types/dashboard';

const DASHBOARD_DATA_KEYS = [
    'customers',
    'totalVisits',
    'totalTreesPlanted',
] as const;

function refreshDashboardData(): void {
    router.reload({ only: [...DASHBOARD_DATA_KEYS] });
}

export default function Dashboard({
    title,
    totalVisits,
    totalTreesPlanted,
    customers,
}: DashboardProps) {
    useEffect(() => {
        return registerDashboardRefreshListeners(refreshDashboardData);
    }, []);

    return (
        <div className="space-y-10">
            <h1 className="text-2xl font-semibold tracking-tight text-stone-800">
                {title}
            </h1>
            <section className="grid gap-4 sm:grid-cols-2">
                <StatCard
                    label="Total visits"
                    value={totalVisits}
                    valueClassName="text-stone-800"
                />
                <StatCard
                    label="Total trees planted"
                    value={totalTreesPlanted}
                    valueClassName="text-emerald-700"
                />
            </section>
            <CustomersSection customers={customers} />
            <SimulateVisitsSection />
        </div>
    );
}
