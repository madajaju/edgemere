const execSync = require('child_process').execSync;

describe('SML Test Cases', () => {
    describe('MultiCloud create and build out', () => {
        let commands = [
            'bin/edgemere cloudtype create --name aws --file ./templates/aws-cloud.yaml',
            'bin/edgemere multicloud create --name mcloud1',
            'bin/edgemere cloud create --name cloud1 --type aws',
            'bin/edgemere cloud create --name cloud2 --type aws',
            'bin/edgemere cloud create --name cloud3 --type aws',
            'bin/edgemere multicloud addclouds --name mcloud1 --items cloud1,cloud2,cloud3',
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
