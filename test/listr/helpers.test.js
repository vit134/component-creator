const mocha = require('mocha');
const { expect } = require('chai');
const fs = require('fs');
const rimraf = require('rimraf');
const helpers = require('../../lib/listr/helpers');

const {
  describe, it, before, after,
} = mocha;

let TMP_PATH;

describe('Listr', () => {
  describe('helpers', () => {
    before(() => {
      TMP_PATH = `${process.cwd()}/test/listr/tmp`;
      fs.mkdir(TMP_PATH, { recursive: true }, (err) => {
        if (err) console.log(err);
      });
    });

    describe('createIndexJs', async () => {
      it('should create index.js with correct class content', async () => {
        const componentParams = { name: 'ComponentName', type: 'class' };
        const example = fs.readFileSync(`${process.cwd()}/test/__mocks__/index_class.js`, 'utf8');

        await helpers.createIndexJs(TMP_PATH, componentParams);
        const isFile = fs.readdirSync(TMP_PATH).includes('index.js');
        const content = fs.readFileSync(`${TMP_PATH}/index.js`, 'utf8');

        expect(isFile).to.be.true; //eslint-disable-line
        expect(content).to.equal(example);
      });

      it('should create index.js with correct function content', async () => {
        const componentParams = { name: 'ComponentName', type: 'function' };
        const example = fs.readFileSync(`${process.cwd()}/test/__mocks__/index_function.js`, 'utf8');

        await helpers.createIndexJs(TMP_PATH, componentParams);
        const isFile = fs.readdirSync(TMP_PATH).includes('index.js');
        const content = fs.readFileSync(`${TMP_PATH}/index.js`, 'utf8');

        expect(isFile).to.be.true; //eslint-disable-line
        expect(content).to.equal(example);
      });
    });

    after(() => {
      rimraf(TMP_PATH, (rmDirErr) => {
        if (rmDirErr) console.log(rmDirErr);
      });

      TMP_PATH = undefined;
    });
  });
});
