const argv = require('minimist')(process.argv.slice(2));
const inquirer = require('./inquirer');
const utils = require('../utils');

const useDefaultQ = async (name) => {
  const { useDefault } = await inquirer.useDefault(name);
  return useDefault;
};

const run = async () => {
  const result = {};

  const [componentName] = argv._;
  const force = argv.f;

  if (force) {
    result.useDefault = componentName;
  }

  if (componentName && !force) {
    const normaliseComponentName = utils.getComponentName(componentName);
    result.useDefault = await useDefaultQ(normaliseComponentName) && normaliseComponentName;
  }

  return result;
};

module.exports = run;
