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

  type Query {
    subscriptions: [Subscription!]
    subscription(id: ID): Subscription
  }

  type Mutation {
    saveSubscription(input: SubscriptionInput!, id: ID): SaveSubscriptionResponse
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
    saveSubscription(_, args) {
      const { input, id } = args;
      let subscription;
      let subscriptions;
      if (!id) {
        subscription = { ...input, id: `${DB.subscriptions.length + 1}` };
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
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

exports.handler = server.createHandler({
  cors: {
    origin: '*',
    credentials: true,
  },
});
