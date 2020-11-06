import { ApolloServer, gql } from 'apollo-server-lambda';

const typeDefs = gql`
  type Query {
    greetings(name: String!): String
    words: [String!]
  }

  schema {
    query: Query
  }
`;

const resolvers = {
  Query: {
    greetings: (_root: unknown, args: {name: string}, _context: unknown, _info: unknown) => `Bonjour ${args.name}!`,
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
