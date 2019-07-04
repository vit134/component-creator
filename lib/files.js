const newLineChar = require('os').EOL;
const fs = require('fs');
const rimraf = require('rimraf');

const PROJECT_PATH = process.cwd();

const isExistFolder = path => fs.existsSync(`${PROJECT_PATH}/${path}`);

const createFile = (path, content = '') => (
  new Promise((resolve, reject) => {
    fs.writeFile(path, content, (err) => {
      if (err) reject(err);
      resolve();
    });
  })
);

module.exports = {
  isExistFolder,
  createFile,
  createFolder: path => (
    new Promise((resolve, reject) => {
      fs.mkdir(`${PROJECT_PATH}/${path}`, { recursive: true }, (err) => {
        if (err) reject(err);

        resolve();
      });
    })
  ),
  getFilesInFolder: path => (
    new Promise((resolve, reject) => {
      fs.readdir(path, (err, files) => {
        if (err) reject(err);

        resolve(files);
      });
    })
  ),
  removeFile: path => (
    new Promise((resolve, reject) => {
      fs.stat(path, (statErr, stats) => {
        if (statErr) reject(statErr);
        const isDir = stats.isDirectory();

        if (isDir) {
          rimraf(path, (rmDirErr) => {
            if (rmDirErr) reject(rmDirErr);

            resolve();
          });
        } else {
          fs.unlink(path, (err) => {
            if (err) reject(err);

            resolve();
          });
        }
      });
    })
  ),
  addContentToFile: (path, content) => {
    const isFileExist = isExistFolder(path);

    if (isFileExist) {
      fs.appendFileSync(path, `${newLineChar}${content}`);
    } else {
      createFile(path, content);
    }
  },
};
