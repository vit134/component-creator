module.exports = {
  argsOpts: {
    alias: {
      ct: 'componentType',
    },
    unknown: arg => console.log(`--${arg} is not valid option`),
  },
  configFileName: 'ccreator.config.json',
  componentTypes: ['function', 'class'],
  fileNamingTypes: ['dash-case', 'camelcase'],
};
