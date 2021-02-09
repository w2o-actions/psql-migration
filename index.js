const core = require('@actions/core');
const github = require('@actions/github');
const fs = require('fs');
const { Pool } = require('pg')
const pool = new Pool();

try{
    fs.readFile(process.env.SCHEMA_SCRIPT, 'utf8', function(err, data) {
        if (err) throw err;
        const query = data;
        console.log("here is the query \n", query);

        pool.query(query, (err, res) => {
            core.setOutput("psql", res);
            pool.end()
      });
    });
}
catch(error){
    core.setOutput("psql", error.message);
    core.setFailed(error.message);
}


try{
    fs.readFile(process.env.SEED_SCRIPT, 'utf8', function(err, data) {
        if (err) throw err;
        const query = data;
        console.log("here is the query \n", query);

        pool.query(query, (err, res) => {
            core.setOutput("psql", res);
            pool.end()
      });
    });
}
catch(error){
    core.setOutput("psql", error.message);
    core.setFailed(error.message);
}

