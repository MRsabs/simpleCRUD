// eslint-disable-next-line import/no-extraneous-dependencies
const fs = require("fs-extra")
const path = require("path")

const cwd = process.cwd();

// eslint-disable-next-line func-names
(function (env = ["development"]) {
    if (env[0] === "production") {
        ['.cache'].map(dir => fs.removeSync(path.join(cwd, dir)))
    } else {
        ['.cache', 'dist'].map(dir => fs.removeSync(path.join(cwd, dir)))
    }
})(process.argv.slice(2))