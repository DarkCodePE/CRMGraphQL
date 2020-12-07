const express = require('express');
const router = express.Router();

const clienteControllers = require('../controllers/clienteControllers');
const productControllers = require('../controllers/productController');
const orderControllers = require('../controllers/orderController');

module.exports = function() {
    router.get('/clientsList', clienteControllers.showClients); 
    router.post('/clients', clienteControllers.newClients);
    router.get('/clients/:id', clienteControllers.showClientsByID);
    router.put('/clients/:id', clienteControllers.updateClient);
    router.delete('/clients/:id', clienteControllers.deleteClient);
   /*  router.get('/productsList', productControllers.showProducts);  */
    router.post('/products', productControllers.subirArchivo, productControllers.newProducts);
    /* router.get('/products/:id', productControllers.showProductByID);
    router.put('/products/:id', productControllers.updateProduct);
    router.delete('/products/:id', productControllers.deleteProduct); */
 /*    router.post('/orders', orderControllers.newOrder);
    router.get('/orders', orderControllers.showOrders);
    router.get('/orders/:id', orderControllers.showOrderByID);
    router.put('/orders/:id', orderControllers.updateOrder);
    router.delete('/orders/:id', orderControllers.deleteOrder); */
    return router;
}