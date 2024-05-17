const fs = require('fs');
// Check for node_modules directory. If it exists then continue. If not ask to run npm install.
if(!fs.existsSync('./node_modules')) {
   console.error('Error: you must run "npm install" first');
   return;
}
const server = require('ailtire');
let host = process.env.AILTIRE_HOST || 'localhost'
let port = process.env.AILTIRE_PORT || 80
let urlPrefix = process.env.AITIRE_BASEURL || '/web'


server.listen( {
    baseDir: '.',
    prefix: 'edgemere',
    host: host,
    urlPrefix: urlPrefix,
    listenPort: port,
    internalURL: `${host}:${port}${urlPrefix}`,
    routes: {
    },
});

