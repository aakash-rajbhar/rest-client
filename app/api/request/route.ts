import { MikroORM, SqliteDriver } from '@mikro-orm/sqlite';
import { RequestLog } from '../../entities/RequestLog';

let orm: MikroORM | null = null;

async function getORM() {
  if (!orm) {
    orm = await MikroORM.init({
      driver: SqliteDriver,
      dbName: 'requests.db',
      entities: [RequestLog],
    });
  }
  return orm;
}

export async function POST(req: Request) {
  const { method, url, body, headers } = await req.json();

  try {
    const res = await fetch(url, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });

    const data = await res.json().catch(() => res.text()); // fallback to text
    const status = res.status;

    // Save to DB
    const orm = await getORM();
    const em = orm.em.fork();
    const log = em.create(RequestLog, {
      method,
      url,
      body: body ? JSON.stringify(body) : null,
      status,
      createdAt: new Date(),
    });
    await em.persistAndFlush(log);

    return new Response(JSON.stringify({ status, data }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: unknown) {
    if (!(err instanceof Error)) {
      return new Response(
        JSON.stringify({ error: 'An unknown error occurred' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

        // Save failed request to DB
    try {
      const orm = await getORM();
      const em = orm.em.fork();
      const log = em.create(RequestLog, {
        method,
        url,
        body: body ? JSON.stringify(body) : null,
        status: 0, // 0 means failed request
        createdAt: new Date(),
      });
      await em.persistAndFlush(log);
    } catch (e) {
      console.error('Failed to save request log', e);
    }

    return new Response(
      JSON.stringify({ error: 'Request failed: ' + err.message }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
