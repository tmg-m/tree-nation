import { useState } from 'react';

import { postVisit } from '@/lib/visits';

const SIMULATE_CUSTOMERS = [
    { customerId: 'demo-customer', displayName: 'Demo Customer' },
    { customerId: 'alice-visitor', displayName: 'Alice Visitor' },
] as const;

export default function SimulateVisitsSection() {
    const [loadingCustomerId, setLoadingCustomerId] = useState<string | null>(
        null,
    );
    const isLoading = loadingCustomerId !== null;

    const handlePost = async (customerId: string, displayName: string) => {
        setLoadingCustomerId(customerId);

        try {
            const success = await postVisit({
                customer_id: customerId,
                name: displayName,
            });

            if (success) {
                window.dispatchEvent(new Event('dashboard:visit-recorded'));
            }
        } catch (error) {
            console.error('Error posting visit:', error);
        }

        setLoadingCustomerId(null);
    };

    return (
        <section aria-label="Simulate visits">
            <h2 className="text-lg font-semibold text-stone-800">
                Simulate customer visit
            </h2>
            <p className="mt-1 text-sm text-stone-500">
                Calls{' '}
                <code className="rounded bg-stone-100 px-1.5 py-0.5 text-xs">
                    POST /api/visits
                </code>{' '}
                with the same JSON payload as a device.
            </p>
            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {SIMULATE_CUSTOMERS.map(({ customerId, displayName }) => (
                    <button
                        key={customerId}
                        type="button"
                        disabled={isLoading}
                        onClick={() => handlePost(customerId, displayName)}
                        className="flex h-12 w-full items-center justify-center rounded-lg border border-stone-200 bg-white px-4 text-center text-sm font-medium text-stone-800 shadow-sm transition-colors hover:border-emerald-200 hover:bg-emerald-50 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        <span className="truncate">
                            {loadingCustomerId === customerId
                                ? 'Loading...'
                                : `+1 visit · ${displayName}`}
                        </span>
                    </button>
                ))}
            </div>
        </section>
    );
}
