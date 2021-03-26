export default [
  /* GraphQL handlers */
  require('./graphql/query_users_me').handler,

  /* REST handlers */
  require('./rest/mswping').handler,
];
