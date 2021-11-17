const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv').config();
const {ReasonPhrases, StatusCodes, getReasonPhrase, getStatusCode,} = require('http-status-codes');
const faker = require('faker');
const bodyParser = require("body-parser");

const app = express();
const port = process.env.APP_PORT || 3000;
const url = process.env.APP_URL || 'http://localhost';

app.use(express.urlencoded({extended: true}))
    .use(bodyParser.json())
    .use(morgan(`tiny`));

app.get('/', (req, res, next) => {
    res.send(" Dawn Star Api Started")
    res.status(StatusCodes.OK)
})

app.listen(port, () => {
        console.log(`listening at ${url}:${port}`)
    }
)