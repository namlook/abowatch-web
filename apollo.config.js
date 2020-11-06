module.exports = {
  client: {
    service: {
      name: 'graphql',
      // URL to the GraphQL API
      url: 'http://localhost:9000/graphql',
    },
    // Files processed by the extension
    includes: [
      'src/**/*.vue',
      'src/**/*.js',
      'src/**/*.ts',
    ],
  },
};
