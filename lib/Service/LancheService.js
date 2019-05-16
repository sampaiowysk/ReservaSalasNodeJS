LancheRepository = require('../Repository/LancheRepository');
Calendario = require('../Agente/Calendario');

let _lancheRepository = new LancheRepository();

function LancheService() {
    
}

LancheService.prototype.salvarLanche = (nome) => {
    return new Promise((resolve, reject) => {
        _lancheRepository.salvarLanche(nome)
            .then((success) => resolve(success))
            .catch((err) => reject(err));
    });
    
}

LancheService.prototype.editarLanche = (id, nome) => {
    return new Promise((resolve, reject) => {
        _lancheRepository.editarLanche(id, nome)
            .then((success) => resolve(success))
            .catch((err) => reject(err));
    });
    
}

LancheService.prototype.listarLanches = () => {
    return new Promise((resolve, reject) => {
        _lancheRepository.listarLanches()
            .then((lanches) => resolve(lanches))
            .catch((err) => reject(err));
    });
}

LancheService.prototype.deletarLanche = function(id) {
    return new Promise((resolve, reject) => {
        _lancheRepository.deletarLanche(id)
            .then((success) => resolve(success))
            .catch((err) => reject(err));
    });
}
module.exports = LancheService;