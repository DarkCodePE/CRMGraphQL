const Products = require('../models/Product');
const multer = require('multer');
const shortid = require('shortid');

const configuracionMulter = {
    storage: fileStorage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, __dirname+'/../uploads/');
        },
        filename: (req, file, cb) => {
            const extension = file.mimetype.split('/')[1];
            cb(null, `${shortid.generate()}.${extension}`);
        }
    }),
    fileFilter(req, file, cb) {
        if ( file.mimetype === 'image/jpeg' ||  file.mimetype ==='image/png' ) {
            cb(null, true);
        } else {
            cb(new Error('Formato No válido'))
        }
    },
}
// pasar la configuración y el campo
const upload = multer(configuracionMulter).single('image');
// Sube un archivo 
exports.subirArchivo = (req, res, next) => {
    upload(req, res, function(error) {
        if (error instanceof multer.MulterError) {
            // A Multer error occurred when uploading.
            console.log(error)
        } else if (error) {
            // An unknown error occurred when uploading.
            console.log(error)
        }
        console.log("Everything went fine")
        // Everything went fine.
        return next();
    })
}

exports.newProducts = async(req, res) => {
    const product = new Products(req.body);
    try {
        if (req.file.filename) {
            product.image = req.file.filename;
        }
        await product.save();
        res.status(200).json({message:'Se agrego un nuevo product'});
    } catch (error) {
        console.log(error);
        res.status(500).send('Server error: Could not save a new product')
    }
}

exports.showProducts = async(res) => {
    try {
        const Products = await Products.find({});
        res.status(200).json(Products);
    } catch (error) {
        console.log(error);
        res.status(500).send('Server error: Could not show it to Products')
    }
}

exports.showProductsByID = async(req, res) => {
    const product = await Products.findById(req.params.id);
    if (!product) {
       res.status(500).send('Server error: Product not found!')
    }
    res.status(200).json(product);
}

exports.updateProduct= async(req, res) => {
    try {
        const productDB = await Products.findById(req.params.id);
        const newProduct = req.body;
        if (req.file) {
            newProduct.image =  req.file.filename;
        } else {
            newProduct.image = productDB.image
        }
        /* new true, para que nos traiga el objecto actulizado */
        const Product = await Products.findOneAndUpdate({ _id: req.params.id }, newProduct, {
            new : true
        });
        res.status(200).json(Product);
    } catch (error) {
        console.log(error);
        res.status(500).send('Server error: Could not update this Product')
    }
}

exports.deleteClient = async(req, res) => {
    try {
        /* new true, para que nos traiga el objecto actulizado */
        const Product = await Products.findOneAndDelete({ _id: req.params.id });
        res.status(200).json(Product);
    } catch (error) {
        console.log(error);
        res.status(500).send('Server error: Could not delete this Product')
    }
}
