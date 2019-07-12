require('dotenv').config();
const chalk = require('chalk');
const app = require('template')();
const path = require('path');
const engineLodash = require('engine-lodash');
const {
  compose,
  snakeToCamel,
  getComponentName,
  toDashCase,
} = require('../utils');
const { copyFiles, isExist } = require('./files');
const config = require('../lib/config');

const PACKAGE_PATH = process.env.MODE === 'development' ? process.cwd() : path.dirname(require.main.filename);
const PACKAGE_TMPL_PATH = `${PACKAGE_PATH}/tmpl`;
const TMPL_PATH = config.get('tmplPath') ? `${process.cwd()}/${config.get('tmplPath')}` : PACKAGE_TMPL_PATH;

const STYLES_FILE_NAMING_TYPE = config.get('cssFileName');

app.engine('tmpl', engineLodash);
app.create('pages');

app.page('welcome.tmpl', { path: 'welcome.tmpl', content: 'Hello, <%= name %>!' });

const getFileContent = ({ name, tmplFileName }) => new Promise(async (resolve, reject) => {
  const tmplPath = `${TMPL_PATH}/${tmplFileName}`;
  const props = {
    componentName: compose(getComponentName, snakeToCamel)(name),
    stylesName: STYLES_FILE_NAMING_TYPE === 'component' ? `${toDashCase(name)}.css` : 'styles.css',
  };

  if (!isExist(tmplPath)) {
    reject(new Error(`Template ${chalk.red(tmplPath)} was not find`));
    return;
  }

  app.page(tmplPath, { path: tmplPath });

  const page = app.pages.get(tmplPath);

  await page.render(props, (err, res) => {
    if (err) {
      reject(err);
    }

    resolve(res.content);
  });
});

const copyTemplatesToCustomFolder = async (folderName) => {
  const bla = await copyFiles(`${path.dirname(require.main.filename)}/tmpl`, `${process.cwd()}/${folderName}`);
  return bla;
};

module.exports = {
  getFileContent,
  copyTemplatesToCustomFolder,
};
