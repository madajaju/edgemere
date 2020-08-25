const execSync = require('child_process').execSync;

describe('SML Test Cases', () => {
    describe('stack create and build out', () => {
        let commands = [
            'bin/edgemere environment create --name dev',
            'bin/edgemere environment create --name test',
            'bin/edgemere environment create --name prod',
            'bin/edgemere service create --name common --file ./templates/service.yaml',
            'bin/edgemere service create --name simple --file ./templates/service.yaml',
            'bin/edgemere stack create --name stack1 --file ./templates/stack.yaml',
            'bin/edgemere stack create --name stack2 --file ./templates/stack.yaml',
            'bin/edgemere stack create --name complexServiceA --file ./templates/serviceComplex.yaml',
            'bin/edgemere stack create --name complexServiceB --file ./templates/serviceComplex.yaml',
            'bin/edgemere stack create --name stackA --file ./templates/stack.yaml',
            'bin/edgemere sml so stack deploy --name stack1 --tag MyRun1 --env dev',
            'bin/edgemere sml so stack deploy --name stack1 --tag MyRun2 --env dev',
            'bin/edgemere sml so stack deploy --name stack1 --tag MyRun3 --env dev',
            'bin/edgemere sml so stack deploy --name stack2 --tag MyRunA --env dev',
            'bin/edgemere sml so stack deploy --name stack2 --tag MyRunB --env dev',
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
    describe('stack create and build out', () => {
        let commands = [
            'bin/edgemere sml so stack deploy --name stack1 --tag MyRun1A --env dev',
            'bin/edgemere sml so stack deploy --name stack1 --tag MyRun1B --env dev',
            'bin/edgemere sml so stack deploy --name stack2 --tag MyRun2 --env dev',
            'bin/edgemere sml so stack deploy --name stackA --tag MyRunA --env dev',
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
