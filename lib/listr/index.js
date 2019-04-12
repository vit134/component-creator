const Listr = require('listr');
const _ = require('lodash');
const files = require('../files');
const utils = require('../../utils');
const helpers = require('./helpers');
const config = require('../../config.json');

const ListrTasks = (path, componentParams, extraQ) => {
  const { name } = componentParams;

  const tasks = [
    {
      title: 'Creating component folder',
      task: () => files.createFolder(path),
    },
    {
      title: 'Creating index.js',
      task: () => helpers.createIndexJs(path, componentParams),
    },
    {
      title: `Сreating ${utils.toDashCase(name)}.css`,
      task: () => helpers.createStyles(path, componentParams),
    },
    ...helpers.createAdditionaltasks(_.get(config, 'additional', []), path, componentParams.name),
  ];

  if (extraQ) {
    if (extraQ.mock && extraQ.mockFolder) {
      tasks.push({
        title: 'Сreating mock folder',
        task: () => helpers.createMocks(path, extraQ.mockFolder, extraQ.mockFileType),
      });
    }
  }

  return new Listr(tasks).run();
};

module.exports = {
  run: (path, componentParams, extraQ) => ListrTasks(path, componentParams, extraQ),
};
