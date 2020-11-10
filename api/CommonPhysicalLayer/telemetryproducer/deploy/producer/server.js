const fs = require('fs');
// Check for node_modules directory. If it exists then continue. If not ask to run npm install.
if(!fs.existsSync('./node_modules')) {
   console.error('Error: you must run "npm install" first');
   return;
}
const server = require('ailtire');
const si = require('systeminformation');

let valueObject = {
    cpu: '*',
    osInfo: '*',
    system: '*',
    mem: '*',
    battery: '*',
    graphics: '*',
    currentLoad: '*',
    processes: '*',
    fsSize: '*',
};
si.get(valueObject).then(data => console.log(data));

/* server.micro( {
    baseDir: '.',
    prefix: 'cpl/tp',
    routes: {
    },
    listenPort: 3000
});
 */
