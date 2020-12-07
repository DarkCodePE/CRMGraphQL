const mongoose = require('mongoose');

const connectDB = async() => {
    try {
        await mongoose.connect("mongodb+srv://orlando:orlando123@cluster0-mmwir.mongodb.net/restapi?retryWrites=true",{
            useNewUrlParser: true,
            useUnifiedTopology:true,
            useFindAndModify:false,
            useCreateIndex: true
        })
        console.log('DB connect');
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

module.exports = connectDB;