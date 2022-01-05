const {IdentificationType} = require("../models/index.model");
const validations = require("../utils/validations");


//Create and Save a new Identification Type
exports.create = async (req, res) => {
    try {
        const identificationType = await new IdentificationType({
            identification_type: req.body.type
        });
        await identificationType.save()
        return validations.successMessage(res, identificationType.identification_type, "create")
    } catch (err) {
        return validations.errorResponse(err, res, "Identification Type")
    }
};
// Retrieve and return all Identification Types from the database.
exports.findAll = async (req, res) => {
    try {
        const identificationType = await IdentificationType.findAll();
        return validations.showAll(res, identificationType);
    } catch (err) {
        return validations.errorResponse(err, res, "IdentificationType")
    }
};

//Retrieve and return a single identification types with  id
exports.findOne = async (req, res) => {
    try {
        const identificationType = await IdentificationType.findOne({where: {id: req.params.id}})

        return validations.showOne(res, identificationType)
    } catch (err) {
        return validations.errorResponse(err, res, "IdentificationType")
    }
};


//Update a identification type with id
exports.update = async (req, res) => {
    try {
        await IdentificationType.update({identification_type: req.body.type}, {
            where: {id: req.params.id},
            returning: true,
            plain: true
        })


        const identificationType = await IdentificationType.findOne({where: {id: req.params.id}})
        return validations.successMessage(res, identificationType.identification_type, "update")
    } catch (err) {
        return validations.errorResponse(err, res, "IdentificationType")
    }
};

//Delete an identification type with id
exports.delete = async (req, res) => {
    try {
        await IdentificationType.destroy({where: {id: req.params.id}})
        return validations.successMessage(res, "identificationType", "delete")
    } catch (err) {
        return validations.errorResponse(err, res, "IdentificationType")
    }
};
