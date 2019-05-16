express = require('express');
middleware = require('./Autenticacao/Middleware');
UserService = require('../Service/UserService');

let _userService = new UserService();
let router = express.Router();

router.use(middleware);

router.get('/', (req, res) => {
    _userService.listarUsers()
        .then((users) => {
            res.send(users);
        })
        .catch((err) => {
            res.status(500);
            res.send(err);
        });
});

router.get('/:email', (req, res) => {
    _userService.getPermissao(req.params.email)
        .then((user) => {
            res.send(user);
        })
        .catch((err) => {
            res.status(500);
            res.send(err);
        });
});

router.post('/:email', function(req, res) {
    _userService.cadastrarUser(req.params.email, req.body.permissao)
        .then((sucesso) => {
            res.status(201);
            res.send(sucesso);
        })
        .catch((err) => {
            res.status(500);
            res.send(err);
        });
});

router.put('/:email', function(req, res) {
    _userService.editarUser(req.params.email, req.body.permissao)
        .then((sucesso) => {
            res.status(204);
            res.send(sucesso);
        })
        .catch((err) => {
            res.status(500);
            res.send(err);
        });
});

router.delete('/:email', function(req, res) {
    _userService.deletarUser(req.params.email)
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
