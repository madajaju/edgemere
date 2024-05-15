const execSync = require('child_process').execSync;
const fs = require('fs');

let ucDir = "./api/CommonPhysicalLayer/PhysicalWorld/usecases/DecommissionPhysicalAsset";
let binApp = "bin/"

function addTest(suite, title, fn) {
    let test = new Test(title, fn);
    test.file = __filename;
    suite.addTest(test);
    return test;
}

function addSuite(suite, title, fn) {
    let csuite = new Suite(title, fn);
    csuite.file = __filename;
    suite.addSuite(csuite);
    return csuite;
}

function buildScenario(suite, scenario) {
    for(let j in scenario.steps) {
        let step = scenario.steps[j];
        let cmd = step.action.replace(/\//,' ');
        let params = "";
        for(let name in step.parameters) {
            let value = step.parameters[j];
            params += `--${name} ${value} `;
        }
        let command = `bash -c "${binApp.replace(/\\/g, '\/')} ${cmd} ${params}"`;

        addTest(suite, 'Run Command ' + command, (done) => {
            try {
                let results = execSync(command).toString();
                console.log(results);
                return done();
            }
            catch (e) {
                console.error(e);
                console.error(e.stderr.toString());
                return done(e);
            }
        });
    }
}

let topSuite = describe('Decommission Physical Asset', () => {
    before(() => {
        let dir = fs.readdirSync(ucDir);
        for (let i in dir) {
            let file = dir[i];
            if (file != 'index.js') {
                let apath = path.resolve(`${ucDir}/${file}`);
                let scenario = require(apath);
                let suitei = addSuite(topSuite, "Run Scenario: " + scenario.name, () => {
                    console.log("Run Scenario:", scenario.name);
                });
                buildScenario(suitei, scenario);
            }
        }
    });
    it('Build Scenarios', (done) => {
        console.log("Scenarios Built");
        done();
    });
    /*
    describe('Additional test suite', (done) => {
        it('TestCase', (done) => {
        };
     */
});
