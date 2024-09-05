module.exports = app => {
    require('./usuario.routes')(app);      // Usuarios
    require('./lugar.routes')(app);        // lugares
    require('./hamburguesa.routes')(app);  // hamburguesas
    require('./review.routes')(app);       // reviews
};
