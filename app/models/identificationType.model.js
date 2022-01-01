const {DataTypes} = require("sequelize");

module.exports = (sequelize) => {

    return sequelize.define('identification_types', {
        id: {
            type: DataTypes.UUID,
            primaryKey: 1,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            validate: {
                isUUID: 4,
            }
        },
        identification_type: {
            type: DataTypes.STRING(20),
            allowNull: false,
            unique: {
                args: 1,
                msg: 'Identification Type already Exists !.'
            },
            validate: {
                notEmpty: {
                    args: true,
                    msg: 'Identification Is Required Cannot Be Empty'
                },
                notNull: {
                    args: true,
                    msg: 'Identification Type Cannot Be Null'
                },
                len: {
                    args: [4, 20],
                    msg: "Identification Type must be at least 4 characters long and maximum of 20 characters long"
                }
            }


        }
    }, {
        modelName: 'identification_types',
        timestamps: 1,
        paranoid: 1,
        freezeTableName: 1,
    });
}