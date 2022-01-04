<<<<<<< Updated upstream
const dbConfig = require("../config/config.js")

const Sequelize = require("sequelize")

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: 0,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
})

const db = {}

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//Models/tables
db.Amenity = require("./amenity.model")(sequelize, Sequelize);
db.Category = require("./category.model")(sequelize, Sequelize);
db.IdentificationType = require("./identificationType.model")(sequelize, Sequelize);

=======
const dbConfig = require("../config/config.js")

const Sequelize = require("sequelize")

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: 0,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
})

const db = {}

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//Models/tables
db.amenity = require("./amenity.model")(sequelize, Sequelize);

>>>>>>> Stashed changes
module.exports = db;