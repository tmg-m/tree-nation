export type DashboardCustomer = {
    customerId: string;
    displayName: string;
    visitCount: number;
    treesPlanted: number;
    lastSeenDate: string;
    lastSeenTime: string;
};

export type DashboardProps = {
    title: string;
    totalVisits: number;
    currentHourVisits: number;
    totalTreesPlanted: number;
    customers: DashboardCustomer[];
    hourlyVisits: HourlyVisitPoint[];
};

export type HourlyVisitPoint = {
    dateLabel: string;
    hourLabel: string;
    visits: number;
};

export type StatCardProps = {
    label: string;
    value: number;
    valueClassName?: string;
};

export type CustomersSectionProps = {
    customers: DashboardCustomer[];
    title?: string;
    description?: string;
};

export type CustomersTableProps = {
    customers: DashboardCustomer[];
};

export type HourlyVisitsSectionProps = {
    points: HourlyVisitPoint[];
};
