const inquirer = require('inquirer');
const chalk = require('chalk');

const useDefaultQ = name => ({
  name: 'useDefault',
  type: 'confirm',
  default: 0,
  message: `You are going to create a component called ${chalk.blue(name)} with default settings, are you sure?`,
});

const distQ = {
  name: 'dist',
  type: 'input',
  default: 'src/components',
  message: 'Enter destination path',
  validate: (value) => {
    if (!value) {
      return 'Enter destination path';
    }

    return true;
  },
};

const existFolderQ = (folder, exist) => ({
  name: `exist_${folder}`,
  type: 'confirm',
  default: 0,
  message: `${chalk.blue(folder)} ${exist
    ? `allready exist, rewrite it? ${chalk.grey('(all files and folders will be remove)')}`
    : "does't exist, create it?"}`,
});

const componentNameQ = {
  name: 'componentName',
  type: 'input',
  message: 'Enter name of component folder',
  validate: (value) => {
    if (!value) {
      return 'Enter name of component folder';
    }

    return true;
  },
};

const componentTypeQ = {
  name: 'componentType',
  type: 'list',
  choices: ['Class', 'Function'],
  default: 0,
  message: 'Choose component type',
};

const mockQ = [
  {
    name: 'mock',
    type: 'confirm',
    default: 0,
    message: 'Need folder for moock?',
  },
  {
    name: 'mockFolder',
    type: 'input',
    default: '__mock__',
    message: 'Enter mock folder name',
    validate: (value) => {
      if (!value) {
        return 'Enter name of component folder';
      }

      return true;
    },
    when: ({ mock }) => mock,
  },
  {
    name: 'mockFileType',
    type: 'list',
    choices: ['json', 'js'],
    default: 0,
    message: 'Choose mock file extension',
    when: ({ mock }) => mock,
  },
];

module.exports = {
  useDefault: name => inquirer.prompt(useDefaultQ(name)),
  distination: () => inquirer.prompt(distQ),
  folderExist: (folder, exist) => {
    const q = existFolderQ(folder, exist);
    return inquirer.prompt(q);
  },
  componentName: () => inquirer.prompt(componentNameQ),
  componentType: () => inquirer.prompt(componentTypeQ),
  mock: () => inquirer.prompt(mockQ),
};
