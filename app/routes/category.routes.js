const categories  = require('../controllers/amenity.controller');

module.exports = (app) =>
{
    //create a new category
    app.post('/categories', categories.create);

    //Retrieve all categories
    app.get('/categories', categories.getAll);

    //Retrieve a single categories with categoryId
    app.get('/categories', categories.getOne)

    //Update a category with categoryId
    app.put('/categories', categories.update);

    //delete a category with categoryId
    app.delete('/categories', categories.delete);
}