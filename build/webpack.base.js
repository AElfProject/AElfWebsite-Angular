/**
 * @file 基础配置
 * @author atom-yang
 */

/* eslint-env node */

const path = require('path');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const {
  ROOT, OUTPUT_PATH, isProdMode, ENTRIES, PAGES, PUBLIC_PATH
} = require('./util');

const { theme } = require(path.resolve(ROOT, './package.json'));

const copies = [];

const baseConfig = {
  entry: ENTRIES,
  output: {
    path: OUTPUT_PATH,
    publicPath: PUBLIC_PATH
  },
  resolve: {
    modules: [
      path.resolve(ROOT, 'src'),
      path.resolve(ROOT, 'node_modules')
    ],
    symlinks: true,
    extensions: ['.jsx', '.js']
  },
  module: {
    rules: [
      {
        test: /\.(js)x?$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.less$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', {
          loader: 'less-loader',
          options: {
            javascriptEnabled: true,
            modifyVars: theme
          }
        }]
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [{
          loader: 'url-loader',
          options: {
            name: 'static/img/[name]-[hash:5].[ext]',
            limit: 8192
          }
        }]
      },
      {
        test: /\.(woff|woff2|ttf|eot|svg)(#.+)?$/,
        use: [{
          loader: 'url-loader',
          options: {
            name: 'static/fonts/[name].[ext]',
            limit: 8192
          }
        }]
      },
      // {
      //   loader: 'webpack-ant-icon-loader',
      //   enforce: 'pre',
      //   include: [
      //     require.resolve('@ant-design/icons/lib/dist')
      //   ]
      // }
    ]
  },
  plugins: [
    ...PAGES.map(({ name, config }) => {
      let chunks = [name];
      const filename = path.resolve(OUTPUT_PATH, config.name || `${name}.html`);
      // if (isProdMode) {
      //   const runtime = `runtime.${name}`;
      //   chunks = [runtime, 'vendors', name];
      // }
      return new HtmlWebpackPlugin({
        template: path.resolve(ROOT, './template.ejs'),
        filename,
        chunks,
        name,
        title: config.title
      });
    }),
    new webpack.ProvidePlugin({
      React: 'react'
    }),
    new MomentLocalesPlugin({
      localesToKeep: ['es-us', 'zh-cn'],
    }),
    new CopyWebpackPlugin(copies),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env.LOCALE': JSON.stringify(process.env.LOCALE || 'zh')
    })
  ]
};

module.exports = baseConfig;
