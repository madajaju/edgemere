const execSync = require('child_process').execSync;

describe('DIML Test Cases', () => {
    describe('Cloud create and build out', () => {
        let commands = [
            'bin/edgemere dataadaptor create --name filesystem1 --file ./templates/dataadaptor-filesystem.yaml',
            'bin/edgemere datasource create --name myDataVolume1 --adaptor filesystem1 --file ./templates/datasource.yaml',
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
            'bin/edgemere dataadaptor create --name filesystem2 --file ./templates/dataadaptor-filesystem.yaml',
            'bin/edgemere datasource create --name myDataVolume2 --adaptor filesystem2 --parameters "host=localhost,filesystem=/tmp/user2"',
            'bin/edgemere datasource create --name myDataVolume3 --adaptor filesystem2 --parameters "host=localhost,filesystem=/tmp/user3"',
            'bin/edgemere datasource create --name myDataVolume4 --adaptor filesystem2 --parameters "host=localhost,filesystem=/tmp/user4"',
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
