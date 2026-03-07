const ALLOWED_ORIGINS = [
  'https://lukashornung-97.github.io',
  'http://localhost',
  'http://127.0.0.1',
];

const ALLOWED_URL_PATTERN = /^https:\/\/wahlen\.statistik-bw\.de\//;

// Wie lange eine Antwort gecacht wird (in Sekunden).
// Alle Requests innerhalb dieses Fensters erhalten die gecachte Version
// → drastisch weniger Upstream-Fetches & schnellere Antworten.
const CACHE_TTL_SECONDS = 30;

function corsHeaders(origin) {
  return {
    'Access-Control-Allow-Origin': origin || '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
  };
}

function isOriginAllowed(origin) {
  if (!origin) return true;
  return ALLOWED_ORIGINS.some(o => origin.startsWith(o));
}

export default {
  async fetch(request) {
    const origin = request.headers.get('Origin') || '';

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders(origin) });
    }

    if (request.method !== 'GET') {
      return new Response('Method not allowed', { status: 405 });
    }

    const url = new URL(request.url);
    const target = url.searchParams.get('url');

    if (!target) {
      return new Response('Missing ?url= parameter', { status: 400 });
    }

    if (!ALLOWED_URL_PATTERN.test(target)) {
      return new Response('URL not allowed – only wahlen.statistik-bw.de', { status: 403 });
    }

    if (!isOriginAllowed(origin)) {
      return new Response('Origin not allowed', { status: 403 });
    }

    // Cache-Key basiert nur auf der Ziel-URL (nicht auf Origin),
    // damit alle User denselben Cache-Eintrag nutzen.
    const cache = caches.default;
    const cacheKey = new Request(`https://cache-key/${target}`, { method: 'GET' });

    const cached = await cache.match(cacheKey);
    if (cached) {
      const headers = new Headers(cached.headers);
      Object.entries(corsHeaders(origin)).forEach(([k, v]) => headers.set(k, v));
      headers.set('X-Cache', 'HIT');
      return new Response(cached.body, {
        status: cached.status,
        statusText: cached.statusText,
        headers,
      });
    }

    try {
      const resp = await fetch(target, {
        headers: { 'User-Agent': 'LTW-CORS-Proxy/1.0' },
      });

      const body = await resp.arrayBuffer();

      const cacheHeaders = new Headers(resp.headers);
      cacheHeaders.set('Cache-Control', `public, max-age=${CACHE_TTL_SECONDS}`);

      const cacheResp = new Response(body, {
        status: resp.status,
        statusText: resp.statusText,
        headers: cacheHeaders,
      });
      await cache.put(cacheKey, cacheResp);

      const clientHeaders = new Headers(cacheHeaders);
      Object.entries(corsHeaders(origin)).forEach(([k, v]) => clientHeaders.set(k, v));
      clientHeaders.set('X-Cache', 'MISS');

      return new Response(body, {
        status: resp.status,
        statusText: resp.statusText,
        headers: clientHeaders,
      });
    } catch (err) {
      return new Response(`Proxy error: ${err.message}`, {
        status: 502,
        headers: corsHeaders(origin),
      });
    }
  },
};
