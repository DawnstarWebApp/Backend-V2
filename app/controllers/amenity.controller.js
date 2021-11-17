const Amenity = require("../models/amenity.model.js");

//Create and Save a new Amenity
exports.create = (req, res) => {
    //validate type request
    if (!req.body.type) {
        return res.status(400).send({
            message: "Amenity name can not be empty",
        });
    }

    //create an amenity
    const amenity = new Amenity({
        type: req.body.type,
    });

    //save amenity in the database
    amenity.save()
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Amenity.",
            });
        });
};

// Retrieve and return all amenities from the database.
exports.getAll = (req, res) => {
    Amenity.find()
        .then((amenities) => {
            res.send(amenities);
        })
        .catch((err) => {
            es.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving amenities.",
            });
        });
};

//Retrieve and return a single amenity with a amenityId
exports.getOne = (req, res) => {
    Amenity.findById(req.params.amenityId)
        .then((amenity) => {
            if (!amenity) {
                return res.status(404).send({
                    message: "Amenity not found with id " + req.params.amenityId,
                });
            }
            res.send(amenity);
        })
        .catch((err) => {
            if (err.kind === "ObjectId") {
                return res.status(404).send({
                    message: "Amenity not found with id " + req.params.amenityId,
                });
            }
            return res.status(500).send({
                message: "Error retrieving amenity with id " + req.params.amenityId,
            });
        });
};

// Update a amenity identified by the amenityId in the request
exports.update = (req, res) => {
    //validate type request
    if (!req.body.type) {
        return res.status(400).send({
            message: "Amenity name can not be empty",
        });
    }

    // Find amenity and update it with the request body
    Amenity.findByIdAndUpdate(
        req.params.amenityId,
        {
            type: req.body.type,
        },
        {new: true}
    )
        .then((amenity) => {
            if (!amenity) {
                return res.status(404).send({
                    message: "Amenity not found with id " + req.params.amenityId,
                });
            }
            res.send(amenity);
        })
        .catch((err) => {
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
        }).catch(err => {   //if error
        if (err.kind === "ObjectId" || err.name === "NotFound") {
            return res.status(404).send({
                message: "Amenity not found with id " + req.params.amenityId,
            });
        }
        return res.status(500).send({
            message: "Could not delete amenity with id " + req.params.amenityId,
        });
    });
};
