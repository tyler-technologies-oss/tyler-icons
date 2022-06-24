const path = require('path');

const ROOT = path.join(__dirname, '../');

module.exports = {
  mode: 'development',
  entry: './demo/src/main.ts',
  devtool: 'source-map',
  resolve: {
    extensions: ['.ts', '.js']
  },
  output: {
    path: path.join(ROOT, 'demo/dist'),
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
            loader: 'ts-loader',
            options: {
              configFile: path.join(ROOT, 'tsconfig.json')
            }
          }
        ]
      }
    ]
  }
};
