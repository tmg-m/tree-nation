import { cn } from '@/lib/utils';
import type { StatCardProps } from '@/types/dashboard';

export default function StatCard({
    label,
    value,
    valueClassName = 'text-stone-800',
}: StatCardProps) {
    return (
        <div className="rounded-xl border border-stone-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-stone-500">{label}</p>
            <p
                className={cn(
                    'mt-2 text-3xl font-semibold tabular-nums',
                    valueClassName,
                )}
            >
                {value}
            </p>
        </div>
    );
}
