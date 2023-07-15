import { serve } from '@hono/node-server';
import { Hono } from 'hono';

import { guild } from '@/server/api/guild';

const app = new Hono().get('/', (c) => c.text('Hello Hono!'));

const root = app.route('/guild', guild);

if (process.env.NODE_ENV !== 'test') {
  serve(root, (info) => {
    // eslint-disable-next-line no-console
    console.log(`Listening on http://localhost:${info.port}`);
  });
}

export type ApiType = typeof root;
