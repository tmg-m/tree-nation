import { Link, usePage } from '@inertiajs/react';

import { cn } from '@/lib/utils';

const links = [
    { href: '/', label: 'Home' },
    { href: '/dashboard', label: 'Dashboard' },
] as const;

function isActive(currentUrl: string, href: string): boolean {
    if (href === '/') {
        return currentUrl === '/';
    }

    return currentUrl === href || currentUrl.startsWith(`${href}/`);
}

export default function Navbar() {
    const { url } = usePage();

    return (
        <header className="sticky top-0 z-50 border-b border-stone-200/70 bg-white/70 shadow-sm shadow-stone-200/20 backdrop-blur-xl backdrop-saturate-150">
            <nav className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
                <Link
                    href="/"
                    className="inline-flex items-center"
                    aria-label="Tree Nation home"
                >
                    <img
                        src="/logo/treenation-logo.webp"
                        alt="Tree Nation"
                        className="h-8 w-auto sm:h-9"
                    />
                </Link>
                <ul className="flex items-center gap-8">
                    {links.map(({ href, label }) => (
                        <li key={href}>
                            <Link
                                href={href}
                                className={cn(
                                    'text-sm transition-colors',
                                    isActive(url, href)
                                        ? 'font-medium text-emerald-700'
                                        : 'text-stone-500 hover:text-stone-800',
                                )}
                            >
                                {label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    );
}
