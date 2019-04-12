const app = require('template')();
const path = require('path');
const engineLodash = require('engine-lodash');
const utils = require('../utils');

const PACKAGE_PATH = path.dirname(require.main.filename);

app.engine('tmpl', engineLodash);
app.create('pages');

app.page('welcome.tmpl', { path: 'welcome.tmpl', content: 'Hello, <%= name %>!' });

const getFileContent = async ({ name, tmplType = 'clasic', tmplFileName }) => {
  const tmplPath = `${PACKAGE_PATH}/tmpl/${tmplType}/${tmplFileName}.tmpl`;
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
