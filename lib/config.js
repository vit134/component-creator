const _ = require('lodash');
const { configFileName } = require('../consts');
const config = require('../default.config.json');

class Config {
  constructor() {
    this.config = config;
    this.merge();
  }

  get all() {
    return this.config;
  }

  get(path, defaultValue) {
    return _.get(this.config, path, defaultValue);
  }

  set(path, value) {
    _.set(this.config, path, value);
  }

  merge() {
    try {
      const userConfig = require(`${process.cwd()}/${configFileName}`); // eslint-disable-line
      this.config = { ...config, ...userConfig };
    } catch (e) {
      this.config = {
        ...this.config,
        ...this.config.default,
      };
    }
  }
}

const configure = new Config();

module.exports = configure;
