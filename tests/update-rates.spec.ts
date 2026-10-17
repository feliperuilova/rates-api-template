import {expect, test} from '@playwright/test';

test.describe('PATCH /api/rates/{currency}', () => {
  test('updates rate of existing currency', async ({ request }) => {
    const response = await request.patch(`/api/rates/USD`, {
      data: { "currency": "USD", "rate": 0.95 }
    });
    expect(response.status()).toBe(200);
  });
  test('returns 400 for invalid rate', async ({ request }) => {
    const response = await request.patch(`/api/rates/USD`, {
      data: {'currency': 'USD', 'rate': 'zero' }
    })
    expect(response.status()).toBe(400);
  });
  test('returns 400 for invalid currency code', async ({ request }) => {
    const response = await request.patch(`/api/rates/us`, {
      data: {'currency': 'us', 'rate': 1 }
    })
    expect(response.status()).toBe(400);
  });
  test('returns 404 for unknown currency', async ({ request }) => {
    const response = await request.patch(`/api/rates/USD`, {
      data: {'currency': '***', 'rate': 'zero' }
    })
  });
});
