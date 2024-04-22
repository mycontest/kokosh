const { spawn } = require('child_process');
const { exit } = require('./others');
const path = require('path');

let scripts = {
    pull: { type: "shell", path: path.join(__dirname, '../shell/pull.sh') },
    push: { type: "shell", path: path.join(__dirname, '../shell/push.sh') },
    backups: { type: "shell", path: path.join(__dirname, '../shell/backups.sh') },
    version: { type: "shell", path: path.join(__dirname, '../shell/version.sh') },
    help: { type: "shell", path: path.join(__dirname, '../shell/help.sh') },
    exit: { type: "function", func: exit },
}

let run = async (name, params = []) => {
    try {
        let command = scripts[name];
        if (!command) throw new Error(`Invalid script: ${name}!`);

        // Choose type
        if (command.type === "shell") await shell(command.path, params);
        if (command.type === "function") await command.func();

    } catch (err) {
        console.error(`Message: ${err.message}, ErroCode: 0001`);
        process.exit(1);
    }
}

let shell = async (path, params = []) => {
    try {
        let child = spawn('sh', [path, ...params]);

        child.stdout.on('data', (data) => {
            console.log(data.toString());
        });

        child.stderr.on('data', (data) => {
            console.error(`${data.toString()}`);
        });

        child.on('close', (code) => {
            console.log(`child process exited with code ${code}`);
        });
    } catch (error) {
        console.error(`Message: ${error.message}, ErroCode: 0002`);
        process.exit(1);
    }
}

module.exports = { run, scripts };
