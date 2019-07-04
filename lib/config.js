const _ = require('lodash');
const { configFileName } = require('../consts');
const config = require('../default.config.json');

class Config {
  constructor() {
    this.config = config;
    // this.mergeConfigs();
  }

  get all() {
    return this.config;
  }

  get(path, defaultValue) {
    return _.get(this.config, path, defaultValue);
  }

  merge() {
    try {
      const userConfig = require(`${process.cwd()}/${configFileName}`); // eslint-disable-line
      this.config = { ...config, ...userConfig };
    } catch (e) {
      console.log('User configuration file not found');
    }
  }
}

const configure = new Config();

module.exports = configure;
