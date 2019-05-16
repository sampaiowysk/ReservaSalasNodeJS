pg = require('pg');
uuidv4 = require('uuid/v4');
pool = require('./PoolConnection');

function ReservaRepository() {

}

ReservaRepository.prototype.salvarReserva = (sala, dataInicio, dataFim, email, idCalendario, descricao, titulo) => {
    return new Promise((resolve, reject) => {
        pool.connect((err, client, done) => {
            if(err) {
                return reject(err);
            }
            client.query('INSERT INTO Reserva (Sala, DataInicio, DataFim, Email, IdCalendario, Descricao, Titulo) VALUES ($1, $2, $3, $4, $5, $6, $7)', [sala, dataInicio, dataFim, email, idCalendario, descricao, titulo], (err, res) => {
                done();
                if(err) {
                    return reject(err.stack);
                }
                return resolve(true);
            });
        });
    });
}

ReservaRepository.prototype.listarReservas = () => {
    return new Promise((resolve, reject) => {
        pool.connect((err, client, done) => {
            if(err) {
                return reject(err);
            }
            client.query('SELECT * FROM Reserva', (err, res) => {
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

ReservaRepository.prototype.deletarReserva = (id) => {
    return new Promise((resolve, reject) => {
        pool.connect((err, client, done) => {
            if(err) {
                return reject(err.stack);
            }

            client.query('DELETE FROM Reserva WHERE id=$1', [id], (err) => {
                done();
                if(err) {
                    return reject(err.stack);
                }
                return resolve(true);
            });
            
        });
    });
}

ReservaRepository.prototype.createDataBase = () => {
    pool.connect(function(err, client, done) {
        if(err) {
            return reject(err.stack);
        }
        client.query('CREATE TABLE Reserva(id SERIAL PRIMARY KEY, Sala Text NOT NULL, DataInicio Text NOT NULL, DataFim Text NOT NULL, Email Text NOT NULL, IdCalendario Text NOT NULL, Descricao Text NOT NULL, Titulo Text NOT NULL)', [], (err, res) => { done(); });
    });
}
    
module.exports = ReservaRepository;
