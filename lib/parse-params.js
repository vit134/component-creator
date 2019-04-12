const argv = require('minimist')(process.argv.slice(2));
const inquirer = require('./inquirer');

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
    result.useDefault = await useDefaultQ(componentName) && componentName;
  }

  return result;
};

module.exports = run;
