import { ApolloServer, gql } from 'apollo-server-lambda';
import jwt, { VerifyErrors, VerifyOptions } from 'jsonwebtoken';
import jwksClient, { SigningKey } from 'jwks-rsa';
import { ObjectID } from 'mongodb';
import createDB from './db';

const options: VerifyOptions = {
  audience: 'https://dev-rv2jju37.eu.auth0.com/userinfo',
  issuer: 'https://dev-rv2jju37.eu.auth0.com/',
  algorithms: ['RS256'],
};

const client = jwksClient({
  jwksUri: `${options.issuer}.well-known/jwks.json`,
});

function getKey(header, cb) {
  client.getSigningKey(header.kid, (err, key: SigningKey) => {
    if (err) {
      console.log('XXXX', err);
    }
    const signingKey = 'publicKey' in key ? key.publicKey : key.rsaPublicKey;
    cb(null, signingKey);
  });
}

async function isTokenValid(token): Promise<{userId: string; error: string}> {
  if (token) {
    const bearerToken = token.split(' ');

    const result: Promise<{userId: string; error: string}> = new Promise((resolve, _) => {
      jwt.verify(bearerToken[1], getKey, options, (error: VerifyErrors, decoded: {sub: string}) => {
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
const mongoToGraphql = (mongoDocument) => {
  if (!mongoDocument) {
    throw new Error('Document is null');
  }
  const { _id, ...rest } = mongoDocument;
  return { ...rest, id: _id };
};

const resolvers = {
  Query: {
    subscriptions: async (_, __, { userId, db }) => {
      const cursor = await db.subscriptions.find({ userId });
      return (await cursor.toArray()).map(mongoToGraphql);
    },
    subscription: async (_, { id }, { userId, db }) => {
      const data = await db.subscriptions.findOne({ _id: new ObjectID(id), userId });
      return data ? mongoToGraphql(data) : null;
    },
  },

  Mutation: {
    async saveSubscription(_, { input, id }, { userId, db }) {
      if (!userId) {
        throw Error('bad user');
      }
      const dailyPrice = computeDailyPrice(input);

      let docId: ObjectID;
      if (!id) {
        const { insertedId } = await db.subscriptions.insertOne({
          ...input,
          dailyPrice,
          userId,
        });
        docId = insertedId;
      } else {
        docId = new ObjectID(id);
        const newDocument = {
          ...input,
          _id: docId,
          dailyPrice,
          userId,
        };
        await db.subscriptions.replaceOne({ _id: docId }, newDocument);
      }
      const data = await db.subscriptions.findOne({ _id: docId });
      const subscription = mongoToGraphql(data);
      return { subscription };
    },
    async deleteSubscription(_, { id }, { userId, db }) {
      if (!userId) {
        throw Error('bad user');
      }
      const { result } = await db.subscriptions.deleteOne({ _id: new ObjectID(id) });
      return {
        success: result.ok,
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
    const db = await createDB();
    return { userId, db };
  },
});

exports.handler = server.createHandler({
  cors: {
    origin: '*',
    credentials: true,
  },
});
