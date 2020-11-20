import { ApolloServer, gql } from 'apollo-server-lambda';

const DB = {
  subscriptions: [],
  users: [
    { username: 'toto', password: 'mypwd', token: 'tototoken' },
  ],
};

const typeDefs = gql`

  enum BillingMode {
    daily
    weekly
    monthly
    quaterly
    yearly
  }

  type User {
    username: String!
    token: String!
    subscriptions: [Subscription!]
  }

  type Subscription {
    id: String!
    name: String!
    price: Float!
    billingMode: BillingMode!
    split: Int!
    dailyPrice: Float!
  }


  input LoginInput {
    username: ID!,
    password: String!
  }

  type LoginResponse {
    userToken: String
    error: String
  }


  input RegisterInput {
    username: ID!,
    password: String!
  }

  type RegisterResponse {
    userToken: String
    error: String
  }


  input SubscriptionInput {
    name: String!
    price: Float!
    billingMode: BillingMode!
    split: Int!
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
    user(token: String!): User
  }

  type Mutation {
    login(username: ID!, password: String!): LoginResponse
    logout(token: String!): String
    register(username: ID!, password: String!): RegisterResponse
    saveSubscription(userToken: String!, input: SubscriptionInput!, id: ID): SaveSubscriptionResponse
    deleteSubscription(userToken: String!, id: ID!): DeleteSubscriptionResponse
  }

  schema {
    query: Query
    mutation: Mutation
  }
`;

const billingModeRatios = {
  daily: 1,
  weekly: 7,
  monthly: 12,
  quaterly: 48,
  yearly: 365,
};

const computeDailyPrice = ({ price, billingMode }) => (price / billingModeRatios[billingMode]).toFixed(2);

const resolvers = {
  Query: {
    subscriptions: () => DB.subscriptions,
    subscription: (_, { id }) => DB.subscriptions.find((item) => item.id === id),
    user: (_, { token }) => {
      if (!token) {
        return { username: '', subscriptions: [] };
      }
      const user = DB.users.find((item) => item.token === token);
      if (!user) return { username: '', subscriptions: [] };
      console.log(DB);
      return {
        username: user.username,
        subscriptions: DB.subscriptions.filter((o) => o.user === user.username),
      };
    },
  },
  Mutation: {
    login(_, { username, password }) {
      const user = DB.users.find((item) => item.username === username && item.password === password);
      if (!user) {
        return { error: 'user not found' };
      }
      const token = `${Date.now()}`;
      DB.users = DB.users.map((item) => {
        if (item.username === username) {
          return { ...item, token };
        }
        return item;
      });
      return { userToken: token };
    },
    logout(_, { token }) {
      console.log(token, DB);
      DB.users = DB.users.map((user) => {
        if (user.token === token) {
          return { ...user, token: '' };
        }
        return user;
      });
      return 'ok';
    },
    register(_, { username, password }) {
      const user = DB.users.find((item) => item.username === username);
      if (user) {
        return { error: 'username already taken' };
      }
      const token = `${Date.now()}`;
      DB.users = [...DB.users, { username, password, token }];
      return { userToken: token };
    },
    saveSubscription(_, { userToken, input, id }) {
      let subscription;
      let subscriptions;
      const dailyPrice = computeDailyPrice(input);
      console.log(DB.users, '---', userToken, '<----');
      const user = DB.users.find((item) => item.token === userToken);
      if (!user) {
        throw Error('bad user');
      }
      if (!id) {
        subscription = {
          ...input, id: `${Date.now()}`, dailyPrice, user: user.username,
        };
        subscriptions = [...DB.subscriptions, subscription];
      } else {
        subscription = {
          ...input, id, dailyPrice, user: user.username,
        };
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
    deleteSubscription(_, { userToken, id }) {
      const nbSubscriptions = DB.subscriptions.length;
      const user = DB.users.find((item) => item.token === userToken);
      DB.subscriptions = DB.subscriptions.filter((item) => item.user === user.username && item.id !== id);
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
