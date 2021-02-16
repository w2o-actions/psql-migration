// Core
const core = require('@actions/core');
const github = require('@actions/github');
// Extras
const fs = require('fs');
const util = require('util');
const db = require('./db')
// Promisfy
const readFile = util.promisify(fs.readFile);
// Nicenames
const db_name = process.env.PGDATABASE;
const schema_script = process.env.SCHEMA_SCRIPT;
const seed_script = process.env.SEED_SCRIPT;

async function migrate(query) {
    try {
        const res = await db.query(query);
        return res;
    }
    catch (error) {
        core.setFailed("schema",error.message);
    }
}

async function read(filename) {
    return readFile(filename, 'utf8');
}


try {
    if(schema_script){
        read(schema_script).then(async function (data) {
            await new Promise(resolve => resolve(migrate(data).then(async function (response) {
    
                core.setOutput("schema", response);
                if(seed_script){
                    await new Promise(resolve =>
                        resolve(read(seed_script).then(async function (data) {
        
                            await new Promise(resolve => resolve(migrate(data).then(async function (response) {
                                core.setOutput("seed", response);
                            })))
                        }))
                    )
                }
                else{
                    core.setOutput("seed", "no seed migrations provided");
                }

    
            })))
        });
    }
    else{
        core.setOutput("schema", "no schema migrations provided");
    }
    

}
catch (error) {
    core.setFailed(error.message);
}
