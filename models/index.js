const Sequelize = require("sequelize");
const dbConfig = require("../config/db.config.js");

const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD,
    {
        host: dbConfig.HOST,
        port: dbConfig.PORT,
        dialect: "postgres",
    }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Modelos
db.Usuario = require("./usuario.model.js")(sequelize, Sequelize.DataTypes);
db.Restaurante = require("./restaurante.model.js")(sequelize, Sequelize.DataTypes);
db.Hamburguesa = require("./hamburguesa.model.js")(sequelize, Sequelize.DataTypes);
db.Review = require("./review.model.js")(sequelize, Sequelize.DataTypes);
db.HamburguesaComida = require("./HamburguesaComida.model.js")(sequelize, Sequelize.DataTypes);  // Agregado modelo faltante

// Relaciones

// Un restaurante puede tener muchas hamburguesas
db.Restaurante.hasMany(db.Hamburguesa, { foreignKey: 'restaurante_id' });
db.Hamburguesa.belongsTo(db.Restaurante, { foreignKey: 'restaurante_id' });

// Una hamburguesa puede tener muchos reviews
db.Hamburguesa.hasMany(db.Review, { foreignKey: 'hamburguesa_id' });
db.Review.belongsTo(db.Hamburguesa, { foreignKey: 'hamburguesa_id' });

// Un usuario puede dejar muchos reviews
db.Usuario.hasMany(db.Review, { foreignKey: 'usuario_id' });
db.Review.belongsTo(db.Usuario, { foreignKey: 'usuario_id' });

// Relación entre Hamburguesa y Usuario a través de HamburguesaComida
// Un usuario puede marcar muchas hamburguesas como comidas
db.Usuario.hasMany(db.HamburguesaComida, { foreignKey: 'usuario_id' });
db.HamburguesaComida.belongsTo(db.Usuario, { foreignKey: 'usuario_id' });

// Una hamburguesa puede ser marcada como comida muchas veces
db.Hamburguesa.hasMany(db.HamburguesaComida, { foreignKey: 'hamburguesa_id' });
db.HamburguesaComida.belongsTo(db.Hamburguesa, { foreignKey: 'hamburguesa_id' });

module.exports = db;
