/**
 * Copyright 2013-2019 the original author or authors from the JHipster project.
 *
 * This file is part of the JHipster project, see http://www.jhipster.tech/
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

const TEST_SRC_DIR = constants.CLIENT_TEST_SRC_DIR;

const cypressFiles = {
    common: [
        {
            templates: ['cypress.json']
        }
    ],
    clientTestFw: [
        {
            path: TEST_SRC_DIR,
            templates: [
                'cypress/tsconfig.json',
                'cypress/plugins/index.js',
                'cypress/specs/account/login.spec.ts',
                'cypress/specs/administration/administration.spec.ts',
                'cypress/support/page-objects/login-page.ts',
                'cypress/support/index.ts',
                'cypress/support/authentication.ts',
                'cypress/support/navbar.ts',
                'cypress/support/utils.ts',
                // TODO: conditional adding
                'cypress/fixtures/integration-test.png'
            ]
        },
        {
            path: TEST_SRC_DIR,
            templates: [
                'cypress/specs/account/password-page.spec.ts',
                'cypress/specs/account/register.spec.ts',
                'cypress/specs/account/settings-page.spec.ts',
                'cypress/specs/administration/user-management/user-management.spec.ts',
                'cypress/specs/administration/user-management/user-management-details.spec.ts',
                'cypress/specs/administration/user-management/user-management-edit.spec.ts',
                'cypress/support/page-objects/password-page.ts',
                'cypress/support/page-objects/register-page.ts',
                'cypress/support/page-objects/settings-page.ts',
                'cypress/support/page-objects/user-management-pages.ts',
                'cypress/support/users.ts'
            ]
        }
    ]
};
module.exports = {
    writeFiles,
};

function writeFiles(generator) {
    generator.writeFilesToDisk(cypressFiles, generator, false, '');
}
