// ── Lancer License Verification ────────────────────────────────────
// Proxies license key validation to Lemon Squeezy's public License API.
// The validate endpoint is intentionally public — auth is the key itself.
//
// POST /api/lancer/verify-license
// Body: { key: "LS-XXXX-XXXX-XXXX-XXXX" }
//
// Returns:
//   200 { valid: true, tier: "premium" }
//   200 { valid: false, tier: "free" }
//   503 { valid: false, tier: "free", error: "Service unavailable" }

import { NextResponse } from 'next/server';

const LS_URL = 'https://api.lemonsqueezy.com/v1/licenses/validate';

export async function POST(request: Request) {
  let body: { key?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { valid: false, tier: 'free', error: 'Invalid request body' },
      { status: 400 }
    );
  }

  if (!body.key || typeof body.key !== 'string') {
    return NextResponse.json(
      { valid: false, tier: 'free', error: 'License key required' },
      { status: 400 }
    );
  }

  try {
    // The Lemon Squeezy License API uses form-encoded POST.
    // No Bearer auth needed — the license key itself is the credential.
    const params = new URLSearchParams({ license_key: body.key.trim() });

    const response = await fetch(LS_URL, {
      method: 'POST',
      headers: { 'Accept': 'application/json' },
      body: params,
    });

    const data = await response.json();

    if (data.valid === true) {
      return NextResponse.json({ valid: true, tier: 'premium' });
    }

    return NextResponse.json({ valid: false, tier: 'free' });
  } catch (error) {
    console.error('[Lancer] Lemon Squeezy API call failed:', error);
    return NextResponse.json(
      { valid: false, tier: 'free', error: 'Service unavailable' },
      { status: 503 }
    );
  }
}
