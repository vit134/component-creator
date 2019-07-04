/* eslint-disable no-console */
const chalk = require('chalk');
const figlet = require('figlet');

const printLogo = () => {
  console.log(
    chalk.yellow(
      figlet.textSync(`Component
    Creator`, { horizontalLayout: 'full' }),
    ),
  );
};

const printConfigSuccess = async (config) => {
  const configJson = JSON.stringify(config, null, 2);

  console.log(chalk.green('Configuration file created successfully'));
  console.log(configJson);
};

const printConfigError = async (error) => {
  console.log(chalk.red('An error occurred while creating the configuration file, try again or report a problem.'));
  console.log(error);
};

module.exports = {
  printLogo,
  printConfigSuccess,
  printConfigError,
};
