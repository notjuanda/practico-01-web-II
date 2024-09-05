const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    port: dbConfig.PORT,
    dialect: "postgres"
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Importar modelos
db.usuarios = require("./usuario.model.js")(sequelize, Sequelize);
db.lugares = require("./lugar.model.js")(sequelize, Sequelize);
db.hamburguesas = require("./hamburguesa.model.js")(sequelize, Sequelize);
db.reviews = require("./review.model.js")(sequelize, Sequelize);

// Relaciones
// Un usuario es dueño de muchos lugares
db.usuarios.hasMany(db.lugares, { as: "lugares" });
db.lugares.belongsTo(db.usuarios, {
    foreignKey: "usuarioId",
    as: "usuario"
});

// Un lugar tiene muchas hamburguesas
db.lugares.hasMany(db.hamburguesas, { as: "hamburguesas" });
db.hamburguesas.belongsTo(db.lugares, {
    foreignKey: "lugarId",
    as: "lugar"
});

// Una hamburguesa tiene muchas reviews
db.hamburguesas.hasMany(db.reviews, { as: "reviews" });
db.reviews.belongsTo(db.hamburguesas, {
    foreignKey: "hamburguesaId",
    as: "hamburguesa"
});

// Un usuario puede hacer muchas reviews
db.usuarios.hasMany(db.reviews, { as: "reviews" });
db.reviews.belongsTo(db.usuarios, {
    foreignKey: "usuarioId",
    as: "usuario"
});

module.exports = db;
