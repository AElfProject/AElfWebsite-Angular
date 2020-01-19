/**
 * @file 打包工具
 * @author atom-yang
 */
/* eslint-env node */

const path = require('path');
// eslint-disable-next-line import/no-extraneous-dependencies
const glob = require('glob');
const fs = require('fs');

const config = require('./config');

const isProdMode = process.env.NODE_ENV === 'production';

const ROOT = path.resolve(__dirname, '..');

const PUBLIC_PATH = isProdMode ? config.outputPath : '/';

const OUTPUT_PATH = path.resolve(__dirname, '..', 'dist');

const PAGES = glob.sync('src/pages/*/index.jsx').map(page => {
  const name = page.slice(4, -10).replace(/\//g, '-').toLowerCase();
  const paths = path.join(ROOT, page);
  const dirName = path.dirname(paths);
  const pageConfig = JSON.parse(fs.readFileSync(path.resolve(dirName, './config.json')).toString());
  return {
    origin: page,
    path: paths,
    config: pageConfig,
    name
  };
});

const ENTRIES = PAGES.reduce((entries, page) => {
  // eslint-disable-next-line no-param-reassign
  entries[page.name] = path.resolve(ROOT, page.origin);
  return entries;
}, {});

module.exports = {
  ROOT,
  PAGES,
  PUBLIC_PATH,
  OUTPUT_PATH,
  isProdMode,
  ENTRIES
};
