const Listr = require('listr');
const chalk = require('chalk');
const { createFolder, removeFile } = require('../lib/files');
const Config = require('../lib/config');
const {
  getJsFileName,
  getCssFileName,
  getAdditional,
} = require('../utils');

const { createJsFile, createCssFile, createAdditionalFile } = require('../lib/listr/helpers');

const PATH = () => Config.get('dist');

const createComponentFolderTask = folderName => ({
  title: `Creating component folder ${chalk.green(`${PATH()}/${folderName}`)}`,
  task: () => createFolder(`${PATH()}/${folderName}`),
});

/**
 * Возвращает объект с таской на создание js файла
 * @param {String} componentName - название js файла
 * @returns {object} таска на создание js файла
 */
const createJsFileTask = (componentName) => {
  const componentType = Config.get('componentType');
  return {
    title: `Creating ${chalk.green(getJsFileName(componentName))}`,
    task: () => createJsFile({
      path: `${PATH()}/${componentName}`,
      fileName: getJsFileName(componentName),
      componentName,
      tmpl: componentType === 'class' ? 'index_class_js.tmpl' : 'index_function_js.tmpl',
    }),
  };
};

/**
 * Возвращает объект с таской на создание css файла
 * @param {String} componentName - название css файла
 * @returns {object} таска на создание css файла
 */
const createCssFileTask = componentName => ({
  title: `Creating ${chalk.green(getCssFileName(componentName))}`,
  task: () => createCssFile({
    path: `${PATH()}/${componentName}`,
    fileName: getCssFileName(componentName),
  }),
});

/**
 * Возвращает объект с таской на перезапись папки с компонентом, в случае если такая уже имеется.
 * Удаляет а потом создает папку.
 * @param {String} componentName - имя компонента
 * @returns {object} таска перезапись папки с компонентом
 */
const rewriteFolderTask = componentName => ({
  title: `Creating folder ${chalk.green(`${PATH()}/${componentName}`)}`,
  task: () => new Listr([
    {
      title: 'Removing old component folder',
      task: () => removeFile(`${PATH()}/${componentName}`),
    },
    {
      title: 'Create new component folder',
      task: () => createFolder(`${PATH()}/${componentName}`),
    },
  ], { concurent: true }),
});

const createAdditionalTask = ({ additional, componentName }) => {
  const subTasks = getAdditional(additional).map(({
    name,
    tmpl,
    isFolder,
    path,
  }) => {
    const distPath = `${PATH()}/${componentName}`;
    return {
      title: `Creating ${isFolder ? 'folder' : 'file'} ${chalk.green(name)}`,
      task: isFolder
        ? () => createFolder(`${distPath}/${path}`)
        : () => createAdditionalFile({
          distPath,
          path,
          componentName,
          tmpl,
        }),
    };
  });

  return {
    title: 'Create additionals',
    task: () => new Listr(subTasks, { concurent: true, exitOnError: false }),
  };
};

module.exports = {
  createComponentFolderTask: folderName => createComponentFolderTask(folderName),
  createJsFileTask: componentName => createJsFileTask(componentName),
  createCssFileTask: componentName => createCssFileTask(componentName),
  rewriteFolderTask: folderPATH => rewriteFolderTask(folderPATH),
  createAdditionalTask: additional => createAdditionalTask(additional),
};
