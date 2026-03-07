const ALLOWED_ORIGINS = [
  'https://lukashornung-97.github.io',
  'http://localhost',
  'http://127.0.0.1',
];

const ALLOWED_URL_PATTERN = /^https:\/\/wahlen\.statistik-bw\.de\//;

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

    try {
      const resp = await fetch(target, {
        headers: { 'User-Agent': 'LTW-CORS-Proxy/1.0' },
      });

      const headers = new Headers(resp.headers);
      Object.entries(corsHeaders(origin)).forEach(([k, v]) => headers.set(k, v));

      return new Response(resp.body, {
        status: resp.status,
        statusText: resp.statusText,
        headers,
      });
    } catch (err) {
      return new Response(`Proxy error: ${err.message}`, {
        status: 502,
        headers: corsHeaders(origin),
      });
    }
  },
};
