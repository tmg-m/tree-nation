import { Fragment } from 'react';

import type { HourlyVisitsSectionProps } from '@/types/dashboard';

export default function HourlyVisitsSection({ points }: HourlyVisitsSectionProps) {
    const groupedPoints = points.reduce<
        Array<{ dateLabel: string; entries: Array<{ hourLabel: string; visits: number }> }>
    >((groups, point) => {
        const currentGroup = groups.at(-1);

        if (currentGroup?.dateLabel === point.dateLabel) {
            currentGroup.entries.push({
                hourLabel: point.hourLabel,
                visits: point.visits,
            });

            return groups;
        }

        groups.push({
            dateLabel: point.dateLabel,
            entries: [{ hourLabel: point.hourLabel, visits: point.visits }],
        });

        return groups;
    }, []);

    return (
        <section aria-label="Visits per hour">
            <h2 className="text-lg font-semibold text-stone-800">Visits per hour</h2>
            <div className="mt-4 h-[420px] overflow-y-auto rounded-xl border border-stone-200 bg-white shadow-sm">
                <table className="w-full text-left text-sm">
                    <thead className="border-b border-stone-200 bg-stone-50">
                        <tr>
                            <th className="sticky top-0 bg-stone-50 px-4 py-3 font-medium text-stone-600">
                                Time (24h)
                            </th>
                            <th className="sticky top-0 bg-stone-50 px-4 py-3 text-right font-medium text-stone-600">
                                Visit count
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {groupedPoints.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={2}
                                    className="px-4 py-4 text-stone-500"
                                >
                                    No visits recorded yet.
                                </td>
                            </tr>
                        ) : (
                            groupedPoints.map((group) => (
                                <Fragment key={group.dateLabel}>
                                    <tr
                                        className="border-y border-stone-200 bg-stone-50"
                                    >
                                        <td
                                            colSpan={2}
                                            className="px-4 py-2 text-sm font-semibold text-stone-700"
                                        >
                                            {group.dateLabel}
                                        </td>
                                    </tr>
                                    {group.entries.map((entry) => (
                                        <tr
                                            key={`${group.dateLabel}-${entry.hourLabel}`}
                                            className="border-b border-stone-100 hover:bg-stone-50/80"
                                        >
                                            <td className="px-4 py-3 tabular-nums text-stone-700">
                                                {entry.hourLabel}
                                            </td>
                                            <td className="px-4 py-3 text-right tabular-nums text-stone-800">
                                                {entry.visits}
                                            </td>
                                        </tr>
                                    ))}
                                </Fragment>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </section>
    );
}
