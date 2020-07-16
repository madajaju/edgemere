const execSync = require('child_process').execSync;

describe('SML Test Cases', () => {
    describe('cloudtype create and build out', () => {
        let commands = [
         'bin/edgemere cloudtype create --name aws --file ./templates/aws-cloud.yaml',
         'bin/edgemere cloudtype create --name gce --file ./templates/gce-cloud.yaml',
         'bin/edgemere cloudtype create --name azure --file ./templates/azure-cloud.yaml',
         'bin/edgemere cloudtype create --name vmware --file ./templates/vmware-cloud.yaml',
         'bin/edgemere cloudtype create --name openstack --file ./templates/openstack-cloud.yaml',
         'bin/edgemere cloudtype create --name microcloud --file ./templates/micro-cloud.yaml',
         'bin/edgemere cloud create --name cloud1 --type aws',
         'bin/edgemere cloud create --name cloud2 --type gce',
         'bin/edgemere cloud create --name cloud3 --type azure',
         'bin/edgemere cloud create --name cloud4 --type vmware',
         'bin/edgemere cloud create --name cloud5 --type openstack',
         'bin/edgemere cloud create --name cloud6 --type microcloud',
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
