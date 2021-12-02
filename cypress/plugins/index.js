const AzureAdSingleSignOn = require('./azure-ad-sso/plugin').AzureAdSingleSignOn

module.exports = (on, config) => {
    on('task', { AzureAdSSO: AzureAdSingleSignOn })
}