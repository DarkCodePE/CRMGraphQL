const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const clientSchema = new Schema({
    names:{
        type: String,
        trim: true,
    },
    lastName:{
        type: String,
        trim: true,
    },
    bussiness:{
        type: String,
        trim: true,
    },
    email:{
        type: String,
        unique:true,
        lowercase:true,
        trim: true,
    },
    phone:{
        type: String,
        unique:true,
        lowercase:true,
        trim: true,
    },
});

module.exports = mongoose.model('clients', clientSchema);
