ReservaRepository = require('../Repository/ReservaRepository');
Calendario = require('../Agente/Calendario');

let _calendario = new Calendario();
let _reservaRepository = new ReservaRepository();

function ReservaService() {
    
}

ReservaService.prototype.salvarReserva = function(sala, dataInicio, dataFim, email, idCalendario, descricao, titulo) {
    return new Promise((resolve, reject) => {
        _calendario.salvarEvento(sala, dataInicio, dataFim, email, idCalendario, descricao, titulo)
            .then((success) => resolve(success))
            .catch((err) => reject(err));
    });
    
}

ReservaService.prototype.editarReserva = function(id, sala, dataInicio, dataFim, email, idCalendario, descricao, titulo) {
    return new Promise((resolve, reject) => {
        _calendario.editarEvento(id, sala, dataInicio, dataFim, email, idCalendario, descricao, titulo)
            .then((success) => resolve(success))
            .catch((err) => reject(err));
    });
    
}

ReservaService.prototype.listarReservas = function(idCalendario) {
    return new Promise((resolve, reject) => {
        _calendario.obterEventos(idCalendario)
            .then((reservas) => resolve(reservas))
            .catch((err) => reject(err));
    });
}

ReservaService.prototype.listarVariasReservas = function(idsCalendarios) {
    return new Promise((resolve, reject) => {
        let reservasTotal = [];
        let promises = [];
        for(let idCalendario of idsCalendarios) {
            promises.push(_calendario.obterEventos(idCalendario)
                .then((reservas) => {
                    reservas.forEach((reserva) => {
                        reserva.idSala = idCalendario
                    });
                    reservasTotal = reservasTotal.concat(reservas);
                })
                .catch((err) => reject(err)));
        }
        Promise.all(promises).then(() => resolve(reservasTotal));
    });
}

ReservaService.prototype.deletarReserva = function(idEvento, idCalendario) {
    return new Promise((resolve, reject) => {
        _calendario.deletarEvento(idEvento, idCalendario)
            .then((success) => resolve(success))
            .catch((err) => reject(err));
    });
}
module.exports = ReservaService;