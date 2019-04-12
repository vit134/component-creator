const inquirer = require('inquirer');

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
  message: `${folder} ${exist ? 'allready exist, rewrite it?' : "does't exist, create it?"}`,
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
  choices: ['function', 'class'],
  default: 1,
  message: 'Choose component type',
};

module.exports = {
  distination: () => inquirer.prompt(distQ),
  folderExist: (folder, exist) => {
    const q = existFolderQ(folder, exist);
    return inquirer.prompt(q);
  },
  componentName: () => inquirer.prompt(componentNameQ),
  componentType: () => inquirer.prompt(componentTypeQ),
};
