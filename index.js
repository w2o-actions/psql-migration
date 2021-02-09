const core = require('@actions/core');
const github = require('@actions/github');
const fs = require('fs');
const util = require('util');
const db = require('./db')
const readFile = util.promisify(fs.readFile);

async function migrate(query) {
    try {
        const res = await db.query(query);
        return res;
    }
    catch (error) {
        console.log(error);
        core.setOutput(error.message, "schema");
    }
}

async function read(filename) {
    return readFile(filename, 'utf8');
}


try {
    read(process.env.SCHEMA_SCRIPT).then(async function (data) {
        await new Promise(resolve => resolve(migrate(data).then(async function (response) {

            core.setOutput(response, "schema");

            await new Promise(resolve =>
                resolve(read(process.env.SEED_SCRIPT).then(async function (data) {

                    await new Promise(resolve => resolve(migrate(data).then(async function (response) {
                        core.setOutput(response, "seed");
                    })))
                }))
            )

        })))
    });

}
catch (error) {
    core.setFailed(error.message);
}
