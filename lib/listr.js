const Listr = require('listr');
const template = require('./template');
const files = require('./files');
const utils = require('../utils');

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

const createPhaktJs = (path, componentParams) => (
  new Promise((resolve, reject) => {
    const fileName = utils.toDashCase(componentParams.name);
    const phaktJsPath = `${path}/${fileName}.phakt.js`;
    const tmplFileName = 'phakt_js';

    template.getFileContent({ ...componentParams, tmplFileName })
      .then(content => files.createFile(phaktJsPath, content))
      .then(() => {
        resolve();
      })
      .catch(e => reject(e));
  })
);

const createSpectJs = (path, componentParams) => (
  new Promise((resolve, reject) => {
    const fileName = utils.toDashCase(componentParams.name);
    const specJsPath = `${path}/${fileName}.spec.js`;
    const tmplFileName = 'spec_js';

    template.getFileContent({ ...componentParams, tmplFileName })
      .then(content => files.createFile(specJsPath, content))
      .then(() => {
        resolve();
      })
      .catch(e => reject(e));
  })
);

const createMocks = (path, mockFolder, mockFileType) => (
  new Promise((resolve, reject) => {
    const mocksPath = `${path}/${mockFolder}`;
    const mockFileName = `mock.${mockFileType}`;

    files.createFolder(mocksPath)
      .then(() => files.createFile(`${mocksPath}/${mockFileName}`, ''))
      .then(resolve)
      .catch(e => reject(e));
  })
);

const ListrTasks = (path, componentParams, extraQ) => {
  const { name } = componentParams;
  const tasks = [
    {
      title: 'Creating component folder',
      task: () => files.createFolder(path),
    },
    {
      title: 'Creating index.js',
      task: () => createIndexJs(path, componentParams),
    },
    {
      title: `${utils.toDashCase(name)}.css creating`,
      task: () => createStyles(path, componentParams),
    },
    {
      title: `${utils.toDashCase(name)}.phakt.js creating`,
      task: () => createPhaktJs(path, componentParams),
    },
    {
      title: `${utils.toDashCase(name)}.spec.js creating`,
      task: () => createSpectJs(path, componentParams),
    },
  ];

  if (extraQ) {
    if (extraQ.mock && extraQ.mockFolder) {
      tasks.push({
        title: 'Mock folder creating',
        task: () => createMocks(path, extraQ.mockFolder, extraQ.mockFileType),
      });
    }
  }

  return new Listr(tasks).run();
};

module.exports = {
  run: (path, componentParams, extraQ) => ListrTasks(path, componentParams, extraQ),
};
