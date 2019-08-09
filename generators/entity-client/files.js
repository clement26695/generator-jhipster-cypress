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
const constants = require('generator-jhipster/generators/generator-constants');

/* Constants use throughout */
const CLIENT_TEST_SRC_DIR = constants.CLIENT_TEST_SRC_DIR;

/**
 * The default is to use a file path string. It implies use of the template method.
 * For any other config an object { file:.., method:.., template:.. } can be used
 */

const cypressFiles = {
    test: [
        {
            path: CLIENT_TEST_SRC_DIR,
            templates: [
                {
                    file: 'cypress/fixtures/entity-body.json',
                    renameTo: generator => `cypress/fixtures/${generator.entityFileName}-body.json`
                },
                {
                    file: 'cypress/specs/entities/entity.spec.ts',
                    renameTo: generator => `cypress/specs/entities/${generator.entityFileName}.spec.ts`
                },
                {
                    file: 'cypress/support/page-objects/entities/entity-pages.ts',
                    renameTo: generator => `cypress/support/page-objects/entities/${generator.entityFileName}-pages.ts`
                },
                'cypress/support/entities.ts'
            ]
        }
    ]
};


module.exports = {
    writeFiles
};

function writeFiles() {
    // this.writeFilesToDisk(cypressFiles, this, false, '');
    this.addEntitySupportFileToIndex();
}
