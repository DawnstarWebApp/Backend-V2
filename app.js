const express = require('express');
const morgan = require('morgan');
const {StatusCodes} = require('http-status-codes');
const bodyParser = require("body-parser");
const app = express();
// const redis = require('redis');
// const responseTime = require('response-time')

// const client = redis.createClient();
//Database connections
const db = require("./app/models/index.model.js");

const port = 3000;
const environment = process.env.APP_ENV || 'production';
const url = process.env.APP_URL || 'http://localhost';

app.use(express.urlencoded({extended: false}))
    .use(bodyParser.json())
    .use(morgan(`tiny`))
    // .use(responseTime())
;

app.get('/', (req, res, next) => {
    res.json({"Message": "Welcome to " + process.env.APP_NAME + " web Application!"});
    res.status(StatusCodes.OK)
})

require('./app/routes/index')(app);

const server = app.listen(port, () => {
        console.log(`Checking database connection...`);
        db.sequelize.authenticate()
            .then(() => {
                console.log('Database Connection established successfully.');
                if (environment === 'development') {
                    db.sequelize.sync({force: true})
                }
                db.sequelize.sync()
                    .then(() => {
                        console.log('Database Synchronized successfully.');
                    })
                    .catch(err => {
                        console.log('Database Synchronization failed.');
                        console.log(err);
                    });

            })
            .catch(err => {
                console.log('Unable to connect to the database:');
                console.log(err.message);
                process.exit(1);
            });
        // client.on('connect', () => log('Redis connected'))

        console.log(`listening at ${url}:${port}`)
    }
)

module.exports = {
    server: server,
    app: app
};