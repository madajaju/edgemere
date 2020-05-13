const fs = require('fs');
// Check for node_modules directory. If it exists then continue. If not ask to run npm install.
if(!fs.existsSync('./node_modules')) {
   console.error('Error: you must run "npm install" first');
   return;
}
const server = require('ailtire');

server.micro( {
    baseDir: '.',
    prefix: '/sa',
    routes: {
    },
    listenPort: 3000
});
