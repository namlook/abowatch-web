import { ApolloServer, gql } from 'apollo-server-lambda';
import jwt, { VerifyErrors, VerifyOptions } from 'jsonwebtoken';
import jwksClient, { SigningKey } from 'jwks-rsa';

const options: VerifyOptions = {
  audience: 'https://dev-rv2jju37.eu.auth0.com/userinfo', // 'http://localhost:9000/api',
  issuer: 'https://dev-rv2jju37.eu.auth0.com/',
  algorithms: ['RS256'],
};

const client = jwksClient({
  jwksUri: `${options.issuer}.well-known/jwks.json`,
});

function getKey(header, cb) {
  client.getSigningKey(header.kid, (err, key: SigningKey) => {
    console.log('XXXX', err);
    const signingKey = 'publicKey' in key ? key.publicKey : key.rsaPublicKey;
    cb(null, signingKey);
  });
}

async function isTokenValid(token): Promise<{userId: string; error: string}> {
  if (token) {
    const bearerToken = token.split(' ');

    const result: Promise<{userId: string; error: string}> = new Promise((resolve, _) => {
      jwt.verify(bearerToken[1], getKey, options, (error: VerifyErrors, decoded: {sub: string}) => {
        console.log('xxxxx', error, decoded);
        if (error) {
          resolve({ error: error.message, userId: '' });
        }
        if (decoded) {
          resolve({ userId: decoded.sub, error: '' });
        }
      });
    });

    return result;
  }

  return { error: 'No token provided', userId: '' };
}

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
    split: Int!
    dailyPrice: Float!
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
    subscriptions: (_, __, { userId }) => DB.subscriptions.filter((item) => item.userId === userId),
    subscription: (_, { id }, { userId }) => DB.subscriptions.find((item) => item.id === id && item.userId === userId),
  },
  Mutation: {
    saveSubscription(_, { input, id }, { userId }) {
      let subscription;
      let subscriptions;
      if (!userId) {
        throw Error('bad user');
      }
      const dailyPrice = computeDailyPrice(input);
      if (!id) {
        subscription = {
          ...input, id: `${Date.now()}`, dailyPrice, userId,
        };
        subscriptions = [...DB.subscriptions, subscription];
      } else {
        subscription = {
          ...input, id, dailyPrice, userId,
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
    deleteSubscription(_, { id }, { userId }) {
      if (!userId) {
        throw Error('bad user');
      }
      const nbSubscriptions = DB.subscriptions.length;
      DB.subscriptions = DB.subscriptions.filter((item) => item.userId === userId && item.id !== id);
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
  context: async ({ event }) => {
    const { userId } = await isTokenValid(event.headers.authorization);
    return { userId };
  },
});

exports.handler = server.createHandler({
  cors: {
    origin: '*',
    credentials: true,
  },
});
