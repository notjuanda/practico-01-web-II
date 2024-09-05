module.exports = (sequelize, Sequelize) => {
    const Hamburguesa = sequelize.define("hamburguesa", {
        nombre: {
            type: Sequelize.STRING,
            allowNull: false
        },
        descripcion: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        foto: {
            type: Sequelize.STRING,
            allowNull: true
        },
        lugarId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'lugares', 
                key: 'id'
            }
        }
    });

    return Hamburguesa;
};
