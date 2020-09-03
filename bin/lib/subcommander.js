/**
 * Module dependencies.
 */

const spawn = require('child_process').spawn;
const path = require('path');
const dirname = path.dirname;
const basename = path.basename;
const fs = require('fs');
const commander = require('commander');

// Get the package.json to get the current working directory and project name.

commander.executeSubCommand = function (argv, args, unknown) {
    args = args.concat(unknown);
    if (!args.length) {
        this.help();
    }
    if (args[0] === 'help' && args.length === 1) {
        this.help();
    }

    // <cmd> --help
    if (args[0] === 'help') {
        args[0] = args[1];
        args[1] = '--help';
    }

    // executable
    let f = argv[1];

    // name of the subcommand, link `pm-install`
    let bin = args.join('/');

    // In case of globally installed, get the base dir where executable
    //  subcommand file should be located at
    let baseDir;


    let link = fs.lstatSync(f).isSymbolicLink() ? fs.readlinkSync(f) : f;

    // when symbolink is relative path
    if (link !== f && link.charAt(0) !== '/') {
        link = path.join(dirname(f), link);
    }
    baseDir = dirname(link);


    // prefer local `./<bin>` to bin in the $PATH

    // whether bin file is a js script with explicit `.js` or `.ts` extension
    let found = findCommand(args, baseDir);
    if (!found.bin) {
        // Now check the actions.
        found = findAction(args, baseDir);
        if (!found.bin) {
            // Try and print out the help for the command
            // if it cannot be found then show the help for the command
            found = findHelp(args, baseDir);
            args = ['help'];
            if (!found.bin) {
                this.help();
                console.error('error: "%s" does not exist, try --help', args.join(' '));
                return;
            }
        }
    }
    runCommand(found, found.args);
};

function exists(file) {
    try {
        if (fs.statSync(file).isFile()) {
            return true;
        }
    } catch (e) {
        return false;
    }
}

function existsDir(dir) {
    try {
        if (fs.statSync(dir).isDirectory()) {
            return true;
        }
    } catch (e) {
        if (e) {
            return false;
        }
    }
}

const isDirectory = source => fs.lstatSync(source).isDirectory();
const isFile = source => !fs.lstatSync(source).isDirectory();
const getDirectories = source => fs.readdirSync(source).map(name => path.join(source, name)).filter(isDirectory);
const getFiles = source => fs.readdirSync(source).map(name => path.join(source, name)).filter(isFile);


const findHelp = (args, baseDir) => {

    let found = _findHelpCommand(args, baseDir);
    if (!found.act) {
        found = _findHelpAction(args, baseDir);
    }
    found = _helpCommand(found);
    return found;
};

const _findHelpCommand = (args, baseDir) => {
    let bin = 0;
    let i = 0;
    let testString = baseDir;
    while (!bin && i < args.length) {
        testString += "/" + args[i];
        i++;
        if (existsDir(testString)) {
            console.log("Directory Found:", testString);
        } else if (exists(testString)) {
            bin = testString;
        } else if (exists(testString + '.js')) {
            bin = testString + '.js';
        } else if (exists(testString + '.ts')) {
            bin = testString + '.ts';
        } else if (exists(testString + '/index.js')) {
            bin = testString + '/index.js';
        }
    }
    return {bin: bin, args: args.slice(i)};
};

const findCommand = (args, baseDir) => {
    let found = _findCommand(args, baseDir);
    if (!found.bin) {
        // Look for the bin in the interface definitions.
        let interfaceDir = path.resolve(baseDir + "/../src/interface");
        let serverDir = path.resolve(baseDir + "/../src/Server");
        serverDir = serverDir.replace(/\\/g, '\\\\');
        serverDir = serverDir.replace(/\//g, '\\\\');
        let isAction = _findCommand(args, interfaceDir);
        if (isAction.bin) {
            var tdir = './.tmp/';
            var tfile = tdir + isAction.bin.replace(interfaceDir, '').split('/').pop();
            let tempString = '#!/usr/bin/env node\n\nconst program = require(\'commander\');\n\n';
            let actionPath = path.resolve(isAction.bin);
            actionPath = actionPath.replace(/\\/g, '\\\\');
            actionPath = actionPath.replace(/\//g, '\\\\');
            tempString += `const action = require('${actionPath}');\n`;
            tempString += `const ActionHandler = require('${serverDir}/Action.js');\n`;
            tempString += "global.ailtire = { config: require('" + __dirname.replace(/\\/g, '\\\\') + "/../../.ailtire.js') };\n";
            let action = require(path.resolve(isAction.bin));
            tempString += `program`;
            tempString += `\n\t.storeOptionsAsProperties(false)`;
            tempString += `\n\t.passCommandToAction(false);\n`;
            tempString += `program`;
            for (let iname in action.inputs) {
                let input = action.inputs[iname];
                if (!input.required) {
                    tempString += `\n\t.option('--${iname} <${input.type}>', '${input.description}')`;
                } else {
                    tempString += `\n\t.requiredOption('--${iname} <${input.type}>', '${input.description}')`;
                }
            }
            tempString += ';\n';
            tempString += 'program.parse(process.argv);\n';
            tempString += 'let results = ActionHandler.execute(action,program.opts(), {});\n';
            tempString += 'console.log(results);\n';

            tfile = path.resolve(tfile);
            let dirname = path.dirname(tfile);
            fs.mkdirSync(dirname, {recursive: true});
            fs.writeFileSync(tfile, tempString);
            found = {bin: tfile, args: isAction.args, temp: true};
        }
    }
    return found;
};
const _findCommand = (args, localBin) => {
    let bin = 0;
    let i = 0;
    let testString = localBin;
    while (!bin && i < args.length) {
        testString += "/" + args[i];
        i++;
        if (existsDir(testString)) {
            console.log("Directory Found:", testString);
        } else if (exists(testString)) {
            bin = testString;
        } else if (exists(testString + '.js')) {
            bin = testString + '.js';
        } else if (exists(testString + '.ts')) {
            bin = testString + '.ts';
        } else if (exists(testString + '/index.js')) {
            bin = testString + '/index.js';
        }
    }
    return {bin: bin, args: args.slice(i)};
};

const runCommand = (found, args) => {
    if (found.bin) {
        let proc;
        if (process.platform !== 'win32') {
            if (isExplicitJS) {
                args.unshift(found.bin);
                // add executable arguments to spawn
                args = (process.execArgv || []).concat(args);

                proc = spawn(process.argv[0], args, {stdio: 'inherit', customFds: [0, 1, 2]});
            } else {
                proc = spawn(bin, args, {stdio: 'inherit', customFds: [0, 1, 2]});
            }
        } else {
            args.unshift(found.bin);
            proc = spawn(process.execPath, args, {stdio: 'inherit'});
        }

        let signals = ['SIGUSR1', 'SIGUSR2', 'SIGTERM', 'SIGINT', 'SIGHUP'];
        signals.forEach((signal) => {
            process.on(signal, () => {
                if (proc.killed === false && proc.exitCode === null) {
                    proc.kill(signal);
                }
            });
        });
        proc.on('close', (err) => {
            if (found.temp) {
                // fs.unlinkSync(found.bin);
            }
            process.exit.bind(process)
        });
        proc.on('error', (err) => {
            if (err.code === 'ENOENT') {
                console.error('error: %s(1) does not exist, try --help', bin);
            } else if (err.code === 'EACCES') {
                console.error('error: %s(1) not executable. try chmod or run with root', bin);
            }
            process.exit(1);
        });

        // Store the reference to the child process
        this.runningCommand = proc;
    }
};

const findAction = (args, localBin) => {
    let found = _findAction(args, localBin);
    if (found.action) {
        // Look for the bin in the interface definitions.
        let tdir = './.tmp/';
        let tfile = tdir + found.action.path.split('/').pop();
        let action = found.action;
        let tempString = `#!/user/bin/env node
const bent = require('bent');
const program = require('commander');
const YAML = require('yamljs');
global.ailtire = { config: require('${__dirname.replace(/\\/g, '\\\\')}/../../.ailtire.js') };
program.command('${action.friendlyName} [options]', '${action.description}')`;
        for (let iname in action.inputs) {
            let input = action.inputs[iname];
            tempString += `\n\t.option('--${iname} <${input.type}>', '${input.description}')`;
        }
        tempString += `;\n`;
        tempString += `program.parse(process.argv);
let url = global.ailtire.config.host;
let args = {};
let params = '${found.action.path}?';
params += 'mode=json';
`;
        for (key in action.inputs) {
            if (action.inputs[key].type.toUpperCase() === 'YAML') {
                tempString += `if(program['${key}']) { args['${key}'] = YAML.load(program['${key}']); }\n`;
            } else {
                tempString += `if(program['${key}']) { args['${key}'] = program['${key}']; }\n`;
            }
        }
        tempString += `
const post = bent(url, 'POST', 'json', 200);
(async () => {
    const response = await post(params, args);
    console.log(response.results);
})().catch(e => {
    // Deal with the fact the chain failed
    console.error("Response Error:", e);
});`;

        tfile = path.resolve(tfile);
        let dirname = path.dirname(tfile);
        fs.mkdirSync(dirname, {recursive: true});
        fs.writeFileSync(tfile, tempString);
        found = {bin: tfile, args: found.args, temp: true};
    }
    return found;
};
const _findAction = (args, localBin) => {

    if (!global.hasOwnProperty('ailtire')) {
        return {action: null, args: args};
    }

    let action = 0;
    let i = 0;
    let aMap = actionMap();
    let found = true;
    let pathString = "";
    let aIter = aMap;
    while (found && i < args.length) {
        let nCmd = args[i].toLowerCase();
        if (!aIter.hasOwnProperty(nCmd)) {
            found = false;
        } else {
            pathString += '/' + nCmd;
            action = aIter[nCmd].action;
            // Does not have a default Action. Go to subactions
            if (action) {
                action.path = pathString;
            }
            aIter = aIter[nCmd];
        }
        i++;
    }
    return {action: action, args: args.slice(i - 1)};
};
const _findHelpAction = (args, localBin) => {
    let action = 0;
    let i = 0;
    let testString = '';
    if (!global.hasOwnProperty('ailtire')) {
        return {action: null, args: args};
    }
    let actions = {};
    for (let path in global.ailtire.config.actions) {
        let cmds = path.split('/');
        let act = actions;
        cmds.shift();
        let pathString = '';
        for (let i in cmds) {
            pathString += '/' + cmds[i];
            if (!act.hasOwnProperty(cmds[i])) {
                act[cmds[i]] = {_path: pathString};
            }
            act = act[cmds[i]];
        }
        act.action = global.ailtire.config.actions[path];
    }
    let act = actions;
    for (let i in args) {
        if (act.hasOwnProperty(args[i])) {
            act = act[args[i]];
        }
    }

    return {action: act};
};
const _helpCommand = (found) => {
        if (found.action) {
            // Look for the bin in the interface definitions.
            let tdir = './.tmp/';
            let tfile = tdir + found.action._path.split('/').pop();

            let tempString = '#!/usr/bin/env node\n\nconst program = require(\'commander\');\n\n';
            let action = found.action;
            for (let name in action) {
                if (name !== '_path') {
                    let desc = "Command with sub commands";
                    let options = "[cmds]";
                    if (action.hasOwnProperty('action')) {
                        if (action.action.hasOwnProperty('description')) {
                            desc = action.action.description;
                        }
                        tempString += `program.command('${action.action.name} [options]', '${desc}');\n`;
                    } else {
                        tempString += `program.command('${action.action.name} ${options}', '${desc}');\n`;
                    }
                    tempString += '\n';
                    tempString += 'program.parse(process.argv);\n';
                    console.log(tempString);
                    tfile = path.resolve(tfile);
                    let dirname = path.dirname(tfile);
                    fs.mkdirSync(dirname, {recursive: true});
                    fs.writeFileSync(tfile, tempString);
                    found = {bin: tfile, args: ['help'], temp: true};
                }
                return found;
            }
        }
}

const actionMap = () => {
    let actions = {};
    for (let path in global.ailtire.config.actions) {
        let npath = path;
        if (path[0] !== '/') {
            npath = '/' + path;
        }
        let cmds = npath.split('/');
        let act = actions;
        cmds.shift();
        let pathString = '';
        for (let i in cmds) {
            pathString += '/' + cmds[i];
            if (!act.hasOwnProperty(cmds[i])) {
                act[cmds[i]] = {_path: pathString};
            }
            act = act[cmds[i]];
        }
        act.action = global.ailtire.config.actions[path];
    }
    return actions;
}

