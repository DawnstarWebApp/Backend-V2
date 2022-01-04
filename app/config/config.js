<<<<<<< Updated upstream
const dotenv = require('dotenv').config();

const host = process.env.DB_HOST || "localhost";
const user = process.env.DB_USER || "admin";
const password = process.env.DB_PASSWORD || "dawnstar";
const database = process.env.DB_NAME || "dawnstar-db";
const dialect = process.env.DB || "postgres";

module.exports =
    {
        HOST: host,
        USER: user,
        PASSWORD: password,
        DB: database,
        dialect: dialect,
        pool:
            {
                max: 5,
                min: 0,
                acquire: 30000,
                idle: 10000
            }
=======
const dotenv = require('dotenv').config();

const host = process.env.DB_HOST || "localhost";
const user = process.env.DB_USER || "postgres";
const password = process.env.DB_PASSWORD || "postgres";
const database = process.env.DB_NAME || "postgres";
const dialect = process.env.DB || "postgres";

module.exports =
    {
        HOST: host,
        USER: user,
        PASSWORD: password,
        DB: database,
        dialect: dialect,
        pool:
            {
                max: 5,
                min: 0,
                acquire: 30000,
                idle: 10000
            }
>>>>>>> Stashed changes
    }