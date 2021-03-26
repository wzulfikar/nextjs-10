import { graphql } from 'msw';
import { buildUser } from '@tests/stubs';

const user = buildUser();

const stub = {
  user: user,
};

export const handler = graphql.query('users_me', (req, res, ctx) => {
  return res(ctx.data(stub));
});
