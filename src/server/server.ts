import { serve } from '@hono/node-server';
import { Hono } from 'hono';

const app = new Hono();
app.get('/', (c) => c.text('Hello Hono!'));

const root = app;

if (process.env.NODE_ENV !== 'test') {
  serve(root, (info) => {
    // eslint-disable-next-line no-console
    console.log(`Listening on http://localhost:${info.port}`);
  });
}
