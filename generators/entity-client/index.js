const chalk = require('chalk');
const constants = require('generator-jhipster/generators/generator-constants');
const EntityClientGenerator = require('generator-jhipster/generators/entity-client');
const utils = require('generator-jhipster/generators/utils');
const writeFiles = require('./files').writeFiles;

const TEST_SRC_DIR = constants.CLIENT_TEST_SRC_DIR;

module.exports = class extends EntityClientGenerator {
    constructor(args, opts) {
        if (opts.context === undefined) {
            opts.context = {};
        }
        super(args, opts);
        this.isDebugEnabled = true;
    }

    get writing() {
        return {
            writeAdditionalFile() {
                writeFiles.call(this);
            }
        };
    }

    get end() {
        // Here we are not overriding this phase and hence its being handled by JHipster
        return super._end();
    }

    addEntitySupportFileToIndex() {
        try {
            const supportFileIndex = `${TEST_SRC_DIR}cypress/support/index.ts`;
            const importEntry = 'import \'./entities\';';
            utils.rewriteFile({
                file: supportFileIndex,
                needle: 'jhipster-needle-add-support-file',
                splicable: [
                    this.stripMargin(importEntry)
                ]
            }, this);
        } catch (e) {
            this.log(`${chalk.yellow('Cypress: Entities support file not added to index.js.\n')}`);
            this.debug('Error:', e);
        }
    }
};
