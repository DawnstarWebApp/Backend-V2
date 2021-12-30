const express = require('express');
const morgan = require('morgan');
const {StatusCodes} = require('http-status-codes');
const bodyParser = require("body-parser");
const responseTime = require("response-time");

const app = express();

//Database connections
const db = require("./app/models/index.model");

const port = process.env.APP_PORT || 3000;
const environment = process.env.APP_ENV || 'development';
const url = process.env.APP_URL || 'http://localhost';

app.use(express.urlencoded({extended: false}))
    .use(bodyParser.json())
    .use(morgan(`dev`))
    .use(responseTime());

app.get('/', (req, res, next) => {
    res.json({"Message": "Welcome to " + process.env.APP_NAME + " Web Application!"});
    res.status(StatusCodes.OK)
})

require('./app/routes/index')(app);

const server = app.listen(port, () => {
    console.log(`Checking database connection...`);
    db.sequelize.authenticate()
        .then(() => {
            console.log('Database Connection Established Successfully.');
            if (environment === 'development') {
                db.sequelize.sync({force: true})

            } else {
                db.sequelize.sync()

            }
            console.log(`${environment} Database Synchronized Successfully.`);

        })
        .catch(err => {
            console.log('Database Synchronization failed.');
            console.log('Unable to connect to the database:');
            console.log(err.message);
            console.log('Exiting Application');
            process.exit(1);
        });

    console.log(`listening at ${url}:${port}`)
})

module.exports = {
    server: server, app: app
};