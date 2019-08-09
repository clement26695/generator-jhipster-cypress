/**
 * Copyright 2013-2019 the original author or authors from the JHipster project.
 *
 * This file is part of the JHipster project, see https://www.jhipster.tech/
 * for more information.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const chalk = require('chalk');
const constants = require('generator-jhipster/generators/generator-constants');
const needleBase = require('generator-jhipster/generators/needle-base');

const TEST_SRC_DIR = constants.CLIENT_TEST_SRC_DIR;

module.exports = class extends needleBase {
    addEntitySupportFileToIndex() {
        const errorMessage = `${chalk.yellow('Cypress: Entities support file not added to index.js.\n')}`;
        const supportFileIndex = `${TEST_SRC_DIR}cypress/support/index.ts`;
        const importEntry = 'import \'./entities\';';
        const rewriteFileModel = this.generateFileModel(supportFileIndex, 'jhipster-needle-add-support-file', importEntry);

        this.addBlockContentToFile(rewriteFileModel, errorMessage);
    }
};
