const categories = require('../controllers/category.controller');

module.exports = (app) => {
    //create a new category
    app.post('/categories', categories.create);

    //Retrieve all categories
    app.get('/categories', categories.findAll);

    //Retrieve a single categories with categoryId
    app.get('/categories/:id', categories.findOne)

    //Update a category with categoryId
    app.put('/categories/:id', categories.update);

    //delete a category with categoryId
    app.delete('/categories/:id', categories.delete);
}