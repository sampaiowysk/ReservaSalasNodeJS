pg = require('pg');
require("dotenv").config();
PoolConnection = require('./PoolConnection');

let pool = new PoolConnection();

function LancheRepository() {

}

LancheRepository.prototype.salvarLanche = (nomeLanche) => {
    return new Promise((resolve, reject) => {
        pool.connect(function(err, client, done) {
            if(err) {
                return reject(err);
            }
            client.query('INSERT INTO Lanche (Nome) VALUES ($1)', [nomeLanche], (err, res) => {
                done();
                if(err) {
                    return reject(err.stack);
                }
                return resolve(true);
            });
        });
    });
}

LancheRepository.prototype.editarLanche = (idLanche, nomeLanche) => {
    return new Promise((resolve, reject) => {
        pool.connect(function(err, client, done) {
            if(err) {
                return reject(err);
            }
            client.query('UPDATE Lanche SET Nome = $2 WHERE Id = $1', [idLanche, nomeLanche], (err, res) => {
                done();
                if(err) {
                    return reject(err.stack);
                }
                return resolve(true);
            });
        });
    });
}

LancheRepository.prototype.listarLanches = () => {
    return new Promise((resolve, reject) => {
        pool.connect((err, client, done) => {
            if(err) {
                return reject(err);
            }
            client.query('SELECT * FROM Lanche', (err, res) => {
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

LancheRepository.prototype.deletarLanche = function(id) {
    return new Promise((resolve, reject) => {
        pool.connect(function(err, client, done) {
            if(err) {
                return reject(err.stack);
            }

            client.query('DELETE FROM Lanche WHERE id=$1', [id], (err) => {
                done();
                if(err) {
                    return reject(err.stack);
                }
                return resolve(true);
            });
            
        });
    });
}

LancheRepository.prototype.createDataBase = function() {
    pool.connect(function(err, client, done) {
        if(err) {
            return reject(err.stack);
        }
        client.query('CREATE TABLE Lanche(id SERIAL PRIMARY KEY, Nome Text NOT NULL)', [], (err, res) => { done(); });
    });
}
    
module.exports = LancheRepository;
