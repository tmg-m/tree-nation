import type { CustomersTableProps } from '@/types/dashboard';

export default function CustomersTable({ customers }: CustomersTableProps) {
    return (
        <div className="overflow-hidden rounded-xl border border-stone-200 bg-white shadow-sm">
            <table className="w-full text-left text-sm">
                <thead className="border-b border-stone-200 bg-stone-50">
                    <tr>
                        <th className="px-4 py-3 font-medium text-stone-600">
                            Customer
                        </th>
                        <th className="px-4 py-3 font-medium text-stone-600">
                            Visits
                        </th>
                        <th className="hidden px-4 py-3 font-medium text-stone-600 sm:table-cell">
                            Trees
                        </th>
                        <th className="hidden px-4 py-3 font-medium text-stone-600 md:table-cell">
                            Last seen
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                    {customers.map((customer) => (
                        <tr
                            key={customer.customerId}
                            className="hover:bg-stone-50/80"
                        >
                            <td className="px-4 py-3 font-medium text-stone-800">
                                {customer.displayName}
                            </td>
                            <td className="px-4 py-3 tabular-nums text-stone-800">
                                {customer.visitCount}
                            </td>
                            <td className="hidden px-4 py-3 tabular-nums text-emerald-700 sm:table-cell">
                                {customer.treesPlanted}
                            </td>
                            <td className="hidden px-4 py-3 text-stone-600 md:table-cell">
                                {customer.lastSeen}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
