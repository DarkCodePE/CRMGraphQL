const Orders = require('../models/Order');

exports.newOrders = async(req, res) => {
    const order = new Orders(req.body);
    try {
        await order.save();
        res.status(200).json({message:'Se agrego un nuevo pedido'});
    } catch (error) {
        console.log(error);
        res.status(500).send('Server error: Could not save a new product')
    }
}

exports.showOrders = async(res) => {
    try {
        const orders = await Orders.find({}).populate('client').populate({
            path:'product',
            model: 'products'
        });
        res.status(200).json(orders);
    } catch (error) {
        console.log(error);
        res.status(500).send('Server error: Could not show it to Products')
    }
}

exports.showOrderByID = async(req, res) => {
    const order = await Orders.findById(req.params.id);
    if (!order) {
       res.status(500).send('Server error: Order not found!')
    }
    res.status(200).json(order);
}

exports.updateOrder= async(req, res) => {
    try {
        const newOrder = req.body;
        const order = await Orders.findOneAndUpdate({ _id: req.params.id }, newOrder, {
            new : true
        }).populate('client').populate({
            path:'product',
            model: 'products'
        });
        res.status(200).json(order);
    } catch (error) {
        console.log(error);
        res.status(500).send('Server error: Could not update this Order')
    }
}
exports.deleteOrder = async(req, res) => {
    try {
        /* new true, para que nos traiga el objecto actulizado */
        const order = await Products.findOneAndDelete({ _id: req.params.id });
        res.status(200).json(order);
    } catch (error) {
        console.log(error);
        res.status(500).send('Server error: Could not delete this Product')
    }
}
