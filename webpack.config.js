const path = require('path');
const TsConfigPathsPlugin = require('awesome-typescript-loader').TsConfigPathsPlugin;

module.exports = {
  mode: 'development',
  entry: './demo/src/main.ts',
  devtool: 'source-map',
  resolve: {
    extensions: ['.ts', '.js'],
    plugins: [
      new TsConfigPathsPlugin()
    ]
  },
  output: {
    path: path.resolve(__dirname, 'demo/dist'),
    filename: 'demo.bundle.js'
  },
  performance: {
    hints: false
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          {
            loader: 'awesome-typescript-loader',
            options: {
              configFileName: path.join(__dirname, 'tsconfig.json')
            }
          }
        ]
      },
    ]
  }
};
