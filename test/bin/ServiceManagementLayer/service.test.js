const execSync = require('child_process').execSync;

describe('SML Test Cases', () => {
    describe('service create and build out', () => {
        let commands = [
            'bin/edgemere environment create --name dev',
            'bin/edgemere environment create --name test',
            'bin/edgemere environment create --name prod',
            'bin/edgemere service create --name common --file ./templates/service.yaml',
            'bin/edgemere service create --name simple --file ./templates/service.yaml',
        ];
        for (let i in commands) {
            let command = 'bash -c "' + commands[i] + '"';
            it('Run Command ' + command, (done) => {
                try {
                    let results = execSync(command);
                    console.log(results.toString());
                    return done();
                } catch (e) {
                    console.error(e);
                    return done(e);
                }
            });
        }
    });
    describe('complex service create', () => {
        let commands = [
            'bin/edgemere stack create --name complexServiceA --file ./templates/serviceComplex.yaml',
            'bin/edgemere stack create --name complexServiceB --file ./templates/serviceComplex.yaml',
            'bin/edgemere stack create --name stackA --file ./templates/stack.yaml',
        ];
        for (let i in commands) {
            let command = 'bash -c "' + commands[i] + '"';
            it('Run Command ' + command, (done) => {
                try {
                    let results = execSync(command);
                    console.log(results.toString());
                    return done();
                } catch (e) {
                    console.error(e);
                    return done(e);
                }
            });
        }
    });
});
