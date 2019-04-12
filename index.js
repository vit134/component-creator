#!/usr/bin/env node
const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');

const inquirer = require('./lib/inquirer');
const Listr = require('./lib/listr');
const files = require('./lib/files');

clear();

// console.log(
//   chalk.red('path.dirname(process.cwd())', path.dirname(process.cwd()))
// );

// show hello message
// eslint-disable-next-line no-console
console.log(
  chalk.yellow(
    figlet.textSync(`Component
  Creator`, { horizontalLayout: 'full' }),
  ),
);

const result = {};

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
    // компонент уже существует
    const create = await inquirer.folderExist(componentName, true);

    // перезаписать?
    if (!create[`exist_${componentName}`]) {
      // нет
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

const run = async () => {
  const dist = await distQ();
  const name = await componentNameQ(dist);
  const type = await componentTypeQ();
  const componentParams = { dist, name, type };
  const path = `${dist}/${name}`;
  Listr.run(path, componentParams);
};

run();
