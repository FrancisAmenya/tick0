module.exports = {
  apps: [
    {
      name: 'webpack-dev-server',
      script: 'node_modules/webpack-dev-server/bin/webpack-dev-server.js',
      args: '--config webpack.config.js --mode development',
      watch: true,
      env: {
        NODE_ENV: 'development',
      },
    },
  ],
};
