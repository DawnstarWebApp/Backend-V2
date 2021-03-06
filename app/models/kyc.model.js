const {DataTypes, Sequelize} = require("sequelize");

module.exports = (sequelize) => {

    return sequelize.define("kycs", {
        kyc_id: {
            type: DataTypes.UUID, primaryKey: 1, defaultValue: DataTypes.UUIDV4, allowNull: false, validate: {
                isUUID: 4,
            }
        }, full_name: {
            type: DataTypes.STRING(30), allowNull: false, unique: {
                args: 1, msg: 'Amenity already Exists !.'
            }, validate: {
                notEmpty: {
                    args: true, msg: 'Amenity Cannot Be Empty'
                }, notNull: {
                    args: true, msg: 'Amenity Cannot Be Null'
                }, len: {
                    args: [4, 32], msg: "Amenity must be at least 4 characters long and maximum of 32 characters long"
                }
            }

            identification_number: {
                type: DataTypes.INTEGER(20), allowNull: false

                V
            }
        }


    }, {
        timestamps: 1, paranoid: 1, freezeTableName: 1, modelName: 'kycs'

    });
};