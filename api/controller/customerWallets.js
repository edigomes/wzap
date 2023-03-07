const Session = require("../models/session.model.js");
const QRCode = require("../models/qrcode.model.js");
const store = require("../../store.js");
const createClient = require('../../createClient.js')

module.exports = () => {
    const customerWalletsDB = require('../data/customer-wallets.json');
    const controller = {};

    controller.addClient = async (req, res) => {
        try {
            const session_data = req.body;
            const session = await Session.create({
                clientId: session_data.clientId,
                cnpj: session_data.cnpj,
                webhookUrl: session_data.webhookUrl
            });
            const zapClient = createClient(session);
            store.push(zapClient);
            res.status(200).json({
                clients: store.length
            });
        } catch (err) {
            //console.log(err);
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving tutorials."
            });
        }
    }

    controller.sendMessage = async (req, res) => {
        const msg_data = req.body;
        const zapClientStoreList = store.filter((client) => {
            return client.clientId == msg_data.clientId;
        });
        if (zapClientStoreList.length) {

            const zapClient = zapClientStoreList[0].client;
            let to = msg_data.to;
            let message = msg_data.message;
            let contactId;

            // Resolve problema de nono dígito
            if (to.startsWith('55') && to.length == 13 && to[4] == 9) {
                contactId = await zapClient.getNumberId(to.slice(0, 4) + to.slice(5))
            }
            if (!contactId) {
                contactId = await zapClient.getNumberId(to)
            }
            if (contactId) {
                to = contactId.user
            }

            var result = await zapClient.sendMessage(to + '@c.us', message);

            //console.log(result);
            res.status(200).json({
                message: result
            });

        } else {
            res.status(400).send({
                message: "clientId not found"
            });
        }
    }

    controller.removeClient = async (req, res) => {

        const msg_data = req.body;
        const zapClientStoreList = store.filter((client) => {
            return client.clientId == msg_data.clientId;
        });

        if (zapClientStoreList.length) {

            const zapClient = zapClientStoreList[0].client;
            
            await zapClient.logout();
            await zapClient.destroy();

            res.status(200).json({
                message: msg_data.clientId + ' closed'
            });

        } else {
            res.status(400).send({
                message: "clientId not found"
            });
        }
    }

    controller.listClients = async (req, res) => {
        res.status(200).json({
            count: store.length
        });
    }

    controller.listCustomerWallets = (req, res) => res.status(200).json(customerWalletsDB);

    return controller;
}