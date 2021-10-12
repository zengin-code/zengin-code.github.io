const { join, resolve } = require("path");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  mode: process.env['NODE_ENV'] === 'production' ? 'production' : 'development',
  entry: {
    index: './src/index.tsx',
  },
  output: {
    path: resolve('dist'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          transpileOnly: true,
        },
      },
      {
        test: /\.s[ca]ss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(ttf|eot|woff|woff2|svg)$/,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'source-data/data/**/*.json',
          to: ({ absoluteFilename }) => {
            const name = absoluteFilename.replace(join(__dirname, 'source-data/data'), 'api');
            return name;
          },
        },
      ]
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.mjs', '.cjs', '.jsx', '.js'],
  },
  devServer: {
    static: join(__dirname, 'dist'),
    compress: true,
    port: 9000
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  }
};
