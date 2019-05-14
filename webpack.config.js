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
  entry: mode === 'development' ? './example/src/index.js' : './src/index.js',
  output: {
    libraryTarget: 'umd',
    filename: mode === 'development' ? '[name].bundle.js' : 'index.js',
    chunkFilename: '[name].bundle.js',
    path: path.resolve(__dirname, './dist/'),
    publicPath: 'dist/'
  },
  externals: [
    {
      react: 'react'
    }
  ]
});
