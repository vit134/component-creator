const argv = require('minimist')(process.argv.slice(2));
const Config = require('./lib/config');
const { initialise, rewriteConfig: rewriteConfigQuestion } = require('./questions');
const { configFileName } = require('./consts');
const { createFile, isExistFolder } = require('./lib/files');
const { printConfigSuccess, printConfigError } = require('./print');

const run = async () => {
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
    const configJson = JSON.stringify(initResult, null, 2);

    // Пытаемся создать конфигурационный файл
    try {
      await createFile(`./${configFileName}`, configJson);
      // Печатаем в консоль результат
      await printConfigSuccess(initResult);
      Config.merge();
    } catch (e) {
      // Печатаем в консоль ошибку
      printConfigError(e);
      process.exit();
    }
  }
};

run();
