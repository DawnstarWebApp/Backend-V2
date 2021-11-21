const {DataTypes} = require("sequelize");

module.exports = (sequelize) => {
    return sequelize.define("amenities", {
            amenity_id: {
                type: DataTypes.UUID,
                primaryKey: 1,
                defaultValue: DataTypes.UUIDV4,
                allowNull: 0
            },
            amenity_name: {
                type: DataTypes.STRING(30),
                allowNull: 0
            },
        }, {
            timestamps: 1,
            freezeTableName: 1,
            modelName: 'Amenity'
        }
    );
};