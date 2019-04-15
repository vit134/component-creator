const Listr = require('listr');
const _ = require('lodash');
const chalk = require('chalk');

const files = require('../files');
const utils = require('../../utils');
const helpers = require('./helpers');
const config = require('../config');

const ListrTasks = (path, componentParams, extraQ) => {
  const { name } = componentParams;
  const overWritingFiles = _.get(extraQ, 'overWritingFiles');
  const componentFolderTaskTitle = overWritingFiles
    ? `Overwriting folder ${chalk.red(name)}`
    : `Creating ${chalk.green(name)} folder`;

  const componentFolderTask = overWritingFiles
    ? helpers.overwritingFilesListr(overWritingFiles, path)
    : () => files.createFolder(path);

  const additional = config.get('additional')
    ? helpers.createAdditionaltasks(config.get('additional', []), path, componentParams.name)
    : [];

  const tasks = [
    {
      title: componentFolderTaskTitle,
      task: componentFolderTask,
    },
    {
      title: `Creating ${chalk.green('index.js')}`,
      task: () => helpers.createIndexJs(path, componentParams),
    },
    {
      title: `Сreating ${chalk.green(`${utils.toDashCase(name)}.css`)}`,
      task: () => helpers.createStyles(path, componentParams),
    },
    ...additional,
  ];

  if (extraQ && extraQ.mock && extraQ.mockFolder) {
    tasks.push({
      title: `Сreating ${chalk.green(extraQ.mockFolder)} folder`,
      task: () => helpers.createMocks(path, extraQ.mockFolder, extraQ.mockFileType),
    });
  }

  return new Listr(tasks).run();
};

module.exports = {
  run: (path, componentParams, extraQ) => ListrTasks(path, componentParams, extraQ),
};
