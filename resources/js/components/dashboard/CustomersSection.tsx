import CustomersTable from '@/components/dashboard/CustomersTable';
import type { CustomersSectionProps } from '@/types/dashboard';

export default function CustomersSection({
    customers,
    title = 'Customers',
    description = 'Visit counts per customer (seeded demo data).',
}: CustomersSectionProps) {
    return (
        <section aria-label="Customers">
            <h2 className="text-lg font-semibold text-stone-800">{title}</h2>
            <p className="mt-1 text-sm text-stone-500">{description}</p>
            <div className="mt-4">
                <CustomersTable customers={customers} />
            </div>
        </section>
    );
}
