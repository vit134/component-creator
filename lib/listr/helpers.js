const template = require('../template');
const files = require('../files');

const createJsFile = ({
  path,
  fileName,
  componentName,
  tmpl,
}) => new Promise((resolve, reject) => {
  template.getFileContent({ name: componentName, tmplFileName: tmpl })
    .then(content => files.createFile(`${path}/${fileName}`, content))
    .then(() => resolve())
    .catch(e => reject(e));
});

const createCssFile = ({ path, fileName }) => (
  new Promise((resolve, reject) => {
    const stylesPath = `${path}/${fileName}`;

    files.createFile(stylesPath, '')
      .then(resolve)
      .catch(e => reject(e));
  })
);

const createAdditionalFile = ({
  path,
  fileName,
  componentName,
  tmpl,
}) => (
  new Promise((resolve, reject) => {
    const filePath = `${path}/${componentName}.${fileName}`;
    template.getFileContent({ name: componentName, tmplFileName: tmpl })
      .then(content => files.createFile(filePath, content))
      .then(() => resolve())
      .catch(e => reject(e));
  })
);

module.exports = {
  createJsFile,
  createCssFile,
  createAdditionalFile,
};
