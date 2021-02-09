const core = require('@actions/core');
const github = require('@actions/github');
const { Pool } = require('pg')
const pool = new Pool();

try{
    pool.query(process.env.SCRIPT, (err, res) => {
        core.setOutput("psql", JSON.stringify(res));
        pool.end()
      });
}
catch(error){
    core.setOutput("psql", error);
    core.setFailed(error.message);
}