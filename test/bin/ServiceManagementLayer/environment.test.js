const execSync = require('child_process').execSync;

describe('SML Test Cases', () => {
    describe('Cloud create and build out', () => {
        let commands = [
            'bin/edgemere multicloud create --name mcloud1',
            'bin/edgemere multicloud create --name mcloud2',
            'bin/edgemere multicloud create --name mcloud3',
            'bin/edgemere multicloud create --name mcloud4',
            'bin/edgemere cloud create --name cloud1',
            'bin/edgemere cloud create --name cloud2',
            'bin/edgemere cloud create --name cloud3',
            'bin/edgemere cloud create --name cloud4',
            'bin/edgemere cloud create --name cloud5',
            'bin/edgemere multicloud addclouds --name mcloud1 --items cloud1,cloud2,cloud3',
            'bin/edgemere multicloud addclouds --name mcloud2 --items cloud2,cloud4',
            'bin/edgemere multicloud addclouds --name mcloud3 --items cloud5',
            'bin/edgemere multicloud addclouds --name mcloud4 --items cloud1',
            'bin/edgemere environment create --name dev',
            'bin/edgemere environment create --name test',
            'bin/edgemere environment create --name prod',
            'bin/edgemere environment addclouds --name dev --items mcloud1',
            'bin/edgemere environment addclouds --name dev --items mcloud2',
            'bin/edgemere environment addclouds --name test --items mcloud3',
            'bin/edgemere environment addclouds --name prod --items mcloud4',
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
    describe('Add DataCenters and resources to Clouds', () => {
        let commands = [
            'bin/edgemere device create --name hostB1 --file ./templates/device.yaml',
            'bin/edgemere device create --name hostB2 --file ./templates/device.yaml',
            'bin/edgemere device create --name hostB3 --file ./templates/device.yaml',
            'bin/edgemere device create --name hostB4 --file ./templates/device.yaml',
            'bin/edgemere datacenter create --name dcB2',
            'bin/edgemere datacenter adddevices --name dcB2 --items hostB1,hostB2,hostB3,hostB4',
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
});
