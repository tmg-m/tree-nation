import CustomersSection from '@/components/dashboard/CustomersSection';
import StatCard from '@/components/dashboard/StatCard';
import type { DashboardProps } from '@/types/dashboard';

export default function Dashboard({
    title,
    totalVisits,
    totalTreesPlanted,
    customers,
}: DashboardProps) {
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
        </div>
    );
}
