module.exports = (app) => {
    require('./amenity.routes.js')(app);
    require('./category.routes.js')(app);
}
