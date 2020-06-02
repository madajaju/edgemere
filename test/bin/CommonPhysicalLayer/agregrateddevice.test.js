const execSync = require('child_process').execSync;

describe(' SDI Test Cases', () => {
    describe('Cloud create and build out', () => {
        let commands = [
            'bin/edgemere device create --name host1 --file ./templates/device.yaml',
            'bin/edgemere device create --name host2 --file ./templates/device.yaml',
            'bin/edgemere device create --name host3 --file ./templates/device.yaml',
            'bin/edgemere aggregateddevice create --name ad1',
            'bin/edgemere aggregateddevice adddevices --name ad1 --items host1,host2,host3'
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
