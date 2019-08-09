const chalk = require('chalk');
const semver = require('semver');
const jsonfile = require('jsonfile');
const BaseGenerator = require('generator-jhipster/generators/generator-base');
const packagejs = require('../../package.json');

const moduleConstants = require('./constants');

module.exports = class extends BaseGenerator {
    get initializing() {
        return {
            readConfig() {
                this.jhipsterAppConfig = this.getAllJhipsterConfig();
                if (!this.jhipsterAppConfig) {
                    this.error('Can\'t read .yo-rc.json');
                }

                // read config from .yo-rc.json
                this.baseName = this.jhipsterAppConfig.baseName;
                this.packageName = this.jhipsterAppConfig.packageName;
                this.packageFolder = this.jhipsterAppConfig.packageFolder;
                this.clientFramework = this.jhipsterAppConfig.clientFramework;
                this.clientPackageManager = this.jhipsterAppConfig.clientPackageManager;
            },
            displayLogo() {
                // it's here to show that you can use functions from generator-jhipster
                // this function is in: generator-jhipster/generators/generator-base.js
                this.printJHipsterLogo();

                // Have Yeoman greet the user.
                this.log(`\nWelcome to the ${chalk.bold.yellow('JHipster cypress')} generator! ${chalk.yellow(`v${packagejs.version}\n`)}`);
            },
            checkJhipster() {
                const currentJhipsterVersion = this.jhipsterAppConfig.jhipsterVersion;
                const minimumJhipsterVersion = packagejs.dependencies['generator-jhipster'];
                if (!semver.satisfies(currentJhipsterVersion, minimumJhipsterVersion)) {
                    this.warning(`\nYour generated project used an old JHipster version (${currentJhipsterVersion})... you need at least (${minimumJhipsterVersion})\n`);
                }
            }
        };
    }

    prompting() {
        const prompts = [];

        const done = this.async();
        this.prompt(prompts).then((props) => {
            this.props = props;
            // To access props later use this.props.someOption;

            done();
        });
    }

    writing() {
        // Update package.json
        const path = 'package.json';
        const packageJSON = this.fs.readJSON(path);

        // Add cypress dependencies to package.json
        packageJSON.devDependencies['@cypress/webpack-preprocessor'] = moduleConstants.CYPRESS_WEBPACK_PREPROCESSOR_VERSION;
        packageJSON.devDependencies.cypress = moduleConstants.CYPRESS_VERSION;
        packageJSON.devDependencies['cypress-file-upload'] = moduleConstants.CYPRESS_FILE_UPLOAD_VERSION;

        // Add cypress scripts to package.json
        packageJSON.scripts['e2e:cypress'] = 'cypress open';
        packageJSON.scripts['e2e:cypress:headless'] = 'cypress run';

        jsonfile.writeFileSync(path, packageJSON);

        // Add entity-client hook
        try {
            this.registerModule('generator-jhipster-cypress', 'entity-client', 'post', 'entity-client', '');
            this.registerModule('generator-jhipster-cypress', 'client', 'post', 'client', '');
        } catch (err) {
            this.log(`${chalk.red.bold('WARN!')} Could not register as a jhipster entity post creation hook...\n`);
        }
    }

    install() {
        const logMsg = `To install your dependencies manually, run: ${chalk.yellow.bold(`${this.clientPackageManager} install`)}`;

        const injectDependenciesAndConstants = (err) => {
            if (err) {
                this.warning('Install of dependencies failed!');
                this.log(logMsg);
            }
        };
        const installConfig = {
            npm: this.clientPackageManager !== 'yarn',
            yarn: this.clientPackageManager === 'yarn',
            callback: injectDependenciesAndConstants
        };
        if (this.options['skip-install']) {
            this.log(logMsg);
        } else {
            this.installDependencies(installConfig);
        }
    }

    get configuring() {
        return {
            composeClient() {
                if (this.skipClient) return;
                const options = this.options;
                const configOptions = this.configOptions;

                this.composeWith(require.resolve('../client'), {
                    ...options,
                    configOptions,
                    debug: this.isDebugEnabled
                });
            },
        };
    }

    end() {
        this.log('End of cypress generator');
    }
};
