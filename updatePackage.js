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
const APackage = require('ailtire/src/Server/APackage');
const AClass = require('ailtire/src/Server/AClass');
let host = process.env.AILTIRE_HOST || 'localhost'
let port = process.env.AILTIRE_PORT || 3000
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
        await updatePackage(config);
    },

});

async function updatePackage(config) {
 // await AClass.generateStateMachine("Device");
 //   await AClass.generateMethods("Device");
 await AClass.generateDocumentation("Device");
 // await AClass.generateDescription("Device");
 //   await AClass.generateDescription("Application");
 // await AClass.generateMethods("Device");
//    await APackage.updateDocumentation("PhysicalWorld");
//    await APackage.updateDocumentation("CommonPhysicalLayer");
}
