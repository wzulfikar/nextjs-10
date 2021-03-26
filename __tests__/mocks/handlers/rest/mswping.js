import { rest } from 'msw';

/**
 * /mswping is a handler to verify that msw is actually running.
 * To test, run this code in your browser console:
 *
 * `fetch('/mswping').then(res => res.json()).then(console.log).catch(console.log)`
 */
export const handler = rest.get('/mswping', (req, res, ctx) => {
  return res(
    ctx.json({
      ok: true,
      msg: 'msw is running!',
    })
  );
});
