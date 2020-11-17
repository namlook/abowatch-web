import { ApolloServer, gql } from 'apollo-server-lambda';

const DB = {
  subscriptions: [],
};

const typeDefs = gql`

  enum BillingMode {
    daily
    weekly
    monthly
    quaterly
    yearly
  }

  type Subscription {
    id: String!
    name: String!
    price: Float!
    billingMode: BillingMode!
    dividedBy: Int!
  }

  input SubscriptionInput {
    name: String!
    price: Float!
    billingMode: BillingMode!
    dividedBy: Int!
  }

  type SaveSubscriptionResponse {
    subscription: Subscription!
  }

  type DeleteSubscriptionResponse {
    success: Boolean!
  }

  type Query {
    subscriptions: [Subscription!]
    subscription(id: ID): Subscription
  }

  type Mutation {
    saveSubscription(input: SubscriptionInput!, id: ID): SaveSubscriptionResponse
    deleteSubscription(id: ID!): DeleteSubscriptionResponse
  }

  schema {
    query: Query
    mutation: Mutation
  }
`;

const resolvers = {
  Query: {
    subscriptions: () => DB.subscriptions,
    subscription: (_, { id }) => DB.subscriptions.find((item) => item.id === id),
  },
  Mutation: {
    saveSubscription(_, { input, id }) {
      let subscription;
      let subscriptions;
      if (!id) {
        subscription = { ...input, id: `${Date.now()}` };
        subscriptions = [...DB.subscriptions, subscription];
      } else {
        subscription = { ...input, id };
        subscriptions = DB.subscriptions.map((item) => {
          if (item.id === id) {
            return subscription;
          }
          return item;
        });
      }
      DB.subscriptions = subscriptions;
      return { subscription };
    },

    deleteSubscription(_, { id }) {
      const nbSubscriptions = DB.subscriptions.length;
      DB.subscriptions = DB.subscriptions.filter((item) => item.id !== id);
      return {
        success: nbSubscriptions > DB.subscriptions.length,
      };
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
});

exports.handler = server.createHandler({
  cors: {
    origin: '*',
    credentials: true,
  },
});
