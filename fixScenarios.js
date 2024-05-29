const fs = require('fs');
// Check for node_modules directory. If it exists then continue. If not ask to run npm install.
if (!fs.existsSync('./node_modules')) {
    console.error('Error: you must run "npm install" first');
    return;
}
const OpenAI = require('openai');
const server = require('ailtire');
const AEvent = require('ailtire/src/Server/AEvent');
const AScenario = require('ailtire/src/Server/AScenario');
let host = process.env.AILTIRE_HOST || 'localhost'
let port = process.env.AILTIRE_PORT || 80
let urlPrefix = process.env.AITIRE_BASEURL || '/web'

global.openai = new OpenAI({
    apiKey: process.env.OPENAI_KEY
});

server.listen({
    baseDir: '.',
    prefix: 'edgemere',
    host: host,
    urlPrefix: urlPrefix,
    listenPort: port,
    internalURL: `${host}:${port}${urlPrefix}`,
    routes: {},
    post: async (config) => {
        await fixScenarios(config);
    },

});

async function fixScenarios(config) {
    // Iterate through all of the scenarios and generate a Given, When, then statement.
    for (let uname in global.usecases) {
        let usecase = global.usecases[uname];
        let scenarios = usecase.scenarios
        for (let sname in scenarios) {
            let scenario = scenarios[sname];
            console.log("Working on Scenario:", scenario.name);
            if (!scenario.given) {
                AScenario.generateGivenWhenThen(usecase,scenario);
            }
        }
    }
}
