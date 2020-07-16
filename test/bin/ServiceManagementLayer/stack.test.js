const execSync = require('child_process').execSync;

describe('SML Test Cases', () => {
    describe('stack create and build out', () => {
        let commands = [
            'bin/edgemere environment create --name dev',
            'bin/edgemere environment create --name test',
            'bin/edgemere environment create --name prod',
            'bin/edgemere stack create --name stack1 --file ./templates/stack.yaml',
            'bin/edgemere stack create --name stack2 --file ./templates/stack.yaml',
            'bin/edgemere sml so stack deploy --name stack2 --tag MyRun',
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
