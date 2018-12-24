const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: __dirname + '/client/src/index.jsx',
  output: {
    filename: 'bundle.js',
    path: __dirname + '/client/dist'
  },
  module: {
    rules: [
      { 
        test: [/\.jsx$/],
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react', '@babel/preset-env']
          }
        }
      },
      {
        test: /\.s?[ac]ss$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          { loader: 'css-loader', options: { url: false, sourceMap: true } },
          { loader: 'saas-loader', options: { sorceMap: true } },
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'style.css',
    })
  ]
};