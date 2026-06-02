import { afterEach, describe, expect, it, vi } from 'vitest';

import { postVisit } from '@/lib/visits';

describe('postVisit', () => {
    afterEach(() => {
        vi.restoreAllMocks();
        vi.unstubAllGlobals();
    });

    it('posts a visit payload and returns true on success', async () => {
        const fetchMock = vi.fn().mockResolvedValue({ ok: true });
        vi.stubGlobal('fetch', fetchMock);

        const result = await postVisit({
            customer_id: 'customer-1',
            name: 'Alice',
        });

        expect(result).toBe(true);
        expect(fetchMock).toHaveBeenCalledWith('/api/visits', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify({
                customer_id: 'customer-1',
                name: 'Alice',
            }),
        });
    });
});
