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
            let json = JSON.stringify(scenario);
            if (!scenario.given) {
                // Generate Given, When, Then
                let response = await _askAI(json);
                console.log("AI Response:", response);
                let resObj = JSON.parse(response);
                if(typeof resObj === 'Array') {
                    resObj = resObj[0];
                }
                scenario.given = resObj.given;
                scenario.when = resObj.when;
                scenario.then = resObj.then;
                // Update the scenario
                AScenario.save(usecase,scenario);
            }
        }
    }
}

async function _askAI(prompt) {
    AEvent.emit('genai.started', {message: prompt});
    const completion = await global.openai.chat.completions.create({
        model: "gpt-4",
        messages: [
            {
                role: 'system',
                content: 'Using the Given,When,Then scenario paradigm createa given, when, then statement for the' +
                    ' following scenario description. Limit each given,when and then statement to less than 80' +
                    ' characters. There should be one response. The results should be in json format, with the' +
                    ' given, when and then at the top level of the json. json keys should be in all lowercase.'
            },
            {
                role: 'user',
                content: prompt,
                name: 'guth',
            }
        ]
    });
    AEvent.emit('genai.completed', {message: prompt});
    return completion.choices[0].message.content;
}
