export type PostVisitPayload = {
    customer_id: string;
    name?: string;
};

export async function postVisit(payload: PostVisitPayload): Promise<boolean> {
    const response = await fetch('/api/visits', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        body: JSON.stringify(payload),
    });

    return response.ok;
}
