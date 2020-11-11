import { ApolloServer, gql } from 'apollo-server-lambda';

let COUNTER = 0;

const typeDefs = gql`
  type Query {
    greetings(name: String!): String
    words: [String!]
    counter: Int!
  }

  type Mutation {
    increment(step: Int!): Int!
  }

  schema {
    query: Query
    mutation: Mutation
  }
`;

const resolvers = {
  Query: {
    counter: () => COUNTER,
    greetings: (_root: unknown, args: {name: string}, _context: unknown, _info: unknown) => `Bonjour ${args.name}!`,
    words: () => ['coucou', 'monde'],
  },
  Mutation: {
    increment(_root: unknown, args: {step: number}, _context: unknown) {
      COUNTER += args.step;
      console.log(`incrementing '${COUNTER}'`);
      return COUNTER;
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
