import { serve } from '@hono/node-server';
import { Hono } from 'hono';

import { guild } from '@/server/api/guild/route';
import { setting } from '@/server/api/setting/route';

const app = new Hono().basePath('/api');
app.get('/', (c) => c.text('Hello Hono!'));

export const root = app.route('/guild', guild).route('/setting', setting);

if (process.env.NODE_ENV !== 'test') {
  serve(root, (info) => {
    // eslint-disable-next-line no-console
    console.log(`Listening on http://localhost:${info.port}`);
  });
}

export type ApiType = typeof root;
