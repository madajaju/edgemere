const execSync = require('child_process').execSync;

describe(' SDI Test Cases', () => {
    describe('Cloud create and build out', () => {
        let commands = [
            'bin/edgemere Device create --name host1 --file ./templates/device1.yaml',
            'bin/edgemere Device create --name host1a --file ./templates/device2.yaml',
            'bin/edgemere Device create --name host1b --file ./templates/device.yaml',
            'bin/edgemere Device create --name host1c --file ./templates/device.yaml',
            'bin/edgemere DataCenter create --name dca',
            'bin/edgemere DataCenter addDevices --name dca --items host1,host1a,host1b,host1c',
        ];
        for (let i in commands) {
            let command = 'bash -c "' + commands[i] + '"';
            it('Run Command ' + command, (done) => {
                try {
                    let results = execSync(command);
                    console.log(results.toString());
                    return done();
                }
                catch (e) {
                    console.error(e);
                    return done(e);
                }
            });
        }

    });
    describe('Cloud create and build out', () => {
        let commands = [
            'bin/edgemere Device create --name host1a --file ./templates/device1.yaml',
            'bin/edgemere DataCenter create --name dc1',
            'bin/edgemere Device create --name host2 --file ./templates/device.yaml',
            'bin/edgemere Device create --name host3 --file ./templates/device.yaml',
            'bin/edgemere Device create --name host4 --file ./templates/device.yaml',
            'bin/edgemere Device create --name host5 --file ./templates/device.yaml',
            'bin/edgemere Device create --name host6 --file ./templates/device.yaml',
            'bin/edgemere DataCenter addDevices --name dc1 --items host1a,host2,host3,host4,host5,host6',
            'bin/edgemere Cloud create --name cloud1',
            'bin/edgemere Cloud addDatacenters --name cloud1 --items dc1a'
        ];
        for (let i in commands) {
            let command = 'bash -c "' + commands[i] + '"';
            it('Run Command ' + command, (done) => {
                try {
                    let results = execSync(command);
                    console.log(results.toString());
                    return done();
                }
                catch (e) {
                    console.error(e);
                    return done(e);
                }
            });
        }

    });
    describe('Cloud create and build out getResource', () => {
        let commands = [
            'bin/edgemere Device create --name hostB1 --file ./templates/device.yaml',
            'bin/edgemere Device create --name hostB2 --file ./templates/device.yaml',
            'bin/edgemere Device create --name hostB3 --file ./templates/device.yaml',
            'bin/edgemere Device create --name hostB4 --file ./templates/device.yaml',
            'bin/edgemere DataCenter create --name dcB2',
            'bin/edgemere DataCenter addDevices --name dcB2 --items hostB1,hostB2,hostB3,hostB4',
            'bin/edgemere Cloud create --name cloud2',
            'bin/edgemere Cloud addDatacenters --name cloud2 --items dcB2',
            'bin/edgemere sdi getResources --name myRes --cloud cloud2 --requirements ./templates/requirements.yaml',
            'bin/edgemere sdi getResources --name myRes2 --cloud cloud2 --requirements ./templates/requirements.yaml',
            'bin/edgemere sdi getResources --name myRes3 --cloud cloud2 --requirements ./templates/requirements.yaml',
            'bin/edgemere sdi getResources --name myRes4 --cloud cloud2 --requirements ./templates/requirements.yaml',
        ];
        for (let i in commands) {
            let command = 'bash -c "' + commands[i] + '"';
            it('Run Command ' + command, (done) => {
                try {
                    let results = execSync(command);
                    console.log(results.toString());
                    return done();
                }
                catch (e) {
                    console.error(e);
                    return done(e);
                }
            });
        }
    });
    describe('Cloud create and build out getResource', () => {
        let commands = [
            'bin/edgemere sdi getResources --name myRes2 --cloud cloud1 --requirements ./templates/requirements.yaml',
        ];
        for (let i in commands) {
            let command = 'bash -c "' + commands[i] + '"';
            it('Run Command ' + command, (done) => {
                try {
                    let results = execSync(command);
                    console.log(results.toString());
                    return done();
                }
                catch (e) {
                    console.error(e);
                    return done(e);
                }
            });
        }
    });
});
