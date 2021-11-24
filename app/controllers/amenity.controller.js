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
            validations.errorResponse(err, res, "Amenity")
        });
};
// Retrieve and return all amenities from the database.
exports.findAll = (req, res) => {
    Amenity.findAll()
        .then((amenities) => {
            validations.showAll(res, amenities)
        })
        .catch((err) => {
            validations.errorResponse(err, res, "Amenity")

        });
};

//Retrieve and return a single amenity with a amenityId
exports.findOne = (req, res) => {
    Amenity.findOne({where: {amenity_id: req.params.amenityId}})
        .then((amenity) => {
            return validations.showOne(res, amenity)

        })
        .catch((err) => {
            return validations.errorResponse(err, res, "Amenity")
        });
}

// Update a amenity identified by the amenityId in the request
exports.update = (req, res) => {
    // Find amenity and update it with the request body
    Amenity.update({amenity_name: req.body.name},
        {where: {amenity_id: req.params.amenityId}, returning: true, plain: true})
        .then((amenity) => {

            console.log(amenity);
            return validations.successMessage(res, amenity, "update");
        })
        .catch((err) => {
            return validations.errorResponse(err, res, "Amenity");
        });

};

//delete a amenity with the specified amenityId in the request
exports.delete = (req, res) => {
    Amenity.destroy({where: {amenity_id: req.params.amenityId}})
        .then(amenity => {
            if (!amenity) {
                throw  new Error("NotFound");
            }
            return validations.successMessage(res, amenity, "delete")

        }).catch((err) => {

        validations.errorResponse(err, res, "Amenity")
    });
};
