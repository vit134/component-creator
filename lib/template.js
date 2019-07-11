require('dotenv').config();
const app = require('template')();
const path = require('path');
const engineLodash = require('engine-lodash');
const {
  compose,
  snakeToCamel,
  getComponentName,
  toDashCase,
} = require('../utils');
const { copyFiles } = require('./files');
const config = require('../lib/config');

const PACKAGE_PATH = process.env.MODE === 'development' ? process.cwd() : path.dirname(require.main.filename);
const PACKAGE_TMPL_PATH = `${PACKAGE_PATH}/tmpl`;
const TMPL_PATH = config.get('tmplPath') ? `${PACKAGE_PATH}/${config.get('tmplPath')}` : PACKAGE_TMPL_PATH;

const STYLES_FILE_NAMING_TYPE = config.get('cssFileName');

app.engine('tmpl', engineLodash);
app.create('pages');

app.page('welcome.tmpl', { path: 'welcome.tmpl', content: 'Hello, <%= name %>!' });

const getFileContent = async ({ name, tmplFileName }) => {
  const tmplPath = `${TMPL_PATH}/${tmplFileName}`;
  const props = {
    componentName: compose(getComponentName, snakeToCamel)(name),
    stylesName: STYLES_FILE_NAMING_TYPE === 'component' ? `${toDashCase(name)}.css` : 'styles.css',
  };

  app.page(tmplPath, { path: tmplPath });

  const page = app.pages.get(tmplPath);

  const { content } = await page.render(props, (err, res) => {
    if (err) return err;
    return res.content;
  });

  return content;
};

const copyTemplatesToCustomFolder = async (folderName) => {
  console.log(`${process.cwd()}/tmpl`, `${PACKAGE_PATH}/${folderName}`);
  const bla = await copyFiles(`${process.cwd()}/tmpl`, `${PACKAGE_PATH}/${folderName}`);
  return bla;
};

module.exports = {
  getFileContent,
  copyTemplatesToCustomFolder,
};
