const core = require('@actions/core');
const github = require('@actions/github');
const fs = require('fs');
const { Pool } = require('pg')
const pool = new Pool();

try{
    fs.readFile(process.env.SCRIPT, 'utf8', function(err, data) {
        if (err) throw err;
        const query = data;
        console.log("here is the query \n", query);

        pool.query(query, (err, res) => {
            core.setOutput("psql", JSON.stringify(res));
            pool.end()
      });
    });
}
catch(error){
    core.setOutput("psql", error);
    core.setFailed(error.message);
}



// TOOD:


// Accept multiple files

// Schemas always run first


