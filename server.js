const app = require('./config/express')();
const port = app.get('port');
const Session = require('./api/models/session.model.js')
const { Client, Location, List, Buttons, LocalAuth} = require('whatsapp-web.js')
const createClient = require('./createClient.js')

var store = require("./store.js");

// Restore servidores
Session.findAll()
    .then(data => {
        data.forEach(session => {
            //console.log(session);
            const client = createClient(session);
            store.push(client);
        });
    })
    .catch(err => {
        console.error(err);
    });

// RODANDO NOSSA APLICAÇÃO NA PORTA SETADA
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`)
});