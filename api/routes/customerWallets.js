module.exports = app => {
    const controller = require('../controller/customerWallets')();

    app.route('/api/v1/clients')
        .get(controller.listClients);

    app.route('/api/v1/addClient')
        .post(controller.addClient)
        
    app.route('/api/v1/sendMessage')
        .post(controller.sendMessage)
        
    app.route('/api/v1/removeClient')
        .post(controller.removeClient)
}