module.exports = (sequelize, DataTypes) => {
    return sequelize.define("Review", {
        puntuacion: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: { min: 1, max: 5 }
        },
        comentario: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        usuario_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Usuarios',
                key: 'id'
            },
            allowNull: false
        },
        hamburguesa_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Hamburguesas',
                key: 'id'
            },
            allowNull: false
        }
    });
};
