express = require('express');
bodyParser = require('body-parser');
reservaController = require('./lib/Controller/ReservaController');
lancheController = require('./lib/Controller/LancheController');
userController = require('./lib/Controller/UserController');

app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let port = process.env.PORT || 8081;

app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,DELETE,PUT");
  res.setHeader("Access-Control-Allow-Headers", "Authorization, Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
  next();
});

app.use('/api/v1/Reservas', reservaController);
app.use('/api/v1/Lanches', lancheController);
app.use('/api/v1/Usuarios', userController);

app.listen(port);

module.exports = app;


