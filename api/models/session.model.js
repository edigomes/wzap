const { Sequelize } = require('sequelize');
const db = require("../../config/db.js");

const Session = db.define("sessions", {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
    },
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