
const chalk = require('chalk');
const Listr = require('listr');
const template = require('../template');
const files = require('../files');
const utils = require('../../utils');
const config = require('../config');

const INDEX_FILE_NAME = config.get('indexFileName');
const STYLES_FILE_NAME = config.get('stylesFileName');

const createIndexJs = (path, componentParams) => new Promise((resolve, reject) => {
  const indexJsPath = `${path}/${INDEX_FILE_NAME === 'component' ? `${componentParams.name}.js` : 'index.js'}`;
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
    const stylesFileName = STYLES_FILE_NAME === 'component'
      ? utils.toDashCase(componentParams.name)
      : 'styles';
    const stylesPath = `${path}/${stylesFileName}.css`;

    files.createFile(stylesPath, '')
      .then(resolve)
      .catch(e => reject(e));
  })
);

const createMocks = (
  path,
  mockFolder = config.get('mockFolder'),
  mockFileName = config.get('mockFileName'),
  mockFileType = config.get('mockFileExtension'),
) => (
  new Promise((resolve, reject) => {
    const mocksPath = `${path}/${mockFolder}`;
    const mockFileFullName = `${mockFileName}.${mockFileType}`;

    files.createFolder(mocksPath)
      .then(() => files.createFile(`${mocksPath}/${mockFileFullName}`, ''))
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

const overwritingFilesListr = (filesArr, path) => {
  const tasks = filesArr.map(fileName => ({
    title: `Removing ${fileName}`,
    task: () => files.removeFile(`${path}/${fileName}`),
  }));

  return () => new Listr(tasks);
};

module.exports = {
  createIndexJs,
  createStyles,
  createMocks,
  createFile,
  createAdditionaltasks,
  overwritingFilesListr,
};
