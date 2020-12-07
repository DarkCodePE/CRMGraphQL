const Clients = require('../models/Client');

exports.newClients = async(req, res) => {
    const client = new Clients(req.body);
    try {
        await client.save();
        res.status(200).json({
            message:'Se agrego un nuevo cliente',
            status:200
        });
    } catch (error) {
        res.status(500).send({ 
            message:'Server error: Could not save a new client'+error,
            status:200
        })
    }
}

exports.showClients = (req, res, next) => {
    Clients.find((err, results) => {
        if (err) console.log(err);
        else res.json(results);
    });
} 

exports.showClientsByID = async(req, res) => {
    const client = await Clients.findById(req.params.id);
    if (!client) {
        console.error(error);
        res.status(500).send('Server error: Cliente not found!')
    }
    res.status(200).json(client);
}

exports.updateClient = async(req, res) => {
    try {
        /* new true, para que nos traiga el objecto actulizado */
        const clients = await Clients.findOneAndUpdate({ _id: req.params.id }, req.body, {
            new : true
        });
        res.status(200).json(clients);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error: Could not update this Client')
    }
}

exports.deleteClient = async(req, res) => {
    try {
        /* new true, para que nos traiga el objecto actulizado */
        const clients = await Clients.findOneAndDelete({ _id: req.params.id });
        res.status(200).json(clients);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error: Could not delete this Client')
    }
}