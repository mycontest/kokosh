const path = require('path');
const fs = require('fs');

let exit = () => {
    console.log("Bye Bye 👋");
    process.exit();
}

let version = () => {
    console.log(JSON.parse(fs.readFileSync(path.join(__dirname, "../package.json"))).version)
}

module.exports = { exit, version }