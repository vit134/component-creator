const Config = require('../lib/config');

const toDashCase = s => String(s).replace(/\.?([A-Z]+)/g, (x, y) => `-${y.toLowerCase()}`).replace(/^-/, '');

const snakeToCamel = s => String(s).replace(/(\-\w)/g, m => m[1].toUpperCase()); // eslint-disable-line

const getComponentName = name => name.charAt(0).toUpperCase() + name.slice(1);

const compose = (...fns) => x => fns.reduceRight((v, f) => f(v), x);

const getJsFileName = (componentName) => {
  const jsFileName = Config.get('jsFileName');

  if (jsFileName === 'component') {
    return `${componentName}.js`;
  }

  return 'index.js';
};

const getCssFileName = (componentName) => {
  const cssFileName = Config.get('cssFileName');

  if (cssFileName === 'component') {
    return `${componentName}.css`;
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
