require('dotenv').config();
const app = require('template')();
const path = require('path');
const engineLodash = require('engine-lodash');
const utils = require('../utils');
const config = require('../lib/config');

const PACKAGE_PATH = process.env.MODE === 'development' ? process.cwd() : path.dirname(require.main.filename);
const TMPL_PATH = config.get('tmplPath') || `${PACKAGE_PATH}/tmpl`;

app.engine('tmpl', engineLodash);
app.create('pages');

app.page('welcome.tmpl', { path: 'welcome.tmpl', content: 'Hello, <%= name %>!' });

const getFileContent = async ({ name, tmplFileName }) => {
  const tmplPath = `${TMPL_PATH}/${tmplFileName}.tmpl`;
  const componentName = utils.getComponentName(name);
  const componentDashName = utils.toDashCase(name);

  app
    .page(tmplPath, {
      path: tmplPath,
    });

  const page = app.pages.get(tmplPath);

  const { content } = await page.render({
    componentName,
    componentDashName,
  }, (err, res) => {
    if (err) return err;
    return res.content;
  });

  return content;
};

module.exports = {
  getFileContent,
};
