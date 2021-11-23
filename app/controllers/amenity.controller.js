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
            validations.createOne(res, amenity);
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
    //validate type request
    if (!req.body.name) {
        return res.status(400).send({
            message: "Amenity name can not be empty",
        });
    }

    // Find amenity and update it with the request body

    Amenity.update({amenity_name: req.body.name},
        {
            where: {amenity_id: req.params.amenityId},

        })
        .then((amenity) => {
            if (!amenity) {
                return res.status(404).send({
                    message: "Amenity not found with id " + req.params.amenityId,
                });
            }
            // res.send({message: amenity.amenity_name + " updated successfully!"});
            res.send(amenity);
        })
        .catch((err) => {
            console.log(err)
            if (err.kind === "ObjectId") {
                return res.status(404).send({
                    message: "Amenity not found with id " + req.params.amenityId,
                });
            }
            return res.status(500).send({
                message: "Error updating amenity with id " + req.params.amenityId,
            });
        });
};

//delete a amenity with the specified amenityId in the request
exports.delete = (req, res) => {
    Amenity.findByIdAndRemove(req.params.amenityId)
        .then(amenity => {
            if (!amenity) {
                return res.status(404).send({
                    message: "Amenity not found with id " + req.params.amenityId,
                });
            }
            res.send({message: "Amenity deleted successfully!"});
        }).catch((err) => {
        validations.errorResponse(err, res, "Amenity")
    });
};
