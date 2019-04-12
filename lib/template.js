const app = require('template')();
const path = require('path');
const utils = require('../utils');

const PACKAGE_PATH = path.dirname(require.main.filename);

app.engine('tmpl', require('engine-lodash'));
app.create('pages');

const getIndexJsConntent = async ({ dist, name, type, tmplType = 'clasic' }) => {
  const indexPath = `${PACKAGE_PATH}/tmpl/${tmplType}/index_${type.toLowerCase()}_js.tmpl`;
  
  const stylesName = utils.toDashCase(name);
  const componentName = utils.getComponentName(name)

  app
    .page(indexPath, {
      path: indexPath,
    });

  const index = app.pages.get(indexPath);

  const { content: indexJsContent } = await index.render({ name: componentName, stylesName }, function (err, res) {
    if (err) return console.log(err);
    return res.content
  });

  return indexJsContent
}

const getPhaktJsConntent = async ({ name, tmplType = 'clasic' }) => {
  const phaktPath = `${PACKAGE_PATH}/tmpl/${tmplType}/phakt_js.tmpl`;
  const componentName = utils.getComponentName(name)

  app
    .page(phaktPath, {
      path: phaktPath,
    });

  const phakt = app.pages.get(phaktPath);

  const { content: phaktJsContent } = await phakt.render({ name: componentName }, function (err, res) {
    if (err) return console.log(err);
    return res.content
  });

  return phaktJsContent
}

const getSpecJsConntent = async ({ name, tmplType = 'clasic' }) => {
  const specPath = `${PACKAGE_PATH}/tmpl/${tmplType}/spec_js.tmpl`;
  const componentName = utils.getComponentName(name)

  app
    .page(specPath, {
      path: specPath,
    });

  const spec = app.pages.get(specPath);

  const { content: specJsContent } = await spec.render({ name: componentName }, function (err, res) {
    if (err) return console.log(err);
    return res.content
  });

  return specJsContent
}

module.exports = {
  getIndexJsConntent,
  getPhaktJsConntent,
  getSpecJsConntent
};