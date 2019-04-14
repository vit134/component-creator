const _ = require('lodash');
const config = require('../ccreator.config.json');

const userConfig = require(`${process.cwd()}/ccreator.config.json`);

class Config {
  constructor() {
    this.mergeConfigs();
  }

  get all() {
    return this.config;
  }

  get(path, defaultValue) {
    return _.get(this.config, path, defaultValue);
  }

  mergeConfigs() {
    this.config = { ...config, ...userConfig };
  }
}

const configure = new Config();

module.exports = configure;
