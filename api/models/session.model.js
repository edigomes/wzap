const { Sequelize } = require('sequelize');
const db = require("../../config/db.js");

const Session = db.define("sessions", {
    clientId: {
        type: Sequelize.STRING
    },
    cnpj: {
        type: Sequelize.STRING
    },
    webhookUrl: {
        type: Sequelize.STRING
    }
});

module.exports = Session;