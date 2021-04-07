if (!process.env.APOLLO_KEY) {
  throw new Error(
    'Environment error: could not load `APOLLO_KEY` from  `.env.local` file.'
  );
}

module.exports = {
  client: {
    service: {
      name: process.env.NEXT_PUBLIC_APOLLO_SERVICE,
      url: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
    },
    includes: ['./src/**/*.ts'],
  },
};
