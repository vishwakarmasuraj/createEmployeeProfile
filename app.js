const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const routes = require('./router');
const port = process.env.PORT

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

mongoose.connect(process.env.DATABASE_CONNECTION).then(() => {
    app.use('/api', routes)
    console.log('Successfully connected to Database')
    app.listen(port, () => console.log(`Server is listening at ${ port }`))
});