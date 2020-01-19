/**
 * @file webpack bundle analyze 分析包大小
 * @author atom-yang
 */

/* eslint-env node */

const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { UnusedFilesWebpackPlugin } = require('unused-files-webpack-plugin');
const merge = require('webpack-merge');
const prodConfig = require('./webpack.prod');

const unusedAnalyzeConfig = {
  patterns: ['src/**/*.*'],
  globOptions: {
    ignore: [
      '**/*.md',
      'node_modules/**/*'
    ]
  }
};

module.exports = merge(prodConfig, {
  plugins: [
    new BundleAnalyzerPlugin({ analyzerMode: 'static', generateStatsFile: true }),
    new UnusedFilesWebpackPlugin(unusedAnalyzeConfig)
  ]
});
