const inquirer = require('inquirer');
const config = require('../lib/config');
const { fileNamingTypes, componentTypes } = require('../consts');

const destination = {
  name: 'dist',
  type: 'input',
  default: config.get('default.dist'),
  message: 'Enter destination path',
  validate: (value) => {
    if (!value) {
      return 'Enter destination path';
    }

    return true;
  },
};

const templatePath = {
  name: 'tmplPath',
  type: 'input',
  default: config.get('default.tmplPath'),
  message: 'Enter path to template files',
};

const componentType = {
  name: 'componentType',
  type: 'list',
  choices: componentTypes,
  default: componentTypes.indexOf(config.get('default.componentType')),
  message: 'Choose component type',
};

const fileNamingType = {
  name: 'fileNamingType',
  type: 'list',
  choices: fileNamingTypes,
  default: fileNamingTypes.indexOf(config.get('default.fileNamingType')),
  message: 'Choose component naming type',
};

const jsFileName = {
  name: 'jsFileName',
  type: 'list',
  choices: ['index', 'component'],
  default: 0,
  message: 'Choose js file naming type',
};

const cssFileName = {
  name: 'cssFileName',
  type: 'list',
  choices: ['styles', 'component'],
  default: 0,
  message: 'Choose css file naming type',
};


module.exports = {
  destinationPath: () => inquirer.prompt(destination),
  templatePath: () => inquirer.prompt(templatePath),
  componentType: () => inquirer.prompt(componentType),
  fileNamingType: () => inquirer.prompt(fileNamingType),
  jsFileName: () => inquirer.prompt(jsFileName),
  cssFileName: () => inquirer.prompt(cssFileName),
  initialise: async () => inquirer.prompt([
    destination,
    templatePath,
    componentType,
    fileNamingType,
    jsFileName,
    cssFileName,
  ]),
};
