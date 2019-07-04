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

const printOk = () => {
  console.log(
    chalk.green(
      figlet.textSync('OK', { horizontalLayout: 'full' }),
    ),
  );
};

const printConfigSuccess = async (config) => {
  const configJson = JSON.stringify(config, null, 2);
  console.log('\n\n');
  console.log(chalk.green('Configuration file created successfully'));
  console.log(configJson);
  console.log('\n\n');
};

const printConfigError = async (error) => {
  console.log(chalk.red('An error occurred while creating the configuration file, try again or report a problem.'));
  console.log(error);
};

const printAddToGitIgnoreSuccess = () => {
  console.log(chalk.green('Configuration file was added to .gitignore'));
};

const printAddToGitIgnoreError = () => {
  console.log(chalk.red('Configuration file was not added to .gitignore, please add it yourself'));
};

const printSomeMessage = (text, color = 'red') => {
  console.log(chalk[color](text));
};

module.exports = {
  printLogo,
  printConfigSuccess,
  printConfigError,
  printAddToGitIgnoreSuccess,
  printAddToGitIgnoreError,
  printSomeMessage,
  printOk,
};
