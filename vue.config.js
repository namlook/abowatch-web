module.exports = {
  transpileDependencies: [
    'vuetify',
  ],

  pluginOptions: {
    apollo: {
      lintGQL: true,
    },
  },

  chainWebpack: (config) => {
    config.module
      // GraphQL Loader
      .rule('graphql')
      .test(/\.graphql$/)
      .exclude
      .add(`${__dirname}/node_modules`)
      .end()
      .use('graphql-tag/loader')
      .loader(`${__dirname}/node_modules/graphql-tag/loader.js`)
      .end();
  },
};
