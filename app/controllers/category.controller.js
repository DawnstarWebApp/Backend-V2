const db = require("../models/index.model");
const validations = require("../utils/validations");
const Category = db.category;

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
};
// Retrieve and return all categories from the database.
exports.findAll = async (req, res) => {
    try {
        const categories = await Category.findAll();
        return validations.showAll(res, categories);
    } catch (err) {
        return validations.errorResponse(err, res, "Category")
    }
};

//Retrieve and return a single category with a categoryId
exports.findOne = async (req, res) => {
    try {
        const category = await Category.findOne({where: {category_id: req.params.categoryId}})

        return validations.showOne(res, category)
    } catch (err) {
        return validations.errorResponse(err, res, "Category")
    }
};

// Update a category identified by the categoryId in the request
exports.update = async (req, res) => {
    try {
        // Find category and update it with the request body
        await Category.update({category_name: req.body.name}, {
            where: {category_id: req.params.categoryId},
            returning: true,
            plain: true
        })
        const category = await Category.findOne({where: {category_id: req.params.categoryId}})

        return validations.successMessage(res, category.category_name, "update");
    } catch (err) {
        return validations.errorResponse(err, res, "Category")
    }

};

//delete a category with the specified categoryId in the request
exports.delete = async (req, res) => {
    try {
        Category.destroy({where: {category_id: req.params.categoryId}})
        return validations.successMessage(res, "category", "delete");
    } catch (err) {
        return validations.errorResponse(err, res, "Category")
    }
}
