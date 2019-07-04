/* eslint-disable no-console */
const chalk = require('chalk');
const { printLogo } = require('./print');

printLogo();
console.log(chalk.green('Thank you for using Component Creator'));
console.log('\n\n');

console.log(chalk.grey(`run ${chalk.blue('ccreator --init')} into your project directory to create a configuration file`));
console.log('\n\n');

console.log(chalk.grey(`run ${chalk.blue('ccreator --help')} to see possible options`));