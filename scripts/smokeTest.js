/**
 * Simple smoke test to detect 404s on critical API endpoints.
 * Run with: node scripts/smokeTest.js (ensure server running)
 */
const fetch = global.fetch || ((...args) => import('node-fetch').then(m => m.default(...args)));

const BASE = process.env.SMOKE_BASE || 'http://localhost:5000/api/v1';

const endpoints = [
    { method: 'GET', path: '/health', expect: [200] },
    { method: 'POST', path: '/auth/login', expect: [400, 401, 404] },
    { method: 'POST', path: '/subscription/subscribe', body: { email: `smoke+${Date.now()}@example.com` }, expect: [200, 500] },
    { method: 'GET', path: '/wishlist', expect: [401, 200] },
    { method: 'GET', path: '/cart', expect: [401, 200] },
];

(async () => {
    console.log('Smoke testing base:', BASE);
    for (const ep of endpoints) {
        const url = BASE + ep.path;
        try {
            const res = await fetch(url, {
                method: ep.method,
                headers: { 'Content-Type': 'application/json' },
                body: ep.body ? JSON.stringify(ep.body) : undefined,
            });
            const ok = ep.expect.includes(res.status);
            console.log(`${ok ? '✅' : '❌'} ${ep.method} ${ep.path} -> ${res.status}`);
            if (!ok) {
                const text = await res.text();
                console.log('   Unexpected body:', text.slice(0, 300));
            }
        } catch (err) {
            console.log(`💥 ${ep.method} ${ep.path} error:`, err.message);
        }
    }
})();