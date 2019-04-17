#!/usr/bin/env node
require('dotenv').config();
const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');

const inquirer = require('./lib/inquirer');
const Listr = require('./lib/listr');
const files = require('./lib/files');
const utils = require('./utils');
const init = require('./lib/initialise');
const config = require('./lib/config');


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

    if (create[`exist_${componentName}`]) {
      result.overWritingFiles = await files.getFilesInFolder(path);
    } else {
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

const run = async () => {
  console.log(process.env.MODE);
  const initialValues = await init();

  let dist;
  let name;
  let type;
  let extraQ;

  if (!initialValues.useDefault) {
    dist = await distQ();
    name = await componentNameQ(dist);
    type = await componentTypeQ();
    extraQ = {
      ...await componentMockQ(),
    };
  } else {
    dist = config.get('default.dist');
    name = initialValues.useDefault;
    type = config.get('default.type');

    extraQ = {
      ...config.get('default'),
    };

    if (files.isExistFolder(`${dist}/${name}`)) {
      extraQ.overWritingFiles = await files.getFilesInFolder(`${dist}/${name}`);
    }
  }

  const path = `${dist}/${name}`;
  const componentParams = { dist, name, type };

  Listr.run(path, componentParams, extraQ);
};

run();
