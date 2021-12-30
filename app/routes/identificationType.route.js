module.exports = (app) => {
    const identificationType = require('../controllers/identificationType.controller');


    // Create a new IdentificationType
    app.post('/identificationTypes', identificationType.create);

    // Retrieve all IdentificationTypes
    app.get('/identificationTypes', identificationType.findAll);

    // Retrieve a single IdentificationType with id
    app.get('/identificationTypes/:id', identificationType.findOne);

    // Update a IdentificationType with id
    app.put('/identificationTypes/:id', identificationType.update);


}
