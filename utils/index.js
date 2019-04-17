const toDashCase = s => s.replace(/\.?([A-Z]+)/g, (x, y) => `-${y.toLowerCase()}`).replace(/^-/, '');

const snakeToCamel = s => s.replace(/(\-\w)/g, m => m[1].toUpperCase()); // eslint-disable-line

const getComponentName = name => name.charAt(0).toUpperCase() + name.slice(1);

const compose = (...fns) => x => fns.reduceRight((v, f) => f(v), x);

module.exports = {
  toDashCase,
  snakeToCamel,
  getComponentName,
  compose,
};
