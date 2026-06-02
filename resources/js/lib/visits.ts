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

export async function simulateVisit(
    customerId: string,
    displayName: string,
): Promise<boolean> {
    try {
        const success = await postVisit({
            customer_id: customerId,
            name: displayName,
        });

        if (success) {
            window.dispatchEvent(new Event('dashboard:visit-recorded'));
        }

        return success;
    } catch (error) {
        console.error('Error posting visit:', error);

        return false;
    }
}
