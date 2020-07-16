const execSync = require('child_process').execSync;

describe('CPL Test Cases', () => {
    describe('Cloud create and build out', () => {
        let commands = [
            'bin/edgemere device create --name host1 --file ./templates/device.yaml',
            'bin/edgemere device create --name host2 --file ./templates/device.yaml',
            'bin/edgemere device create --name host3 --file ./templates/device.yaml',
            'bin/edgemere device create --name host4 --file ./templates/device.yaml',
            'bin/edgemere device create --name host5 --file ./templates/device.yaml',
            'bin/edgemere aggregateddevice create --name ad1',
            'bin/edgemere aggregateddevice create --name ad2',
            'bin/edgemere aggregateddevice adddevices --name ad1 --items host1,host2',
            'bin/edgemere aggregateddevice adddevices --name ad2 --items host3,host4',
            'bin/edgemere datacenter create --name DC1',
            'bin/edgemere datacenter create --name DC2',
            'bin/edgemere datacenter adddevices --name DC1 --items host5,host4',
            'bin/edgemere datacenter addadevices --name DC1 --items ad1',
            'bin/edgemere datacenter addadevices --name DC2 --items ad2,ad1',
            'bin/edgemere cpl datacenter disable --name DC2',
            'bin/edgemere cpl datacenter enable --name DC2',
            'bin/edgemere cpl datacenter disable --name DC2',


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
    describe('Cloud create and build out simple', () => {
        let commands = [
            'bin/edgemere device create --name host1 --file ./templates/device.yaml',
            'bin/edgemere datacenter create --name DC1',
            'bin/edgemere datacenter adddevices --name DC1 --items host1',
            'bin/edgemere cpl datacenter disable --name DC1',
            'bin/edgemere cpl datacenter enable --name DC1',
            'bin/edgemere cpl datacenter disable --name DC1'
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
