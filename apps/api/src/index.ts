export interface Env {
  DB: D1Database;
  APP_ENV?: string;
  INSTAGRAM_MODE?: 'demo' | 'live';
}

const json = (body: unknown, status = 200): Response => new Response(JSON.stringify(body), {
  status,
  headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' },
});

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    if (request.method === 'GET' && url.pathname === '/api/health') {
      return json({
        ok: true,
        service: 'creator-platform-api',
        environment: env.APP_ENV ?? 'unknown',
        instagram: { mode: env.INSTAGRAM_MODE ?? 'demo', connected: false },
      });
    }
    return json({ error: 'not_found', message: 'This foundation API route is not implemented.' }, 404);
  },
};
