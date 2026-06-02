import { Link } from '@inertiajs/react';

const forestSprites = [
    { emoji: '🌳', className: 'leaf-float leaf-float-slow leaf-delay-1 left-[6%] top-[14%] text-4xl sm:text-5xl' },
    { emoji: '🌲', className: 'leaf-float leaf-float-mid leaf-delay-2 left-[14%] top-[30%] text-3xl sm:text-4xl' },
    { emoji: '🌿', className: 'leaf-float leaf-float-fast leaf-delay-3 left-[8%] bottom-[18%] text-3xl sm:text-4xl' },
    { emoji: '🌱', className: 'leaf-float leaf-float-mid leaf-delay-4 left-[22%] bottom-[10%] text-3xl sm:text-4xl' },
    { emoji: '🌳', className: 'leaf-float leaf-float-fast leaf-delay-5 left-1/2 top-[10%] text-3xl sm:text-4xl' },
    { emoji: '🌳', className: 'leaf-float leaf-float-slow leaf-delay-2 left-[44%] bottom-[8%] text-4xl sm:text-5xl' },
    { emoji: '🌲', className: 'leaf-float leaf-float-mid leaf-delay-3 right-[20%] bottom-[9%] text-4xl sm:text-5xl' },
    { emoji: '🌿', className: 'leaf-float leaf-float-fast leaf-delay-1 right-[7%] bottom-[18%] text-3xl sm:text-4xl' },
    { emoji: '🌱', className: 'leaf-float leaf-float-mid leaf-delay-5 right-[12%] top-[30%] text-3xl sm:text-4xl' },
    { emoji: '🌳', className: 'leaf-float leaf-float-slow leaf-delay-4 right-[6%] top-[14%] text-4xl sm:text-5xl' },
];

export default function Home() {
    return (
        <section className="page-shell page-shell--home">
            <div className="page-shell__glow page-shell__glow--left" />
            <div className="page-shell__glow page-shell__glow--right" />

            {forestSprites.map(({ emoji, className }, index) => (
                <span
                    key={`${emoji}-${index}`}
                    aria-hidden="true"
                    className={`pointer-events-none absolute opacity-85 ${className}`}
                >
                    {emoji}
                </span>
            ))}

            <div className="relative z-10 mx-auto flex min-h-[calc(80vh-5rem)] max-w-5xl flex-col items-center justify-center text-center">

                <h1 className="mt-6 bg-gradient-to-r from-emerald-900 via-green-700 to-lime-600 bg-clip-text text-5xl font-extrabold tracking-tight text-transparent drop-shadow-sm sm:text-7xl">
                    Tree Nation
                </h1>

                <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-emerald-900/80">
                    Turn customer activity into measurable environmental impact.
                </p>

                <Link
                    href="/dashboard"
                    className="mt-10 inline-flex items-center rounded-full bg-emerald-700 px-8 py-3 text-base font-semibold text-white shadow-lg shadow-emerald-900/20 transition hover:bg-emerald-800"
                >
                    View Dashboard
                </Link>
            </div>
        </section>
    );
}