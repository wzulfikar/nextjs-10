// Mock db
const db = {
  users: {
    updateBilling: async (uuid: string, payload) => {
      console.log('[mock-db] users.updateBilling:', { uuid, payload });
      return { error: undefined };
    },
  },
  customers: {
    insert: async ({ id, stripe_customer_id }) => {
      console.log('[mock-db] customers.insert:', { id, stripe_customer_id });
      return { id, stripe_customer_id, error: undefined };
    },
    find: async (payload: { uuid?: string; stripe_customer_id?: string }) => {
      console.log('[mock-db] customers.find:', payload);
      return {
        data: {
          id: payload.uuid,
          stripe_customer_id: payload.stripe_customer_id,
        },
        error: undefined,
      };
    },
  },
  products: {
    insert: async (product, opts) => {
      console.log('[mock-db] products.insert:', { product, opts });
      return { error: null };
    },
  },
  prices: {
    insert: async (price, opts) => {
      console.log('[mock-db] prices.insert:', { price, opts });
      return { error: null };
    },
  },
  subscriptions: {
    insert: async (subscription, opts) => {
      console.log('[mock-db] subscriptions.insert:', { subscription, opts });
      return { error: null };
    },
  },
};

export default db;
