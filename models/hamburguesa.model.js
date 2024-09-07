module.exports = (sequelize, DataTypes) => {
    return sequelize.define("Hamburguesa", {
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        descripcion: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        precio: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        imagen: {
            type: DataTypes.STRING,
            allowNull: true
        },
        restaurante_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Restaurantes',
                key: 'id'
            },
            allowNull: false
        }
    });
};
