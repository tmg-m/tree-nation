import { useState } from 'react';

import { simulateVisit } from '@/lib/visits';

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
        await simulateVisit(customerId, displayName);
        setLoadingCustomerId(null);
    };

    return (
        <section aria-label="Simulate visits">
            <details className="group rounded-xl border border-stone-200 bg-white p-4 shadow-sm">
                <summary className="cursor-pointer list-none text-lg font-semibold text-stone-800">
                    <span className="flex w-full items-center justify-between gap-2">
                        Simulate customer visits
                        <span
                            aria-hidden="true"
                            className="text-sm text-stone-500 transition-transform group-open:rotate-180"
                        >
                            ▼
                        </span>
                    </span>
                </summary>

                <div className="mt-4 space-y-6">
                    <p className="text-sm text-stone-500">
                        Calls{' '}
                        <code className="rounded bg-stone-100 px-1.5 py-0.5 text-xs">
                            POST /api/visits
                        </code>{' '}
                        with the same JSON payload as a device.
                    </p>

                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        {SIMULATE_CUSTOMERS.map(
                            ({ customerId, displayName }) => (
                                <button
                                    key={customerId}
                                    type="button"
                                    disabled={isLoading}
                                    onClick={() =>
                                        handlePost(customerId, displayName)
                                    }
                                    className="flex h-12 w-full items-center justify-center rounded-lg border border-stone-200 bg-white px-4 text-center text-sm font-medium text-stone-800 shadow-sm transition-colors hover:border-emerald-200 hover:bg-emerald-50 disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    <span className="truncate">
                                        {loadingCustomerId === customerId
                                            ? 'Loading...'
                                            : `+1 visit · ${displayName}`}
                                    </span>
                                </button>
                            ),
                        )}
                    </div>

                    <div className="rounded-lg border border-stone-200 bg-stone-50 p-4">
                        <h3 className="text-sm font-semibold text-stone-800">
                            Postman quick setup
                        </h3>
                        <p className="mt-2 text-sm text-stone-600">
                            API key is not required in this assessment.
                        </p>
                        <div className="mt-3 space-y-3 text-sm">
                            <p>
                                <span className="font-medium text-stone-700">
                                    URL:
                                </span>{' '}
                                <code className="rounded bg-white px-1.5 py-0.5 text-xs">
                                    POST http://localhost:3000/api/visits
                                </code>
                            </p>
                            <div>
                                <p className="font-medium text-stone-700">
                                    Headers:
                                </p>
                                <pre className="mt-1 overflow-x-auto rounded bg-white p-2 text-xs text-stone-700">
                                    {`Content-Type: application/jsonAccept: application/json`}
                                </pre>
                            </div>
                            <div>
                                <p className="font-medium text-stone-700">
                                    Body (raw JSON):
                                </p>
                                <pre className="mt-1 overflow-x-auto rounded bg-white p-2 text-xs text-stone-700">
                                    {`{"customer_id": "bob-from-postman","name": "Bob from Postman"}`}
                                </pre>
                            </div>
                        </div>
                    </div>
                </div>
            </details>
        </section>
    );
}
