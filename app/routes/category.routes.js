module.exports = async (app) => {
    const categories = await require('../controllers/category.controller.js');

    //create a new category
    app.post('/categories', categories.create);

    //Retrieve all categories
    app.get('/categories', categories.findAll);

    //Retrieve a single categories with categoryId
    app.get('/categories', categories.findOne);

    //Update a category with categoryId
    app.put('/categories', categories.update);

    //delete a category with categoryId
    app.delete('/categories', categories.delete);
}