const express = require('express');
const bodyParser = require('body-parser');
const config = require('config');
const db = require("./db.js");

module.exports = () => {
    const app = express();
    
    // SETANDO VARIÁVEIS DA APLICAÇÃO
    app.set('port', process.env.PORT || config.get('server.port'));

    // MIDDLEWARES
    app.use(bodyParser.json());

    require('../api/routes/customerWallets')(app);
    
    db.sync(() => console.log(`Banco de dados conectado: ${process.env.DB_NAME}`));

    return app;
};