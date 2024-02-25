import { handle } from '@hono/node-server/vercel';
import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import { z } from 'zod';

const app = new Hono({
  strict: false,
})
  .basePath('/api')
  .get(
    '/hello',
    zValidator(
      'query',
      z.object({
        name: z.string().optional().default('hono'),
      }),
    ),
    (c) => {
      const { name } = c.req.valid('query');
      console.log('name', name);
      return c.json(
        {
          message: `hello, ${name}`,
        },
        200,
      );
    },
  )
  .notFound((c) => {
    return c.json(
      {
        message: 'not found',
      },
      404,
    );
  });

export type AppType = typeof app;

export default handle(app);

if (process.env.NODE_ENV === 'development') {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { serve } = require('@hono/node-server');
  serve(
    {
      fetch: app.fetch,
      port: 3000,
    },
    () => {
      console.log('dev server started: http://localhost:3000');
    },
  );
}
