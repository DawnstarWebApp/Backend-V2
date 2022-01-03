const {DataTypes} = require("sequelize");

module.exports = (sequelize) => {
return sequelize.define('user', {
    id: {
        type: DataTypes.UUID,
        primaryKey: 1,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate: {
            isUUID: 4,
        }
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    tableName: 'users',
    timestamps: true
});
}