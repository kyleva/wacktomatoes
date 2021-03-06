/* Third-party libraries */
const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');

/** Our code */
const ENVIRONMENT_GLOBALS = require('./globals/environments');
const ENVIRONMENT_CONFIGS = ENVIRONMENT_GLOBALS.ENVIRONMENT_CONFIGS;
const ENVIRONMENTS = ENVIRONMENT_GLOBALS.ENVIRONMENTS;

const environment = process.env.NODE_ENV || ENVIRONMENTS.LOCAL;
const environmentConfig = ENVIRONMENT_CONFIGS.get(environment);

console.log(environment, environmentConfig);

module.exports = {
  devServer: {
    historyApiFallback: true,
  },
  entry: './src/index.tsx',
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        include: path.resolve(__dirname, 'src'),
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(mp3)$/i,
        use: {
          loader: 'file-loader',
        },
      },
      {
        test: /\.html$/,
        use: {
          loader: 'html-loader',
        },
      },
    ],
  },
  plugins: [
    new htmlWebpackPlugin({
      template: './public/index.ejs',
      templateParameters: { environmentConfig },
      filename: './index.html',
    }),
  ],
  resolve: {
    extensions: ['.js', '.json', '.ts', '.tsx'],
  },
};
