import { serve } from '@hono/node-server';
import { Hono } from 'hono';

import { channel } from '@/server/api/channel/route';
import { guild } from '@/server/api/guild/route';
import { history } from '@/server/api/history/route';
import { queue } from '@/server/api/queue/route';
import { request } from '@/server/api/request/route';
import { setting } from '@/server/api/setting/route';
import { user } from '@/server/api/user/route';
import { video } from '@/server/api/video/route';

const app = new Hono().basePath('/api');
app.get('/', (c) => c.text('Hello Hono!'));

export const root = app
  .route('/guild', guild)
  .route('/setting', setting)
  .route('/channel', channel)
  .route('/video', video)
  .route('/user', user)
  .route('/request', request)
  .route('/queue', queue)
  .route('/history', history);

if (process.env.NODE_ENV !== 'test') {
  serve(root, (info) => {
    // eslint-disable-next-line no-console
    console.log(`Listening on http://localhost:${info.port}`);
  });
}

export type ApiType = typeof root;
