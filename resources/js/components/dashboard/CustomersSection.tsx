import CustomersTable from '@/components/dashboard/CustomersTable';
import type { CustomersSectionProps } from '@/types/dashboard';

export default function CustomersSection({
    customers,
    title = 'Customers',
}: CustomersSectionProps) {
    return (
        <section aria-label="Customers">
            <h2 className="text-lg font-semibold text-stone-800">{title}</h2>
            <div className="mt-4">
                <CustomersTable customers={customers} />
            </div>
        </section>
    );
}
