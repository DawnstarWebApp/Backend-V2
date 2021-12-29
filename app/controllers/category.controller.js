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
exports.findAll = async  (req, res) => {


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
        const category = await Category.findOne({where: {category_id: req.params.id}})

        return validations.showOne(res, category)
    } catch (err) {
        return validations.errorResponse(err, res, "Category")
    }
}

//Update a category identified by the categoryId in the request
exports.update = async  (req, res) => {
    try {
        // Find Category and update it with the request body
        await Category.update({category_name: req.body.name}, {
            where: {category_id: req.params.id},
            returning: true,
            plain: true
        })
        const category = await Category.findOne({where: {category_id: req.params.id}})

        return validations.successMessage(res, category.category_name, "update");
    } catch (err) {
        return validations.errorResponse(err, res, "Category")
    }
}

// Delete a category with the specified categoryId in the request
exports.delete =async (req, res) => {

    try {
        await Category.destroy({where: {category_id: req.params.id}})
        return validations.successMessage(res, "Category", "delete");
    } catch (err) {
        return validations.errorResponse(err, res, "Category")
    }
}
