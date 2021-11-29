const db = require("../models/index.model");
const validations = require("../utils/validations");
const Amenity = db.amenity;

//Create and Save a new Amenity
exports.create = (req, res) => {
    const amenity = new Amenity({
        amenity_name: req.body.name
    });
    //save amenity in the database
    amenity.save()
        .then((amenity) => {
            return validations.successMessage(res, amenity.amenity_name, "create")
        })
        .catch((err) => {
            return validations.errorResponse(err, res, "Amenity")
        });
};
// Retrieve and return all amenities from the database.
exports.findAll = async (req, res) => {
    try {
        const amenities = await Amenity.findAll();
        validations.showAll(res, amenities);
    } catch (err) {
        validations.errorResponse(err, res, "Amenity")
    }
};

//Retrieve and return a single amenity with a amenityId
exports.findOne = async (req, res) => {
    try {
        const amenity = await Amenity.findOne({where: {amenity_id: req.params.amenityId}})

        return validations.showOne(res, amenity)
    } catch (err) {
        return validations.errorResponse(err, res, "Amenity")
    }
};

// Update a amenity identified by the amenityId in the request
exports.update = async (req, res) => {
    try {
        // Find amenity and update it with the request body
        await Amenity.update({amenity_name: req.body.name},
            {where: {amenity_id: req.params.amenityId}, returning: true, plain: true})
        const amenity = await Amenity.findOne({where: {amenity_id: req.params.amenityId}})

        return validations.successMessage(res, amenity.amenity_name, "update");
    } catch (err) {
        return validations.errorResponse(err, res, "Amenity")
    }

};


//delete a amenity with the specified amenityId in the request
exports.delete = (req, res) => {
    Amenity.destroy({where: {amenity_id: req.params.amenityId}})
        .then(rowDeleted => {
            if (rowDeleted === 1) {
                return validations.successMessage(res, "amenity", "delete");
            }
        })
        .catch(err => {
            return validations.errorResponse(err, res, "Amenity")
        })
};
