require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const routes = require('./index.routes');
const app = express();

app.use(cors())

// Usa Morgan para registrar las solicitudes
app.use(morgan('dev'));

app.use('/', routes);

app.listen(4000, () => {
    console.log('Server is running on port 4000');
});
