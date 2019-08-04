let path = require('path');

module.exports = (env, { mode }) => ({
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        },
        resolve: { extensions: ['.js', '.jsx'] }
      }
    ]
  },
  entry: './src/index.js',
  output: {
    filename: '[name].bundle.js',
    chunkFilename: '[name].bundle.js',
    path: path.resolve(__dirname, './dist/'),
    publicPath: 'dist/'
  }
});
