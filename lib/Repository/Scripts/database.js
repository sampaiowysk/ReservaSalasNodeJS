var fs = require('fs');
require("dotenv").config();
PoolConnection = require('../PoolConnection');

var sql = fs.readFileSync('lib/Repository/Scripts/CreateTable.sql').toString();
var pool = new PoolConnection();

pool.connect(function(err, client, done) {
    if(err) {
        console.log('error: ', err);
        process.exit(1);
    }
    
    client.query(sql, (err, res) => {
        done();
        if(err){
            console.log('error: ', err);
            process.exit(1);
        }
        process.exit(0);
    });
});