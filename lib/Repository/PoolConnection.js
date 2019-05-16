const pg = require('pg');

var _pool;

function PoolConnection() {
    _pool = new pg.Pool({
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        port: process.env.DB_PORT,
        host: process.env.DB_HOST,
        role:'',
        ssl: false
    });
}

PoolConnection.prototype.pool = _pool;

PoolConnection.prototype.connect = (callback) => {
    return _pool.connect(callback);
}

PoolConnection.prototype.query = (text, values) => {
    console.log('query:', text, values)
    return _pool.query(text, values);
}


module.exports = PoolConnection;
