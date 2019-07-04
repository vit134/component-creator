const Config = require('../lib/config');

const fileNamingType = Config.get('fileNamingType');

const toDashCase = s => s.replace(/\.?([A-Z]+)/g, (x, y) => `-${y.toLowerCase()}`).replace(/^-/, '');

const snakeToCamel = s => s.replace(/(\-\w)/g, m => m[1].toUpperCase()); // eslint-disable-line

const getComponentName = name => name.charAt(0).toUpperCase() + name.slice(1);

const compose = (...fns) => x => fns.reduceRight((v, f) => f(v), x);

const getJsFileName = (componentName) => {
  const jsFileName = Config.get('jsFileName');

  if (jsFileName === 'component') {
    switch (fileNamingType) {
      case 'dash-case':
        return `${componentName}.js`;
      case 'camelcase':
        return `${snakeToCamel(componentName)}.js`;
      default:
        break;
    }
  }

  return 'index.js';
};

const getCssFileName = (componentName) => {
  const cssFileName = Config.get('cssFileName');

  if (cssFileName === 'component') {
    switch (fileNamingType) {
      case 'dash-case':
        return `${componentName}.css`;
      case 'camelcase':
        return `${snakeToCamel(componentName)}.css`;
      default:
        break;
    }
  }

  return 'styles.css';
};

module.exports = {
  toDashCase,
  snakeToCamel,
  getComponentName,
  compose,
  getJsFileName,
  getCssFileName,
};
