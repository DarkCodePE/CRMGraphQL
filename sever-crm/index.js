const express = require('express');
const connectDB = require('./config/db');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./route');
//Server
const app = express();
//Conexion
connectDB();
//enable bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
//enable cors
app.use(cors())
// Rutas de la app
app.use('/', routes());

app.use(express.static('uploads'));
//Port
app.listen(4000);