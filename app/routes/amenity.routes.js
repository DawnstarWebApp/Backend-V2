const amenities  = require('../controllers/amenity.controller');

module.exports = (app) =>
{
    //create a new amenity
    app.post('/amenities', amenities.create);

    //Retrieve all amenity
    app.getAll('/amenities', amenities.getAll);

    //Retrieve a single amenity with amenityId
    app.getOne('/amenities/:amenityId', amenities.getOne);

    //Update a amenity with amenityId
    app.update('/amenities/:amenityId', amenities.update);

    //delete a amenity with amenityId
    app.delete('/amenities/:amenityId', amenities.delete);
}