var fs = require('fs');
var google = require('googleapis');
var googleAuth = require('google-auth-library');

var authData = `{
    "client_id": "265362638456-vmqs7h6sd392u8h5cldt80jnb9miu8fg.apps.googleusercontent.com",
    "client_secret": "1FKUXJ1NYSmSkN1lJhhdMdFO",
    "refresh_token": "1/Ys4wfuxV5Ve-0QFdoCZFMVuQj0SgIkflDejfkgrWqPY",
    "type": "authorized_user"
  }`;

var Calendario = function () {
    let authObject = JSON.parse(authData);
    this.auth = new googleAuth.OAuth2Client(
        authObject.client_id,
        authObject.client_secret
    );

    this.auth.setCredentials({
        refresh_token: authObject.refresh_token,
        access_token: "ya29.GltkBjlYSgxJ65_hLKOYOUZNmOE0fLfLeKlh8ztwSOEDLy3EzABRS0mXt4f-qFfhoYJkniIcEI83oCHQ_6nK0cp7Z5AOxPsBmOhOKaDlmqKwARBt2IPLAQ8LxyGX"
    });

    this.calendario = new google.calendar_v3.Calendar();
}

Calendario.prototype.salvarEvento = function(sala, dataInicio, dataFim, email, idCalendario, descricao, titulo) {
    return new Promise((resolve, reject) => {
        this.naoTemConflitoDeHorario(idCalendario, dataInicio, dataFim).then((naoTemConflito) => {
            if(!naoTemConflito) {
                reject("Conflito de Horário");
                return;
            }

            var evento = {
                'summary': titulo,
                'location': sala,
                'description': descricao,
                'start': {
                    'dateTime': dataInicio.replace("Z", ""),
                    'timeZone': 'America/Sao_Paulo',
                },
                'end': {
                    'dateTime': dataFim.replace("Z", ""),
                    'timeZone': 'America/Sao_Paulo',
                },
                'attendees': [
                    {'email': email},
                ],
                'reminders': {
                    'useDefault': false,
                    'overrides': [
                        {
                            'method': 'email',
                            'minutes': 4320
                        },
                        {
                            'method': 'popup',
                            'minutes': 4320
                        }
                    ]
                },
                'guestsCanModify': false,
                'guestsCanInviteOthers': true,
                'guestsCanSeeOtherGuests': true,
                'sendNotifications ': true
            };
                
            this.calendario.events.insert({
                    auth: this.auth,
                    calendarId: idCalendario,
                    resource: evento,
                }, (err, event) => {
                    if (err) {
                        console.log('Erro ao criar evento: ' + err);
                        reject("Erro ao marcar a sala.");
                    
                    }
    
                    this.calendario.acl.insert({
                        auth: this.auth,
                        calendarId: idCalendario,
                        resource: {
                            role: "reader",
                            scope: {
                                type: "user",
                                value: email
                            }
                        }
                    }, (err, event) => {
                       if(err) {
                            console.log('Convite do calendário não enviado: ' + err);
                            resolve("Sala marcada com sucesso.");
                       } 
                       resolve('Sala marcada com sucesso.');
                    });
                });
        });
    });
}

Calendario.prototype.editarEvento = function(idEvento, sala, dataInicio, dataFim, email, idCalendario, descricao, titulo) {
    return new Promise((resolve, reject) => {
        this.naoTemConflitoDeHorario(idCalendario, dataInicio, dataFim).then((naoTemConflito) => {
            if(!naoTemConflito) {
                reject("Conflito de Horário");
                return;
            }

            var event = {
                'summary': titulo,
                'location': sala,
                'description': descricao,
                'start': {
                    'dateTime': dataInicio.replace("Z", ""),
                    'timeZone': 'America/Sao_Paulo',
                },
                'end': {
                    'dateTime': dataFim.replace("Z", ""),
                    'timeZone': 'America/Sao_Paulo',
                },
                'attendees': [
                    {'email': email},
                ],
                'reminders': {
                    'useDefault': false,
                    'overrides': [
                        {
                            'method': 'email',
                            'minutes': 4320
                        },
                        {
                            'method': 'popup',
                            'minutes': 4320
                        }
                    ]
                },
                'guestsCanModify': false,
                'guestsCanInviteOthers': true,
                'guestsCanSeeOtherGuests': true,
                'sendNotifications ': true
            };
                
            this.calendario.events.update({
                auth: this.auth,
                calendarId: idCalendario,
                eventId: idEvento,
                resource: event,
                }, function(err) {
                    if (err) {
                        console.log('Erro ao autalizar evento: ' + err);
                        reject("Erro ao autalizar a sala.");
                    }
                   resolve('Sala atualizada com sucesso.');
            });
        });
    });
}

Calendario.prototype.naoTemConflitoDeHorario = function (idCalendario, dataInicio, dataFim) {
    return new Promise((resolve) => {
        let inicioEvento = new Date(dataInicio).getTime();
        let fimEvento = new Date(dataFim).getTime();

        this.obterEventos(idCalendario).then((itens) => {
            let conflito = false;
            itens.forEach((item) => {
                let inicio = new Date(item.start.dateTime).getTime();
                let fim = new Date(item.end.dateTime).getTime();

                if((inicio <= inicioEvento && fim >= inicioEvento) || (inicio >= inicioEvento && inicio <= fimEvento)) {
                    conflito = true;
                }
            });

            resolve(!conflito);
        });
    });
}

Calendario.prototype.obterEventos = function(idCalendario) {
    return new Promise((resolve, reject) => {
        executarChamada.call(this, idCalendario, [], '');

        function executarChamada(idCalendario, itens, token) {
            this.calendario.events.list({
                auth: this.auth,
                calendarId: idCalendario,
                maxResults: 2500,
                pageToken: token
            }, (err, data) => {
                if(err) {
                    reject(err);
                }
                itens = itens.concat(data.data.items);
                if(data.nextPageToken) {
                    executarChamada(idCalendario, itens, data.data.nextPageToken);
                } else {
                    resolve(itens);
                }
            });
        }
    });
}

Calendario.prototype.deletarEvento = function(idEvento, idCalendario) {
    return new Promise((resolve, reject) => {
        this.calendario.events.delete({
            auth: this.auth,
            calendarId: idCalendario,
            eventId: idEvento,
        }, function(err, event) {
            if(err) {
                reject(err);
            }
            resolve(true);
        });
    });
}

module.exports = Calendario;




