#!/usr/bin/env node

const prompts = require('prompts');
const { scripts, run } = require('./function/runner');

const start = async () => {
    try {
        const args = process.argv;
        let command = args[2];

        // Check if command line argument is provided
        if (command) {
            if (command === '-h') command = "help";
            if (command === '-v') command = "version";
            await run(command, []);
        } else {
            // If no command line argument, prompt the user for input
            const response = await prompts({
                type: 'text',
                name: 'command',
                message: 'What do you want to do?',
                validate: value => !scripts[value] ? "This command was not found, see 'help'." : true
            });
            command = response.command;
            await run(command, []);
        }
    } catch (err) {
        console.log(`Message: ${err.message}, ErrorCode: 0000.`);
        process.exit(1);
    }
}

start();

