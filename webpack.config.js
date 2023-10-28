const path = require('path')
var webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = (env, arg) => {
  const isProduction = arg.mode === 'production'
  return {
    entry: './src/js/main.ts',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'js/[name].[contenthash].js?',
      clean: true,
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js'],
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    module: {
      rules: [
        { test: /\.tsx?$/, loader: 'ts-loader' },
        {
          test: /\.html$/i,
          loader: 'html-loader',
        },
        {
          test: /\.(png|jpe?g|gif|webp|svg)(\?.*)?$/,
          type: 'asset',
          generator: {
            filename: 'images/[name].[contenthash:8][ext]',
          },
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
            },
            {
              loader: 'sass-loader',
            },
          ],
        },
      ],
    },
    plugins: [
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
      }),
      new MiniCssExtractPlugin({
        filename: isProduction
          ? 'css/[name].[contenthash].css'
          : 'css/[name].css',
      }),
      new HtmlWebpackPlugin({
        template: './src/index.html',
        filename: 'index.html',
      }),
    ],
    devtool: isProduction ? false : 'source-map',
  }
}
