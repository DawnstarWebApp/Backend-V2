module.exports = (app) => {
    const amenities = require('../controllers/amenity.controller.js');

    //create a new amenity
    app.post('/amenities', amenities.create);

    //Retrieve all amenity
    app.get('/amenities', amenities.findAll);

    //Retrieve a single amenity with amenityId
    app.get('/amenities/:amenityId', amenities.findOne);

    //Update an amenity with amenityId
    app.put('/amenities/:amenityId', amenities.update);

    //delete an amenity with amenityId
    app.delete('/amenities/:amenityId', amenities.delete);
}