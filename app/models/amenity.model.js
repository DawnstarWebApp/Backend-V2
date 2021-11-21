const {DataTypes} = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    return sequelize.define("amenities", {
            amenity_id: {
                type: DataTypes.INTEGER,
                primaryKey: 1,
                autoIncrement: 1,
                allowNull: 0
            },
            amenity_name: {
                type: DataTypes.STRING,
                allowNull: 0
            },
        }, {
            timestamps: 1,
        freezeTableName: 1,
        modelName: 'Amenity'
        }
    );
};