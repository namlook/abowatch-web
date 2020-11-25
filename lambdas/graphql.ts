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
  // users: [
  //   { id: 'toto' },
  // ],
};

const typeDefs = gql`

  enum BillingMode {
    daily
    weekly
    monthly
    quaterly
    yearly
  }

  # type User {
  #   id: ID!
  #   subscriptions: [Subscription!]
  # }

  type Subscription {
    id: String!
    name: String!
    price: Float!
    billingMode: BillingMode!
    split: Int!
    dailyPrice: Float!
  }


  # input LoginInput {
  #   username: ID!,
  #   password: String!
  # }

  # type LoginResponse {
  #   userToken: String
  #   error: String
  # }


  # input RegisterInput {
  #   username: ID!,
  #   password: String!
  # }

  # type RegisterResponse {
  #   userToken: String
  #   error: String
  # }


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
    # user(id: ID!): User
  }

  type Mutation {
    # login(username: ID!, password: String!): LoginResponse
    # logout(token: String!): String
    # register(username: ID!, password: String!): RegisterResponse
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
    // login(_, { username, password }) {
    //   const user = DB.users.find((item) => item.username === username && item.password === password);
    //   if (!user) {
    //     return { error: 'user not found' };
    //   }
    //   const token = `${Date.now()}`;
    //   DB.users = DB.users.map((item) => {
    //     if (item.username === username) {
    //       return { ...item, token };
    //     }
    //     return item;
    //   });
    //   return { userToken: token };
    // },
    // logout(_, { token }) {
    //   console.log(token, DB);
    //   DB.users = DB.users.map((user) => {
    //     if (user.token === token) {
    //       return { ...user, token: '' };
    //     }
    //     return user;
    //   });
    //   return 'ok';
    // },
    // register(_, { username, password }) {
    //   const user = DB.users.find((item) => item.username === username);
    //   if (user) {
    //     return { error: 'username already taken' };
    //   }
    //   const token = `${Date.now()}`;
    //   DB.users = [...DB.users, { username, password, token }];
    //   return { userToken: token };
    // },
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
    // simple auth check on every request
    const token = event.headers.authorization;
    const { userId, error } = await isTokenValid(token);
    console.log('.....token', token, userId, error);
    return {
      userId,
    };
    // const getUser = new Promise((resolve, reject) => {
    //   console.log('VERIFFFFY', token);
    //   jwt.verify(token, getKey, options, (err, decoded: {email: string}) => {
    //     if (err) {
    //       reject(err);
    //     } else {
    //       resolve(decoded.email);
    //     }
    //   });
    // });

    // return {
    //   getUser,
    // };
  },
});

exports.handler = server.createHandler({
  cors: {
    origin: '*',
    credentials: true,
  },
});
