const execSync = require('child_process').execSync;

describe(' SDI Test Cases', () => {
    describe('Cloud create and build out', () => {
        let commands = [
            'bin/edgemere device create --name host1 --file ./templates/device1.yaml',
            'bin/edgemere device create --name host1a --file ./templates/device2.yaml',
            'bin/edgemere device create --name host1b --file ./templates/device.yaml',
            'bin/edgemere device create --name host1c --file ./templates/device.yaml',
            'bin/edgemere datacenter create --name dca',
            'bin/edgemere datacenter adddevices --name dca --items host1,host1a,host1b,host1c',
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
                    console.error(e.stdout.toString());
                    console.error(e.stderr.toString());
                    console.error(e);
                    return done(e);
                }
            });
        }

    });
    describe('Cloud create and build out', () => {
        let commands = [
            'bin/edgemere device create --name host1a --file ./templates/device1.yaml',
            'bin/edgemere datacenter create --name dc1',
            'bin/edgemere device create --name host2 --file ./templates/device.yaml',
            'bin/edgemere device create --name host3 --file ./templates/device.yaml',
            'bin/edgemere device create --name host4 --file ./templates/device.yaml',
            'bin/edgemere device create --name host5 --file ./templates/device.yaml',
            'bin/edgemere device create --name host6 --file ./templates/device.yaml',
            'bin/edgemere datacenter adddevices --name dc1 --items host1a,host2,host3,host4,host5,host6',
            'bin/edgemere cloud create --name cloud1',
            'bin/edgemere cloud adddatacenters --name cloud1 --items dc1a'
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
            'bin/edgemere device create --name hostB1 --file ./templates/device.yaml',
            'bin/edgemere device create --name hostB2 --file ./templates/device.yaml',
            'bin/edgemere device create --name hostB3 --file ./templates/device.yaml',
            'bin/edgemere device create --name hostB4 --file ./templates/device.yaml',
            'bin/edgemere datacenter create --name dcB2',
            'bin/edgemere datacenter adddevices --name dcB2 --items hostB1,hostB2,hostB3,hostB4',
            'bin/edgemere cloud create --name cloud2',
            'bin/edgemere cloud adddatacenters --name cloud2 --items dcB2',
            'bin/edgemere sdi resource get --name myRes --cloud cloud2 --requirements ./templates/requirements.yaml',
            'bin/edgemere sdi resource get --name myRes2 --cloud cloud2 --requirements ./templates/requirements2.yaml',
            'bin/edgemere sdi resource get --name myRes3 --cloud cloud2 --requirements ./templates/requirements3.yaml',
            'bin/edgemere sdi resource get --name myRes4 --cloud cloud2 --requirements ./templates/requirements.yaml',
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
            'bin/edgemere sdi getresources --name myRes2 --cloud cloud1 --requirements ./templates/requirements.yaml',
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
