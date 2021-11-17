const Category = require("../models/category.model");

//Create and Save a new Amenity
exports.create = (req, res) => {
    if (!req.body.name) {
        return res.status(400).send({
            message: "Category content can not be empty"
        });
    }
    // Create a Category
    const category = new Category({
        name: req.body.name
    });
    //Save Category in the database
    category.save().then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Error occurred while creating the Category."
        });
    });
}
//retrieve all categories
exports.getAll = (req, res) => {
    Category.find().then(categories => {
        res.send(categories);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving categories."
        });
    });
}

// Retrive a single category with a categoryId
exports.getOne = (req, res) => {
    Category.findById(req.params.categoryId).then(category => {
        if (!category) {
            return res.status(404).send({
                message: "Category not found with id " + req.params.categoryId
            });
        }
        res.send(category);
    }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Category not found with id " + req.params.categoryId
            });
        }
        return res.status(500).send({
            message: "Error retrieving category with id " + req.params.categoryId
        });
    });
}

//Update a category identified by the categoryId in the request
exports.update = (req, res) => {
    //validate request id
    if(!req.body.name) {
        return res.status(400).send({
            message: "Category content can not be empty"
        });
    }
    Category.findByIdAndUpdate(req.params.categoryId, {
        name: req.body.name
    }, {new: true}).then(category => {
        if (!category) {
            return res.status(404).send({
                message: "Category not found with id " + req.params.categoryId
            });
        }
        res.send(category);
    }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Category not found with id " + req.params.categoryId
            });
        }
        return res.status(500).send({
            message: "Error updating category with id " + req.params.categoryId
        });
    });
}

// Delete a category with the specified categoryId in the request
exports.delete = (req, res) => {
    Category.findByIdAndRemove(req.params.categoryId).then(category => {
        if (!category) {
            return res.status(404).send({
                message: "Category not found with id " + req.params.categoryId
            });
        }
        res.send({message: "Category deleted successfully!"});
    }).catch(err => {
        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Category not found with id " + req.params.categoryId
            });
        }
        return res.status(500).send({
            message: "Could not delete category with id " + req.params.categoryId
        });
    });
}