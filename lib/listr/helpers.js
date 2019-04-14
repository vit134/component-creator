
const chalk = require('chalk');
const template = require('../template');
const files = require('../files');
const utils = require('../../utils');
const config = require('../config');

const createIndexJs = (path, componentParams) => new Promise((resolve, reject) => {
  const indexJsPath = `${path}/index.js`;
  const tmplFileName = `index_${componentParams.type.toLowerCase()}_js`;

  template.getFileContent({ ...componentParams, tmplFileName })
    .then(content => files.createFile(indexJsPath, content))
    .then(() => {
      resolve();
    })
    .catch(e => reject(e));
});

const createStyles = (path, componentParams) => (
  new Promise((resolve, reject) => {
    const stylesFileName = utils.toDashCase(componentParams.name);
    const stylesPath = `${path}/${stylesFileName}.css`;

    files.createFile(stylesPath, '')
      .then(resolve)
      .catch(e => reject(e));
  })
);

const createMocks = (path, mockFolder, mockFileType = config.get('default.mockFileExtension')) => (
  new Promise((resolve, reject) => {
    const mocksPath = `${path}/${mockFolder}`;
    const mockFileName = `mock.${mockFileType}`;

    files.createFolder(mocksPath)
      .then(() => files.createFile(`${mocksPath}/${mockFileName}`, ''))
      .then(resolve)
      .catch(e => reject(e));
  })
);

const createFile = (path, { componentName, fileName }, tmplFileName) => (
  new Promise((resolve, reject) => {
    const filePath = `${path}/${fileName}`;

    template.getFileContent({ name: componentName, tmplFileName })
      .then(content => files.createFile(filePath, content))
      .then(() => {
        resolve();
      })
      .catch(e => reject(e));
  })
);

const createAdditionaltasks = (additional, path, componentName) => {
  if (!additional) return [];

  return additional.map((el) => {
    const { extention, tmpl } = el;
    const fileName = `${utils.toDashCase(componentName)}.${extention}`;

    return {
      title: `Сreating ${chalk.green(fileName)}`,
      task: () => createFile(path, {
        componentName,
        fileName: `${utils.toDashCase(componentName)}.${extention}`,
      }, tmpl),
    };
  });
};

module.exports = {
  createIndexJs,
  createStyles,
  createMocks,
  createFile,
  createAdditionaltasks,
};
