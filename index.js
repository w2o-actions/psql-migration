const core = require('@actions/core');
const github = require('@actions/github');
const fs = require('fs');
const { Pool } = require('pg')
const pool1 = new Pool();
const pool2 = new Pool();

try{
    fs.readFile(process.env.SCHEMA_SCRIPT, 'utf8', function(err, data) {
        if (err) throw err;
        const query = data;
        console.log("here is the query \n", query);

        pool1.query(query, (err, res) => {
            core.setOutput("psql", res);
            pool1.end()
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

        pool2.query(query, (err, res) => {
            core.setOutput("psql", res);
            pool2.end()
      });
    });
}
catch(error){
    core.setOutput("psql", error.message);
    core.setFailed(error.message);
}

