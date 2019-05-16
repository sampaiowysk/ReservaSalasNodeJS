pg = require('pg');
require("dotenv").config();
PoolConnection = require('./PoolConnection');

let pool = new PoolConnection();

function UserRepository() {

}

UserRepository.prototype.cadastrarUser = (email, permissao) => {
    return new Promise((resolve, reject) => {
        pool.connect(function(err, client, done) {
            if(err) {
                return reject(err);
            }
            client.query('INSERT INTO Usuario (Email, Permissao) VALUES ($1, $2)', [email, permissao], (err, res) => {
                done();
                if(err) {
                    return reject(err.stack);
                }
                return resolve(true);
            });
        });
    });
}

UserRepository.prototype.editarUser = (email, permissao) => {
    return new Promise((resolve, reject) => {
        pool.connect(function(err, client, done) {
            if(err) {
                return reject(err);
            }
            client.query('UPDATE Usuario SET Permissao = $2 WHERE Email = $1', [email, permissao], (err, res) => {
                done();
                if(err) {
                    return reject(err.stack);
                }
                return resolve(true);
            });
        });
    });
}

UserRepository.prototype.listarUsers = () => {
    return new Promise((resolve, reject) => {
        pool.connect((err, client, done) => {
            if(err) {
                return reject(err);
            }
            client.query('SELECT * FROM Usuario', (err, res) => {
                done();
                if(err) {
                    return reject(err.stack);
                }
                if(res.rows.length > 0) {
                    return resolve(res.rows);
                } else {
                    return resolve([]);
                }
            });
        });
    });
}

UserRepository.prototype.getPermissao = (email) => {
    return new Promise((resolve, reject) => {
        pool.connect((err, client, done) => {
            if(err) {
                return reject(err);
            }
            client.query('SELECT Permissao FROM Usuario WHERE Email=$1', [email], (err, res) => {
                done();
                if(err) {
                    return reject(err.stack);
                }
                if(res.rows.length > 0) {
                    return resolve(res.rows);
                } else {
                    return resolve([]);
                }
            });
        });
    });
}

UserRepository.prototype.deletarUser = function(email) {
    return new Promise((resolve, reject) => {
        pool.connect(function(err, client, done) {
            if(err) {
                return reject(err.stack);
            }

            client.query('DELETE FROM Usuario WHERE Email=$1', [email], (err) => {
                done();
                if(err) {
                    return reject(err.stack);
                }
                return resolve(true);
            });
            
        });
    });
}

UserRepository.prototype.createDataBase = function() {
    pool.connect(function(err, client, done) {
        if(err) {
            return reject(err.stack);
        }
        client.query('CREATE TABLE Usuario(Email Text PRIMARY KEY, Permissao Text NOT NULL)', [], (err, res) => { done(); });
    });
}
    
module.exports = UserRepository;
