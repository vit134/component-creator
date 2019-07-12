#!/usr/bin/env node
require('dotenv').config();

const clear = require('clear');
const Listr = require('listr');
const args = require('minimist');
const { configFileName, componentTypes, argsOpts } = require('./consts');

const argv = args(process.argv.slice(2), argsOpts);

const { copyTemplatesToCustomFolder } = require('./lib/template');

const {
  initialise,
  rewriteConfig: rewriteConfigQuestion,
  addConfigToGitIgnore: addConfigToGitIgnoreQuestion,
  componentFolderExist: componentFolderExistQuestion,
} = require('./questions');

const { createFile, isExistFolder, addContentToFile } = require('./lib/files');
const {
  printConfigSuccess,
  printConfigError,
  printAddToGitIgnoreSuccess,
  printAddToGitIgnoreError,
  printSomeMessage,
  printOk,
  printLogo,
} = require('./print');
const {
  createComponentFolderTask,
  rewriteFolderTask,
  createJsFileTask,
  createCssFileTask,
  createAdditionalTask,
} = require('./tasks');
const Config = require('./lib/config');

clear();
printLogo();

const run = async () => {
  const [componentName] = argv._;

  if (argv.init) {
    // Проверяем есть ли конфигурационный файл
    const isConfigFileExist = isExistFolder('./ccreator.config.json');
    if (isConfigFileExist) {
      // Задаем вопрос, нужно ли его перетереть или закончить
      const { rewriteConfig } = await rewriteConfigQuestion();

      // если нет, завершаем процесс
      if (!rewriteConfig) {
        process.exit();
      }
    }

    // Задаются вопросы для создания конфигурационного файла
    const initResult = await initialise();

    if (initResult.tmplPath) {
      await copyTemplatesToCustomFolder(initResult.tmplPath);
    }

    const configJson = JSON.stringify(initResult, null, 2);

    // Пытаемся создать конфигурационный файл
    try {
      await createFile(`./${configFileName}`, configJson);
      // Печатаем в консоль результат
      await printConfigSuccess(initResult);
      // спрашиваем нужно ли добавить исключение в .gitignore
      const { addConfigToGitIgnore } = await addConfigToGitIgnoreQuestion();

      // если да то добавляем
      if (addConfigToGitIgnore) {
        try {
          await addContentToFile('./.gitignore', `/${configFileName}`);
          printAddToGitIgnoreSuccess();
        } catch (e) {
          printAddToGitIgnoreError();
        }
      }
    } catch (e) {
      // Печатаем в консоль ошибку
      printConfigError(e);
      process.exit();
    }
  }

  if (componentName) {
    if (argv.ct) {
      if (componentTypes.includes(argv.ct)) {
        Config.set('componentType', argv.ct);
      } else {
        printSomeMessage('Option --ct must be "function" or "class"');
        process.exit();
      }
    }

    if (argv.dist) {
      Config.set('dist', argv.dist);
    }

    if (argv.jsName) {
      Config.set('jsFileName', argv.jsName);
    }

    if (argv.cssName) {
      Config.set('cssFileName', argv.cssName);
    }

    const isComponentFolderExist = isExistFolder(`${Config.get('dist')}/${componentName}`);
    const additional = Config.get('additional', []);

    if (isComponentFolderExist) {
      const { componentFolderExist } = await componentFolderExistQuestion(componentName);

      if (componentFolderExist) {
        await new Listr([rewriteFolderTask(componentName)]).run();
      } else {
        printOk();
        printSomeMessage('Try again with anouther name', 'green');
        process.exit();
      }
    } else {
      await new Listr([createComponentFolderTask(componentName)]).run();
    }

    const tasks = [
      createJsFileTask(componentName),
      createCssFileTask(componentName),
    ];

    if (additional.length && !argv['not-add']) {
      tasks.push(createAdditionalTask({ additional, componentName }));
    }

    new Listr(tasks).run().catch(({ message }) => {
      printSomeMessage(message, 'red');
    });
  }
};

run();
