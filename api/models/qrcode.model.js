const { Sequelize } = require('sequelize');
const db = require("../../config/db.js");

const QRCode = db.define("qrcodes", {
    clientId: {
        type: Sequelize.STRING
    },
    cnpj: {
        type: Sequelize.STRING
    },
    qrCode: {
        type: Sequelize.STRING
    }
});

module.exports = QRCode;