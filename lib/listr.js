const Listr = require('listr');
const template = require('./template');
const files = require('./files');
const utils = require('../utils');

const createIndexJs = (path, componentParams) => {
  return new Promise((resolve, reject) => {
    const indexJsPath = `${path}/index.js`;
    template.getIndexJsConntent(componentParams)
      .then(content => files.createFile(indexJsPath, content))
      .then(() => {
        resolve();
      })
      .catch(e => {
        reject(e);
      });
  })
}

const createStyles = (path, componentParams) => {
  return new Promise((resolve, reject) => {
    const stylesFileName = utils.toDashCase(componentParams.name);
    const stylesPath = `${path}/${stylesFileName}.css`;

    files.createFile(stylesPath, '')
      .then(resolve)
      .catch(e => {
        reject(e);
      });
  })
}

const createPhaktJs = (path, componentParams) => {
  return new Promise((resolve, reject) => {
    const fileName = utils.toDashCase(componentParams.name);
    const phaktJsPath = `${path}/${fileName}.phakt.js`;
    template.getPhaktJsConntent(componentParams)
      .then(content => files.createFile(phaktJsPath, content))
      .then(() => {
        resolve();
      })
      .catch(e => {
        reject(e);
      });
  })
}

const createSpectJs = (path, componentParams) => {
  return new Promise((resolve, reject) => {
    const fileName = utils.toDashCase(componentParams.name);
    const specJsPath = `${path}/${fileName}.spec.js`;
    template.getSpecJsConntent(componentParams)
      .then(content => files.createFile(specJsPath, content))
      .then(() => {
        resolve();
      })
      .catch(e => {
        reject(e);
      });
  })
}

const ListrTasks = (path, componentParams) => {
  const { name } = componentParams;
  return new Listr([
    {
      title: 'Creating component folder',
      task: () => files.createFolder(path)
    },
    {
      title: 'Creating index.js',
      task: () => createIndexJs(path, componentParams)
    },
    {
      title: `${utils.toDashCase(name)}.css creating`,
      task: () => createStyles(path, componentParams)
    },
    {
      title: `${utils.toDashCase(name)}.phakt.js creating`,
      task: () => createPhaktJs(path, componentParams)
    },
    {
      title: `${utils.toDashCase(name)}.spec.js creating`,
      task: () => createSpectJs(path, componentParams)
    }
  ]).run();
};

module.exports = {
  run: (path, componentParams) => ListrTasks(path, componentParams)
}