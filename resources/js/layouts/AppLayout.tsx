import type { ReactNode } from 'react';

import Navbar from '@/components/Navbar';

export default function AppLayout({ children }: { children: ReactNode }) {
    return (
        <div className="min-h-screen bg-stone-100 text-stone-800">
            <Navbar />
            <main className="w-full px-6 py-10">{children}</main>
        </div>
    );
}
