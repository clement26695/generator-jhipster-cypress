const chalk = require('chalk');
const BaseGenerator = require('generator-jhipster/generators/generator-base');
const files = require('./files');

module.exports = class extends BaseGenerator {
    get initializing() {
        return {
            displayLogo() {
                this.log(chalk.white(`Running ${chalk.bold('JHipster Cypress')} Generator!`));
            },
            setupClientconsts() {
                const configuration = this.getAllJhipsterConfig(this, true);
                this.serverPort = configuration.get('serverPort') || this.configOptions.serverPort || 8080;
                this.applicationType = configuration.get('applicationType') || this.configOptions.applicationType;
                if (!this.applicationType) {
                    this.applicationType = 'monolith';
                }
                this.authenticationType = configuration.get('authenticationType') || this.configOptions.authenticationType;
                this.databaseType = configuration.get('databaseType') || this.configOptions.databaseType;
                this.clientFramework = configuration.get('clientFramework') || this.configOptions.clientFramework;

                const baseName = configuration.get('baseName');
                if (baseName) {
                    this.baseName = baseName;
                }
            },
        };
    }

    prompting() {
        // don't prompt if data are imported from a file
        const done = this.async();
        const prompts = [];

        this.prompt(prompts).then((props) => {
            this.props = props;
            // To access props later use this.props.someOption;

            done();
        });
    }

    get writing() {
        return {
            writeFiles() {
                return files.writeFiles(this);
            },
        };
    }
};
