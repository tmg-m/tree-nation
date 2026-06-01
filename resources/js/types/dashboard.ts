export type DashboardCustomer = {
    customerId: string;
    displayName: string;
    visitCount: number;
    treesPlanted: number;
    lastSeen: string;
};

export type DashboardProps = {
    title: string;
    totalVisits: number;
    totalTreesPlanted: number;
    customers: DashboardCustomer[];
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
