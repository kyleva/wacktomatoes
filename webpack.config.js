const path = require('path');

const htmlWebpackPlugin = require('html-webpack-plugin');

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
      template: './public/index.html',
      filename: './index.html',
    }),
  ],
  resolve: {
    extensions: ['.js', '.json', '.ts', '.tsx'],
  },
};
