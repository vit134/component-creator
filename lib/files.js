const fs = require('fs');

const PROJECT_PATH = process.cwd();

module.exports = {
  isExistFolder: path => fs.existsSync(`${PROJECT_PATH}/${path}`),
  createFolder: path => (
    new Promise((resolve, reject) => {
      fs.mkdir(`${PROJECT_PATH}/${path}`, { recursive: true }, (err) => {
        if (err) reject(err);

        resolve();
      });
    })
  ),
  createFile: (path, content) => (
    new Promise((resolve, reject) => {
      fs.writeFile(path, content, (err) => {
        if (err) reject(err);
        resolve();
      });
    })
  ),
};
