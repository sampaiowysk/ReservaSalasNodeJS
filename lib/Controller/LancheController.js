express = require('express');
middleware = require('./Autenticacao/Middleware');
LancheService = require('../Service/LancheService');

let _lancheService = new LancheService();
let router = express.Router();

router.use(middleware);

router.get('/', (req, res) => {
    _lancheService.listarLanches()
        .then((lanches) => {
            res.send(lanches);
        })
        .catch((err) => {
            res.status(500);
            res.send(err);
        });
});

router.post('/', function(req, res) {
    _lancheService.salvarLanche(req.body.nome)
        .then((sucesso) => {
            res.status(201);
            res.send(sucesso);
        })
        .catch((err) => {
            res.status(500);
            res.send(err);
        });
});

router.put('/:id', function(req, res) {
    _lancheService.editarLanche(req.params.id, req.body.nome)
        .then((sucesso) => {
            res.status(204);
            res.send(sucesso);
        })
        .catch((err) => {
            res.status(500);
            res.send(err);
        });
});

router.delete('/:id', function(req, res) {
    _lancheService.deletarLanche(req.params.id)
        .then((sucesso) => {
            res.status(204);
            res.send(sucesso);
        })
        .catch((err) => {
            res.status(500);
            res.send(err);
        });
});

module.exports = router;
