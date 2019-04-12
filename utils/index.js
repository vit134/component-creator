module.exports = {
  toDashCase: s => s.replace(/\.?([A-Z]+)/g, (x, y) => `-${y.toLowerCase()}`).replace(/^-/, ''),
  getComponentName: name => name.charAt(0).toUpperCase() + name.slice(1),
};
