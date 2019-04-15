const mocha = require('mocha');
const fs = require('fs');
const assert = require('assert');

const template = require('../../lib/template');

const { describe, it } = mocha;


describe('Template', () => {
  describe('getFileContent', () => {
    it('should return correct string', async () => {
      const name = 'ComponentName';
      const tmplFileName = 'index_class_js';

      const content = fs.readFileSync(`${process.cwd()}/test/__mocks__/index_class.js`, 'utf8');
      const expect = await template.getFileContent({ name, tmplFileName });

      assert.equal(content, expect);
    });
  });
});
