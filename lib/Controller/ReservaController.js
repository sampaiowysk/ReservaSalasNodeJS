express = require('express');
middleware = require('./Autenticacao/Middleware');
ReservaService = require('../Service/ReservaService');

let _reservaService = new ReservaService();
let router = express.Router();

router.use(middleware);

router.get('/', function(req, res) {
    _reservaService.listarReservas(req.query.idCalendario)
        .then((reservas) => {
            res.send(reservas);
        })
        .catch((err) => {
            res.status(500);
            res.send(err);
        });
});

router.get('/many', function(req, res) {
    _reservaService.listarVariasReservas(req.query.idsCalendarios)
        .then((reservas) => {
            res.send(reservas);
        })
        .catch((err) => {
            res.status(500);
            res.send(err);
        });
});

router.post('/', function(req, res) {
    _reservaService.salvarReserva(req.body.sala, req.body.dataInicio, req.body.dataFim, req.body.email, req.body.idCalendario, req.body.descricao, req.body.titulo)
        .then((sucesso) => {
            res.send(sucesso);
        })
        .catch((err) => {
            res.status(500);
            res.send(err);
        });
});

router.put('/', function(req, res) {
    _reservaService.editarReserva(req.body.id, req.body.sala, req.body.dataInicio, req.body.dataFim, req.body.email, req.body.idCalendario, req.body.descricao, req.body.titulo)
        .then((sucesso) => {
            res.send(sucesso);
        })
        .catch((err) => {
            res.status(500);
            res.send(err);
        });
});

router.delete('/', function(req, res) {
    _reservaService.deletarReserva(req.query.idEvento, req.query.idCalendario)
        .then((sucesso) => {
            res.send(sucesso);
        })
        .catch((err) => {
            res.status(500);
            res.send(err);
        });
});

module.exports = router;
