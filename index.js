const { initialise } = require('./questions');
const { configFileName } = require('./consts');
const { createFile } = require('./lib/files');
const { printConfigSuccess, printConfigError } = require('./print');

const run = async () => {
  // Задаются вопросы для создания конфигурационного файла
  const initResult = await initialise();
  const configJson = JSON.stringify(initResult, null, 2);

  // Пытаемся создать конфигурационный файл
  try {
    await createFile(`./${configFileName}`, configJson);
    // Печатаем в консоль результат
    await printConfigSuccess(initResult);
  } catch (e) {
    // Печатаем в консоль ошибку
    printConfigError(e);
    process.exit();
  }
};

run();
