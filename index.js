#!/usr/bin/env node
const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const argv = require('minimist')(process.argv.slice(2));
const _ = require('lodash');
const config = require('./config.json');

const inquirer = require('./lib/inquirer');
const Listr = require('./lib/listr');
const files = require('./lib/files');

if (argv.d && typeof argv.d !== 'string') {
  // eslint-disable-next-line no-console
  console.log(chalk.red('If you want to use default params, you must enter component name'));
  process.exit();
}

clear();

// eslint-disable-next-line no-console
console.log(
  chalk.yellow(
    figlet.textSync(`Component
  Creator`, { horizontalLayout: 'full' }),
  ),
);

let result = {};

const distQ = async () => {
  const { dist } = await inquirer.distination();

  if (!files.isExistFolder(dist)) {
    const create = await inquirer.folderExist(dist, false);

    if (!create[`exist_${dist}`]) {
      return await distQ(); // eslint-disable-line no-return-await
    }
  }

  result.dist = dist;
  return dist;
};

const componentNameQ = async (dist) => {
  const { componentName } = await inquirer.componentName();
  const path = `${dist}/${componentName}`;
  if (files.isExistFolder(path)) {
    const create = await inquirer.folderExist(componentName, true);

    if (!create[`exist_${componentName}`]) {
      return await componentNameQ(dist); // eslint-disable-line no-return-await
    }
  }

  result.componentName = componentName;
  return componentName;
};

const componentTypeQ = async () => {
  const quest = await inquirer.componentType();
  result.componentType = quest.componentType;

  return quest.componentType;
};

const componentMockQ = async () => {
  const quest = await inquirer.mock();
  result = { ...result, ...quest };

  return { ...quest };
};

const init = async () => {
  let dist;
  let name;
  let type;
  let extraQ;

  if (!argv.d) {
    dist = await distQ();
    name = await componentNameQ(dist);
    type = await componentTypeQ();
    extraQ = {
      ...await componentMockQ(),
    };
  } else {
    dist = _.get(config, 'default.dist');
    name = argv.d;
    type = _.get(config, 'default.type');

    extraQ = {
      ..._.get(config, 'default'),
    };
  }

  const path = `${dist}/${name}`;
  const componentParams = { dist, name, type };

  Listr.run(path, componentParams, extraQ);
};

init();
