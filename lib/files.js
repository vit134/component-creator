const fs = require('fs');
const path = require('path');

const PROJECT_PATH = path.dirname(path.dirname(process.cwd()));

console.log(
  chalk.red('PROJECT_PATH', PROJECT_PATH)
);

module.exports = {
  isExistFolder: (path) => {
    return fs.existsSync(`${PROJECT_PATH}/${path}`);
  },
  createFolder: (path) => {
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