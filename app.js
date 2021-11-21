const express = require('express');
const morgan = require('morgan');
const {ReasonPhrases, StatusCodes, getReasonPhrase, getStatusCode,} = require('http-status-codes');
const bodyParser = require("body-parser");
const app = express();

//Database connections
const db = require("./app/models/index.model.js");

const port = 3000;
const url = process.env.APP_URL || 'http://localhost';

app.use(express.urlencoded({extended: false}))
    .use(bodyParser.json())
    .use(morgan(`tiny`));

app.get('/', (req, res, next) => {
    res.json({"Message": "Welcome to Dawnstar web Application!"});
    res.status(StatusCodes.OK)
})

require('./app/routes/amenity.routes.js')(app);

const server = app.listen(port, () => {
        console.log(`Checking database connection...`);
        db.sequelize.authenticate()
            .then(() => {
                console.log('Database Connection established successfully.');
                db.sequelize.sync();

            })
            .catch(err => {
                console.log('Unable to connect to the database:');
                console.log(err.message);
                process.exit(1);
            });
        console.log(`listening at ${url}:${port}`)
    }
)

module.exports = {
    server: server,
    app: app
};