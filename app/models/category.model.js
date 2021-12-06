const {DataTypes, Sequelize} = require("sequelize");

module.exports = (sequelize) => {

    return sequelize.define("categories", {
            category_id: {
                type: DataTypes.UUID,
                primaryKey: 1,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false,
                validate: {
                    isUUID: 4,
                }
            },
            category_name: {
                type: DataTypes.STRING(30),
                allowNull: false,
                unique: {
                    args: 1,
                    msg: 'Category already Exists !.'
                },
                validate: {
                    notEmpty: {
                        args: true,
                        msg: 'Category Cannot Be Empty'
                    },
                    notNull: {
                        args: true,
                        msg: 'Category Cannot Be Null'
                    },
                    len: {
                        args: [4, 32],
                        msg: "Category must be at least 4 characters long and maximum of 32 characters long"
                    }
                }
            }


        }, {
            timestamps: 1,
            paranoid: 1,
            freezeTableName: 1,
            modelName: 'Category'

        }
    );
};