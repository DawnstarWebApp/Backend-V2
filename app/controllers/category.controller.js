<<<<<<< Updated upstream
const {Category} = require("../models/index.model");

const validations = require("../utils/validations");


//Create and Save a new Category
exports.create = async (req, res) => {

    try {
        const category = await new Category({

            category_name: req.body.name
        });
        await category.save()
        return validations.successMessage(res, category.category_name, "create")
    } catch (err) {
        return validations.errorResponse(err, res, "Category")
    }

}
//retrieve all categories
exports.findAll = async (req, res) => {


    try {
        const categories = await Category.findAll();
        return validations.showAll(res, categories);
    } catch (err) {
        return validations.errorResponse(err, res, "Category")
    }
}

// Retrive a single category with a categoryId
exports.findOne = async (req, res) => {
    try {
        const category = await Category.findOne({where: {id: req.params.id}})

        return validations.showOne(res, category)
    } catch (err) {
        return validations.errorResponse(err, res, "Category")
    }
}

//Update a category identified by the categoryId in the request
exports.update = async (req, res) => {
    try {
        // Find Category and update it with the request body
        await Category.update({category_name: req.body.name}, {
            where: {id: req.params.id},
            returning: true,
            plain: true
        })
        const category = await Category.findOne({where: {id: req.params.id}})
        return validations.successMessage(res, category.category_name, "update");
    } catch (err) {
        return validations.errorResponse(err, res, "Category")
    }
}

// Delete a category with the specified categoryId in the request
exports.delete = async (req, res) => {

    try {
        await Category.destroy({where: {id: req.params.id}})
        return validations.successMessage(res, "Category", "delete");
    } catch (err) {
        return validations.errorResponse(err, res, "Category")
    }
}
=======
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
>>>>>>> Stashed changes
