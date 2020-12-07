const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    client: {
        type: Schema.ObjectId,
        ref: 'clients'
    },
    order: [{
        product: {
            type: Schema.ObjectId,
            ref: 'products'
        },
        quantity: {
            type: Number
        }
    }],
    total: {
        type: Number
    }
});

module.exports = mongoose.model('orders', OrderSchema);
