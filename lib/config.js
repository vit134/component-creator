const _ = require('lodash');
const config = require('../default.config.json');

class Config {
  constructor() {
    this.config = config;
    this.mergeConfigs();
  }

  get all() {
    return this.config;
  }

  get(path, defaultValue) {
    return _.get(this.config, path, defaultValue);
  }

  mergeConfigs() {
    try {
      console.log(123);
      const userConfig = require(`${process.cwd()}/ccreator.config.json`); // eslint-disable-line
      this.config = { ...config, ...userConfig };
    } catch (e) {
      console.log(123, e);
    }
  }
}

const configure = new Config();

module.exports = configure;
