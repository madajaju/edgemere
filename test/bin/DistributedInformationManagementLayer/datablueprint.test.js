const execSync = require('child_process').execSync;

describe('DIML Test Cases', () => {
    describe('DataBluePrint deploy commandline', () => {
        let commands = [
            'bin/edgemere dataadaptor create --name filesystem --file ./templates/dataadaptor-filesystem.yaml',
            'bin/edgemere dataflow create --name filesystembasic --file ./templates/dataflow-filesystembasic.yaml',
            'bin/edgemere datablueprint create --name filesystemBluePrint1 --file ./templates/datablueprint-filesystem.yaml',
            'bin/edgemere datasource create --name myFileSystem1 --file ./templates/datasource.yaml',
            'bin/edgemere datasource create --name myFileSystem2 --file ./templates/datasource.yaml',
            'bin/edgemere diml ddf datablueprint deploy --name myBP1 --blueprint filesystemBluePrint1 --sources "mySource=myFileSystem1"',
            'bin/edgemere diml ddf datablueprint deploy --name myBP2 --blueprint filesystemBluePrint1 --sources "mySource=myFileSystem2"'
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

    describe('DataBluePrint deploy with file', () => {
        let commands = [
            'bin/edgemere dataadaptor create --name filesystem --file ./templates/dataadaptor-filesystem.yaml',
            'bin/edgemere dataflow create --name filesystembasic --file ./templates/dataflow-filesystembasic.yaml',
            'bin/edgemere datablueprint create --name filesystemBluePrint2 --file ./templates/datablueprint-filesystem.yaml',
            'bin/edgemere diml ddf datablueprint deploy --name myBPFile1 --blueprint filesystemBluePrint2 --file ./templates/datablueprint-deploy-filesystem.yaml',
            'bin/edgemere diml ddf datablueprint deploy --name myBPFile2 --blueprint filesystemBluePrint2 --file ./templates/datablueprint-deploy-filesystem.yaml',
            'bin/edgemere diml ddf datablueprint deploy --name myBPFile3 --blueprint filesystemBluePrint2 --file ./templates/datablueprint-deploy-filesystem.yaml',
            'bin/edgemere diml ddf datablueprint deploy --name myBPFile4A --blueprint filesystemBluePrint2 --sources "mySource=myFileSystem2"'
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
