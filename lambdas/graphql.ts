import { ApolloServer, gql } from 'apollo-server-lambda';

const typeDefs = gql`
  type Query {
    hello: String
    words: [String!]
  }
`;

const resolvers = {
  Query: {
    hello: () => 'Hello, world!',
    words: () => ['foo', 'bar'],
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

exports.handler = server.createHandler();
