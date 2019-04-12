const fs = require('fs');
const PATH = require('path');

const PROJECT_PATH = process.cwd();

module.exports = {
  isExistFolder: (path) => {
    return fs.existsSync(`${PROJECT_PATH}/${path}`);
  },
  createFolder: (path) => {
    console.log(process.cwd())
    console.log(PATH.dirname(__filename));
    return new Promise((resolve, reject) => {
      fs.mkdir(`${PROJECT_PATH}/${path}`, { recursive: true }, (err) => {
        if (err) reject(err);

        resolve();
      });
    })
  },
  createFile: (path, content) => {
    return new Promise((resolve, reject) => {
      fs.writeFile(path, content, (err) => {
        if (err) reject(err);
        resolve();
      });
    })
  }
}