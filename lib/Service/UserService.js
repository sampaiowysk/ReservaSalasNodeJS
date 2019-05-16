UserRepository = require('../Repository/UserRepository');
Calendario = require('../Agente/Calendario');

let _userRepository = new UserRepository();

function UserService() {
    
}

UserService.prototype.cadastrarUser = (email, permissao) => {
    return new Promise((resolve, reject) => {
        _userRepository.cadastrarUser(email, permissao)
            .then((success) => resolve(success))
            .catch((err) => reject(err));
    });
    
}

UserService.prototype.editarUser = (email, permissao) => {
    return new Promise((resolve, reject) => {
        _userRepository.editarUser(email, permissao)
            .then((success) => resolve(success))
            .catch((err) => reject(err));
    });
    
}

UserService.prototype.listarUsers = () => {
    return new Promise((resolve, reject) => {
        _userRepository.listarUsers()
            .then((users) => resolve(users))
            .catch((err) => reject(err));
    });
}

UserService.prototype.getPermissao = (email) => {
    return new Promise((resolve, reject) => {
        _userRepository.getPermissao(email)
            .then((user) => resolve(user))
            .catch((err) => reject(err));
    });
}

UserService.prototype.deletarUser = function(email) {
    return new Promise((resolve, reject) => {
        _userRepository.deletarUser(email)
            .then((success) => resolve(success))
            .catch((err) => reject(err));
    });
}
module.exports = UserService;