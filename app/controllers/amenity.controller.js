const db = require("../models/index.model");
const Amenity = db.amenity;
const Op = db.Sequelize.Op;

//Create and Save a new Amenity
exports.create = (req, res) => {

    //validate type request
    if (!req.body.name) {
        return res.status(400).send({
            message: "Amenity name can not be empty",
        });
    }

    //create an amenity
    const amenity = new Amenity({
        amenity_name: req.body.name,
    });

    //save amenity in the database
    amenity.save()
        .then((amenity) => {
            res.send(amenity);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Amenity.",
            });
        });
};

// Retrieve and return all amenities from the database.
exports.findAll = (req, res) => {
    Amenity.findAll()
        .then((amenities) => {
            res.send(amenities);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving amenities.",
            });
        });

};

//Retrieve and return a single amenity with a amenityId
exports.findOne = (req, res) => {
    const amenityId = req.params.amenityId;
    Amenity.findOne({ where: { amenity_id: amenityId}})
        .then((amenity) => {
            if (!amenity) {
                return res.status(404).send({
                    message: "Amenity not found with id " + amenityId,
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
    if (!req.body.name) {
        return res.status(400).send({
            message: "Amenity name can not be empty",
        });
    }

    // Find amenity and update it with the request body
    Amenity.update(
        req.params.amenityId,
        {
            amenity_name: req.body.name,
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
